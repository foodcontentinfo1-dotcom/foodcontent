import { useRef, useState } from 'react';
import type React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Flecha, Play, WhatsApp } from './Iconos';
import { Video } from './Video';
import { Calendly } from './Calendly';
import { useReloj } from '../hooks/useReloj';
import {
  CHATS, COMANDA, EQUIPO, FOTOS, MARCAS, NO_PARA_TI, PARA_TI, REELS, RESTAURANTES, REVISAMOS,
  TESTIMONIOS_VIDEO, VSL_ID, WHATSAPP_URL,
} from '../data/contenido';

/* ---------- Movimiento: un solo vocabulario para toda la página ----------
 * Regla de la casa: el movimiento explica, no decora. Cada animación imita algo real:
 *  1. Hero: se revela en orden de lectura y la línea naranja se subraya al final, como con marcador.
 *  2. Títulos grandes: suben desde detrás de una línea, como un rótulo que se destapa.
 *  3. Listas: entran renglón por renglón.
 *  4. Comanda: se imprime línea por línea como un ticket de cocina.
 *  5. Logos y reels: llegan en cascada rápida, como fotos que se ponen sobre la mesa.
 *  6. Chats: los mensajes aparecen uno tras otro, como llegan en WhatsApp.
 *  7. Garantía: el bloque naranja se estampa como un sello.
 * Todo ocurre una sola vez, al entrar en la vista. prefers-reduced-motion apaga todo.
 */
const EASE = [0.2, 0.8, 0.2, 1] as const;
const aparece = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const cascada = (gap = 0.12) => ({ hidden: {}, show: { transition: { staggerChildren: gap } } });
const enVista = { once: true, amount: 0.35 } as const;

/** Título grande que sube desde detrás de una línea invisible, como un rótulo que se destapa.
 *  El observador va en el h2 (visible siempre); el span, escondido bajo la máscara, solo obedece. */
function Titulo({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const reducido = useReducedMotion();
  return (
    <motion.h2 className={className} style={style} initial={reducido ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.5 }}>
      <span className="mascara">
        <motion.span variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease: EASE } } }}>
          {children}
        </motion.span>
      </span>
    </motion.h2>
  );
}

/** Lista cuyas líneas entran una tras otra al llegar a la vista. */
function Lista({ items }: { items: string[] }) {
  const reducido = useReducedMotion();
  return (
    <motion.ul variants={cascada(0.09)} initial={reducido ? false : 'hidden'} whileInView="show" viewport={enVista}>
      {items.map((t) => <motion.li key={t} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }}>{t}</motion.li>)}
    </motion.ul>
  );
}

