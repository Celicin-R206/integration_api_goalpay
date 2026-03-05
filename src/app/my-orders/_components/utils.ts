import { OrderItem } from "./constants";

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-MG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function getOrderTotal(items: OrderItem[]) {
  return items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
}
