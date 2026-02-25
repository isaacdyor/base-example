import { auth } from "@base-example/auth";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
