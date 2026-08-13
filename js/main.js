// js/main.js
import { renderCurso, sincronizarProgreso } from "./render.js";
import { ModalController } from "./modal.js";
import { Navegador } from "./navegacion.js";
import { wireContentClicks } from "./ui.js";
import { wireBuscador } from "./buscador.js";
import { alCambiar, reiniciar } from "./progreso.js";

// 1) Pintamos las secciones desde js/course.js
renderCurso();

// 2) Modal + navegación entre temas (incluye deep links #tema=...)
const modalCtrl = new ModalController();
const navegador = new Navegador(modalCtrl);
wireContentClicks(navegador);

// 3) Buscador
wireBuscador();

// 4) Progreso: cada vez que cambia, se repinta
alCambiar(sincronizarProgreso);

document.querySelector("#reiniciarProgreso")?.addEventListener("click", () => {
  if (confirm("¿Borrar el progreso guardado en este navegador?")) reiniciar();
});

// Para depurar desde la consola:
// window.modalCtrl = modalCtrl;
