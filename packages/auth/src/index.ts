import { db } from "@base-example/db";
import * as schema from "@base-example/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",

    schema: schema,
  }),
  trustedOrigins: ["*"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [],
});
