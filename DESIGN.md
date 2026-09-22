# Reglas de diseño · Food Content

Este documento existe para que cualquier cambio futuro (humano o IA) respete lo que hace que el sitio se vea como Food Content y no como plantilla de agencia. Si una decisión funcionaría igual para una agencia de seguros, es la decisión equivocada.

## Principio
El sitio se comporta como la fotografía de Food Content: fondo negro, luz dura sobre una sola cosa a la vez. Cada pantalla tiene un protagonista y todo lo demás está en sombra.

## Color
| Token | Hex | Uso |
|---|---|---|
| `--negro` | `#000000` | Fondo. Negro real, nunca tintado. |
| `--naranja` | `#FF6A13` | Solo: logo, botones de agendar, "30% la facturación", "+30% facturación", nombre de Carlos. Si aparece en más lugares deja de señalar. |
| `--brasa` | `#C2410C` | Hover del botón. |
| `--hueso` | `#F5EDE3` | Texto. Nunca blanco puro en párrafos. |
| `--carbon` | `#1A1614` | Bloques: comanda, chats, Calendly, WhatsApp. |
| `--gris` / `--gris2` | `#A89F94` / `#7A7169` | Texto secundario y terciario. |

## Tipografía
- **Big Shoulders Display** 700/900, mayúsculas, `line-height .92–1`: titulares, nombres de restaurante, cifras.
- **Instrument Sans** 400/500/600: todo lo demás. Sentence case.
- Nunca Inter, Roboto, Arial ni monoespaciada para etiquetas.

## Estructura
Una columna, sin menú. Orden fijo: promesa + garantía + VSL → para quién → comanda → clientes → reels → testimonios → Carlos → garantía → Calendly. Un solo botón repetido ("Agendar diagnóstico gratis"); WhatsApp es secundario y va en carbón, no en naranja.

## El elemento atrevido (solo uno)
La **comanda**: "Lo que incluye" en formato de ticket de cocina, con líneas punteadas y total. El resto de la página es disciplinada. No añadir otro elemento "creativo" sin quitar este.

## Movimiento
Explica, no decora: cada animación imita algo real del mundo del restaurante y ocurre **una sola vez**, al entrar en la vista.

| Elemento | Movimiento | Metáfora |
|---|---|---|
| Hero | Aparece en orden de lectura; la línea naranja de "6 meses" se dibuja al final | Subrayar con marcador |
| Títulos grandes | Suben desde detrás de una línea invisible | Destapar un rótulo |
| Listas | Renglón por renglón | Leer |
| Comanda | Línea por línea | Ticket que se imprime |
| Logos y reels | Cascada rápida | Fotos sobre la mesa |
| Chats | Mensaje tras mensaje | WhatsApp |
| Garantía | Se estampa (escala 1.03 → 1) | Sello |

Prohibido: hover en toda tarjeta, autoplay de videos, parallax, 3D decorativo, animaciones que se repiten en cada scroll. `prefers-reduced-motion` apaga todo (`useReducedMotion`). Antes de añadir una animación nueva, pregúntate qué cosa real imita; si no hay respuesta, no va.

## Clichés prohibidos
Crema + serif + terracota · negro tintado · tarjetas idénticas con sombra suave · degradados decorativos · etiquetas en MAYÚSCULAS con tracking · monoespaciada · flechas "→" en botones · cadenas "A · B · C" · marcadores 01/02/03 sin secuencia real · stock de comida · logos en gris al 40% · contador con bonos tachados.

## Copy
Voz activa, resultado del restaurante, sentence case, sin "soluciones integrales" ni "potenciamos tu marca". Precio del diagnóstico aparece una vez, en la sección de agenda.

## Calidad mínima
Responsive hasta 390px sin scroll horizontal · foco visible · contraste AA · videos cargan solo al clic · `npm test` en verde antes de publicar.
