/**
 * Todo el contenido editable de la landing vive aquí.
 * Cambiar un texto, un video o un logo no requiere tocar componentes.
 */

export const CALENDLY_URL =
  'https://calendly.com/gaspardealba-carlos/food-content-meet?background_color=1a1614&text_color=f5ede3&primary_color=ff6a13&hide_gdpr_banner=1';

export const WHATSAPP_URL =
  'https://wa.me/525580386824?text=Hola%20Carlos%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratis';

/** ID del píxel de Meta (Administrador de eventos → tu píxel → el número de 15–16 dígitos). Vacío = no se carga. */
export const PIXEL_ID = '1439037874861693';

/**
 * Tres versiones del VSL: mismo video, distinto gancho. Cada anuncio de Meta apunta a
 * tudominio.com/?v=a, /?v=b o /?v=c. Cambia id (YouTube) y portada de b y c cuando los tengas.
 */
export type Variante = 'a' | 'b' | 'c';
export const VSL_VARIANTES: Record<Variante, { id: string; portada: string }> = {
  a: { id: '51NfZ-LGxc8', portada: '/img/vsl.jpg' },
  b: { id: 'QA9gbSsNmsc', portada: '/img/vsl_b.jpg' },
  c: { id: 'WAowJO8c-fQ', portada: '/img/vsl_c.jpg' },
};

/** Reloj de cupos: ciclo de 4 días que termina a las 3:00 a.m. de Ciudad de México. */
export const RELOJ = {
  periodoSegundos: 4 * 24 * 3600,
  anclaUTC: Date.UTC(2026, 8, 21, 9, 0, 0) / 1000, // 21 sep 2026, 03:00 CDMX (UTC-6)
};

export const PARA_TI = [
  'Tu restaurante lleva años abierto y tiene una marca que la gente ya reconoce.',
  'Tienes una o varias sucursales y quieres llenar mesas, no acumular likes.',
  'Estás listo para invertir en contenido y pauta durante seis meses seguidos.',
];

export const NO_PARA_TI = [
  'Abriste hace menos de un año y todavía estás ajustando la carta.',
  'Buscas un fotógrafo para un evento, no un equipo profesional.',
  'Quieres resultados de manera inmediata y sin invertir en publicidad.',
];

export const COMANDA = [
  { titulo: 'Dirección creativa', detalle: 'Estrategia mensual y calendario de contenido' },
  { titulo: 'Producción de video', detalle: 'Reels grabados en tu cocina y en tu salón' },
  { titulo: 'Fotografía de producto', detalle: 'Platillos, carta y campañas de temporada' },
  { titulo: 'Diseño gráfico', detalle: 'Redes, menú, flyers y lonas para tu local' },
  { titulo: 'Pauta en Meta', detalle: 'Anuncios que llevan gente a tu mesa, no a tu perfil' },
  { titulo: 'Manejo de redes', detalle: 'Publicación, respuesta a clientes y reporte mensual' },
];

export const FOTOS = [
  { src: '/img/ph01.jpg', alt: 'Producción de video en el salón de un restaurante' },
  { src: '/img/ph02.jpg', alt: 'Fotografía de postre con azúcar cayendo' },
  { src: '/img/ph03.jpg', alt: 'Fotografía de producto: hamburguesa, papas y bebida' },
  { src: '/img/ph04.jpg', alt: 'Servicio en mesa con talavera' },
  { src: '/img/ph05.jpg', alt: 'Pulpo a la brasa sobre plato negro' },
  { src: '/img/ph06.jpg', alt: 'Sushi roll con ajonjolí' },
  { src: '/img/ph07.jpg', alt: 'Pizza en caja' },
  { src: '/img/ph08.jpg', alt: 'Quesadillas con café' },
  { src: '/img/ph09.jpg', alt: 'Rebanada de pizza con queso estirado' },
  { src: '/img/ph10.jpg', alt: 'Cocinero preparando en molcajete' },
  { src: '/img/ph11.jpg', alt: 'Postre en vaso con fresas' },
  { src: '/img/ph12.jpg', alt: 'Cliente sonriendo con hamburguesa' },
];

