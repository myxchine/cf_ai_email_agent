import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { cache } from "react";
import { env } from "cloudflare:workers";
export const db = cache(() =>
  drizzle(env.DB, {
    schema
  })
);
