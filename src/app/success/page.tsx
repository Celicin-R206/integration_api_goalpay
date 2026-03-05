"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag, Home } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FF] flex flex-col">
      {/* ── Centered card ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className={`
            bg-white rounded-3xl w-full max-w-md
            transition-all duration-700 ease-out
          `}
          style={{
            boxShadow:
              "0 4px 6px rgba(0,0,0,0.04), 0 24px 64px rgba(0,87,255,0.12)",
          }}>
          {/* ── Icon area ── */}
          <div className="flex flex-col items-center pt-12 pb-8 px-8">
            {/* Outer ring */}
            <div className="relative mb-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: "#EDFFF5" }}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "#00B341" }}>
                  <CheckCircle2
                    className="w-8 h-8 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              {/* Ping animation */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: "#00B341" }}
              />
            </div>

            {/* Title */}
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#00B341] mb-2">
              Paiement confirmé
            </span>
            <h1
              className="text-3xl font-black text-[#0A0F1E] text-center leading-tight mb-3"
              style={{ fontFamily: "'Georgia', serif" }}>
              Merci pour votre{" "}
              <em className="not-italic text-[#0070F8]">commande&nbsp;!</em>
            </h1>
            <p className="text-[#7788AA] text-sm text-center leading-relaxed">
              Votre paiement a été traité avec succès via{" "}
              <span className="font-bold text-[#0A0F1E]">Goalpay</span>.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="mx-8 h-px bg-[#EEF2FF]" />

          {/* ── No reference fallback ── */}

          {/* ── CTAs ── */}
          <div className="px-8 pb-10 flex flex-col gap-3">
            <Link
              href="/my-orders"
              className="w-full px-4 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-colors duration-200"
              style={{ background: "#0057FF" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#0046D5")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "#0057FF")
              }>
              <ShoppingBag className="w-4 h-4" />
              Voir mes commandes
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

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
