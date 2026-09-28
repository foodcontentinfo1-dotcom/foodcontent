import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video } from './Video';
import { WhatsApp } from './Iconos';
import { Titulo, EASE, aparece, cascada, enVista } from './Secciones';
import { GRACIAS_VIDEO_ID, REGLAS, WHATSAPP_CONFIRMAR_URL } from '../data/contenido';
import { leerVariante } from '../hooks/useVariante';
import { evento } from '../lib/pixel';
import { track } from '@vercel/analytics';

/* ---------- Barra de /gracias: solo el logo; la acción vive en el hero ---------- */
export function BarraGracias() {
  return (
    <header className="barra">
      <div className="wrap">
        <a href="/" aria-label="Food Content, inicio"><img src="/img/logo.png" alt="Food Content" /></a>
      </div>
    </header>
  );
}

/* ---------- Hero: la cita ya existe; lo único que falta es confirmarla ---------- */
export function HeroGracias() {
  const reducido = useReducedMotion();
  const vsl = leerVariante();
  // Al llegar aquí ya hubo cita (por nuestra marca o por la redirección de Calendly).
  // Calendly puede pasar nombre y correo en la URL: los usamos para la copia por servidor y los borramos de la barra.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const persona = { em: q.get('invitee_email') ?? undefined, fn: q.get('invitee_first_name') ?? q.get('invitee_full_name')?.split(' ')[0], ln: q.get('invitee_last_name') ?? undefined };
      const desdeCalendly = q.has('invitee_uuid') || q.has('invitee_email');
      const marca = sessionStorage.getItem('fc_cita');
      if (sessionStorage.getItem('fc_lead')) return;
      if (marca) {
        // Vino de nuestra landing: completamos por servidor con los MISMOS ids (Meta los junta con los del navegador).
        const ids = JSON.parse(marca) as { lead?: string; cita?: string };
        evento('Lead', { content_name: 'diagnostico', vsl }, { eventId: ids.lead, soloServidor: true, persona });
        evento('CitaAgendada', { vsl }, { eventId: ids.cita, soloServidor: true, persona });
        sessionStorage.setItem('fc_lead', '1');
      } else if (desdeCalendly) {
        // Llegó por la redirección de Calendly sin pasar por nuestro aviso: disparamos completo.
        evento('Lead', { content_name: 'diagnostico', vsl }, { persona });
        evento('CitaAgendada', { vsl }, { persona });
        track('Lead', { vsl });
        sessionStorage.setItem('fc_lead', '1');
      }
      // Limpiar los datos personales de la barra de direcciones (se conserva ?v=).
      if ([...q.keys()].some((k) => k.startsWith('invitee_') || k.startsWith('answer_') || k === 'assigned_to' || k === 'event_type_uuid' || k === 'event_type_name' || k === 'event_start_time' || k === 'event_end_time' || k === 'utm_source' || k === 'utm_medium')) {
        const v = q.get('v');
        window.history.replaceState(null, '', v ? `/gracias?v=${v}` : '/gracias');
      }
    } catch { /* sin storage */ }
  }, [vsl]);
  return (
    <section className="hero gracias" id="inicio">
      <motion.div className="wrap" variants={cascada(0.14)} initial={reducido ? false : 'hidden'} animate="show">
        <motion.h1 variants={aparece}><em>Felicidades</em>, estás a un paso de confirmar tu llamada.</motion.h1>
        <motion.p className="garantia" variants={aparece}>Ve este video antes de tu llamada</motion.p>
        <motion.div variants={aparece}>
          <Video id={GRACIAS_VIDEO_ID} portada="/img/gracias.jpg" etiqueta="Reproducir video: qué necesitas para tu llamada" pie="Dura poco. Evita que se cancele tu cita." prioridad />
        </motion.div>
        <motion.div className="cta" variants={aparece}>
          <a href={WHATSAPP_CONFIRMAR_URL} target="_blank" rel="noopener" className="btn lg" data-testid="confirmar" onClick={() => evento('Contact', { vsl })}>
            <WhatsApp /> Confirmar por WhatsApp
          </a>
          <span className="micro">Se abre WhatsApp con el mensaje listo. Solo envíalo.</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Las reglas: una lista que se va palomeando al leerla ---------- */
export function Reglas() {
  const reducido = useReducedMotion();
  const fila = { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } } };
  return (
    <section>
      <div className="wrap">
        <div className="cabecera">
          <Titulo className="h-grande" style={{ maxWidth: 760 }}>Lo que necesitas saber para la <span className="naranja">llamada</span></Titulo>
          <p>Cuatro cosas. Las mismas que dice Carlos en el video.</p>
        </div>
        <motion.ol className="reglas" variants={cascada(0.35)} initial={reducido ? false : 'hidden'} whileInView="show" viewport={enVista}>
          {REGLAS.map((r) => (
            <motion.li key={r.titulo} variants={fila}>
              <span className="palomita" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path d="M4 12.5l5 5L20 6.5" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.4, delay: 0.25, ease: EASE } } }} />
                </svg>
              </span>
              <div>
                <b>{r.titulo}</b>
                <p>{r.detalle}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
