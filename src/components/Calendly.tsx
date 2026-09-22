import { useEffect } from 'react';
import { CALENDLY_URL } from '../data/contenido';

/** Widget embebido de Calendly. Nombre y correo los pide Calendly; no hay formulario propio. */
export function Calendly() {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return <div className="calendly-inline-widget" data-url={CALENDLY_URL} data-testid="calendly" />;
}
