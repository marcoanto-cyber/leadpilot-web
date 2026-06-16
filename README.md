# Lead Pilot — Sitio web

Landing page de **Lead Pilot**, agencia de automatización con IA para PyMEs en México.
Construido con **Next.js 14 + Tailwind CSS + Framer Motion**. Listo para desplegar en **Vercel**.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Cómo cambiar tus enlaces y datos

Todo lo configurable vive en **`lib/config.ts`**:

| Variable | Para qué sirve |
|----------|----------------|
| `CALENDAR_URL` | Enlace de Cal.com del botón "Agenda una llamada" |
| `WHATSAPP_NUMBER` | Tu número de WhatsApp (solo dígitos, formato internacional) |
| `WHATSAPP_MESSAGE` | Mensaje pre-cargado del WhatsApp |
| `site.url` | Tu dominio final (para SEO / Open Graph) |
| `site.title` / `site.description` | Título y descripción para buscadores |

### Testimonios

Reemplaza los placeholders en `components/sections/Testimonials.tsx`
(respeta la estructura: `quote`, `name`, `role`, `initials`).

### Planes y precios

Edita el arreglo `plans` en `components/sections/Plans.tsx`.

## Deploy en Vercel

1. Sube el proyecto a un repositorio (GitHub/GitLab).
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Vercel detecta Next.js automáticamente. Click en **Deploy**. Listo.

> No requiere variables de entorno.

## Animaciones

- Scroll-reveals, hover y tilt 3D con Framer Motion.
- Respeta `prefers-reduced-motion` y usa versión ligera en móvil/táctil.
- Los componentes de animación están aislados en `components/motion/` y
  `components/HeroVisual.tsx`, listos para migrar a **GSAP/Three.js** sin
  reescribir las secciones.
