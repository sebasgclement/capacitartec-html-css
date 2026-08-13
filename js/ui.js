// js/ui.js
export function wireContentClicks(navegador) {
  // Un solo listener para toda la página: los botones de tema se
  // identifican por su data-topic, no por el texto que muestran.
  document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-topic]");
    if (!boton) return;
    navegador.abrir(boton.dataset.topic);
  });
}
