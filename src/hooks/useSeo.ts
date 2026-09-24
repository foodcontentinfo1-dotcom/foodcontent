import { useEffect } from 'react';
import { SITE_URL } from '../data/contenido';

/** Ajusta título, descripción y canónica según la página. /gracias no se indexa. */
export function useSeo(o: { titulo: string; descripcion: string; ruta: string; indexar: boolean }) {
  useEffect(() => {
    document.title = o.titulo;
    const meta = (sel: string, attr: string, val: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) { el = document.createElement('meta'); const [k, v] = sel.replace(/^meta\[|\]$/g, '').replace(/"/g, '').split('='); el.setAttribute(k, v); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    meta('meta[name="description"]', 'content', o.descripcion);
    meta('meta[property="og:title"]', 'content', o.titulo);
    meta('meta[property="og:description"]', 'content', o.descripcion);
    meta('meta[property="og:url"]', 'content', SITE_URL + o.ruta);
    meta('meta[name="robots"]', 'content', o.indexar ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = SITE_URL + o.ruta;
  }, [o.titulo, o.descripcion, o.ruta, o.indexar]);
}
