/**
 * js/catalogo.js
 */

let automatizacionesData = [];
let seleccionesGuardadas = [];
let filtrosActuales = {
  busqueda: "",
  categoria: "All",
  estado: "All"
};

document.addEventListener("DOMContentLoaded", () => {
  recuperarSelecciones();
  inicializarEventosCatalogo();
  cargarAutomatizaciones();
});

async function cargarAutomatizaciones() {
  try {
    const respuesta = await fetch("data/automatizaciones.json");
    if (!respuesta.ok) throw new Error("Error loading automations");
    
    const datos = await respuesta.json();
    
    const planActivo = getPlanActivo();
    
    if (typeof filtrarPorPlan === 'function') {
      automatizacionesData = datos; 
    } else {
      automatizacionesData = datos;
    }
    
    aplicarFiltrosCatalogo();
  } catch (error) {
    console.error("Error loading the catalog:", error);
    const grid = document.getElementById("catalogo-grid");
    if (grid) {
      grid.innerHTML = '<div class="empty-state">Error loading the catalog. Please try again later.</div>';
    }
  }
}

function recuperarSelecciones() {
  const guardadas = localStorage.getItem("softrent_selecciones");
  if (guardadas) {
    try {
      seleccionesGuardadas = JSON.parse(guardadas);
    } catch (e) {
      console.error(e);
      seleccionesGuardadas = [];
    }
  }
}

function guardarSelecciones() {
  localStorage.setItem("softrent_selecciones", JSON.stringify(seleccionesGuardadas));
}

function inicializarEventosCatalogo() {
  const inputBusqueda = document.getElementById("cat-search");
  const selectCategoria = document.getElementById("cat-categoria");
  const selectEstado = document.getElementById("cat-estado");
  
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", (e) => {
      filtrosActuales.busqueda = e.target.value.toLowerCase().trim();
      aplicarFiltrosCatalogo();
    });
  }
  
  if (selectCategoria) {
    selectCategoria.addEventListener("change", (e) => {
      filtrosActuales.categoria = e.target.value;
      aplicarFiltrosCatalogo();
    });
  }
  
  if (selectEstado) {
    selectEstado.addEventListener("change", (e) => {
      filtrosActuales.estado = e.target.value;
      aplicarFiltrosCatalogo();
    });
  }
}

function aplicarFiltrosCatalogo() {
  const filtrados = automatizacionesData.filter(item => {
    const tituloLower = item.nombre.toLowerCase();
    const descLower = item.descripcion.toLowerCase();
    const pasaBusqueda = filtrosActuales.busqueda === "" || 
                         tituloLower.includes(filtrosActuales.busqueda) || 
                         descLower.includes(filtrosActuales.busqueda);
                         
    const pasaCategoria = filtrosActuales.categoria === "All" || item.categoria === filtrosActuales.categoria;
    
    const pasaEstado = filtrosActuales.estado === "All" || item.estado === filtrosActuales.estado;
    
    return pasaBusqueda && pasaCategoria && pasaEstado;
  });
  
  renderizarCatalogo(filtrados);
  
  const contador = document.getElementById("catalogo-counter");
  if (contador) {
    contador.textContent = `${filtrados.length} results found`;
  }
  
  actualizarResumen();
}

