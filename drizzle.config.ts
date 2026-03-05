import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/backend/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: { url: "file:./services.db" },
});
