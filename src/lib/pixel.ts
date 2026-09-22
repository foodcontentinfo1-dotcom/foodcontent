/**
 * Píxel de Meta + API de conversiones.
 * Cada evento sale por dos caminos con el MISMO event_id (Meta los junta en uno):
 *  1. El píxel del navegador (fbq).
 *  2. Nuestro servidor (/api/meta), que se lo manda a Meta con el token secreto.
 *     Este camino es el que sobrevive a los bloqueos de iPhone/Safari.
 * Eventos: PageView (cada página), Lead (llegar a /gracias), Contact (botón de WhatsApp).
 * Todos llevan "vsl" (a, b o c): qué video vio la persona.
 */
import { PIXEL_ID } from '../data/contenido';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown }
}

const galleta = (n: string) => document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'))?.[1];
const id = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Copia del evento para el servidor. Si falla, no pasa nada: el píxel ya lo mandó. */
function alServidor(event_name: string, event_id: string, custom_data: Record<string, string>) {
  try {
    const cuerpo = JSON.stringify({ event_name, event_id, url: window.location.href, custom_data, fbp: galleta('_fbp'), fbc: galleta('_fbc') });
    fetch('/api/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true }).catch(() => undefined);
  } catch { /* sin red */ }
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
  const eid = id();
  window.fbq!('track', 'PageView', {}, { eventID: eid });
  // El servidor lo manda un poco después, para que la cookie _fbp ya exista.
  setTimeout(() => alServidor('PageView', eid, {}), 1200);
}

export function evento(nombre: 'Lead' | 'Contact', datos: Record<string, string> = {}) {
  if (!PIXEL_ID) return;
  const eid = id();
  window.fbq?.('track', nombre, datos, { eventID: eid });
  alServidor(nombre, eid, datos);
}
