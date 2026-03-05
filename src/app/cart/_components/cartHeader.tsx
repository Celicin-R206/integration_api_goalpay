import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
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
              Commande
            </span>
            <h1
              className="text-4xl font-black mt-1 leading-none"
              style={{ fontFamily: "'Georgia', serif" }}>
              Votre <em className="not-italic text-[#0070f8]">Panier</em>
            </h1>
          </div>

          {itemCount > 0 && (
            <span className="text-[#AAAAAA] text-sm font-medium">
              {itemCount} article{itemCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
