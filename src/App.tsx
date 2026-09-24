import { Agenda, Barra, Carlos, Clientes, Garantia, Hero, LoQueIncluye, ParaQuien, Pie, Preguntas, Reels, Testimonios } from './components/Secciones';
import { useSeo } from './hooks/useSeo';
import { SEO } from './data/contenido';
import { BarraGracias, HeroGracias, Reglas } from './components/Gracias';

/** Dos páginas, una app: "/" vende y agenda; "/gracias" recibe a quien ya agendó. */
export default function App() {
  const gracias = window.location.pathname.replace(/\/+$/, '') === '/gracias';
  useSeo(gracias ? { ...toSeo(SEO.gracias), ruta: '/gracias', indexar: false } : { ...toSeo(SEO.inicio), ruta: '/', indexar: true });
  if (gracias) {
    return (
      <>
        <BarraGracias />
        <main>
          <HeroGracias />
          <Reglas />
          <Carlos />
          <Testimonios />
          <Reels />
        </main>
        <Pie confirmar />
      </>
    );
  }
  return (
    <>
      <Barra />
      <main>
        <Hero />
        <ParaQuien />
        <LoQueIncluye />
        <Clientes />
        <Reels />
        <Testimonios />
        <Garantia />
        <Preguntas />
        <Agenda />
      </main>
      <Pie />
    </>
  );
}

function toSeo(o: { titulo: string; descripcion: string }) {
  return { titulo: o.titulo, descripcion: o.descripcion };
}
