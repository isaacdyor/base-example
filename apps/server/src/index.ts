import { auth } from "@base-example/auth";
import { env } from "@base-example/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

const corsMiddleware = cors({
  origin: env.CORS_ORIGIN,
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.use("/*", async (c, next) => {
  // Skip Hono CORS for auth routes — Better Auth sets its own CORS headers
  if (c.req.path.startsWith("/api/auth")) {
    return next();
  }
  return corsMiddleware(c, next);
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
