import { Order, STATUS_CONFIG } from "./constants";

interface OrderStatsCardsProps {
  orders: Order[];
}

export default function OrderStatsCards({ orders }: OrderStatsCardsProps) {
  const statuses = [
    "pending",
    "success",
    "failed",
    "canceled",
    "expired",
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {statuses.map((s) => {
        const cfg = STATUS_CONFIG[s];
        const statusOrders = orders.filter((o) => o.status === s);
        const count = statusOrders.length;
        const total = statusOrders.reduce(
          (sum, o) =>
            sum +
            o.items.reduce(
              (acc: number, i) => acc + i.unit_price * i.quantity,
              0,
            ),
          0,
        );

        return (
          <div key={s} className="bg-white rounded-xl p-4 border border-[#ddd]">
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-bold ${cfg.text} mb-2`}>
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </div>
            <p className="font-black text-[#111] text-lg leading-none">
              {count}
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
  );
}
