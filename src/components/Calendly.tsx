import { useEffect } from 'react';
import { CALENDLY_URL } from '../data/contenido';
import { leerVariante } from '../hooks/useVariante';
import { evento } from '../lib/pixel';
import { track } from '@vercel/analytics';

/** Widget embebido de Calendly. Nombre y correo los pide Calendly; no hay formulario propio.
 *  Cuando Calendly avisa "cita agendada": disparamos Lead AQUÍ (es el único momento en que sabemos
 *  que hubo cita), dejamos una marca de un solo uso y mandamos a la persona a /gracias.
 *  Abrir /gracias directo ya no cuenta como Lead. */
export function Calendly() {
  useEffect(() => {
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && e.origin.endsWith('calendly.com') && e.data?.event === 'calendly.event_scheduled') {
        const vsl = leerVariante();
        evento('Lead', { content_name: 'diagnostico', vsl });
        evento('CitaAgendada', { vsl });
        track('Lead', { vsl });
        try { sessionStorage.setItem('fc_cita', String(Date.now())); } catch { /* sin storage */ }
        // Un respiro para que el píxel y el servidor alcancen a mandar el evento antes de cambiar de página.
        setTimeout(() => window.location.assign(`/gracias?v=${vsl}`), 400);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  return <div className="calendly-inline-widget" data-url={CALENDLY_URL} data-testid="calendly" />;
}