function renderizarCatalogo(items) {
  const grid = document.getElementById("catalogo-grid");
  const emptyState = document.getElementById("catalogo-empty-state");
  
  if (!grid || !emptyState) return;
  
  grid.innerHTML = '';
  
  if (items.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  
  emptyState.style.display = "none";
  
  const planActivo = getPlanActivo();
  
  items.forEach(item => {
    const tieneAccesoAlItem = tieneAcceso(item.planRequerido, planActivo);
    const estaSeleccionado = seleccionesGuardadas.includes(item.id);
    
    const card = document.createElement("article");
    card.classList.add("feed-card"); 
    
    if (!tieneAccesoAlItem) {
      card.classList.add("bloqueado");
    } else if (estaSeleccionado) {
      card.style.borderColor = "var(--color-success)";
      card.style.boxShadow = "0 0 0 1px var(--color-success)";
    }
    
    const header = document.createElement("div");
    header.classList.add("feed-card-header");
    
    const icon = document.createElement("div");
    icon.classList.add("feed-icon");
    icon.textContent = item.icono;
    
    const badgesContainer = document.createElement("div");
    badgesContainer.classList.add("feed-badges");
    
    const badgeCategoria = document.createElement("span");
    badgeCategoria.classList.add("badge", "badge-categoria");
    badgeCategoria.textContent = item.categoria;
    badgesContainer.appendChild(badgeCategoria);
    
    if (item.estado === "Recommended" || item.estado === "Recomendado") {
      const badgeReco = document.createElement("span");
      badgeReco.classList.add("badge", "badge-nuevo"); 
      badgeReco.textContent = "Recommended";
      badgesContainer.appendChild(badgeReco);
    }
    
    header.appendChild(icon);
    header.appendChild(badgesContainer);
    card.appendChild(header);
    
    const titulo = document.createElement("h3");
    titulo.textContent = item.nombre;
    card.appendChild(titulo);
    
    const desc = document.createElement("p");
    desc.textContent = item.descripcion;
    card.appendChild(desc);
    
    const metaList = document.createElement("ul");
    metaList.style.marginBottom = "1.5rem";
    metaList.style.fontSize = "0.875rem";
    metaList.style.color = "var(--color-text-muted)";
    
    const bene = document.createElement("li");
    bene.innerHTML = `<strong>Benefit:</strong> ${item.beneficio}`;
    metaList.appendChild(bene);
    
    const ahorr = document.createElement("li");
    ahorr.innerHTML = `<strong>Savings:</strong> ~${item.ahorroHoras}h/wk`;
    metaList.appendChild(ahorr);
    
    card.appendChild(metaList);
    
    const footer = document.createElement("div");
    footer.classList.add("feed-card-footer");
    footer.style.flexDirection = "column";
    footer.style.alignItems = "stretch";
    
    const planRequeridoEl = document.createElement("div");
    planRequeridoEl.style.marginBottom = "1rem";
    planRequeridoEl.style.textAlign = "center";
    planRequeridoEl.style.fontWeight = "600";
    const nombrePlan = item.planRequerido.charAt(0).toUpperCase() + item.planRequerido.slice(1);
    planRequeridoEl.textContent = (item.planRequerido === 'todos' || item.planRequerido === 'all') ? 'Public Plan' : `Requires Plan ${nombrePlan}`;
    
    const btnSeleccionar = document.createElement("button");
    btnSeleccionar.classList.add("btn", "btn-seleccionar");
    
    if (estaSeleccionado) {
      btnSeleccionar.classList.add("seleccionado");
      btnSeleccionar.textContent = "✓ Selected";
    } else {
      btnSeleccionar.classList.add("btn-secondary");
      btnSeleccionar.textContent = "Select";
    }
    
    btnSeleccionar.addEventListener("click", () => {
      seleccionarAutomatizacion(item.id);
    });
    
    footer.appendChild(planRequeridoEl);
    footer.appendChild(btnSeleccionar);
    card.appendChild(footer);
    
    if (!tieneAccesoAlItem) {
      const overlay = document.createElement("div");
      overlay.classList.add("bloqueo-overlay");
      
      const lockIcon = document.createElement("div");
      lockIcon.classList.add("bloqueo-icono");
      lockIcon.textContent = "🔒";
      
      const lockMsg = document.createElement("div");
      lockMsg.classList.add("bloqueo-mensaje");
      let msg = "Exclusive Content";
      if (item.planRequerido === "intermediate" || item.planRequerido === "intermedio") msg = "Available in Intermediate Plan or higher 🔵";
      if (item.planRequerido === "vip") msg = "Exclusive VIP Plan content 👑";
      lockMsg.textContent = msg;
      
      overlay.appendChild(lockIcon);
      overlay.appendChild(lockMsg);
      card.appendChild(overlay);
    }
    
    grid.appendChild(card);
  });
}

function seleccionarAutomatizacion(id) {
  const index = seleccionesGuardadas.indexOf(id);
  
  if (index === -1) {
    const planActivo = getPlanActivo();
    if (puedeSeleccionar(seleccionesGuardadas.length, planActivo)) {
      seleccionesGuardadas.push(id);
    } else {
      alert("You have reached the maximum selection limit for your plan. Upgrade your plan to select more.");
      return;
    }
  } else {
    seleccionesGuardadas.splice(index, 1);
  }
  
  guardarSelecciones();
  aplicarFiltrosCatalogo(); 
}

function actualizarResumen() {
  const elPlan = document.getElementById("resumen-plan-nombre");
  const elUsadas = document.getElementById("resumen-usadas");
  const elTotal = document.getElementById("resumen-max");
  const elAhorro = document.getElementById("resumen-ahorro");
  
  const planActivo = getPlanActivo();
  
  if (elPlan) {
    elPlan.textContent = planActivo ? planActivo.nombre : "No plan";
  }
  
  if (elUsadas) {
    elUsadas.textContent = seleccionesGuardadas.length;
  }
  
  if (elTotal) {
    elTotal.textContent = planActivo ? (planActivo.seleccionesMax === 999 ? '∞' : planActivo.seleccionesMax) : 0;
  }
  
  if (elAhorro) {
    const horasTotales = seleccionesGuardadas.reduce((suma, id) => {
      const auto = automatizacionesData.find(a => a.id === id);
      return suma + (auto ? auto.ahorroHoras : 0);
    }, 0);
    
    elAhorro.textContent = horasTotales;
  }
}
