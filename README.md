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

## Estructura

```
src/
  components/
    NavBar.tsx        Barra de navegación
    Hero.tsx           Encabezado + mockup de agenda del día
    PainPoints.tsx      Problemas comunes que resuelve SoftRent
    Pillars.tsx         Reservas, Comunicación, Facturación
    Businesses.tsx      Tipos de negocio y subdominios personalizados
    HowItWorks.tsx      Proceso de conversación a sistema
    Contact.tsx         Llamado a la acción de contacto
    Footer.tsx
  App.tsx
  index.css            Tokens de Tailwind (tema)
```

## Pendiente

- Conectar el widget de chatbot (ver `CitasTemplate`) para responder consultas iniciales por correo.
- Subdominios de demo por tipo de negocio.
