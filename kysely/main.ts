import { Hono } from "https://deno.land/x/hono@v3.8.0-rc.2/mod.ts";
import { db } from "./src/database.ts";
import { NewProject, NewTimeSlot } from "./src/types.ts";

const app = new Hono();

// 创建项目
app.post("/projects", async (ctx) => {
  const project: NewProject = await ctx.req.json();
  const result = await db.insertInto("projects").values(project).execute();
  return ctx.json(result);
});

// 获取所有项目
app.get("/projects", async (ctx) => {
  const result = await db
    .selectFrom("projects")
    .select([
      "id",
      "name",
      "description",
      "advance_booking_days",
      "booking_duration",
      "push_endpoint",
      "created_at",
      "updated_at",
    ])
    .execute();
  return ctx.json(result);
});

// 更新项目
app.put("/projects/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const updatedProject = await ctx.req.json();
  const result = await db
    .updateTable("projects")
    .set(updatedProject)
    .where("id", "=", id)
    .execute();
  return ctx.json(result);
});

// 删除项目
app.delete("/projects/:name", async (ctx) => {
  const name = ctx.req.param("name");
  await db.transaction().execute(async (trx) => {
    const project = await trx
      .selectFrom("projects")
      .select("id")
      .where("name", "=", name)
      .executeTakeFirst();
    if (project) {
      await trx
        .deleteFrom("time_slots")
        .where("project_id", "=", project.id)
        .execute();
      await trx.deleteFrom("projects").where("id", "=", project.id).execute();
    }
  });
  return ctx.json({
    message: "Project and its time slots deleted successfully",
  });
});

// 创建时间段
app.post("/time-slots", async (ctx) => {
  const timeSlot: Array<NewTimeSlot> = await ctx.req.json();
  const result = await db.insertInto("time_slots").values(timeSlot).execute();
  return ctx.json(result);
});

// 获取特定项目的时间段
app.get("/projects/:id/time-slots", async (ctx) => {
  const projectId = ctx.req.param("id");
  const result = await db
    .selectFrom("projects")
    .innerJoin("time_slots", "time_slots.project_id", "projects.id")
    .select([
      "projects.id as project_id",
      "projects.name as project_name",
      "time_slots.day",
      "time_slots.start_time",
      "time_slots.end_time",
      "time_slots.reservation_capacity",
    ])
    .where("projects.id", "=", projectId)
    .execute();
  return ctx.json(result);
});

Deno.serve(app.fetch);
