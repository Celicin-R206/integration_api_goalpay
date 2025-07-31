import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface CartItem {
  label: string;
  unit_price: number;
  quantity: number;
}

interface PaymentPayload {
  access: string;
  amount: number;
  currency: string;
  metadata: CartItem[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CartItem[] = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Liste des articles invalide ou vide" },
        { status: 400 }
      );
    }

    const amount = items.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    );

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Montant total invalide" },
        { status: 400 }
      );
    }

    const payload: PaymentPayload = {
      access: process.env.PAYMENT_ACCESS_TOKEN || "TGP_8ZGTEJJUH7R9MJQO",
      amount,
      currency: "Ar",
      metadata: items,
    };

    const paymentServiceUrl =
      process.env.PAYMENT_SERVICE_URL ||
      "http://localhost:8000/api/payement/service";
    const res = await axios.post(paymentServiceUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Erreur API paiement:", error);
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: "Erreur lors du paiement", detail: error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