export const RESTAURANTES = [
  { src: '/img/logo_presidente.png', alt: 'Grupo Presidente' },
  { src: '/img/logo_mortons.png', alt: "Morton's The Steakhouse" },
  { src: '/img/logo_oveja.png', alt: 'La Oveja Negra' },
  { src: '/img/logo_palm.png', alt: 'The Palm Restaurant' },
  { src: '/img/logo_donjose.png', alt: 'Don José' },
  { src: '/img/logo_barrio.png', alt: "Barrio Chick'en" },
  { src: '/img/logo_huarache.png', alt: 'El Huarache de Jamaica' },
  { src: '/img/logo_lula.png', alt: 'Doña Lulá' },
  { src: '/img/logo_sumo.png', alt: 'Sumo alitas y sushi' },
  { src: '/img/logo_caprivi.png', alt: 'Caprivi Grill' },
  { src: '/img/logo_sushiclub.png', alt: 'SushiClub' },
  { src: '/img/logo_central.png', alt: 'Central Central' },
  { src: '/img/logo_tommy.png', alt: 'Tommy Beans' },
  { src: '/img/logo_campestre.png', alt: 'Club Campestre Teotihuacán' },
  { src: '/img/logo_hanky.png', alt: 'Hanky Berri' },
];

export const MARCAS = [
  { src: '/img/logo_ubereats.png', alt: 'Uber Eats' },
  { src: '/img/logo_redbull.png', alt: 'Red Bull' },
  { src: '/img/logo_nestle.png', alt: 'Nestlé' },
  { src: '/img/logo_banamex.png', alt: 'Banamex' },
  { src: '/img/logo_corona.png', alt: 'Corona' },
  { src: '/img/logo_oxxo.png', alt: 'OXXO' },
  { src: '/img/logo_homespace.png', alt: 'Home Space' },
  { src: '/img/logo_amr.png', alt: 'Asociación Mexicana de Restaurantes' },
  { src: '/img/logo_novo.png', alt: 'Novo Nordisk' },
];

export const REELS = [
  { id: 'INEibVTxRLY', nombre: "Barrio Chick'en", src: '/img/reel_barrio1.jpg' },
  { id: 'sLZ-blhFOYY', nombre: "Morton's", src: '/img/reel_mortons1.jpg' },
  { id: 'D2E7Qd9xpao', nombre: 'Tommy Beans', src: '/img/reel_tommy1.jpg' },
  { id: 'VU4P9v47QZs', nombre: 'Rojo Bistrot', src: '/img/reel_rojo1.jpg' },
  { id: 't3LfyRpShgQ', nombre: 'Soul Roma', src: '/img/reel_soul.jpg' },
  { id: 'DLoK-99E5no', nombre: 'Sumo Buffet', src: '/img/reel_sumo.jpg' },
  { id: 'i58cxtDvXtA', nombre: 'Miju', src: '/img/reel_miju.jpg' },
  { id: 'T7jZVuJiV3U', nombre: 'Bellopuerto', src: '/img/reel_bello.jpg' },
  { id: 'GvmI02-6In8', nombre: "Barrio Chick'en", src: '/img/reel_barrio2.jpg' },
  { id: '-WwMRmn5K4c', nombre: "Morton's", src: '/img/reel_mortons2.jpg' },
  { id: 'hJ6golWsMi8', nombre: 'Tommy Beans', src: '/img/reel_tommy2.jpg' },
  { id: 'kHA5jJ39hKk', nombre: 'Rojo Bistrot', src: '/img/reel_rojo2.jpg' },
];

export const TESTIMONIOS_VIDEO = {
  rtg: { id: '6x2B-ZBh9zY', nombre: 'Rancho Tierra Generosa', src: '/img/testi_rtg.jpg' },
  soul: { id: 'dQt_a36jCuY', nombre: 'Soul', src: '/img/testi_soul.jpg' },
};

export type Chat = { negocio: string; quien: string; mensajes: string[]; dato?: { cifra: string; etiqueta: string; cifra2: string; etiqueta2: string } };

export const CHATS: Chat[] = [
  {
    negocio: "Chick'n Go",
    quien: 'Karla, socia, por WhatsApp',
    mensajes: [
      'No tienes idea de cómo crecieron las ventas con los videos y el menú nuevo.',
      'Justo queríamos ver si podemos hacer más contenido.',
      'Y en la pantalla se ve aún mejor. Los videos los proyectamos al frente del local.',
    ],
  },
  {
    negocio: 'Hanky Berri',
    quien: 'Liz, dueña, por WhatsApp',
    mensajes: ['Están súper padres los videos.', 'Te rifaste.', 'También quería programar la siguiente sesión.'],
  },
  {
    negocio: 'Bellopuerto',
    quien: 'Mari Fer, marketing, por WhatsApp',
    mensajes: ['Te mega rifaste.', 'Wow.', 'Los de Bellopuerto quedaron espectaculares, en serio.'],
  },
  {
    // Cambia "Yellow Brand" por el nombre del restaurante si es otro.
    negocio: 'Yellow Brand',
    quien: 'Armando, marketing, por WhatsApp',
    dato: { cifra: '1M', etiqueta: 'visualizaciones en TikTok', cifra2: '65.94%', etiqueta2: 'vio el video completo' },
    mensajes: ['Mi primer millón jajajaja'],
  },
];

