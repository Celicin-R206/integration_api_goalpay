"use client";

import Link from "next/link";
import { XCircle, Home } from "lucide-react";

export default function FailedPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FF] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className={`
            bg-white rounded-3xl w-full max-w-md
            transition-all duration-700 ease-out}
          `}>
          <div className="flex flex-col items-center pt-12 pb-8 px-8">
            <div className="relative mb-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: "#FFF0F5" }}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "#FF2D78" }}>
                  <XCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF2D78] mb-2">
              Paiement échoué
            </span>
            <h1
              className="text-3xl font-black text-[#0A0F1E] text-center leading-tight mb-3"
              style={{ fontFamily: "'Georgia', serif" }}>
              Une erreur est{" "}
              <em className="not-italic text-[#FF2D78]">survenue.</em>
            </h1>
            <p className="text-[#7788AA] text-sm text-center leading-relaxed">
              Votre paiement via{" "}
              <span className="font-bold text-[#0A0F1E]">Goalpay</span> n&apos;a
              pas pu être finalisé. Aucun montant n&apos;a été débité.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="mx-8 h-px bg-[#EEF2FF]" />

          {/* ── CTAs ── */}
          <div className="px-8 pb-4 flex flex-col gap-3">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-[#445577] bg-[#F4F7FF] hover:bg-[#EEF2FF] transition-colors duration-200">
              <Home className="w-4 h-4" />
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
