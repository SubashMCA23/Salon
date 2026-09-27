import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateWhatsAppLink(data: {
  name: string;
  service: string;
  date: string;
  time: string;
  phone?: string;
  bookingRef?: string;
}): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919786149477';
  const text = `Hello Luxe Salon! ✨\nI would like to book an appointment:\n\n*Name:* ${data.name}\n*Service:* ${data.service}\n*Date:* ${data.date}\n*Time:* ${data.time}\n${data.phone ? `*Phone:* ${data.phone}\n` : ''}${data.bookingRef ? `*Booking ID:* #${data.bookingRef}\n` : ''}\nPlease confirm my appointment slot. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function truncate(str: string, length = 100): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + '...';
}
