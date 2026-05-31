/**
 * js/main.js
 * Global shared functionality for SoftRent.
 */

document.addEventListener("DOMContentLoaded", () => {
  inicializarTema();
  inicializarNavegacion();
  mostrarBadgePlan();
  inicializarMenuMovil();
  inicializarBotonChangePlan();
  inicializarModalPerfil();
  inicializarScrollReveal();
  
  const contenedorPlanes = document.getElementById("planes-grid");
  if (contenedorPlanes) {
    cargarPlanesIndex(contenedorPlanes);
  }
});

/**
 * Initializes Light/Dark theme.
 */
function inicializarTema() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  
  // Load saved theme
  const savedTheme = localStorage.getItem("softrent_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌙";
  } else {
    // default dark
    document.body.classList.remove("light-theme");
    themeToggle.textContent = "☀️";
  }
  
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
      localStorage.setItem("softrent_theme", "light");
      themeToggle.textContent = "🌙";
    } else {
      localStorage.setItem("softrent_theme", "dark");
      themeToggle.textContent = "☀️";
    }
  });
}

/**
 * Detects active page and adds .nav-active class.
 */
function inicializarNavegacion() {
  const path = window.location.pathname;
  let paginaActiva = "";
  
  if (path.includes("services.html") || path.includes("catalogo.html")) {
    paginaActiva = "services.html";
  } else if (path.includes("membership.html") || path.includes("registro.html")) {
    paginaActiva = "membership.html";
  } else {
    paginaActiva = "index.html";
  }
  
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.classList.remove("nav-active");
    if (link.getAttribute("href") === paginaActiva || (paginaActiva === "index.html" && link.getAttribute("href") === "/")) {
      link.classList.add("nav-active");
    }
  });
}

/**
 * Updates plan badge.
 */
function mostrarBadgePlan() {
  const badge = document.getElementById("plan-badge");
  if (!badge) return;
  
  let planActivo = null;
  if (typeof getPlanActivo === 'function') {
    planActivo = getPlanActivo();
  } else {
    try {
      planActivo = JSON.parse(localStorage.getItem("softrent_plan"));
    } catch (e) {
      console.error(e);
    }
  }
  
  badge.className = "plan-badge";
  
  if (planActivo) {
    badge.textContent = `Plan ${planActivo.nombre}`;
    const clasePlan = planActivo.nombre.toLowerCase();
    badge.classList.add(clasePlan);
    
    if (planActivo.icono) {
      badge.textContent = `${planActivo.icono} Plan ${planActivo.nombre}`;
    }
  } else {
    badge.textContent = "No plan";
  }
}

function inicializarMenuMovil() {
  const btnMenu = document.getElementById("btn-menu");
  const navLinks = document.getElementById("nav-links");
  
  if (btnMenu && navLinks) {
    btnMenu.addEventListener("click", () => {
      navLinks.classList.toggle("menu-abierto");
      if (navLinks.classList.contains("menu-abierto")) {
        btnMenu.textContent = "✕";
      } else {
        btnMenu.textContent = "☰";
      }
    });
  }
}

