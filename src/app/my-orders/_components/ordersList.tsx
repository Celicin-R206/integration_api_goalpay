"use client";

import { RefreshCw, XCircle, Package } from "lucide-react";
import { OrderRow } from "./orderRow";
import { Order } from "./constants";

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
  activeFilter: string;
}

export default function OrdersList({
  orders,
  isLoading,
  isError,
  activeFilter,
}: OrdersListProps) {
  const filtered =
    activeFilter === "all"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border">
        <div className="px-6 py-3 bg-[#F7F5F2] border-b border-[#F0EDE9] flex items-center gap-3">
          <RefreshCw className="w-3.5 h-3.5 text-[#CCC] animate-spin" />
          <span className="text-xs font-bold text-[#999] uppercase tracking-widest">
            Chargement…
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border">
        <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <XCircle className="h-8 w-8 text-[#EF4444]" />
        </div>
        <p
          className="text-xl font-black text-[#111] mb-2"
          style={{ fontFamily: "'Georgia', serif" }}>
          Erreur de chargement
        </p>
        <p className="text-[#999] text-sm">
          Impossible de récupérer vos commandes. Veuillez réessayer.
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center border border-[#ddd]">
        <div className="w-16 h-16 bg-[#F7F5F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-[#CCC]" />
        </div>
        <p
          className="text-xl font-black text-[#111] mb-2"
          style={{ fontFamily: "'Georgia', serif" }}>
          Aucune commande
        </p>
        <p className="text-[#999] text-sm">
          {activeFilter === "all"
            ? "Vous n'avez pas encore passé de commande."
            : "Aucune commande avec ce statut pour l'instant."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#ddd]">
      <div className="px-6 py-3 bg-[#F7F5F2] border-b border-[#F0EDE9] hidden sm:flex items-center gap-4">
        <span className="flex-1 text-xs font-bold text-[#999] uppercase tracking-widest">
          Référence
        </span>
        <span className="text-xs font-bold text-[#999] uppercase tracking-widest hidden sm:block">
          Services
        </span>
        <span className="text-xs font-bold text-[#999] uppercase tracking-widest w-28 text-center">
          Statut
        </span>
        <span className="text-xs font-bold text-[#999] uppercase tracking-widest w-32 text-right">
          Montant
        </span>
        <span className="w-4" />
      </div>

      <ul>
        {filtered.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}
