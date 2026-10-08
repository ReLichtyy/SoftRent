import { createRoot } from "react-dom/client";
import { HeroLiveDemo } from "../src/components/sections/HeroLiveDemo";
import "../src/index.css";
import "./live-demo.css";

const root = document.getElementById("demo-root");
if (!root) throw new Error("No se encontró el contenedor de la demo");

createRoot(root).render(
  <>
    <HeroLiveDemo showcase />
    <p className="simulation-note">
      Demo con datos de ejemplo. Las acciones son simuladas.
    </p>
  </>,
);
