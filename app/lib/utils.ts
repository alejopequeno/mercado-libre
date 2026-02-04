import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatear precio con moneda
export function formatPrice(amount: number, currency: string): string {
  if (currency === 'ARS') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const currencySymbols: Record<string, string> = {
    USD: '$',
    ARS: '$',
    BRL: 'R$',
    MXN: '$',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol} ${amount.toLocaleString('es-AR')}`;
}
