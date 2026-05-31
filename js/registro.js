/**
 * js/registro.js
 */

let solicitudesGuardadas = [];

document.addEventListener("DOMContentLoaded", () => {
  recuperarSolicitudes();
  renderizarSolicitudes();
  precargarPlan();
  inicializarEventosFormulario();
});

function precargarPlan() {
  const inputPlan = document.getElementById("reg-plan");
  if (!inputPlan) return;
  
  const planActivo = getPlanActivo();
  if (planActivo) {
    inputPlan.value = planActivo.nombre;
  } else {
    inputPlan.value = "No active plan";
  }
}

function inicializarEventosFormulario() {
  const formulario = document.getElementById("form-solicitud");
  const campos = ["reg-nombre", "reg-negocio", "reg-correo", "reg-desc"];
  const btnLimpiar = document.getElementById("btn-limpiar-form");
  const btnLimpiarTodo = document.getElementById("btn-eliminar-todo");
  
  if (formulario) {
    campos.forEach(id => {
      const campo = document.getElementById(id);
      if (campo) {
        campo.addEventListener("input", () => validarCampo(campo));
        campo.addEventListener("blur", () => validarCampo(campo));
      }
    });
    
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (validarFormulario()) {
        const datos = {
          id: Date.now(),
          nombre: document.getElementById("reg-nombre").value,
          negocio: document.getElementById("reg-negocio").value,
          correo: document.getElementById("reg-correo").value,
          categoria: document.getElementById("reg-categoria").value,
          urgencia: document.getElementById("reg-urgencia").value,
          desc: document.getElementById("reg-desc").value,
          fecha: new Date().toLocaleDateString()
        };
        
        guardarSolicitud(datos);
      }
    });
  }
  
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      if (formulario) {
        formulario.reset();
        precargarPlan();
        
        const inputs = formulario.querySelectorAll(".form-control");
        inputs.forEach(input => {
          input.classList.remove("valido", "invalido");
        });
      }
    });
  }
  
  if (btnLimpiarTodo) {
    btnLimpiarTodo.addEventListener("click", limpiarTodo);
  }
}

function validarCampo(campo) {
  let esValido = true;
  const valor = campo.value.trim();
  
  if (campo.id === "reg-nombre") {
    esValido = valor.length >= 3;
  } else if (campo.id === "reg-negocio") {
    esValido = valor.length > 0;
  } else if (campo.id === "reg-correo") {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    esValido = regexEmail.test(valor);
  } else if (campo.id === "reg-desc") {
    esValido = valor.length >= 20;
  }
  
  if (esValido) {
    campo.classList.remove("invalido");
    campo.classList.add("valido");
  } else {
    if (valor.length > 0 || document.activeElement !== campo) {
      campo.classList.remove("valido");
      campo.classList.add("invalido");
    }
  }
  
  return esValido;
}

function validarFormulario() {
  const campos = ["reg-nombre", "reg-negocio", "reg-correo", "reg-desc"];
  let todoValido = true;
  
  campos.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      const valido = validarCampo(campo);
      if (!valido) todoValido = false;
      
      if (!valido) {
        campo.classList.add("invalido");
      }
    }
  });
  
  return todoValido;
}

function recuperarSolicitudes() {
  const guardadas = localStorage.getItem("softrent_solicitudes");
  if (guardadas) {
    try {
      solicitudesGuardadas = JSON.parse(guardadas);
    } catch (e) {
      console.error(e);
      solicitudesGuardadas = [];
    }
  }
}

function guardarSolicitud(datos) {
  const planActivo = getPlanActivo();
  
  if (!puedeRegistrar(solicitudesGuardadas.length, planActivo)) {
    alert("You have reached the request limit for your current plan.");
    return;
  }
  
  solicitudesGuardadas.push(datos);
  localStorage.setItem("softrent_solicitudes", JSON.stringify(solicitudesGuardadas));
  
  const msjExito = document.getElementById("mensaje-exito");
  if (msjExito) {
    msjExito.style.display = "block";
    setTimeout(() => {
      msjExito.style.display = "none";
    }, 4000);
  }
  
  const btnLimpiar = document.getElementById("btn-limpiar-form");
  if (btnLimpiar) btnLimpiar.click();
  
  renderizarSolicitudes();
}

function eliminarSolicitud(id) {
  if (confirm("Are you sure you want to delete this request?")) {
    solicitudesGuardadas = solicitudesGuardadas.filter(sol => sol.id !== id);
    localStorage.setItem("softrent_solicitudes", JSON.stringify(solicitudesGuardadas));
    renderizarSolicitudes();
  }
}

function limpiarTodo() {
  if (solicitudesGuardadas.length === 0) return;
  
  if (confirm("WARNING! Are you sure you want to delete ALL saved requests? This cannot be undone.")) {
    solicitudesGuardadas = [];
    localStorage.removeItem("softrent_solicitudes");
    renderizarSolicitudes();
  }
}

function renderizarSolicitudes() {
  const lista = document.getElementById("lista-solicitudes");
  const container = document.getElementById("contenedor-lista-solicitudes");
  const emptyState = document.getElementById("solicitudes-empty-state");
  
  if (!lista || !container || !emptyState) return;
  
  lista.innerHTML = '';
  
  if (solicitudesGuardadas.length === 0) {
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }
  
  container.style.display = "block";
  emptyState.style.display = "none";
  
  solicitudesGuardadas.forEach(sol => {
    const item = document.createElement("div");
    item.classList.add("solicitud-item");
    
    const info = document.createElement("div");
    info.classList.add("solicitud-info");
    
    const titulo = document.createElement("h4");
    titulo.textContent = `${sol.categoria} - ${sol.negocio}`;
    
    const meta = document.createElement("p");
    meta.textContent = `${sol.fecha} | Priority: ${sol.urgencia}`;
    
    info.appendChild(titulo);
    info.appendChild(meta);
    
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Delete";
    btnEliminar.addEventListener("click", () => eliminarSolicitud(sol.id));
    
    item.appendChild(info);
    item.appendChild(btnEliminar);
    
    lista.appendChild(item);
  });
}
