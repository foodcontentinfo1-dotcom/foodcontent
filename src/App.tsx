import { Agenda, Barra, Carlos, Clientes, Garantia, Hero, LoQueIncluye, ParaQuien, Pie, Reels, Testimonios } from './components/Secciones';

export default function App() {
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
        <Carlos />
        <Garantia />
        <Agenda />
      </main>
      <Pie />
    </>
  );
}
