import { Database } from "./types.ts";
import { Kysely } from "https://esm.sh/kysely@0.23.4";
import { PostgresDialect } from "https://cdn.jsdelivr.net/gh/barthuijgen/kysely-deno-postgres@0.0.4/mod.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const pool = new Pool(
  {
    database: "mydb",
    hostname: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
  },
  1
);

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});

// export const db = new Kysely<Database>({
//   dialect: new PostgresDialect({
//     database: "mydb",
//     hostname: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "postgres",
//   }),
// });
