import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { db } from "../../../../lib/backend/db";
import { orders } from "../../../../lib/backend/schema";

interface CartItem {
  id: string;
  label: string;
  unit_price: number;
  quantity: number;
  image: string;
  tag: string;
}

interface PaymentRequestBody {
  items: CartItem[];
}

interface GoalPayResponse {
  message: string;
  count: number;
  data: {
    checkout_url: string;
    expires_in_minutes: number;
    order_reference: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequestBody = await req.json();
    const { items } = body;

    // Validation basique
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Panier vide ou invalide" },
        { status: 400 },
      );
    }

    let total = 0;

    const formattedItems: {
      label: string;
      unit_price: number;
      quantity: number;
      image: string;
      tag: string;
    }[] = [];

    for (const item of items) {
      if (
        !item.label?.trim() ||
        !item.image?.trim() ||
        !item.tag?.trim() ||
        typeof item.unit_price !== "number" ||
        item.unit_price <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return NextResponse.json(
          { error: "Article invalide" },
          { status: 400 },
        );
      }

      total += item.unit_price * item.quantity;

      formattedItems.push({
        label: item.label.trim(),
        unit_price: item.unit_price,
        quantity: item.quantity,
        image: item.image.trim(),
        tag: item.tag.trim(),
      });
    }

    if (total < 100) {
      return NextResponse.json(
        { error: "Montant minimum 100 Ar" },
        { status: 400 },
      );
    }

    console.log(formattedItems);

    // Variables d'environnement
    const accessKey = process.env.GOALPAY_ACCESS_KEY;
    const paymentUrl = process.env.PAYMENT_GOALPAY_URL;

    if (!accessKey || !paymentUrl) {
      console.error("Manque GOALPAY_ACCESS_KEY ou PAYMENT_GOALPAY_URL");
      return NextResponse.json(
        { error: "Erreur de configuration" },
        { status: 500 },
      );
    }

    // Référence unique
    const timestamp = Date.now();
    const reference = `PAN_${timestamp}`;
    const description = `Panier ${timestamp.toString().slice(-6)} - ${items.length} article${items.length > 1 ? "s" : ""}`;

    // 2. Préparation payload pour GoalPay (sans image ni tag)
    const payload = {
      description,
      access: accessKey,
      reference,
      amount: total,
      currency: "Ar",
      metadata: formattedItems.map((item) => ({
        label: item.label,
        unit_price: item.unit_price,
        quantity: item.quantity,
      })),
    };

    // 3. Appel GoalPay
    const response = await axios.post<GoalPayResponse>(paymentUrl, payload, {
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    const goalpayData = response.data.data;

    // Sauvegarde EN BASE seulement si GoalPay a répondu correctement

    try {
      await db.insert(orders).values({
        reference,
        description,
        items: formattedItems,
        status: "pending",
        goalpayOrderRef: goalpayData.order_reference,
      });
    } catch (dbError) {
      console.error("ERREUR DB :", dbError);
      throw dbError;
    }

    // 5. Réponse au frontend
    return NextResponse.json({
      success: true,
      checkout_url: goalpayData.checkout_url,
      expires_in_minutes: goalpayData.expires_in_minutes,
      reference,
      amount: total,
      currency: "Ar",
    });
  } catch (error) {
    console.error("Erreur paiement:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          error: "Erreur GoalPay",
          detail: error.response.data?.message || "Inconnu",
        },
        { status: error.response.status || 500 },
      );
    }

    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
