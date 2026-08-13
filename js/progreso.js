// js/progreso.js
// Guarda qué temas ya se abrieron, en el navegador del alumno.
// No hay backend: todo vive en localStorage de ese equipo.

const CLAVE = "capacitartec:temas-vistos";

function cargar() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return new Set(crudo ? JSON.parse(crudo) : []);
  } catch {
    // localStorage puede fallar en modo privado o con la cuota llena.
    return new Set();
  }
}

let vistos = cargar();
const suscriptores = new Set();

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...vistos]));
  } catch {
    /* si no se puede persistir, el progreso igual funciona en la sesión */
  }
  suscriptores.forEach((fn) => fn());
}

export function estaVisto(id) {
  return vistos.has(id);
}

export function marcarVisto(id) {
  if (!id || vistos.has(id)) return;
  vistos.add(id);
  guardar();
}

export function alternar(id) {
  if (vistos.has(id)) vistos.delete(id);
  else vistos.add(id);
  guardar();
}

export function reiniciar() {
  vistos.clear();
  guardar();
}

export function contar(ids = []) {
  return ids.reduce((total, id) => total + (vistos.has(id) ? 1 : 0), 0);
}

export function alCambiar(fn) {
  suscriptores.add(fn);
  return () => suscriptores.delete(fn);
}

// Si el alumno tiene el curso abierto en dos pestañas, que se sincronicen.
window.addEventListener("storage", (e) => {
  if (e.key !== CLAVE) return;
  vistos = cargar();
  suscriptores.forEach((fn) => fn());
});
