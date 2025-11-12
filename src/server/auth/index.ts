import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { env } from "cloudflare:workers";

export const auth = (): ReturnType<typeof betterAuth> => {
  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db(), {
      provider: "sqlite",
      schema: {
        user: schema.user,
        account: schema.account,
        session: schema.session,
        verification: schema.verification
      }
    }),
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
      }
    },
    baseURL: env.BETTER_AUTH_URL
  });
};