export const REVISAMOS = [
  'Tu contenido y tus redes: qué comunica hoy tu marca.',
  'Tu pauta: cuánto te cuesta cada cliente que entra.',
  'Tu operación: carta, ticket promedio y horarios flojos.',
  'Un plan de 30 días para escalar, con o sin nosotros.',
];

export const EQUIPO = [
  { src: '/img/team0.jpg', nombre: 'Chris', rol: 'Food styling' },
  { src: '/img/team1.jpg', nombre: 'Alejandra', rol: 'Diseño y redes' },
  { src: '/img/team2.jpg', nombre: 'Rafael', rol: 'Coordinación' },
  { src: '/img/team3.jpg', nombre: 'Abby', rol: 'Diseño y redes' },
  { src: '/img/team4.jpg', nombre: 'Diego', rol: 'Foto y edición' },
];

/* ---------- Página de gracias (/gracias) ---------- */
export const GRACIAS_VIDEO_ID = 'QAFPaYgUy0c';

export const WHATSAPP_CONFIRMAR_URL =
  'https://wa.me/525580386824?text=Hola%2C%20me%20gustar%C3%ADa%20confirmar%20mi%20llamada%20%F0%9F%98%8A';

export const REGLAS = [
  { titulo: 'Cinco minutos de tolerancia', detalle: 'Respetamos tu tiempo y te pedimos lo mismo. Si no entras en los primeros cinco minutos, la llamada se cancela.' },
  { titulo: 'Un lugar tranquilo', detalle: 'No desde el coche ni la calle. Vamos a revisar tus redes y tus números, y necesitas verlos tú también.' },
  { titulo: 'Que estén quienes deciden', detalle: 'Si falta el dueño o el socio que toma la decisión, reagendamos la llamada.' },
  { titulo: 'Revisa tu correo, y el spam', detalle: 'La invitación llega por Gmail y Google Calendar. Si no la ves, búscala en spam antes de escribirnos.' },
];

/* ---------- SEO ---------- */
/** Dominio final del sitio. Cambia esto cuando conectes tu dominio (sin diagonal al final). */
export const SITE_URL = 'https://foodcontent.vercel.app';

export const SEO = {
  inicio: {
    titulo: 'Marketing para restaurantes en CDMX · Food Content',
    descripcion: 'Agencia de marketing gastronómico: video, fotografía, diseño y pauta en Meta para restaurantes con trayectoria. Aumentamos 30% tu facturación en 6 meses, garantizado. Dirigida por Carlos Gaspar.',
  },
  gracias: {
    titulo: 'Tu cita está agendada · Food Content',
    descripcion: 'Lo que necesitas saber antes de tu llamada con Carlos Gaspar.',
  },
};

/** Preguntas frecuentes: van en la página y en los datos estructurados (Google y asistentes de IA las leen igual). */
export const FAQ = [
  {
    p: '¿Qué hace Food Content?',
    r: 'Marketing para restaurantes: dirección creativa, producción de video y fotografía gastronómica, diseño gráfico, pauta en Meta y manejo de redes. Un solo equipo, en tu cocina y tu salón, con una meta medible: más facturación.',
  },
  {
    p: '¿Para qué tipo de restaurante es?',
    r: 'Para restaurantes con años de trayectoria y una marca que la gente ya reconoce, con una o varias sucursales, que quieren llenar mesas y no acumular likes. Hemos trabajado con Grupo Presidente, Morton’s, The Palm, Barrio Chick’en, Sumo y marcas como Uber Eats, Nestlé, Corona y OXXO.',
  },
  {
    p: '¿Cuánto cuesta el marketing para mi restaurante?',
    r: 'Depende del número de sucursales y de cuánto contenido necesites al mes. Empezamos con un diagnóstico gratis de 30 minutos en el que revisamos tus redes, tu pauta y tu operación, y salimos con un plan de 30 días con o sin nosotros.',
  },
  {
    p: '¿En qué consiste la garantía?',
    r: 'Si en 6 meses no subimos tu facturación 30%, seguimos trabajando gratis hasta lograrlo.',
  },
  {
    p: '¿Dónde trabajan?',
    r: 'Estamos en Ciudad de México y producimos en toda la zona metropolitana. Para restaurantes en otras ciudades de México, agendamos sesiones de producción por visita.',
  },
  {
    p: '¿Quién es Carlos Gaspar?',
    r: 'Carlos Gaspar de Alba es el fundador y CEO de Food Content: director creativo, productor audiovisual y especialista en marketing gastronómico. Él toma personalmente cada diagnóstico; no hay vendedores.',
  },
];
