import { VSL_VARIANTES, type Variante } from '../data/contenido';

/**
 * Qué video del hero mostrar. Se elige con ?v=a, ?v=b o ?v=c en la URL
 * (cada anuncio de Meta apunta a una) y se recuerda en la pestaña para que
 * /gracias sepa qué video vio la persona.
 */
export function leerVariante(): Variante {
  const v = new URLSearchParams(window.location.search).get('v');
  if (v && v in VSL_VARIANTES) {
    try { sessionStorage.setItem('fc_vsl', v); } catch { /* sin storage */ }
    return v as Variante;
  }
  try {
    const g = sessionStorage.getItem('fc_vsl');
    if (g && g in VSL_VARIANTES) return g as Variante;
  } catch { /* sin storage */ }
  return 'a';
}
