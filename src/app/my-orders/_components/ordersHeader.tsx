import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface OrdersHeaderProps {
  totalOrders: number;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

const FILTERS = [
  { value: "all", label: "Toutes" },
  { value: "pending", label: "En attente" },
  { value: "success", label: "Payé" },
  { value: "failed", label: "Échoué" },
];

export default function OrdersHeader({
  totalOrders,
  activeFilter,
  onFilterChange,
  counts,
}: OrdersHeaderProps) {
  return (
    <div className="bg-[#111111] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#AAAAAA] hover:text-white text-sm font-semibold mb-5 transition-colors">
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

          {totalOrders > 0 && (
            <span className="text-[#AAAAAA] text-sm font-medium">
              {totalOrders} commande{totalOrders > 1 ? "s" : ""} au total
            </span>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-0">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => {
            const count =
              f.value === "all" ? totalOrders : counts[f.value] || 0;
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => onFilterChange(f.value)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-bold
                  border-b-2 transition-all duration-150
                  ${isActive ? "border-[#0070f8] text-white" : "border-transparent text-[#666] hover:text-[#AAA]"}
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
  );
}
