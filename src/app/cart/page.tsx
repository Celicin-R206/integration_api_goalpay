"use client";

import { useCartStore } from "@/libs/store";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import CartHeader from "./_components/cartHeader";
import CartItemsList from "./_components/cartItemsList";
import CartSummary from "./_components/cartSummary";

export default function CartPage() {
  const { items } = useCartStore();
  const itemCount = items.reduce((t, i) => t + i.quantity, 0);

  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <CartHeader itemCount={itemCount} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-[#ddd]">
            <div className="w-20 h-20 bg-[#F7F5F2] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-[#CCCCCC]" />
            </div>
            <p
              className="text-2xl font-black text-[#111] mb-2"
              style={{ fontFamily: "'Georgia', serif" }}>
              Panier vide
            </p>
            <p className="text-[#888] mb-8 text-sm">
              Vous n&apos;avez pas encore ajouté de service à votre panier.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#111] hover:bg-[#0070f8] text-white py-3 px-8 rounded-xl font-bold text-sm transition-colors duration-200">
              Découvrir nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <CartItemsList />
            <CartSummary />
          </div>
        )}
      </div>
    </main>
  );
}
