"use client";

import { useCartStore } from "@/libs/store";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemsList() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } =
    useCartStore();

  if (items.length === 0) return null;

  return (
    <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden border border-[#ddd]">
      <div className="px-6 py-4 bg-[#111] flex justify-between items-center">
        <span
          className="text-white font-black text-base"
          style={{ fontFamily: "'Georgia', serif" }}>
          Détails de la commande
        </span>
        <span className="text-[#888] text-xs font-semibold tracking-widest uppercase">
          {items.length} service{items.length > 1 ? "s" : ""}
        </span>
      </div>

      <ul className="divide-y divide-[#F0EDE9]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="px-6 py-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-4">
                <h3
                  className="font-black text-[#111] text-base leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  {item.label}
                </h3>
                <p className="text-[#999] text-sm mt-1">
                  {item.unit_price.toLocaleString("fr-MG")} Ar / unité
                </p>
              </div>
              <button
                onClick={() => removeItem(item.label)}
                className="w-8 h-8 rounded-lg bg-[#FEF2F2] hover:bg-[#FECACA] text-[#EF4444] flex items-center justify-center transition-colors"
                aria-label="Supprimer cet article">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 bg-[#F7F5F2] rounded-xl p-1">
                <button
                  onClick={() => decreaseQuantity(item.label)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white disabled:opacity-30 text-[#111] flex items-center justify-center transition-colors hover:bg-[#111] hover:text-white border border-[#ddd]"
                  aria-label="Diminuer quantité">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-black text-[#111] text-sm min-w-[1.5rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.label)}
                  className="w-8 h-8 rounded-lg bg-[#111] hover:bg-[#0070f8] text-white flex items-center justify-center transition-colors"
                  aria-label="Augmenter quantité">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-black text-xl text-[#0070f8]">
                  {(item.quantity * item.unit_price).toLocaleString("fr-MG")}
                  <span className="text-sm font-semibold text-[#999] ml-1">
                    Ar
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
