/**
 * API de conversiones de Meta.
 * La página manda cada evento aquí y este archivo, que corre en el servidor de Vercel,
 * se lo reenvía a Meta con el token secreto. El mismo event_id que usa el píxel del
 * navegador viaja aquí, así Meta sabe que son el mismo evento y no lo cuenta dos veces.
 *
 * Variables en Vercel (Settings → Environment Variables):
 *   META_CAPI_TOKEN  = el token de acceso del píxel (obligatorio)
 *   META_TEST_CODE   = código "TEST1234" de Probar eventos (solo mientras pruebas; después bórralo)
 */
import { createHash } from 'node:crypto';

const PIXEL_ID = '1439037874861693';

type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = { status: (n: number) => Res; json: (b: unknown) => void; setHeader: (k: string, v: string) => void };

const sha = (s: string) => createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST' });
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return res.status(200).json({ skipped: 'sin META_CAPI_TOKEN' });

  const b = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}) as Record<string, unknown>;
  const permitidos = new Set(['PageView', 'Lead', 'Contact']);
  if (typeof b.event_name !== 'string' || !permitidos.has(b.event_name)) return res.status(400).json({ error: 'evento' });

  const ipRaw = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(ipRaw) ? ipRaw[0] : ipRaw ?? '').split(',')[0].trim();
  const ua = String(req.headers['user-agent'] ?? '');

  const user_data: Record<string, unknown> = { client_ip_address: ip, client_user_agent: ua };
  if (typeof b.fbp === 'string') user_data.fbp = b.fbp;
  if (typeof b.fbc === 'string') user_data.fbc = b.fbc;
  if (typeof b.external_id === 'string') user_data.external_id = sha(b.external_id);

  const evento = {
    event_name: b.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: typeof b.event_id === 'string' ? b.event_id : undefined,
    event_source_url: typeof b.url === 'string' ? b.url : undefined,
    action_source: 'website',
    user_data,
    custom_data: typeof b.custom_data === 'object' && b.custom_data ? b.custom_data : undefined,
  };

  const cuerpo: Record<string, unknown> = { data: [evento] };
  if (process.env.META_TEST_CODE) cuerpo.test_event_code = process.env.META_TEST_CODE;

  const r = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });
  const salida = await r.json().catch(() => ({}));
  return res.status(r.ok ? 200 : 502).json(r.ok ? { ok: true } : { error: salida });
}
