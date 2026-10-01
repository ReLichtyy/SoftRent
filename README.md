# SoftRent

Sitio principal de SoftRent: sistemas de reservas, mensajes y facturación a la medida para negocios de servicios en Costa Rica (barberías, veterinarias, estudios de tatuajes, comercios pequeños).

## Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4

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

Fuente única: tokens en `src/styles/tokens.css` (tema claro y oscuro, paleta y reglas de la página "Lógica de negocio" del Notion, secciones 2.3–2.4). El tema se activa con `data-theme="dark"` en `<html>`; la elección del usuario se guarda en `localStorage` y por defecto sigue la preferencia del sistema.

Documentación de componentes y tokens: [`docs/`](docs/index.md).

## Estructura

```
src/
  styles/
    tokens.css        Colores, tipografía (Inter + Play) y radios del sistema
    base.css          Reset mínimo, foco visible, reduced-motion
  lib/
    cn.ts             Utilidad de clases (clsx + tailwind-merge)
    useTheme.ts       Tema claro/oscuro persistente
  components/
    ui/               Primitivas: Button, Link, Badge, Card, Input,
                      Select, Textarea, Checkbox, Toggle
    layout/           Container, Section
    sections/         Secciones de la página: NavBar, Hero, PainPoints,
                      Pillars, Businesses, HowItWorks, Contact, Footer
  App.tsx
  index.css           Punto de entrada de estilos
```

## Pendiente

- Voz y tono: el copy actual usa "vos"; el design base pide trato de "usted" (Notion, sección 2.2).
- Contraste AA: en tema claro, `success` y `warning` solo cumplen para texto grande; en oscuro el texto sobre `--brand` debe ser tinta oscura (ya aplicado en `--on-brand`).
- Conectar el widget de chatbot (ver `CitasTemplate`) para responder consultas iniciales por correo.
- Subdominios de demo por tipo de negocio.