async function cargarPlanesIndex(contenedor) {
  try {
    const respuesta = await fetch("data/planes.json");
    if (!respuesta.ok) throw new Error("Error loading plans");
    
    const planes = await respuesta.json();
    
    let planActivo = null;
    if (typeof getPlanActivo === 'function') {
      planActivo = getPlanActivo();
    }
    
    contenedor.innerHTML = '';
    
    planes.forEach(plan => {
      const card = document.createElement("div");
      const clasePlan = `plan-${plan.nombre.toLowerCase()}`;
      card.classList.add("plan-card", clasePlan);
      
      const esActivo = planActivo && planActivo.id === plan.id;
      if (esActivo) {
        card.classList.add("plan-activo");
        
        const badge = document.createElement("div");
        badge.classList.add("badge-activo-container");
        badge.textContent = "Active plan";
        card.appendChild(badge);
      }
      
      const header = document.createElement("div");
      header.classList.add("plan-header");
      
      const icon = document.createElement("div");
      icon.classList.add("plan-icon");
      icon.textContent = plan.icono;
      
      const name = document.createElement("h3");
      name.classList.add("plan-name");
      name.textContent = plan.nombre;
      
      const priceCont = document.createElement("div");
      priceCont.classList.add("plan-price");
      const price = plan.monthlyPrice || plan.precio || 0;
      priceCont.innerHTML = price === 0 ? "Free" : `$${price}<span>/mo</span>`;
      
      const desc = document.createElement("p");
      desc.classList.add("plan-desc");
      desc.textContent = plan.descripcion;
      
      header.appendChild(icon);
      header.appendChild(name);
      header.appendChild(priceCont);
      header.appendChild(desc);
      
      const features = document.createElement("ul");
      features.classList.add("plan-features");
      
      const feat1 = document.createElement("li");
      feat1.textContent = plan.automatizacionesMax === 999 ? "Unlimited automations" : `Up to ${plan.automatizacionesMax} automations`;
      
      const feat2 = document.createElement("li");
      feat2.textContent = plan.seleccionesMax === 999 ? "Unlimited selections" : `Max ${plan.seleccionesMax} selections`;
      
      const feat3 = document.createElement("li");
      feat3.textContent = plan.solicitudesMax === 999 ? "Unlimited requests" : `Max ${plan.solicitudesMax} requests`;
      
      const feat4 = document.createElement("li");
      feat4.textContent = `Support: ${plan.soporte}`;
      
      features.appendChild(feat1);
      features.appendChild(feat2);
      features.appendChild(feat3);
      features.appendChild(feat4);
      
      const btn = document.createElement("button");
      btn.classList.add("btn", esActivo ? "btn-secondary" : "btn-primary");
      btn.textContent = esActivo ? "Current Plan" : "Select";
      
      if (!esActivo) {
        btn.addEventListener("click", () => {
          if (typeof guardarPlan === 'function') {
            guardarPlan(plan);
            window.location.reload();
          }
        });
      }
      
      card.appendChild(header);
      card.appendChild(features);
      card.appendChild(btn);
      
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading plans:", error);
    contenedor.innerHTML = '<div class="empty-state">Error loading plans. Please reload the page.</div>';
  }
}

function inicializarBotonChangePlan() {
  const btnChangePlan = document.getElementById("change-plan-btn");
  if (btnChangePlan) {
    btnChangePlan.addEventListener("click", () => {
      // If we're already on the membership page, scroll to the plans grid
      if (window.location.pathname.includes("membership.html")) {
        const grid = document.getElementById("membership-plans");
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = "membership.html";
      }
    });
  }
}

/**
 * Initializes Scroll Reveal animation observer.
 */
function inicializarScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Opcional: observer.unobserve(entry.target) si quieres que la animacion sea solo 1 vez
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => observer.observe(reveal));
}

/**
 * Initializes Smooth Profile Modal
 */
function inicializarModalPerfil() {
  const profileBtns = document.querySelectorAll('.profile-btn');
  if (profileBtns.length === 0) return;
  
  // Inject modal HTML if it doesn't exist
  if (!document.getElementById('profile-modal-overlay')) {
    const modalHTML = `
      <div id="profile-modal-overlay" class="profile-modal-overlay">
        <div class="profile-modal">
          <button id="close-profile-modal" class="btn-close-modal" aria-label="Close modal">&times;</button>
          <div class="profile-modal-avatar">S</div>
          <h3>Your Account</h3>
          <p>hello@business.com</p>
          <div class="profile-modal-actions">
            <button class="btn btn-primary change-plan-btn" style="width:100%; min-height:48px;" onclick="document.getElementById('change-plan-btn').click(); document.getElementById('profile-modal-overlay').classList.remove('active');">Manage Plan</button>
            <button class="btn btn-secondary" style="width:100%;" onclick="alert('Settings feature coming soon.')">Settings</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  const overlay = document.getElementById('profile-modal-overlay');
  const closeBtn = document.getElementById('close-profile-modal');
  
  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('active');
    });
  });
  
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
}
