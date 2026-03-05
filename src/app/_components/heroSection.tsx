import React from "react";

interface HeroSectionProps {
  productsCount: number;
}

export default function HeroSection({ productsCount }: HeroSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div className="flex flex-col gap-3 mb-2">
        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[#0070f8]">
          Services digitaux de <strong>GOAL COMPANY</strong>
        </span>
        <h1
          className="text-5xl md:text-6xl font-black text-[#111111] leading-none tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}>
          Nos <em className="not-italic text-[#0070f8]">Solutions</em>
          <br />
          Professionnelles
        </h1>
      </div>

      <div className="mt-6 flex items-end justify-between flex-wrap gap-4">
        <p className="text-[#555] text-lg max-w-xl leading-relaxed">
          Des services sur mesure pour construire et renforcer votre présence en
          ligne avec expertise et rigueur.
        </p>
        <span className="text-sm text-[#999] font-medium">
          {productsCount} services disponibles
        </span>
      </div>

      <div className="mt-8 h-px bg-[#E0DDD9]" />
    </section>
  );
}
