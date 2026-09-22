import { useState, type ReactNode } from 'react';
import { Play } from './Iconos';

type Props = { id: string; portada: string; etiqueta: string; pie?: ReactNode; vertical?: boolean; prioridad?: boolean };

/** Portada estática; YouTube se carga solo al dar clic (la página pesa menos). */
export function Video({ id, portada, etiqueta, pie, vertical, prioridad }: Props) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" className={`video${vertical ? ' vert' : ''}${on ? ' on' : ''}`} aria-label={etiqueta} onClick={() => setOn(true)}>
      <img src={portada} alt="" loading={prioridad ? 'eager' : 'lazy'} fetchPriority={prioridad ? 'high' : undefined} />
      <span className="play"><Play /></span>
      {pie && <span className="pie">{pie}</span>}
      {on && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={etiqueta}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </button>
  );
}
