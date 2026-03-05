import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../lib/backend/db";
import { orders } from "../../../../lib/backend/schema";
import { eq } from "drizzle-orm";

const WEBHOOK_SECRET = process.env.GOALPAY_WEBHOOK_SECRET!;

if (!WEBHOOK_SECRET) {
  console.error("GOALPAY_WEBHOOK_SECRET manquant dans .env");
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-gpay-signature");
    const rawBody = await request.text();

    // console.log("Headers : ", request.headers);

    // console.log("Signature → reçue :", signature);

    // console.log(
    //   "Signature → calculée :",
    //   crypto
    //     .createHmac("sha256", WEBHOOK_SECRET)
    //     .update(
    //       `${JSON.parse(rawBody || "{}").data?.reference}|${
    //         JSON.parse(rawBody || "{}").data?.amount
    //       }|${JSON.parse(rawBody || "{}").data?.order_reference}`,
    //       "utf8",
    //     )
    //     .digest("hex"),
    // );

    // console.log(
    //   "GoalPay webhook reçu :",
    //   JSON.stringify(JSON.parse(rawBody || "{}"), null, 2),
    // );

    if (!rawBody || !signature)
      return new NextResponse("Bad Request", { status: 400 });

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    const { reference, amount, order_reference } = payload.data || {};

    console.log("Event :", payload.event);
    console.log("Reference commande :", reference);
    console.log("GoalPay order reference :", order_reference);
    console.log("Montant :", amount);

    // if (!reference || !amount || !order_reference) {
    //   return new NextResponse("Missing fields", { status: 400 });
    // }

    if (!order_reference) {
      return new NextResponse("Missing order_reference", { status: 400 });
    }

    const expected = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(`${WEBHOOK_SECRET}`, "utf8")
      .digest("hex");

    // console.log({ expected, signature });

    if (expected !== signature)
      return new NextResponse("Invalid signature", { status: 401 });

    // 4. Trouver la commande par goalpayOrderRef
    const record = await db
      .select({ id: orders.id, status: orders.status })
      .from(orders)
      .where(eq(orders.goalpayOrderRef, order_reference))
      .limit(1);

    if (record.length === 0) {
      console.warn(
        `Webhook: commande non trouvée pour order_reference ${order_reference}`,
      );
      return new NextResponse("Not found", { status: 404 });
    }

    const currentOrder = record[0];

    if (!record) return new NextResponse("Not found", { status: 404 });

    let newStatus: "success" | "failed" | "canceled" | "expired" | string;

    switch (payload.event) {
      case "payment.success":
        newStatus = "success";
        break;
      case "payment.failed":
        newStatus = "failed";
        break;
      case "payment.canceled":
        newStatus = "canceled";
        break;
      case "payment.expired":
        newStatus = "expired";
        break;
      default:
        newStatus = currentOrder.status;
        break;
    }

    console.log(`Nouveau status : ${newStatus}`);

    // 6. Mettre à jour seulement si changement
    if (newStatus !== currentOrder.status) {
      await db
        .update(orders)
        .set({
          status: newStatus,
        })
        .where(eq(orders.id, currentOrder.id));
    }

    // 7. Toujours répondre 200 pour que GoalPay arrête de renvoyer
    return NextResponse.json({ received: true, status: newStatus });
  } catch (err) {
    console.error("Erreur webhook GoalPay :", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
