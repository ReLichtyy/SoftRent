/**
 * js/feed.js
 */

let feedData = [];
let filtroCategoriaActual = "All";
let terminoBusquedaActual = "";

document.addEventListener("DOMContentLoaded", () => {
  const feedGrid = document.getElementById("feed-grid");
  if (!feedGrid) return;

  const filtroGuardado = localStorage.getItem("softrent_filtro_feed");
  if (filtroGuardado) {
    filtroCategoriaActual = filtroGuardado;
  }

  inicializarFiltros();
  inicializarBuscador();
  cargarFeed();
});

async function cargarFeed() {
  try {
    const respuesta = await fetch("data/feed.json");
    if (!respuesta.ok) throw new Error("Error loading feed");
    
    const datos = await respuesta.json();
    feedData = datos;
    
    aplicarFiltros();
  } catch (error) {
    console.error("Error in cargarFeed:", error);
    const feedGrid = document.getElementById("feed-grid");
    if (feedGrid) {
      feedGrid.innerHTML = '';
      const msj = document.createElement("div");
      msj.classList.add("empty-state");
      msj.textContent = "There was an error loading the posts. Please try again later.";
      feedGrid.appendChild(msj);
    }
  }
}

function inicializarFiltros() {
  const botonesFiltro = document.querySelectorAll(".filter-btn");
  
  botonesFiltro.forEach(btn => {
    if (btn.dataset.categoria === filtroCategoriaActual) {
      btn.classList.add("activo");
    } else {
      btn.classList.remove("activo");
    }
    
    btn.addEventListener("click", (e) => {
      botonesFiltro.forEach(b => b.classList.remove("activo"));
      e.target.classList.add("activo");
      
      filtroCategoriaActual = e.target.dataset.categoria;
      localStorage.setItem("softrent_filtro_feed", filtroCategoriaActual);
      
      aplicarFiltros();
    });
  });
}

function inicializarBuscador() {
  const inputBusqueda = document.getElementById("feed-search");
  if (!inputBusqueda) return;
  
  inputBusqueda.addEventListener("input", (e) => {
    terminoBusquedaActual = e.target.value.toLowerCase().trim();
    aplicarFiltros();
  });
}

function aplicarFiltros() {
  const postsFiltrados = feedData.filter(post => {
    const pasaCategoria = filtroCategoriaActual === "All" || post.categoria === filtroCategoriaActual;
    const tituloLower = post.titulo.toLowerCase();
    const descLower = post.descripcion.toLowerCase();
    const pasaBusqueda = terminoBusquedaActual === "" || 
                         tituloLower.includes(terminoBusquedaActual) || 
                         descLower.includes(terminoBusquedaActual);
                         
    return pasaCategoria && pasaBusqueda;
  });
  
  renderizarPosts(postsFiltrados);
  mostrarContador(postsFiltrados.length, feedData.length);
}

function verificarAccesoPlan(postPlan) {
  const planActivo = getPlanActivo();
  const tieneAccesoAlPost = tieneAcceso(postPlan, planActivo);
  
  let mensajeBloqueo = "";
  if (!tieneAccesoAlPost) {
    if (postPlan === "intermediate" || postPlan === "intermedio") {
      mensajeBloqueo = "Available in Intermediate Plan or higher 🔵";
    } else if (postPlan === "vip") {
      mensajeBloqueo = "Exclusive VIP Plan content 👑";
    } else {
      mensajeBloqueo = "Exclusive Content 🔒";
    }
  }
  
  return {
    acceso: tieneAccesoAlPost,
    mensajeBloqueo
  };
}

function renderizarPosts(posts) {
  const feedGrid = document.getElementById("feed-grid");
  const emptyState = document.getElementById("feed-empty-state");
  
  if (!feedGrid || !emptyState) return;
  
  feedGrid.innerHTML = '';
  
  if (posts.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  
  emptyState.style.display = "none";
  
  posts.forEach(post => {
    const estadoAcceso = verificarAccesoPlan(post.plan);
    const card = document.createElement("article");
    card.classList.add("feed-card");
    
    if (post.estado === "destacado") {
      card.classList.add("destacado");
    }
    
    if (!estadoAcceso.acceso) {
      card.classList.add("bloqueado");
    }
    
    const header = document.createElement("div");
    header.classList.add("feed-card-header");
    
    const icon = document.createElement("div");
    icon.classList.add("feed-icon");
    icon.textContent = post.icono;
    
    const badgesContainer = document.createElement("div");
    badgesContainer.classList.add("feed-badges");
    
    const badgeCategoria = document.createElement("span");
    badgeCategoria.classList.add("badge", "badge-categoria");
    badgeCategoria.textContent = post.categoria;
    badgesContainer.appendChild(badgeCategoria);
    
    if (post.estado === "nuevo") {
      const badgeNuevo = document.createElement("span");
      badgeNuevo.classList.add("badge", "badge-nuevo");
      badgeNuevo.textContent = "New";
      badgesContainer.appendChild(badgeNuevo);
    }
    
    header.appendChild(icon);
    header.appendChild(badgesContainer);
    card.appendChild(header);
    
    const titulo = document.createElement("h3");
    titulo.textContent = post.titulo;
    card.appendChild(titulo);
    
    const desc = document.createElement("p");
    desc.textContent = post.descripcion;
    card.appendChild(desc);
    
    const footer = document.createElement("div");
    footer.classList.add("feed-card-footer");
    
    const fecha = document.createElement("time");
    fecha.setAttribute("datetime", post.fecha);
    fecha.textContent = formatFecha(post.fecha);
    
    const planRequerido = document.createElement("span");
    const nombrePlan = post.plan.charAt(0).toUpperCase() + post.plan.slice(1);
    planRequerido.textContent = (post.plan === 'todos' || post.plan === 'all') ? 'Public' : `Plan ${nombrePlan}`;
    
    footer.appendChild(fecha);
    footer.appendChild(planRequerido);
    card.appendChild(footer);
    
    if (!estadoAcceso.acceso) {
      const overlay = document.createElement("div");
      overlay.classList.add("bloqueo-overlay");
      
      const lockIcon = document.createElement("div");
      lockIcon.classList.add("bloqueo-icono");
      lockIcon.textContent = "🔒";
      
      const lockMsg = document.createElement("div");
      lockMsg.classList.add("bloqueo-mensaje");
      lockMsg.textContent = estadoAcceso.mensajeBloqueo;
      
      overlay.appendChild(lockIcon);
      overlay.appendChild(lockMsg);
      card.appendChild(overlay);
    }
    
    feedGrid.appendChild(card);
  });
}

function mostrarContador(mostrados, totales) {
  const contadorEl = document.getElementById("feed-counter");
  if (contadorEl) {
    contadorEl.textContent = `Showing ${mostrados} of ${totales} posts`;
  }
}

function formatFecha(fechaString) {
  try {
    const partes = fechaString.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return fechaString;
  } catch (e) {
    return fechaString;
  }
}
