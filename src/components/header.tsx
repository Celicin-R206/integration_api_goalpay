"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/libs/store";

export default function Header() {
  const { items } = useCartStore();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b border-gray-300 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            ProServices
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-orange-300 font-medium">
              Services
            </Link>

            <Link
              href="/cart"
              className="relative p-2 rounded-full bg-blue-700 transition-colors"
              aria-label="Voir le panier">
              <ShoppingCart className="h-6 w-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
