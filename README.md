# SoftRent

Sitio principal de SoftRent: sistemas de reservas, mensajes y facturación a la medida para negocios de servicios en Costa Rica (barberías, veterinarias, estudios de tatuajes, comercios pequeños).

## Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Router](https://react-router.dev/) (mapa de pantallas del Notion, sección 2.6)

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Sistema de diseño

Fuente única: tokens en `src/styles/tokens.css` (tema claro y oscuro, paleta y reglas de la página "Lógica de negocio" del Notion, secciones 2.3-2.4). El tema se activa con `data-theme="dark"` en `<html>`; la elección del usuario se guarda en `localStorage` y por defecto sigue la preferencia del sistema.

Documentación de componentes y tokens: [`docs/`](docs/index.md).
Plan de implementación por fases: [`docs/plan-implementacion.md`](docs/plan-implementacion.md).

## Estructura

```
src/
  styles/
    tokens.css          Colores, tipografía (Inter + Play) y radios del sistema
    base.css            Reset mínimo, foco visible, reduced-motion
  lib/
    cn.ts               Utilidad de clases (clsx + tailwind-merge)
    useTheme.ts         Tema claro/oscuro persistente
    useScrollReveal.ts  Revelados con GSAP al entrar en viewport
    format.ts           Formato de montos en colones
  content/              Fuente única de datos del sitio y del chatbot
    demos.ts            Catálogo de demos por industria
    soluciones.ts       Dolor a solución con beneficio medible
    planes.ts           Planes y reglas comerciales
    faq.ts              Preguntas frecuentes (sitio y chatbot)
  knowledge/            Conocimiento del chatbot (Notion, sección 3.5)
    core/softrent.ts    Módulo core: proceso, contacto, límites
    demos/              Un submódulo por demo
  components/
    ui/                 Primitivas: Button, LinkButton, Link, Badge, Card,
                        Input, Select, Textarea, Checkbox, Toggle
    layout/             Container, Section
    sections/           Secciones del sitio: NavBar, Hero, ChatMockup, Problemas,
                        ComoTrabajamos, Industrias, Resultados, Planes,
                        PlanesGrid, Seguridad, Faq, Contact, Footer
    motion/             WordScrub
  pages/                Mapa de pantallas (Notion, sección 2.6)
    _layouts/           PublicLayout, AppLayout, AdminLayout
    public/             Inicio, Soluciones, Industrias, Precios, Comenzar,
                        Casos, Nosotros, Demos
    app/                Nueve pantallas de la app del cliente
    admin/              Seis pantallas del admin de SoftRent
  router.tsx            Mapa de rutas
  index.css             Punto de entrada de estilos
```

## Pendiente

- Fase 8: integraciones de backend (Supabase con RLS, WhatsApp Cloud API, proveedor de facturación electrónica, PostHog). Las pantallas de la app y del admin usan datos de demo en `src/data/`.
- Conectar el widget de chatbot a un proveedor de IA real; hoy responde con el motor de reglas de `src/lib/chat/` sobre `knowledge/`.
- Subdominios de demo por tipo de negocio (la demo de Citas ya apunta a su URL en vivo).
- Reemplazar las fotos de placeholder (Picsum) por fotografías reales.
