# Food Content · landing

Landing de captación para pauta en Meta. Una sola página: promesa → VSL → prueba → agenda (Calendly).

## Stack
- **React 19 + Vite + TypeScript**
- **Framer Motion**: el hero se revela en orden de lectura, la comanda se "imprime" línea por línea, la ventana de reels y el carrusel de fotos hacen transición. Nada más se mueve; `prefers-reduced-motion` apaga todo.
- **Playwright**: 9 pruebas × 2 dispositivos (escritorio 1440 e iPhone 13) en `tests/landing.spec.ts`.
- Sin CSS-in-JS ni Tailwind: un solo `src/index.css` con variables de marca.

## Comandos
```bash
npm install          # una vez
npm run dev          # http://localhost:5173
npm run build        # genera dist/
npm test             # pruebas (la primera vez: npx playwright install chromium)
```

## Dónde se cambia cada cosa
| Quiero cambiar… | Archivo |
|---|---|
| Textos, links de YouTube, logos, chats, equipo | `src/data/contenido.ts` |
| Fecha/periodo del reloj de cupos | `src/data/contenido.ts` → `RELOJ` |
| Link o colores de Calendly | `src/data/contenido.ts` → `CALENDLY_URL` |
| Número de WhatsApp | `src/data/contenido.ts` → `WHATSAPP_URL` |
| Colores, tipografías, tamaños | `src/index.css` (variables en `:root`) |
| Imágenes | `public/img/` |
| Pixel de Meta | `index.html` (hay un comentario que marca el lugar) |
| Reglas de diseño para futuros cambios | `DESIGN.md` |

## Publicar en Vercel
1. Sube esta carpeta a un repositorio de GitHub (sin `node_modules`).
2. En vercel.com → **Add New → Project** → importa el repositorio. Vercel detecta Vite solo: Build `npm run build`, Output `dist`. Deploy.
3. **Settings → Domains** → agrega tu dominio y cambia los DNS donde lo compraste.
4. Cada `git push` a `main` publica automáticamente.

Alternativa sin GitHub: `npm i -g vercel` y, dentro de la carpeta, `vercel --prod`.

## Reloj de cupos
Ciclo de 96 horas anclado al 21 sep 2026 03:00 CDMX. Se reinicia solo cada 4 días a las 3:00 a.m., hora en que casi nadie está mirando.


## Píxel de Meta y API de conversiones

- El ID del píxel está en `src/data/contenido.ts` (`PIXEL_ID`).
- El token de la API de conversiones **nunca va en el código**. Se guarda en Vercel:
  Settings → Environment Variables → `META_CAPI_TOKEN` → Redeploy.
- Mientras pruebas, agrega también `META_TEST_CODE` con el código de "Probar eventos"
  del Administrador de eventos; bórralo cuando termines.
- Eventos: PageView, Lead (/gracias), Contact (botón WhatsApp). Todos con `vsl` = a, b o c.
