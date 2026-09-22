import { useEffect } from 'react';
import { CALENDLY_URL } from '../data/contenido';
import { leerVariante } from '../hooks/useVariante';

/** Widget embebido de Calendly. Nombre y correo los pide Calendly; no hay formulario propio.
 *  Cuando Calendly avisa que la cita quedó agendada, mandamos a la persona a /gracias.
 *  El evento "Lead" del píxel se dispara al cargar /gracias (más confiable que hacerlo aquí). */
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
        window.location.assign(`/gracias?v=${leerVariante()}`);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  return <div className="calendly-inline-widget" data-url={CALENDLY_URL} data-testid="calendly" />;
}
