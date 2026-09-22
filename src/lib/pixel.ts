/**
 * Píxel de Meta. Se carga solo si hay PIXEL_ID en contenido.ts.
 * Eventos que mandamos:
 *  - PageView: automático en cada página.
 *  - Lead: cuando la persona llega a /gracias (ya agendó).
 *  - Contact: cuando toca "Confirmar por WhatsApp".
 * Cada evento lleva "vsl" (a, b o c) para saber qué video vio la persona.
 */
import { PIXEL_ID } from '../data/contenido';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown }
}

export function iniciarPixel() {
  if (!PIXEL_ID || window.fbq) return;
  const f = window as Window & { fbq?: any };
  const n: any = (f.fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); });
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  window.fbq!('init', PIXEL_ID);
  window.fbq!('track', 'PageView');
}

export function evento(nombre: 'Lead' | 'Contact', datos: Record<string, string> = {}) {
  window.fbq?.('track', nombre, datos);
}
