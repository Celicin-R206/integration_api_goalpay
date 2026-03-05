"use client";

import { useCartStore } from "@/libs/store";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import ButtonLoader from "@/components/button-loader";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BACKEND ?? "";

export default function CartSummary() {
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );

  const handlePay = async () => {
    if (items.length === 0) {
      toast.warning("Votre panier est vide.");
      return;
    }
    if (totalAmount < 100) {
      toast.error("Le montant minimum est de 100 Ar.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment`,
        { items },
        { timeout: 15000, headers: { "Content-Type": "application/json" } },
      );

      const data = response.data;
      if (data.success && data.checkout_url) {
        toast.success("Redirection vers GoalPay...");
        clearCart();
        window.location.href = data.checkout_url;
      } else {
        throw new Error(
          data.error || data.detail || "Lien de paiement non reçu",
        );
      }
    } catch (error) {
      console.error("Erreur paiement :", error);
      let message = "Une erreur est survenue lors du lancement du paiement.";
      if (error instanceof AxiosError) {
        message =
          error.response?.data?.error ||
          error.response?.data?.detail ||
          error.message ||
          message;
      }
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden h-fit sticky top-6 border border-[#ddd]">
      <div className="px-6 py-4 bg-[#111]">
        <span
          className="text-white font-black text-base"
          style={{ fontFamily: "'Georgia', serif" }}>
          Récapitulatif
        </span>
      </div>

      <div className="p-6">
        <div className="space-y-3 pb-5 border-b border-[#F0EDE9]">
          <div className="flex justify-between text-sm text-[#888]">
            <span>Sous-total</span>
            <span className="font-semibold text-[#555]">
              {totalAmount.toLocaleString("fr-MG")} Ar
            </span>
          </div>
          <div className="flex justify-between text-sm text-[#888]">
            <span>Frais / Taxes</span>
            <span className="font-semibold text-[#00B341]">Offerts</span>
          </div>
        </div>

        <div className="flex justify-between items-baseline pt-4 mb-6">
          <span
            className="font-black text-[#111] text-base"
            style={{ fontFamily: "'Georgia', serif" }}>
            Total
          </span>
          <div className="text-right">
            <p className="font-black text-2xl text-[#111]">
              {totalAmount.toLocaleString("fr-MG")}
              <span className="text-sm font-semibold text-[#999] ml-1">Ar</span>
            </p>
          </div>
        </div>

        <div className="bg-[#F7F5F2] rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_goalpay_.png"
              width={500}
              height={500}
              className="w-5"
              alt="logo_goalpay"
            />
            <p className="text-xs font-black text-[#111] tracking-wide">
              GOALPAY
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-[#999]">Paiement sécurisé & rapide</p>
            <Shield className="h-4 w-4 text-[#00B341]" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={handlePay}
          disabled={isProcessing || items.length === 0}
          className={`
            w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide
            flex items-center justify-center gap-2 transition-all duration-200
            ${
              isProcessing || items.length === 0
                ? "bg-[#E0DDD9] text-[#999] cursor-not-allowed"
                : "bg-[#111] hover:bg-[#0070f8] text-white"
            }
          `}>
          {isProcessing ? (
            <>
              <ButtonLoader />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <span>Payer {totalAmount.toLocaleString("fr-MG")} Ar</span>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
