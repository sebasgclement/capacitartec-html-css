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
  //HTML básico
  Historia: {
    type: "html",
    content: "temas/historia.html",
    enabled:true
  },
  "Estructura del DOM": {
    type: "img",
    content: "img/DOM.png",
    enabled:true
  },
  Párrafo: {
    type: "pdf",
    content: "pdfs/parrafo.pdf",
    enabled:true
  },
  Encabezados: {
    type: "pdf",
    content: "pdfs/Encabezados.pdf",
    enabled:true
  },
  Listas: {
    type: "pdf",
    content: "pdfs/listas.pdf",
    enabled:true
  },
  Enlaces: {
    type: "pdf",
    content: "pdfs/enlaces.pdf",
    enabled:true
  },
  "Etiquetas de bloque/línea": {
    type: "img",
    content: "img/etiquetas.png",
    enabled:true
  },
  Rutas: {
    type: "img",
    content: "img/rutas.png",
    enabled:true
  },
  Formularios: {
    type: "html",
    content: "temas/formularios.html",
    enabled:true
  },
  
  //CSS básico
  Inserción: {
    type: "img",
    content: "img/insercion.png",
    enabled:true
  },
  "Selectores (elemento, clase y id)": {
    type: "html",
    content: "temas/selectores.html",
    enabled:true
  },
  "Propiedades de texto": {
    type: "html",
    content: "temas/propiedades-texto.html",
    enabled:true
  },
  "Tipografías externas": {
    type: "html",
    content: "temas/tipografias-externas.html",
    enabled:true
  },
  "Modelo de caja (box model)": {
    type: "img",
    content: "img/Box-Model.png",
    enabled:true
  },
  "Padding y margin": {
    type: "html",
    content: "temas/padding-margin.html",
    enabled:true
  },
  Borders: {
    type: "html",
    content: "temas/bordes.html",
    enabled:true
  },
  "Box sizing": {
    type: "html",
    content: "temas/box-sizing.html",
    enabled:true
  },
  "Colorimetría (rgba, hexadecimal, hsl)": {
    type: "html",
    content: "temas/colorimetria.html",
    enabled:true
  },
  "Unidades de medida (absolutas y relativas)": {
    type: "html",
    content: "temas/unidades-medida.html",
    enabled:true
  },
  Background: {
    type: "html",
    content: "temas/background.html",
    enabled:true
  },
  Gradientes: {
    type: "html",
    content: "temas/gradiente.html",
    enabled:true
  },
  Shadows: {
    type: "html",
    content: "temas/shadows.html",
    enabled:true
  },
  //Resúmenes
  "Css básico": {
    type: "html",
    content: "temas/css_basico_resumen.html",
    enabled:true
  },
  "Html básico": {
    type: "html",
    content: "temas/guia-etiquetas.html",
    enabled:true
  },
  'HTML avanzado':{
    type: "html",
    content: "temas/html_intermedio_resumen.html",
    enabled: true
  },
  //Ejercicios
  "INTEGRADOR 1": {
    type: "html",
    content: "temas/Ejercicio_MiniLanding_Formulario.html",
    enabled:true
  },
  
  //HTML Intermedio
  Comentarios: {
    type:"img",
    content: "img/comentarios.png",
    enabled:false
  },
  Favicon:{
    type:"img",
    content: "img/faicon.png",
    enabled:false
  },
  Metadatos: {
    type: "html",
    content: "temas/metadatos.html",
    enabled: false
  },
  'Metatags.io':{
    type: "html",
    content: "temas/metatagsIO.html",
    enabled: false
  },
  Textarea: {
    type: "html",
    content: "temas/textarea.html",
    enabled: false
  },
  Labels: {
    type: "html",
    content: "temas/label.html",
    enabled: false
  },
  'Select, datalist y option': {
    type: "html",
    content: "temas/select.html",
    enabled: false
  },
  'Fieldset y legend':{
    type: "html",
    content: "temas/fieldset.html",
    enabled: false
  },
  'Details y summary':{
    type: "html",
    content: "temas/details.html",
    enabled: false
  },
  'Enlaces avanzados':{
    type:"html",
    content: "temas/enlacesAvanzados.html",
    enabled: false
  },
  'Audio y Video':{
    type: "html",
    content: "temas/audioVideo.html",
    enabled: false
  },
  'Lazy Loading':{
    type: "html",
    content: "temas/lazyLoad.html",
    enabled: false
  },
  'HTML Obsoleto':{
    type: "html",
    content: "temas/HTMLObsoleto.html",
    enabled: false
  },
  'HTML Semántico':{
    type: "html",
    content: "temas/HTMLSemantico.html",
    enabled: false
  },
  'Accesibilidad WEB':{
    type: "html",
    content: "temas/accesibilidad.html",
    enabled: false
  }
};

document
  .querySelectorAll("#clases ul li, #recursos ul li, #consultas ul li")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      const texto = item.textContent.trim();
      const data = contentMap[texto];

      if (!data || data.enabled === false) {
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
