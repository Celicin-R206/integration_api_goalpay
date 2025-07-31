"use client";

import { useState } from "react";
import { useCartStore } from "@/libs/store";
import axios, { AxiosError } from "axios";
import ButtonLoader from "@/components/button-loader";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  label: string;
  unit_price: number;
  quantity: number;
}

interface PaymentResponse {
  data?: {
    checkout_url?: string;
  };
}

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post<PaymentResponse>(
        "http://localhost:3001/api/payment",
        {
          items,
        }
      );
      if (response.status === 200 && response.data?.data?.checkout_url) {
        clearCart();
        window.location.href = response.data.data.checkout_url;
      } else {
        alert("Erreur : Lien de paiement non reçu.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      alert(
        error instanceof AxiosError
          ? error.response?.data?.error || "Erreur lors du paiement."
          : "Une erreur inattendue s'est produite."
      );
      setIsProcessing(false);
    }
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  return (
    <main className="py-10 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Votre panier</h1>
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Retour aux services
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-xl mb-6">Votre panier est vide.</p>
          <Link
            href="/"
            className="inline-flex bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors">
            Découvrir nos services
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b">
              Détails de la commande
            </h2>
            <ul className="divide-y">
              {items.map((item: CartItem, index: number) => (
                <li key={`${item.label}-${index}`} className="py-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.label}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.unit_price.toLocaleString()} Ar / unité
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.label)}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Supprimer cet article">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decreaseQuantity(item.label)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Diminuer la quantité">
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="font-medium text-lg min-w-[2rem] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.label)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Augmenter la quantité">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg text-orange-600">
                        {(item.quantity * item.unit_price).toLocaleString()} Ar
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
            <h2 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b">
              Récapitulatif
            </h2>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span>{totalAmount.toLocaleString()} Ar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>0 Ar</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-600">
                  {totalAmount.toLocaleString()} Ar
                </span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={items.length === 0 || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center space-x-2"
              aria-label="Procéder au paiement">
              {isProcessing ? (
                <>
                  <ButtonLoader />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <span>Procéder au paiement</span>
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