/* ---------- Barra ---------- */
export function Barra() {
  const reloj = useReloj();
  return (
    <>
      <header className="barra">
        <div className="wrap">
          <a href="#inicio" aria-label="Food Content, inicio"><img src="/img/logo.png" alt="Food Content" /></a>
          <div className="reloj"><span>Cerramos cupos en</span><b data-testid="reloj">{reloj.largo}</b></div>
          <a href="#agenda" className="btn sm">Agendar diagnóstico gratis</a>
        </div>
      </header>
      <div className="barra-movil"><span>Cerramos cupos en</span><b>{reloj.largo}</b></div>
    </>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const reducido = useReducedMotion();
  return (
    <section className="hero" id="inicio">
      <motion.div className="wrap" variants={cascada(0.14)} initial={reducido ? false : 'hidden'} animate="show">
        <motion.h1 variants={aparece}>Aumenta <em>30% la facturación</em> de tu restaurante.</motion.h1>
        <motion.p className="garantia" variants={aparece}>En <span style={{ position: 'relative', display: 'inline-block' }}>6 meses<motion.i aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.14em', height: '0.12em', background: 'var(--naranja)', transformOrigin: 'left' }} initial={reducido ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.5, ease: EASE }} /></span> garantizado</motion.p>
        <motion.div variants={aparece}>
          <Video id={VSL_ID} portada="/img/vsl.jpg" etiqueta="Reproducir video: cómo lo hacemos" pie="Mira cómo lo hacemos, en palabras de Carlos" prioridad />
        </motion.div>
        <motion.div className="cta" variants={aparece}>
          <a href="#agenda" className="btn lg">Agendar diagnóstico gratis</a>
          <span className="micro">Diagnóstico gratis de 30 minutos con Carlos Gaspar. Sin compromiso.</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Para quién ---------- */
export function ParaQuien() {
  return (
    <section>
      <div className="wrap quien">
        <div>
          <h2>Es para ti si</h2>
          <Lista items={PARA_TI} />
        </div>
        <div className="no">
          <h2>No es para ti si</h2>
          <Lista items={NO_PARA_TI} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Lo que incluye: comanda + carrusel de fotos ---------- */
export function LoQueIncluye() {
  const reducido = useReducedMotion();
  const porPagina = 2;
  const [inicio, setInicio] = useState(0);
  const n = FOTOS.length;
  const visibles = Array.from({ length: porPagina }, (_, i) => FOTOS[(inicio + i) % n]);

  const linea = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } } };

  return (
    <section>
      <div className="wrap">
        <Titulo className="h-grande" style={{ marginBottom: 24 }}>Lo que incluye</Titulo>
        <div className="incluye">
          <motion.div
            className="comanda"
            variants={cascada(0.1)}
            initial={reducido ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="cab"><span>Comanda</span><span>Mesa: tu restaurante</span><span>6 meses</span></div>
            {COMANDA.map((c) => (
              <motion.div className="fila" key={c.titulo} variants={linea}>
                <div><b>{c.titulo}</b><small>{c.detalle}</small></div>
                <span>incluido</span>
              </motion.div>
            ))}
            <motion.div className="total" variants={linea}>
              <span style={{ color: 'var(--hueso)' }}>Resultado</span><span>+30% facturación</span>
            </motion.div>
          </motion.div>

          <div>
            <div className="fotos-track" data-testid="fotos">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibles.map((f) => (
                  <motion.img
                    key={f.src}
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    initial={reducido ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducido ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </AnimatePresence>
            </div>
            <div className="pie-carrusel">
              <span>Fotografía de producto. <span data-testid="fotos-pos">{inicio + 1}</span> de {n}</span>
              <div className="flechas">
                <button type="button" aria-label="Fotos anteriores" onClick={() => setInicio((i) => (i - porPagina + n) % n)}><Flecha dir="l" /></button>
                <button type="button" aria-label="Fotos siguientes" onClick={() => setInicio((i) => (i + porPagina) % n)}><Flecha dir="r" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Clientes ---------- */
export function Clientes() {
  const reducido = useReducedMotion();
  const celda = { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } } };
  return (
    <section className="clientes">
      <div className="wrap">
        <h2 className="h-media" style={{ marginBottom: 24 }}>Restaurantes que ya trabajaron con nosotros</h2>
        <motion.div className="logos" variants={cascada(0.04)} initial={reducido ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {RESTAURANTES.map((l) => <motion.div key={l.src} variants={celda}><img src={l.src} alt={l.alt} loading="lazy" /></motion.div>)}
          <motion.div variants={celda}><span className="tu">Tu restaurante aquí</span></motion.div>
        </motion.div>
        <p className="sub">Y marcas que confían en nuestra producción</p>
        <div className="marcas">
          {MARCAS.map((l) => <div key={l.src}><img src={l.src} alt={l.alt} loading="lazy" /></div>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reels: carrusel + ventana vertical ---------- */
export function Reels() {
  const reducido = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(1);
  const [abierto, setAbierto] = useState<string | null>(null);
  const origen = useRef<HTMLButtonElement | null>(null);

  const paso = () => {
    const t = track.current; if (!t) return 0;
    const primero = t.querySelector<HTMLElement>('.reel');
    return (primero?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(t).gap || '8');
  };
  const mover = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * paso(), behavior: reducido ? 'auto' : 'smooth' });
  const onScroll = () => {
    const t = track.current; if (!t) return;
    setPos(Math.min(Math.max(Math.round(t.scrollLeft / paso()) + 1, 1), REELS.length));
  };
  const cerrar = () => { setAbierto(null); origen.current?.focus(); };

  return (
    <section>
      <div className="wrap">
        <div className="cabecera">
          <Titulo className="h-grande" style={{ maxWidth: 860 }}>Así se ve el feed de nuestros clientes</Titulo>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p>Todo grabado en cocinas y salones reales. Nada de banco de imágenes.</p>
            <div className="flechas">
              <button type="button" aria-label="Video anterior" onClick={() => mover(-1)}><Flecha dir="l" /></button>
              <button type="button" aria-label="Video siguiente" onClick={() => mover(1)}><Flecha dir="r" /></button>
            </div>
          </div>
        </div>
        <motion.div className="reels-track" ref={track} onScroll={onScroll} data-testid="reels" variants={cascada(0.07)} initial={reducido ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {REELS.map((r) => (
            <motion.button
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
              key={r.id}
              type="button"
              className="reel"
              onClick={(e) => { origen.current = e.currentTarget; setAbierto(r.id); }}
              aria-label={`Ver reel de ${r.nombre}`}
            >
              <img src={r.src} alt="" loading="lazy" />
              <span className="tag"><i><Play w={9} h={11} /></i><b>{r.nombre}</b></span>
            </motion.button>
          ))}
        </motion.div>
        <div className="pie-carrusel"><span><span data-testid="reels-pos">{pos}</span> de {REELS.length} videos</span></div>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="modal on"
            role="dialog"
            aria-modal="true"
            aria-label="Reel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) cerrar(); }}
            onKeyDown={(e) => { if (e.key === 'Escape') cerrar(); }}
          >
            <motion.div className="caja" initial={reducido ? false : { scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={reducido ? undefined : { scale: 0.96, y: 12 }} transition={{ duration: 0.25, ease: EASE }}>
              <button type="button" className="cerrar" aria-label="Cerrar video" autoFocus onClick={cerrar}>×</button>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${abierto}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Reel" allow="autoplay; encrypted-media" allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Testimonios ---------- */
export function Testimonios() {
  const reducido = useReducedMotion();
  const { rtg, soul } = TESTIMONIOS_VIDEO;
  const burbuja = { hidden: { opacity: 0, y: 8, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } } };
  return (
    <section>
      <div className="wrap">
        <div className="cabecera">
          <Titulo className="h-grande" style={{ maxWidth: 760 }}>Lo que dicen nuestros clientes</Titulo>
          <p>Dos en video y tres tal como llegaron al WhatsApp de Carlos.</p>
        </div>
        <div className="testi-videos">
          <Video id={rtg.id} portada={rtg.src} etiqueta={`Reproducir testimonio de ${rtg.nombre}`} pie={<><b>{rtg.nombre}</b><small>Testimonio en video</small></>} />
          <Video id={soul.id} portada={soul.src} etiqueta={`Reproducir testimonio de ${soul.nombre}`} pie={<><b>{soul.nombre}</b><small>Testimonio en video</small></>} vertical />
        </div>
        <div className="chats">
          {CHATS.map((c) => (
            <motion.div className="chat" key={c.negocio} variants={cascada(0.22)} initial={reducido ? false : 'hidden'} whileInView="show" viewport={enVista}>
              <div className="cab"><b>{c.negocio}</b><small>{c.quien}</small></div>
              {c.dato && (
                <motion.div className="dato" variants={burbuja} style={{ transformOrigin: 'left bottom' }} aria-label={`${c.dato.cifra} ${c.dato.etiqueta}, ${c.dato.cifra2} ${c.dato.etiqueta2}`}>
                  <div><b>{c.dato.cifra}</b><small>{c.dato.etiqueta}</small></div>
                  <div><b>{c.dato.cifra2}</b><small>{c.dato.etiqueta2}</small></div>
                </motion.div>
              )}
              {c.mensajes.map((m) => <motion.p key={m} variants={burbuja} style={{ transformOrigin: 'left bottom' }}>{m}</motion.p>)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Quién va a estar en la llamada ---------- */
export function Carlos() {
  return (
    <section>
      <div className="wrap carlos">
        <div className="foto">
          <img src="/img/carlos.jpg" alt="Carlos Gaspar de Alba" loading="lazy" />
          <div className="ficha">
            <b>Carlos Gaspar de Alba</b>
            <span>CEO</span>
            <div><span>Dirección creativa</span><i /><span>Producción audiovisual</span><i /><span>Marketing</span></div>
          </div>
        </div>
        <div className="texto">
          <Titulo>Quién va a estar en la llamada</Titulo>
          <p>Yo tomo la llamada, no un vendedor. No es una venta disfrazada: es un diagnóstico de dónde está tu restaurante hoy y qué lo está frenando para crecer.</p>
          <div className="revisamos">
            <small>En 30 minutos revisamos</small>
            <ul>{REVISAMOS.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="equipo">
            <small>El equipo que produce tu contenido</small>
            <div className="grid">
              {EQUIPO.map((p) => (
                <div key={p.nombre}><img src={p.src} alt={p.nombre} loading="lazy" /><span><b>{p.nombre}</b><br />{p.rol}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Garantía ---------- */
export function Garantia() {
  const reducido = useReducedMotion();
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <motion.div
          className="garantia-bloque"
          initial={reducido ? false : { opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={enVista}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2>La garantía</h2>
          <p>Si en <b>6 meses</b> no subimos tu <b>facturación 30%</b>, seguimos trabajando <b>gratis</b> hasta lograrlo.</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Agenda ---------- */
export function Agenda() {
  const reloj = useReloj();
  return (
    <section id="agenda" className="agenda">
      <div className="wrap">
        <Titulo className="h-grande">Agenda tu diagnóstico <span className="naranja">gratis</span></Titulo>
        <p className="intro">
          30 minutos por videollamada. Normalmente este diagnóstico cuesta <b>$3,300 MXN</b>; hasta cerrar cupos, la consultoría con Carlos Gaspar es gratis. Cerramos cupos en <b>{reloj.corto}</b>.
        </p>
        <Calendly />
      </div>
    </section>
  );
}

/* ---------- Footer y WhatsApp ---------- */
export function Pie() {
  return (
    <>
      <footer>
        <div className="wrap">
          <img src="/img/logo.png" alt="Food Content" />
          <nav>
            <span>Ciudad de México</span>
            <a href="https://instagram.com/carlos.gaspar_video" target="_blank" rel="noopener">@carlos.gaspar_video</a>
            <a href="mailto:gaspardealba.carlos@gmail.com">gaspardealba.carlos@gmail.com</a>
          </nav>
        </div>
      </footer>
      <a className="wa" href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="Escribir a Carlos por WhatsApp">
        <WhatsApp /><span>Contáctanos</span>
      </a>
    </>
  );
}
