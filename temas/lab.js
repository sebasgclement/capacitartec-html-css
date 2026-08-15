// temas/lab.js
// Convierte el editor en vivo (temas/editor.js) en un laboratorio guiado:
// una lista de objetivos que se van tildando solos a medida que el código
// del alumno los cumple.
//
// Importante: cada objetivo evalúa el RESULTADO ya renderizado en el iframe
// (con getComputedStyle), nunca el texto que el alumno escribió. Así,
// cualquier forma válida de llegar al objetivo cuenta como correcta —el
// laboratorio no le exige a nadie que copie una sintaxis exacta.
//
// Uso en una ficha: antes de este script se define
//   <script>
//     window.LAB = {
//       id: "grid-12-pagina-web",           // clave para localStorage
//       pasos: [
//         { texto: "...", pista: "...", codigo: "...", check: (doc) => boolean },
//         // pista y codigo son opcionales; codigo se muestra como bloque
//         // de código dentro de la pista, con el fragmento CSS/HTML exacto.
//         ...
//       ],
//     };
//   </script>
//   <script src="lab.js" defer></script>
// después de <script src="editor.js" defer></script>, en ese orden: ambos
// son defer, así que corren en orden de aparición y el editor ya existe
// cuando lab.js arranca.

(function () {
  "use strict";

  const lab = window.LAB;
  if (!lab || !Array.isArray(lab.pasos) || !lab.pasos.length) return;

  const contenedorEditor = document.querySelector("[data-editor]");
  const iframe = contenedorEditor?.querySelector("iframe");
  const botonResetEditor = contenedorEditor?.querySelector("[data-editor-reset]");
  if (!contenedorEditor || !iframe) return;

  const CLAVE = `capacitartec:lab:${lab.id}`;

  function cargarEstado() {
    try {
      const crudo = localStorage.getItem(CLAVE);
      return crudo ? JSON.parse(crudo) : {};
    } catch {
      return {};
    }
  }

  function guardarEstado(estado) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch {
      /* sin persistencia el laboratorio igual funciona en la sesión */
    }
  }

  const estado = cargarEstado();

  // ---------- Construcción del checklist ----------

  const wrap = document.createElement("div");
  wrap.className = "lab-wrap";

  const encabezado = document.createElement("div");
  encabezado.className = "lab-encabezado";

  const titulo = document.createElement("span");
  titulo.className = "lab-titulo";
  titulo.textContent = "🧪 Laboratorio guiado";

  const botonReset = document.createElement("button");
  botonReset.type = "button";
  botonReset.className = "lab-reset";
  botonReset.textContent = "Reiniciar laboratorio";

  encabezado.append(titulo, botonReset);

  const lista = document.createElement("ol");
  lista.className = "lab-pasos";

  const filas = lab.pasos.map((paso) => {
    const li = document.createElement("li");
    li.className = "lab-paso";

    const cabeza = document.createElement("div");
    cabeza.className = "lab-paso-cabeza";

    const marca = document.createElement("span");
    marca.className = "lab-paso-marca";
    marca.setAttribute("aria-hidden", "true");
    marca.textContent = "○";

    const texto = document.createElement("span");
    texto.className = "lab-paso-texto";
    texto.textContent = paso.texto;

    cabeza.append(marca, texto);

    let elementoPista = null;

    if (paso.pista || paso.codigo) {
      const botonPista = document.createElement("button");
      botonPista.type = "button";
      botonPista.className = "lab-pista-boton";
      botonPista.textContent = "💡 pista";
      botonPista.setAttribute("aria-expanded", "false");

      elementoPista = document.createElement("div");
      elementoPista.className = "lab-pista";
      elementoPista.hidden = true;

      if (paso.pista) {
        const textoPista = document.createElement("p");
        textoPista.className = "lab-pista-texto";
        textoPista.textContent = paso.pista;
        elementoPista.append(textoPista);
      }

      if (paso.codigo) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = paso.codigo;
        pre.append(code);
        elementoPista.append(pre);
      }

      botonPista.addEventListener("click", () => {
        elementoPista.hidden = !elementoPista.hidden;
        botonPista.setAttribute("aria-expanded", String(!elementoPista.hidden));
      });

      cabeza.append(botonPista);
    }

    li.append(cabeza);
    if (elementoPista) li.append(elementoPista);
    lista.append(li);

    return { li, marca };
  });

  const banner = document.createElement("p");
  banner.className = "lab-completo";
  banner.textContent = "🎉 ¡Completaste el laboratorio! Todos los objetivos están en verde.";
  banner.hidden = true;

  wrap.append(encabezado, lista, banner);

  // Va al final del bloque de la demo, después de cualquier texto de ayuda.
  const contenedorDestino = contenedorEditor.closest(".bloque") ?? contenedorEditor.parentElement;
  contenedorDestino.append(wrap);

  // ---------- Validación ----------

  function validar() {
    const doc = iframe.contentDocument;
    if (!doc || !doc.body) return;

    let completos = 0;

    lab.pasos.forEach((paso, i) => {
      const fila = filas[i];
      let ok = false;
      try {
        ok = !!paso.check(doc);
      } catch {
        // Un error de sintaxis del alumno (una llave sin cerrar, etc.) no
        // rompe el laboratorio: ese objetivo simplemente queda pendiente.
        ok = false;
      }
      fila.li.classList.toggle("hecho", ok);
      fila.marca.textContent = ok ? "✓" : "○";
      if (ok) completos++;
    });

    const todoListo = completos === lab.pasos.length;
    banner.hidden = !todoListo;

    if (todoListo !== estado.completado) {
      estado.completado = todoListo;
      guardarEstado(estado);
    }
  }

  iframe.addEventListener("load", validar);

  // Por si el iframe ya había terminado de cargar antes de que este script
  // corriera (poco probable con defer, pero no cuesta nada cubrirlo).
  if (iframe.contentDocument?.readyState === "complete") validar();

  botonReset.addEventListener("click", () => {
    botonResetEditor?.click(); // restaura el código: dispara un nuevo "load"
  });

  if (estado.completado) banner.hidden = false;
})();
