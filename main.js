const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalHtml = document.getElementById("modalHtml");
const modalPdf = document.getElementById("modalPdf");
const modalImg = document.getElementById("modalImg");

// Validación defensiva
if (!modal || !modalClose || !modalHtml || !modalPdf || !modalImg) {
  console.error("Faltan elementos del modal en el HTML.");
}

// Mapeo de temas
const contentMap = {
  Historia: {
    type: "html",
    content: "temas/historia.html",
  },
  "Estructura del DOM": {
    type: "img",
    content: "img/DOM.png",
  },
  Párrafo: {
    type: "pdf",
    content: "pdfs/parrafo.pdf",
  },
  Encabezados: {
    type: "pdf",
    content: "pdfs/Encabezados.pdf",
  },
  Listas: {
    type: "pdf",
    content: "pdfs/listas.pdf",
  },
  Enlaces: {
    type: "pdf",
    content: "pdfs/enlaces.pdf",
  },
  "Etiquetas de bloque/línea": {
    type: "img",
    content: "img/etiquetas.png",
  },
  Rutas: {
    type: "img",
    content: "img/rutas.png",
  },
  Formularios: {
    type: "html",
    content: "temas/formularios.html",
  },
  "Html básico": {
    type: "html",
    content: "temas/guia-etiquetas.html",
  },
  Inserción: {
    type: "img",
    content: "img/insercion.png",
  },
  "Selectores (elemento, clase y id)": {
    type: "html",
    content: "temas/selectores.html",
  },
  "Propiedades de texto": {
    type: "html",
    content: "temas/propiedades-texto.html",
  },
  "Tipografías externas": {
    type: "html",
    content: "temas/tipografias-externas.html",
  },
  "Modelo de caja (box model)": {
    type: "img",
    content: "img/Box-Model.png",
  },
  "Padding y margin": {
    type: "html",
    content: "temas/padding-margin.html",
  },
  Borders: {
    type: "html",
    content: "temas/bordes.html",
  },
  "Box sizing": {
    type: "html",
    content: "temas/box-sizing.html",
  },
  "Colorimetría (rgba, hexadecimal, hsl)": {
    type: "html",
    content: "temas/colorimetria.html",
  },
  "Unidades de medida (absolutas y relativas)": {
    type: "html",
    content: "temas/unidades-medida.html",
  },
  Background: {
    type: "html",
    content: "temas/background.html",
  },
  Gradientes: {
    type: "html",
    content: "temas/gradiente.html",
  },
  Shadows: {
    type: "html",
    content: "temas/shadows.html",
  },
  "Css básico": {
    type: "html",
    content: "temas/css_basico_resumen.html",
  },
  "INTEGRADOR 1": {
    type: "html",
    content: "temas/Ejercicio_MiniLanding_Formulario.html",
  },
};

document
  .querySelectorAll("#clases ul li, #recursos ul li, #consultas ul li")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      const texto = item.textContent.trim();
      const data = contentMap[texto];

      if (!data) {
        alert("Contenido no disponible.");
        return;
      }

      // Ocultar todos
      modalHtml.style.display = "none";
      modalPdf.style.display = "none";
      modalImg.style.display = "none";

      // Limpiar src
      modalHtml.src = "";
      modalPdf.src = "";
      modalImg.src = "";

      // Mostrar el que corresponde
      switch (data.type) {
        case "html":
          modalHtml.src = data.content;
          modalHtml.style.display = "block";
          break;
        case "pdf":
          modalPdf.src = data.content;
          modalPdf.style.display = "block";
          break;
        case "img":
          modalImg.src = data.content;
          modalImg.style.display = "block";
          break;
      }

      modal.style.display = "flex";
    });
  });

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  modalHtml.src = "";
  modalPdf.src = "";
  modalImg.src = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalHtml.src = "";
    modalPdf.src = "";
    modalImg.src = "";
  }
});
