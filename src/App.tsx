import { Agenda, Barra, Carlos, Clientes, Garantia, Hero, LoQueIncluye, ParaQuien, Pie, Reels, Testimonios } from './components/Secciones';
import { BarraGracias, HeroGracias, Reglas } from './components/Gracias';

/** Dos páginas, una app: "/" vende y agenda; "/gracias" recibe a quien ya agendó. */
export default function App() {
  const gracias = window.location.pathname.replace(/\/+$/, '') === '/gracias';
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
        <Agenda />
      </main>
      <Pie />
    </>
  );
}
