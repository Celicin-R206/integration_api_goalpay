"use client";

import Link from "next/link";
import { Github, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/libs/store";

export default function Header() {
  const { items } = useCartStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#111111] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Accueil ProServices">
            <span
              className="w-7 h-7 bg-[#0070f8] rounded-md flex items-center justify-center text-white font-black text-sm"
              aria-hidden="true">
              G
            </span>
            <span className="text-white font-bold text-lg tracking-tight">
              GC <span className="text-[#0070f8]">Services</span>
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-[#AAAAAA] hover:text-white text-sm font-semibold tracking-wide transition-colors duration-150">
              Services
            </Link>
            <Link
              href="/my-orders"
              className="text-[#AAAAAA] hover:text-white text-sm font-semibold tracking-wide transition-colors duration-150">
              Mes Commandes
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-white hover:bg-[#0070f8] text-[#111] hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200"
                aria-label="Voir le panier">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Panier</span>
                {itemCount > 0 && (
                  <span className="bg-[#FF2D78] text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center leading-none -mr-1">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link
                href="https://github.com/Celicin-R206/integration_api_goalpay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black bg-white rounded-full p-2"
                aria-label="Voir le code source sur GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
