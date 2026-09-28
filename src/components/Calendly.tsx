import { useEffect } from 'react';
import { CALENDLY_URL } from '../data/contenido';
import { leerVariante } from '../hooks/useVariante';
import { evento } from '../lib/pixel';
import { track } from '@vercel/analytics';

/** Widget embebido de Calendly. Nombre y correo los pide Calendly; no hay formulario propio.
 *  Cuando Calendly avisa "cita agendada": disparamos Lead y CitaAgendada en el navegador, guardamos sus ids
 *  y mandamos a /gracias, donde se completa la copia por servidor (con el correo, si Calendly lo pasa).
 *  Abrir /gracias directo no cuenta como cita. */
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
        // Navegador ahora; la copia por servidor la manda /gracias con el correo que Calendly pasa en la redirección.
        const lead = evento('Lead', { content_name: 'diagnostico', vsl }, { soloNavegador: true });
        const cita = evento('CitaAgendada', { vsl }, { soloNavegador: true });
        track('Lead', { vsl });
        try { sessionStorage.setItem('fc_cita', JSON.stringify({ t: Date.now(), lead, cita })); } catch { /* sin storage */ }
        // Un respiro para que el píxel y el servidor alcancen a mandar el evento antes de cambiar de página.
        setTimeout(() => window.location.assign(`/gracias?v=${vsl}`), 400);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  return <div className="calendly-inline-widget" data-url={CALENDLY_URL} data-testid="calendly" />;
}
