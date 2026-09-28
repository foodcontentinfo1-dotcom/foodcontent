/**
 * Píxel de Meta + API de conversiones.
 * Cada evento sale por dos caminos con el MISMO event_id (Meta los junta en uno):
 *  1. El píxel del navegador (fbq).
 *  2. Nuestro servidor (/api/meta), que se lo manda a Meta con el token secreto.
 * Claves para que Meta empareje bien los dos caminos: event_id, fbp, fbc y external_id
 * (un identificador anónimo por navegador, que se manda hasheado).
 * Eventos: PageView (cada página), Lead (llegar a /gracias), Contact (botón de WhatsApp).
 * Todos llevan "vsl" (a, b o c) y "origen" (utm_source).
 */
import { PIXEL_ID } from '../data/contenido';
import { leerOrigen } from '../hooks/useVariante';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown }
}

const galleta = (n: string) => document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'))?.[1];
const id = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/** Identificador anónimo y estable por navegador (no es un dato personal). */
function externalId(): string {
  try {
    let v = localStorage.getItem('fc_uid');
    if (!v) { v = id(); localStorage.setItem('fc_uid', v); }
    return v;
  } catch { return 'sin-storage'; }
}

/** fbc: si Meta mandó ?fbclid= y la cookie aún no existe, la armamos nosotros (formato oficial). */
function fbc(): string | undefined {
  const c = galleta('_fbc');
  if (c) return c;
  const clid = new URLSearchParams(window.location.search).get('fbclid');
  if (!clid) return undefined;
  const v = `fb.1.${Date.now()}.${clid}`;
  try { document.cookie = `_fbc=${v}; max-age=${90 * 86400}; path=/; SameSite=Lax`; } catch { /* sin cookies */ }
  return v;
}

/** Copia del evento para el servidor. Reintenta una vez y, si la pestaña se cierra, usa sendBeacon. */
function alServidor(event_name: string, event_id: string, custom_data: Record<string, string>) {
  const cuerpo = JSON.stringify({ event_name, event_id, url: window.location.href, custom_data, fbp: galleta('_fbp'), fbc: fbc(), external_id: externalId() });
  const enviar = () => fetch('/api/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true });
  enviar().then((r) => { if (!r.ok) throw new Error(String(r.status)); }).catch(() => {
    setTimeout(() => { enviar().catch(() => { try { navigator.sendBeacon?.('/api/meta', new Blob([cuerpo], { type: 'application/json' })); } catch { /* nada */ } }); }, 1500);
  });
}

/** Visitar /?yo=1 una vez apaga el píxel en ese navegador (para que tus propias visitas no cuenten). /?yo=0 lo vuelve a encender. */
function soyInterno(): boolean {
  try {
    const q = new URLSearchParams(window.location.search).get('yo');
    if (q === '1') localStorage.setItem('fc_yo', '1');
    if (q === '0') localStorage.removeItem('fc_yo');
    return localStorage.getItem('fc_yo') === '1';
  } catch { return false; }
}

export function iniciarPixel() {
  if (!PIXEL_ID || window.fbq || soyInterno()) return;
  const f = window as Window & { fbq?: any };
  const n: any = (f.fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); });
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  // external_id también en el píxel: así el navegador y el servidor hablan del mismo visitante.
  window.fbq!('init', PIXEL_ID, { external_id: externalId() });
  const eid = id();
  window.fbq!('track', 'PageView', {}, { eventID: eid });
  setTimeout(() => alServidor('PageView', eid, { origen: leerOrigen() }), 800);
}

export function evento(nombre: 'Lead' | 'Contact', datos: Record<string, string> = {}) {
  if (!PIXEL_ID) return;
  const eid = id();
  const conOrigen = { ...datos, origen: leerOrigen() };
  window.fbq?.('track', nombre, conOrigen, { eventID: eid });
  alServidor(nombre, eid, conOrigen);
}
