import { CheckCircle2, Clock, XCircle } from "lucide-react";

export type OrderStatus =
  | "all"
  | "pending"
  | "success"
  | "failed"
  | "canceled"
  | "expired";

export interface OrderItem {
  label: string;
  quantity: number;
  unit_price: number;
  image?: string;
  tag?: string;
}

export interface Order {
  id: number;
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: Exclude<OrderStatus, "all">;
  items: OrderItem[];
}

export const STATUS_CONFIG: Record<
  Exclude<OrderStatus, "all">,
  {
    label: string;
    icon: React.ReactNode;
    bg: string;
    text: string;
    dot: string;
  }
> = {
  pending: {
    label: "En attente",
    icon: <Clock className="w-3.5 h-3.5" />,
    bg: "bg-[#FFF8EC]",
    text: "text-[#B45309]",
    dot: "bg-[#F59E0B]",
  },
  success: {
    label: "Payé",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    bg: "bg-[#F0FDF4]",
    text: "text-[#15803D]",
    dot: "bg-[#22C55E]",
  },
  failed: {
    label: "Échoué",
    icon: <XCircle className="w-3.5 h-3.5" />,
    bg: "bg-[#FEF2F2]",
    text: "text-[#B91C1C]",
    dot: "bg-[#EF4444]",
  },
  canceled: {
    label: "Annulé",
    icon: <XCircle className="w-3.5 h-3.5" />,
    bg: "bg-[#FEF2F2]",
    text: "text-[#B91C1C]",
    dot: "bg-[#EF4444]",
  },
  expired: {
    label: "Expiré",
    icon: <Clock className="w-3.5 h-3.5" />,
    bg: "bg-[#F3F4F6]",
    text: "text-[#6B7280]",
    dot: "bg-[#9CA3AF]",
  },
};

export const FILTERS: { value: OrderStatus; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "pending", label: "En attente" },
  { value: "success", label: "Payé" },
  { value: "failed", label: "Échoué" },
  { value: "expired", label: "Expiré" },
];
