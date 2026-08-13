// temas/editor.js
// Convierte cada <div class="editor" data-editor> en un editor en vivo:
// el alumno toca el HTML/CSS de la izquierda y ve el resultado a la derecha.
//
// Usa iframe + srcdoc, así que no necesita servidor: funciona igual
// abriendo el archivo directo o servido desde el sitio.

(function () {
  "use strict";

  const RETARDO = 220; // ms de espera antes de repintar

  function armarEditor(contenedor) {
    const textarea = contenedor.querySelector("textarea");
    const iframe = contenedor.querySelector("iframe");
    const reset = contenedor.querySelector("[data-editor-reset]");
    if (!textarea || !iframe) return;

    // El código original queda guardado para el botón "Reiniciar".
    // Le sacamos la indentación del HTML para que se lea prolijo.
    const original = desangrar(textarea.value);
    textarea.value = original;

    let temporizador;

    function pintar() {
      iframe.srcdoc = textarea.value;
    }

    function pintarConRetardo() {
      clearTimeout(temporizador);
      temporizador = setTimeout(pintar, RETARDO);
    }

    textarea.addEventListener("input", pintarConRetardo);

    // Tab dentro del textarea indenta en vez de saltar de campo
    textarea.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const { selectionStart: ini, selectionEnd: fin, value } = textarea;
      textarea.value = value.slice(0, ini) + "  " + value.slice(fin);
      textarea.selectionStart = textarea.selectionEnd = ini + 2;
      pintarConRetardo();
    });

    reset?.addEventListener("click", () => {
      textarea.value = original;
      pintar();
      textarea.focus();
    });

    pintar();
  }

  // Quita la indentación común: el código va indentado dentro del HTML
  // de la ficha, pero el alumno tiene que verlo pegado a la izquierda.
  function desangrar(texto) {
    const lineas = texto.replace(/^\n+/, "").replace(/\s+$/, "").split("\n");
    const sangrias = lineas
      .filter((l) => l.trim())
      .map((l) => l.match(/^ */)[0].length);
    const minima = sangrias.length ? Math.min(...sangrias) : 0;
    return lineas.map((l) => l.slice(minima)).join("\n");
  }

  document.querySelectorAll("[data-editor]").forEach(armarEditor);
})();
