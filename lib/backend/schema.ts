import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull().unique(),
  description: text("description").notNull(),
  items: text("items", { mode: "json" }).notNull().$type<
    Array<{
      label: string;
      unit_price: number;
      quantity: number;
      image: string;
      tag: string;
    }>
  >(),
  status: text("status").notNull(),
  goalpayOrderRef: text("goalpay_order_ref").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(unixepoch())`)
    .notNull(),
});
