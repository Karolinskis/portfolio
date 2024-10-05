import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearArray(startDate: number | undefined): number[] {
  if (!startDate) return [];

  const currentYear = new Date().getFullYear();
  const duration = currentYear - startDate + 1;
  const years = Array.from({ length: duration }, (_, i) => startDate + i);
  return years;
}
