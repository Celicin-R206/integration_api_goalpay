export function formatMoney(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export const formatNumber = (num: string) => {
  // Supprime tout sauf les chiffres
  const cleaned = num.replace(/\D/g, "");
  // Ajoute les espaces tous les 3 chiffres
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
