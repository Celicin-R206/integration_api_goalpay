import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "../../../../lib/backend/db";
import { orders } from "../../../../lib/backend/schema";

export async function GET() {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));

    return NextResponse.json({
      success: true,
      orders: allOrders,
      count: allOrders.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Impossible de récupérer les commandes",
      },
      { status: 500 },
    );
  }
}
