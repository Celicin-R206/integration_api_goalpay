// page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, XCircle, Package } from "lucide-react";
import { useAllOrders } from "../../../hook/payment";
import {
  FILTERS,
  Order,
  OrderStatus,
  STATUS_CONFIG,
} from "./_components/constants";
import { getOrderTotal } from "./_components/utils";
import { SkeletonRow } from "./_components/skeletonRow";
import { OrderRow } from "./_components/orderRow";

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<OrderStatus>("all");
  const { orders, isLoading, isError } = useAllOrders();

  const safeOrders: Order[] = Array.isArray(orders) ? orders : [];

  const filtered =
    activeFilter === "all"
      ? safeOrders
      : safeOrders.filter((o) => o.status === activeFilter);

  const counts = safeOrders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      {/* Page header */}
      <div className="bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#aaa] hover:text-white text-sm font-semibold mb-5 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour aux services
          </Link>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0070f8]">
                Historique
              </span>
              <h1
                className="text-4xl font-black mt-1 leading-none"
                style={{ fontFamily: "'Georgia', serif" }}>
                Mes <em className="not-italic text-[#0070f8]">Commandes</em>
              </h1>
            </div>
            {!isLoading && !isError && (
              <span className="text-[#AAAAAA] text-sm font-medium">
                {safeOrders.length} commande{safeOrders.length > 1 ? "s" : ""}{" "}
                au total
              </span>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="max-w-6xl mx-auto px-6 pb-0">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {FILTERS.map((f) => {
              const count =
                f.value === "all" ? safeOrders.length : counts[f.value] || 0;
              const isActive = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`
                    flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-bold
                    border-b-2 transition-all duration-150
                    ${
                      isActive
                        ? "border-[#0070f8] text-white"
                        : "border-transparent text-[#666] hover:text-[#AAA]"
                    }
                  `}>
                  {f.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
                      isActive
                        ? "bg-[#0070f8] text-white"
                        : "bg-[#222] text-[#666]"
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {!isLoading &&
          !isError &&
          activeFilter === "all" &&
          safeOrders.length > 0 && (
            <div className="grid grid-cols-3 gap-4 my-6 ">
              {(
                ["pending", "success", "failed", "canceled", "expired"] as const
              ).map((s) => {
                const cfg = STATUS_CONFIG[s];
                const statusOrders = safeOrders.filter((o) => o.status === s);
                const total = statusOrders.reduce(
                  (sum, o) => sum + getOrderTotal(o.items),
                  0,
                );
                return (
                  <div
                    key={s}
                    className="bg-white rounded-xl p-4 border border-[#ddd]">
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${cfg.text} mb-2`}>
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </div>
                    <p className="font-black text-[#111] text-lg leading-none">
                      {counts[s] || 0}
                      <span className="text-xs font-semibold text-[#999] ml-1">
                        cmd
                      </span>
                    </p>
                    <p className="text-[#999] text-xs mt-1">
                      {total.toLocaleString("fr-MG")} Ar
                    </p>
                  </div>
                );
              })}
            </div>
          )}

        {/* Error state */}
        {isError && (
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
        )}

        {/* Loading skeleton */}
        {isLoading && !isError && (
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ddd]">
            <div className="px-6 py-3 bg-[#F7F5F2] border-b border-[#F0EDE9] flex items-center gap-3">
              <RefreshCw className="w-3.5 h-3.5 text-[#CCC] animate-spin" />
              <span className="text-xs font-bold text-[#999] uppercase tracking-widest">
                Chargement…
              </span>
            </div>
            <ul>
              {[...Array(4)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </ul>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filtered.length === 0 && (
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
        )}

        {/* Orders list */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ddd]">
            {/* Table head */}
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
        )}
      </div>
    </main>
  );
}
