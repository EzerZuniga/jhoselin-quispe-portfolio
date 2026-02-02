# Portfolio Astro

Stack base listo para un portafolio de alto rendimiento usando **Astro + React + Tailwind + TypeScript**.

## Requisitos

- Node.js 20.10 o superior
- pnpm, npm o yarn reciente

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con Astro + React. |
| `npm run build` | Genera la versión estática en `dist/`. |
| `npm run preview` | Previsualiza la build generada. |
| `npm run lint` | Ejecuta ESLint (Astro, React, TypeScript). |
| `npm run typecheck` | Valida tipos con `tsc --noEmit`. |
| `npm run test` | Corre pruebas con Vitest (jsdom). |
| `npm run test:coverage` | Genera reporte de cobertura C8. |

## Arquitectura

- `src/layouts`: HTML shells globales (BaseLayout, PageLayout).
- `src/components`: UI compartida (`layout/`, `providers/`, `ui/`).
- `src/modules`: Dominios desacoplados (profile, projects, blog, events) con componentes y servicios cohesionados.
- `src/services`: Servicios transversales (analytics, SEO, contenido).
- `src/content`: Astro Content Collections con esquemas tipados.
- `tests`: Suites unitarias (Vitest) y e2e (Playwright/Cypress).

## Próximos pasos sugeridos

1. Poblar colecciones en `src/content/**` para blog, eventos y proyectos.
2. Conectar los servicios de `src/modules/**/data` con datos reales o CMS.
3. Pulir estilos globales/Tailwind y añadir metadatos dinámicos con `src/seo/seo.config.ts`.
