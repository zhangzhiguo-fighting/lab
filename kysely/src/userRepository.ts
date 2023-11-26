import { db } from "./database.ts";
import { UserUpdate, User, NewUser } from "./types.ts";

export async function finduserById(id: number) {
  return await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function updateuser(id: number, updateWith: UserUpdate) {
  await db.updateTable("users").set(updateWith).where("id", "=", id).execute();
}

export async function createuser(user: NewUser) {
  return await db
    .insertInto("users")
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteuser(id: number) {
  return await db
    .deleteFrom("users")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
