// Elementos del modal
const modal      = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBox   = document.querySelector(".modal-box");
const modalHtml  = document.getElementById("modalHtml");
const modalPdf   = document.getElementById("modalPdf");
const modalImg   = document.getElementById("modalImg");

// Aviso
const modalNotice = document.getElementById("modalNotice");
const noticeClose = document.getElementById("noticeClose");
const noticeTopic = document.getElementById("noticeTopic");

// Helpers
function clearMedia() {
  if (modalHtml) { modalHtml.src = ""; modalHtml.hidden = true; }
  if (modalPdf)  { modalPdf.src  = ""; modalPdf.hidden  = true; }
  if (modalImg)  { modalImg.src  = ""; modalImg.hidden  = true; }
}
function hideAll() {
  clearMedia();
  if (modalNotice) modalNotice.hidden = true;
  if (modalBox)    modalBox.hidden    = true;
}
function showNotice(topicText) {
  hideAll();
  if (noticeTopic) {
    noticeTopic.textContent = topicText ? `Tema: ${topicText}` : "";
    noticeTopic.style.display = topicText ? "inline-block" : "none";
  }
  modalNotice.hidden = false;         
  modal.style.display = "flex";
  setTimeout(() => noticeClose?.focus(), 0);
}
function openModalWith(type, src) {
  hideAll();
  modalBox.hidden = false;            

  if (type === "html") { modalHtml.src = src; modalHtml.hidden = false; }
  else if (type === "pdf") { modalPdf.src = src; modalPdf.hidden = false; }
  else if (type === "img") { modalImg.src = src; modalImg.hidden = false; }
  else { showNotice(); return; }

  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
  hideAll();
}

// =====================
// Mapeo de temas
// =====================
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
    enabled: false
  },
  'Css avanzado':{
    type: "html",
    content: "temas/ResumenCCSI.html",
    enabled: false
  },
  'CSS flexbox':{
    type: "html",
    content: "temas/flex-resumen.html",
    enabled: false
  },
  //Ejercicios
  "INTEGRADOR 1": {
    type: "html",
    content: "temas/IntegradorI.html",
    enabled:false
  },
  "INTEGRADOR 2":{
    type: "html",
    content: "temas/IntegradorII.html",
    enabled: false
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
  },
  //CSS Intermedio
  'Selectores avanzados':{
    type: "html",
    content: "temas/selectoresAvanzados.html",
    enabled: false
  },
  'Herencia, Cascada y Especificidad':{
    type:"html",
    content: "temas/EspecificidadHerencia.html",
    enabled: false
  },
  Pseudoclases:{
    type:"html",
    content: "temas/Pseudoclase.html",
    enabled: false
  },
  Pseudoelementos:{
    type: "html",
    content: "temas/Pseudoelemento.html",
    enabled: false
  },
  'Metodología BEM':{
    type:"html",
    content:"temas/MetodologiaBEM.html",
    enabled:false
  },
  Display: {
    type: "html",
    content: "temas/Display.html",
    enabled: false
  },
  'Posición relativa y absoluta':{
    type: "html",
    content: "temas/PosicionRA.html",
    enabled: false
  },
  'Ventanas Modal':{
    type:"html",
    content: "temas/ventanaModal.html",
    enabled: false
  },
  'Posición fixed y sticky':{
    type: "html",
    content: "temas/FixedSticky.html",
    enabled: false
  },
  Transiciones:{
    type: "html",
    content: "temas/Transiciones.html",
    enabled: false
  },
  Overflow:{
    type: "html",
    content: "temas/Overflow.html",
    enabled: false
  },
  'Control de flujo del texto':{
    type: "html",
    content: "temas/FlujoTexto.html",
    enabled: false
  },
  'Object-fit y object-position':{
    type: "html",
    content: "temas/ObjectFP.html",
    enabled: false
  },
  Outline:{
    type: "html",
    content: "temas/Outline.html",
    enabled: false
  },
  Emmet:{
    type: "html",
    content: "temas/Emmet.html",
    enabled: false
  },
  //CSS Flexbox
  'Introducción a Flexbox':{
    type: "html",
    content: "temas/flex-introduccion.html",
    enabled: false
  },
  'Flex Direction, Wrap y Flow':{
    type: "html",
    content: "temas/flex-direction-wrap-flow.html",
    enabled: false
  },
  'Alineación en los ejes':{
    type: "html",
    content: "temas/flex-align-ejes.html",
    enabled: false
  },
  Order:{
    type: "html",
    content: "temas/flex-order.html",
    enabled: false
  },
  'Flex Basis, Shrink y Grow':{
    type: "html",
    content: "temas/flex-basis-shrink-grow.html",
    enabled: false
  },
  'Align Self':{
    type: "html",
    content: "temas/flex-align-self.html",
    enabled: false
  },
  'Layout con Flexbox':{
    type: "html",
    content: "temas/flex-layout-sin-media-queries.html",
    enabled: false
  },
  //Responsive design
};

// Listeners
document
  .querySelectorAll("#clases ul li, #recursos ul li, #consultas ul li")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const texto = item.textContent.trim();
      const data = contentMap[texto];

      if (!data || data.enabled === false) { showNotice(texto); return; }
      openModalWith(data.type, data.content);
    });
  });

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
noticeClose?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.style.display === "flex") closeModal();
});