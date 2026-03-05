import useSWR from "swr";

const API_BASE = process.env.NEXT_PUBLIC_API_URL_BACKEND || "";

const fetcher = async (url: string) => {
  const res = await fetch(url, {});

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Erreur ${res.status}`);
  }

  return res.json();
};

export const useAllOrders = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/orders`,
    fetcher,
    {
      revalidateOnFocus: false, // optionnel : évite re-fetch trop fréquent
      revalidateOnReconnect: false,
      refreshInterval: 0, // pas de polling automatique (ou 30000 pour 30s)
    },
  );

  return {
    orders: data?.orders,
    isLoading,
    isError: !!error,
    error: error?.message || null,
    mutate,
  };
};
