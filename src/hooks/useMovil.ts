import { useEffect, useState } from 'react';

/** true cuando la pantalla es más angosta que 900px (misma frontera que el CSS). */
export function useMovil() {
  const q = '(max-width: 899px)';
  const [movil, setMovil] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setMovil(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return movil;
}
