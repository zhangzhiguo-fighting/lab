import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  database: "mydb",
  hostname: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
});

await client.connect();

try {
  const result = await client.queryArray("SELECT * FROM public.user");
  console.log(result);
} catch (error) {
  console.error("查询出错:", error);
} finally {
  await client.end();
}
