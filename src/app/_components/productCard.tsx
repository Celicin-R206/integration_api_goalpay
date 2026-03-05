"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import ButtonLoader from "@/components/button-loader";
import { useCartStore } from "@/libs/store";
import { useState } from "react";

interface Product {
  id: string;
  label: string;
  unit_price: number;
  description: string;
  image: string;
  tag: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      addItem({
        label: product.label,
        unit_price: product.unit_price,
        quantity: 1,
        tag: product.tag,
        image: product.image,
      });
      setIsLoading(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden flex flex-col border border-[#ddd]">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#E8E4DE]">
        <img
          src={product.image}
          alt={product.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#111111] opacity-10 group-hover:opacity-0 transition-opacity duration-300" />
        <span className="absolute top-4 left-4 bg-white text-[#111] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
          {product.tag}
        </span>
        <span className="absolute top-4 right-4 bg-[#111] text-white text-xs font-bold px-3 py-1 rounded-full">
          {product.id}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2
          className="text-xl font-black text-[#111] leading-tight mb-2"
          style={{ fontFamily: "'Georgia', serif" }}>
          {product.label}
        </h2>
        <p className="text-[#777] text-sm leading-relaxed flex-1 mb-6">
          {product.description}
        </p>

        <div className="flex items-baseline gap-1 mb-5 pb-5 border-b border-[#F0EDE9]">
          <span className="text-3xl font-black text-[#111]">
            {product.unit_price.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-[#999] ml-1">Ar</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`
            w-full py-3.5 px-5 rounded-xl font-bold text-sm tracking-wide cursor-pointer
            flex items-center justify-center gap-2.5
            transition-all duration-200
            ${isAdded ? "bg-[#00B341] text-white" : "bg-[#111] hover:bg-[#0070f8] text-white"}
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
          aria-label={`Ajouter ${product.label} au panier`}>
          {isLoading ? (
            <>
              <ButtonLoader />
              <span>Ajout en cours...</span>
            </>
          ) : isAdded ? (
            <>
              <span>✓</span>
              <span>Ajouté au panier</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Ajouter au panier</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
