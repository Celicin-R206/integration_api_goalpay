"use client";

import { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { Order } from "./constants";
import { StatusBadge } from "./statusBadge";
import { formatDate, getOrderTotal } from "./utils";

type OrderRowProps = {
  order: Order;
};

export function OrderRow({ order }: OrderRowProps) {
  const [expanded, setExpanded] = useState(false);
  const total = getOrderTotal(order.items);

  return (
    <li className="border-b border-[#F0EDE9] last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-5 flex items-center gap-4 hover:bg-[#FAFAF8] transition-colors text-left group">
        {/* Reference & date */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#111] text-sm leading-tight truncate">
            {order.reference}
          </p>
          <p className="text-[#999] text-xs mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Items count */}
        <div className="hidden sm:flex items-center gap-1.5 text-[#888] text-xs">
          <Package className="w-3.5 h-3.5" />
          <span>
            {order.items.length} service{order.items.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Status */}
        <StatusBadge status={order.status} />

        {/* Total */}
        <div className="text-right min-w-[7rem]">
          <p className="font-black text-[#111] text-base">
            {total.toLocaleString("fr-MG")}
            <span className="text-xs font-semibold text-[#999] ml-1">Ar</span>
          </p>
        </div>

        {/* Expand arrow */}
        <ArrowRight
          className={`w-4 h-4 text-[#CCC] transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-6 pb-5 bg-[#FAFAF8]">
          <div className="border border-[#F0EDE9] rounded-xl overflow-hidden">
            <div className="bg-[#111] px-4 py-2 flex justify-between items-center">
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                Détail des services
              </span>
              <span className="text-[#888] text-xs">{order.reference}</span>
            </div>

            <ul className="divide-y divide-[#F0EDE9] bg-white">
              {order.items.map((item, i) => (
                <li key={i} className="px-4 py-3 flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-[#111] truncate">
                        {item.label}
                      </p>
                      {item.tag && (
                        <span className="text-[10px] font-bold bg-[#F7F5F2] text-[#888] px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#999]">
                      {item.unit_price.toLocaleString("fr-MG")} Ar ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-[#0070f8] text-sm">
                    {(item.unit_price * item.quantity).toLocaleString("fr-MG")}
                    <span className="text-xs font-semibold text-[#999] ml-1">
                      Ar
                    </span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="px-4 py-3 bg-[#F7F5F2] flex justify-between items-center">
              <span className="text-xs font-bold text-[#888] uppercase tracking-wide">
                Total
              </span>
              <span className="font-black text-[#111] text-base">
                {total.toLocaleString("fr-MG")}
                <span className="text-xs font-semibold text-[#999] ml-1">
                  Ar
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
