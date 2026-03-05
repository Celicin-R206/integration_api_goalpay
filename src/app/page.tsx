"use client";

import HeroSection from "./_components/heroSection";
import ProductCard from "./_components/productCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <HeroSection productsCount={products.length} />

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.label} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

interface Product {
  id: string;
  label: string;
  unit_price: number;
  description: string;
  image: string;
  tag: string;
}

const products: Product[] = [
  {
    id: "CP-LOGO",
    label: "Conception logo pro",
    unit_price: 300,
    description:
      "Identité visuelle unique qui reflète l'essence de votre marque.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    tag: "Branding",
  },
  {
    id: "DV-SITE",
    label: "Développement site vitrine",
    unit_price: 200,
    description:
      "Site web performant, responsive et optimisé pour le référencement.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    tag: "Web",
  },
  {
    id: "MTC",
    label: "Maintenance mensuelle",
    unit_price: 400,
    description:
      "Suivi, mises à jour et support technique continu pour votre site.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tag: "Support",
  },
];
