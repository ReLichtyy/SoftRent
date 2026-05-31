/**
 * js/planes.js
 * Logic related to SoftRent plans.
 */

const NIVELES_PLANES = {
  standar: 1,
  premium: 2,
  vip: 3,
  basic: 1,        // Fallback for old data
  intermediate: 2, // Fallback for old data
  basico: 1,       // Fallback for old data
  intermedio: 2    // Fallback for old data
};

/**
 * Gets the active plan from localStorage.
 */
function getPlanActivo() {
  const planJson = localStorage.getItem("softrent_plan");
  if (!planJson) return null;
  
  try {
    return JSON.parse(planJson);
  } catch (error) {
    console.error("Error parsing plan from localStorage", error);
    return null;
  }
}

/**
 * Saves the selected plan to localStorage.
 */
function guardarPlan(plan) {
  localStorage.setItem("softrent_plan", JSON.stringify(plan));
}

/**
 * Checks if the user can select one more automation.
 */
function puedeSeleccionar(seleccionActual, plan) {
  if (!plan) return false;
  return seleccionActual < plan.automatizacionesMax; // Using automatizacionesMax as requested earlier or seleccionesMax? Prompt says seleccionesMax.
  // Wait, I used seleccionesMax earlier. I'll stick to it.
}
// Fixing the property name to seleccionesMax
function puedeSeleccionar(seleccionActual, plan) {
  if (!plan) return false;
  return seleccionActual < plan.seleccionesMax;
}


/**
 * Checks if the user can register one more request.
 */
function puedeRegistrar(solicitudesActual, plan) {
  if (!plan) return false;
  return solicitudesActual < plan.solicitudesMax;
}

/**
 * Checks if an active plan has access to a required level.
 */
function tieneAcceso(planRequerido, planActivo) {
  if (planRequerido === 'todos' || planRequerido === 'all') return true;
  if (!planActivo) return false; // If no active plan, can only see "all"
  
  const nombrePlanActivo = planActivo.nombre.toLowerCase();
  
  const nivelRequerido = NIVELES_PLANES[planRequerido.toLowerCase()] || 0;
  const nivelActivo = NIVELES_PLANES[nombrePlanActivo] || 0;
  
  return nivelActivo >= nivelRequerido;
}

/**
 * Filters an array of items based on the active plan.
 */
function filtrarPorPlan(items, planActivo) {
  return items.filter(item => {
    const planRequerido = item.planRequerido || item.plan || 'all';
    return tieneAcceso(planRequerido, planActivo);
  });
}
