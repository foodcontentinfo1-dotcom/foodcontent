import { useEffect, useState } from 'react';
import { RELOJ } from '../data/contenido';

const p = (n: number) => String(n).padStart(2, '0');

function restante() {
  const t = Math.floor(Date.now() / 1000);
  const { periodoSegundos: P, anclaUTC } = RELOJ;
  return P - ((((t - anclaUTC) % P) + P) % P);
}

/** Devuelve el tiempo que falta para el próximo cierre de cupos, actualizado cada segundo. */
export function useReloj() {
  const [s, setS] = useState(restante);
  useEffect(() => {
    const id = setInterval(() => setS(restante()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), seg = s % 60;
  return { largo: `${p(d)}d ${p(h)}h ${p(m)}m ${p(seg)}s`, corto: `${p(d)}d ${p(h)}h ${p(m)}m` };
}
