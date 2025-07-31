"use client";

import { useState } from "react";
import { useCartStore } from "@/libs/store";
import ButtonLoader from "@/components/button-loader";
import { Palette, Globe, Settings, ShoppingCart } from "lucide-react";

interface Product {
  label: string;
  unit_price: number;
}

const products: Product[] = [
  { label: "Conception logo pro", unit_price: 500000 },
  { label: "Développement site vitrine", unit_price: 150000 },
  { label: "Maintenance mensuelle", unit_price: 230000 },
];

export default function Home() {
  const { addItem } = useCartStore();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAddToCart = (product: Product) => {
    setLoadingStates({ ...loadingStates, [product.label]: true });
    setTimeout(() => {
      addItem({ ...product, quantity: 1 });
      setLoadingStates({ ...loadingStates, [product.label]: false });
    }, 500);
  };

  return (
    <main className="py-10 px-4 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">Nos Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez notre gamme de services professionnels pour développer votre
          présence en ligne.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.label}
            className="bg-white rounded-xl overflow-hidden border border-gray-300">
            <div className="h-40 bg-blue-50 flex items-center justify-center">
              {product.label.includes("logo") && (
                <Palette className="w-16 h-16 text-blue-400" />
              )}
              {product.label.includes("site") && (
                <Globe className="w-16 h-16 text-blue-400" />
              )}
              {product.label.includes("Maintenance") && (
                <Settings className="w-16 h-16 text-blue-400" />
              )}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                {product.label}
              </h2>
              <p className="text-gray-500 mb-6">
                Service professionnel de haute qualité
              </p>

              <div className="flex flex-col space-y-4">
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {product.unit_price.toLocaleString()} Ar
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={loadingStates[product.label]}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center space-x-2 w-full"
                  aria-label={`Ajouter ${product.label} au panier`}>
                  {loadingStates[product.label] ? (
                    <>
                      <ButtonLoader />
                      <span>Ajout en cours...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
