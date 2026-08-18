// =====================================================
// Fuente única de verdad del curso
// -----------------------------------------------------
// Todo el índice (módulos, temas, resúmenes, ejercicios y
// toolbox) vive acá. index.html no repite ningún título:
// las secciones se renderizan desde estos datos.
//
// Cada tema:
//   id       → clave estable. Es lo que viaja en data-topic
//              y en la URL. No cambiarlo una vez publicado.
//   title    → texto visible. Se puede editar libremente.
//   type     → "html" | "pdf" | "img"
//   content  → ruta al recurso (null si todavía no existe)
//   enabled  → false lo muestra atenuado como "próximamente"
//
// Opcionales (se renderizan solo si están presentes):
//   duracion → ej. "15 min"
//   tags     → ["flexbox", "alineación"]
//   mdn      → URL a la documentación de referencia
//   objetivo → una línea de "qué vas a poder hacer"
// =====================================================

export const modules = [
  {
    id: "html-basico",
    title: "HTML Básico",
    nivel: "básico",
    topics: [
      { id: "historia", title: "Historia", type: "html", content: "temas/historia.html", enabled: true },
      { id: "dom", title: "Estructura del DOM", type: "img", content: "img/DOM.png", enabled: true },
      { id: "parrafo", title: "Párrafo", type: "pdf", content: "pdfs/parrafo.pdf", enabled: true },
      { id: "encabezados", title: "Encabezados", type: "pdf", content: "pdfs/Encabezados.pdf", enabled: true },
      { id: "listas", title: "Listas", type: "pdf", content: "pdfs/listas.pdf", enabled: true },
      { id: "enlaces", title: "Enlaces", type: "pdf", content: "pdfs/enlaces.pdf", enabled: true },
      { id: "bloque-linea", title: "Etiquetas de bloque/línea", type: "img", content: "img/etiquetas.png", enabled: true },
      { id: "rutas", title: "Rutas", type: "img", content: "img/rutas.png", enabled: true },
      { id: "formularios", title: "Formularios", type: "html", content: "temas/formularios.html", enabled: true },
    ],
  },
  {
    id: "css-basico",
    title: "CSS Básico",
    nivel: "básico",
    topics: [
      { id: "insercion", title: "Inserción", type: "img", content: "img/insercion.png", enabled: true },
      { id: "selectores", title: "Selectores (elemento, clase y id)", type: "html", content: "temas/selectores.html", enabled: true },
      { id: "propiedades-texto", title: "Propiedades de texto", type: "html", content: "temas/propiedades-texto.html", enabled: true },
      { id: "tipografias-externas", title: "Tipografías externas", type: "html", content: "temas/tipografias-externas.html", enabled: true },
      { id: "box-model", title: "Modelo de caja (box model)", type: "img", content: "img/Box-Model.png", enabled: true },
      { id: "padding-margin", title: "Padding y margin", type: "html", content: "temas/padding-margin.html", enabled: true },
      { id: "borders", title: "Borders", type: "html", content: "temas/bordes.html", enabled: true },
      { id: "box-sizing", title: "Box sizing", type: "html", content: "temas/box-sizing.html", enabled: true },
      { id: "lab-box-model", title: "🧪 Laboratorio: Modelo de caja", type: "html", content: "temas/lab-box-model.html", enabled: true },
      { id: "colorimetria", title: "Colorimetría (rgba, hexadecimal, hsl)", type: "html", content: "temas/colorimetria.html", enabled: true },
      { id: "unidades-medida", title: "Unidades de medida (absolutas y relativas)", type: "html", content: "temas/unidades-medida.html", enabled: true },
      { id: "background", title: "Background", type: "html", content: "temas/background.html", enabled: true },
      { id: "gradientes", title: "Gradientes", type: "html", content: "temas/gradiente.html", enabled: true },
      { id: "shadows", title: "Shadows", type: "html", content: "temas/shadows.html", enabled: true },
    ],
  },
  {
    id: "html-intermedio",
    title: "HTML Intermedio",
    nivel: "intermedio",
    topics: [
      { id: "comentarios", title: "Comentarios", type: "img", content: "img/comentarios.png", enabled: true },
      { id: "favicon", title: "Favicon", type: "img", content: "img/faicon.png", enabled: true },
      { id: "metadatos", title: "Metadatos", type: "html", content: "temas/metadatos.html", enabled: true },
      { id: "metatags-io", title: "Metatags.io", type: "html", content: "temas/metatagsIO.html", enabled: true },
      { id: "textarea", title: "Textarea", type: "html", content: "temas/textarea.html", enabled: true },
      { id: "labels", title: "Labels", type: "html", content: "temas/label.html", enabled: true },
      { id: "select", title: "Select, datalist y option", type: "html", content: "temas/select.html", enabled: true },
      { id: "fieldset", title: "Fieldset y legend", type: "html", content: "temas/fieldset.html", enabled: true },
      { id: "details", title: "Details y summary", type: "html", content: "temas/details.html", enabled: true },
      { id: "enlaces-avanzados", title: "Enlaces avanzados", type: "html", content: "temas/enlacesAvanzados.html", enabled: true },
      { id: "audio-video", title: "Audio y Video", type: "html", content: "temas/audioVideo.html", enabled: true },
      { id: "lazy-loading", title: "Lazy Loading", type: "html", content: "temas/lazyLoad.html", enabled: true },
      { id: "html-obsoleto", title: "HTML Obsoleto", type: "html", content: "temas/HTMLObsoleto.html", enabled: true },
      { id: "html-semantico", title: "HTML Semántico", type: "html", content: "temas/HTMLSemantico.html", enabled: true },
      { id: "accesibilidad", title: "Accesibilidad WEB", type: "html", content: "temas/accesibilidad.html", enabled: true },
    ],
  },
  {
    id: "css-intermedio",
    title: "CSS Intermedio",
    nivel: "intermedio",
    topics: [
      { id: "selectores-avanzados", title: "Selectores avanzados", type: "html", content: "temas/selectoresAvanzados.html", enabled: true },
      { id: "especificidad", title: "Herencia, Cascada y Especificidad", type: "html", content: "temas/EspecificidadHerencia.html", enabled: true },
      { id: "pseudoclases", title: "Pseudoclases", type: "html", content: "temas/Pseudoclase.html", enabled: true },
      { id: "pseudoelementos", title: "Pseudoelementos", type: "html", content: "temas/Pseudoelemento.html", enabled: true },
      { id: "bem", title: "Metodología BEM", type: "html", content: "temas/MetodologiaBEM.html", enabled: true },
      { id: "display", title: "Display", type: "html", content: "temas/Display.html", enabled: true },
      { id: "posicion-relativa-absoluta", title: "Posición relativa y absoluta", type: "html", content: "temas/PosicionRA.html", enabled: true },
      { id: "ventanas-modal", title: "Ventanas Modal", type: "html", content: "temas/ventanaModal.html", enabled: true },
      { id: "fixed-sticky", title: "Posición fixed y sticky", type: "html", content: "temas/FixedSticky.html", enabled: true },
      { id: "transiciones-css", title: "CSS Transiciones", type: "html", content: "temas/Transiciones.html", enabled: true },
      { id: "overflow", title: "Overflow", type: "html", content: "temas/Overflow.html", enabled: true },
      { id: "flujo-texto", title: "Control de flujo del texto", type: "html", content: "temas/FlujoTexto.html", enabled: true },
      { id: "object-fit", title: "Object-fit y object-position", type: "html", content: "temas/ObjectFP.html", enabled: true },
      { id: "outline", title: "Outline", type: "html", content: "temas/Outline.html", enabled: true },
      { id: "emmet", title: "Emmet", type: "html", content: "temas/Emmet.html", enabled: true },
    ],
  },
  {
    id: "flexbox",
    title: "CSS Flexbox",
    nivel: "intermedio",
    topics: [
      { id: "flex-intro", title: "Introducción a Flexbox", type: "html", content: "temas/flex-introduccion.html", enabled: true },
      { id: "flex-direction", title: "Flex Direction, Wrap y Flow", type: "html", content: "temas/flex-direction-wrap-flow.html", enabled: true },
      { id: "flex-ejes", title: "Alineación en los ejes", type: "html", content: "temas/flex-align-ejes.html", enabled: true },
      { id: "flex-order", title: "Order", type: "html", content: "temas/flex-order.html", enabled: true },
      { id: "flex-basis", title: "Flex Basis, Shrink y Grow", type: "html", content: "temas/flex-basis-shrink-grow.html", enabled: true },
      { id: "flex-align-self", title: "Align Self", type: "html", content: "temas/flex-align-self.html", enabled: true },
      { id: "flex-layout", title: "Layout con Flexbox", type: "html", content: "temas/flex-layout-sin-media-queries.html", enabled: true },
    ],
  },
  {
    id: "responsive",
    title: "Responsive Design",
    nivel: "intermedio",
    topics: [
      { id: "responsive-bloques", title: "Bloques y multimedia flexible", type: "html", content: "temas/responsive-bloques-multimedia.html", enabled: true },
      { id: "responsive-srcset", title: "SRCSET y SIZES", type: "html", content: "temas/responsive-srcset-sizes.html", enabled: true },
      { id: "responsive-picture", title: "Picture, Source y Media", type: "html", content: "temas/responsive-picture-source-media.html", enabled: true },
      { id: "responsive-media-queries", title: "Media Queries", type: "html", content: "temas/responsive-media-queries.html", enabled: true },
      { id: "responsive-holy-grail", title: 'Ejercicio "Holy Grail"', type: "html", content: "temas/responsive-holy-grail.html", enabled: true },
      { id: "responsive-mobile-first", title: "Mobile First", type: "html", content: "temas/responsive-mobile-first.html", enabled: true },
      { id: "responsive-feature-queries", title: "Feature Queries", type: "html", content: "temas/responsive-feature-queries.html", enabled: true },
      { id: "responsive-container-queries", title: "Container Queries", type: "html", content: "temas/responsive-container-queries.html", enabled: true },
    ],
  },
  {
    id: "grid",
    title: "CSS Grid",
    nivel: "intermedio",
    topics: [
      { id: "grid-intro", title: "Introducción a CSS Grid", type: "html", content: "temas/grid-01-introduccion.html", enabled: true },
      { id: "grid-creando", title: "Creando un Grid", type: "html", content: "temas/grid-02-creando-un-grid.html", enabled: true },
      { id: "grid-auto-fr", title: "Auto y fr", type: "html", content: "temas/grid-03-auto-fr.html", enabled: true },
      { id: "grid-repeat-minmax", title: "Repeat y Minmax", type: "html", content: "temas/grid-04-repeat-minmax.html", enabled: true },
      { id: "grid-implicito", title: "Grid implícito y explícito", type: "html", content: "temas/grid-05-implicito-explicito.html", enabled: true },
      { id: "grid-responsive", title: "Grid dinámico y responsive", type: "html", content: "temas/grid-06-dinamico-responsive.html", enabled: true },
      { id: "grid-column-row", title: "Grid column y row", type: "html", content: "temas/grid-07-column-row.html", enabled: true },
      { id: "grid-dense", title: "Grid flow: dense", type: "html", content: "temas/grid-08-flow-dense.html", enabled: true },
      { id: "grid-areas", title: "Grid areas", type: "html", content: "temas/grid-09-areas.html", enabled: true },
      { id: "grid-alineacion", title: "Alineación con Grid", type: "html", content: "temas/grid-10-alineacion.html", enabled: true },
      { id: "grid-subgrid", title: "Subgrid", type: "html", content: "temas/grid-11-subgrid.html", enabled: true },
      { id: "grid-pagina-web", title: "Creando una página web", type: "html", content: "temas/grid-12-pagina-web.html", enabled: true },
    ],
  },
  {
    id: "animaciones",
    title: "Animaciones",
    nivel: "avanzado",
    topics: [
      { id: "anim-transiciones", title: "Transiciones", type: "html", content: "temas/01-transiciones.html", enabled: false },
      { id: "anim-animaciones", title: "Animaciones", type: "html", content: "temas/02-animaciones.html", enabled: false },
      { id: "anim-typewriter", title: "Botones animados y Typewriter", type: "html", content: "temas/03-botones-typewriter.html", enabled: false },
      { id: "anim-scroll", title: "Animaciones con scroll", type: "html", content: "temas/04-scroll.html", enabled: false },
      { id: "anim-rango", title: "Rango de animaciones", type: "html", content: "temas/05-rango.html", enabled: false },
      { id: "anim-integracion", title: "Integración en proyectos", type: "html", content: "temas/06-integracion.html", enabled: false },
      { id: "anim-promesas", title: "Animaciones y promesas", type: "html", content: "temas/07-promesas.html", enabled: false },
    ],
  },
  {
    id: "bootstrap",
    title: "Mini Bootstrap",
    nivel: "avanzado",
    topics: [
      { id: "bs-framework", title: "Framework CSS", type: "html", content: "temas/bootstrap/01-framework.html", enabled: false },
      { id: "bs-que-es", title: "¿Qué es Bootstrap y por qué es útil?", type: "html", content: "temas/bootstrap/02-que-es.html", enabled: false },
      { id: "bs-cdn", title: "Cómo incluirlo por CDN", type: "html", content: "temas/bootstrap/03-cdn.html", enabled: false },
      { id: "bs-contenedores", title: "Tipos de contenedores", type: "html", content: "temas/bootstrap/04-contenedores.html", enabled: false },
      { id: "bs-grillas", title: "Sistema de grillas", type: "html", content: "temas/bootstrap/05-grillas.html", enabled: false },
      { id: "bs-utilitarias", title: "Clases utilitarias", type: "html", content: "temas/bootstrap/06-utilitarias.html", enabled: false },
      { id: "bs-componentes", title: "Componentes", type: "html", content: "temas/bootstrap/07-componentes.html", enabled: false },
      { id: "bs-breakpoints", title: "Breakpoints", type: "html", content: "temas/bootstrap/08-breakpoints.html", enabled: false },
      { id: "bs-navbar", title: "Responsive y navbar", type: "html", content: "temas/bootstrap/09-navbar.html", enabled: false },
      { id: "bs-acordeones", title: "Acordeones y modales", type: "html", content: "temas/bootstrap/10-acordeones.html", enabled: false },
      { id: "bs-css-personalizado", title: "Bootstrap y CSS personalizado", type: "html", content: "temas/bootstrap/11-css-personalizado.html", enabled: false },
      { id: "bs-tips", title: "Tips de buenas prácticas", type: "html", content: "temas/bootstrap/12-tips.html", enabled: false },
    ],
  },
  {
    id: "avanzado",
    title: "Sección Avanzada",
    nivel: "avanzado",
    topics: [
      { id: "adv-filter", title: "Filter y Backdrop Filter", type: "html", content: null, enabled: false },
      { id: "adv-transform", title: "Transform", type: "html", content: null, enabled: false },
      { id: "adv-clamp", title: "Min, Max y Clamp", type: "html", content: null, enabled: false },
      { id: "adv-variables", title: "Variables (custom properties)", type: "html", content: null, enabled: false },
      { id: "adv-calc", title: "Función Calc", type: "html", content: null, enabled: false },
      { id: "adv-scroll", title: "Propiedades del Scroll", type: "html", content: null, enabled: false },
      { id: "adv-initial-letter", title: "Initial Letter", type: "html", content: null, enabled: false },
      { id: "adv-viewport", title: "Unidades del Viewport", type: "html", content: null, enabled: false },
      { id: "adv-content-sizing", title: "Min-content, Max-content y Fit-content", type: "html", content: null, enabled: false },
      { id: "adv-color-mix", title: "Función Color Mix", type: "html", content: null, enabled: false },
    ],
  },
];

export const resumenes = [
  { id: "res-html-basico", title: "Html básico", type: "html", content: "temas/guia-etiquetas.html", enabled: true },
  { id: "res-css-basico", title: "Css básico", type: "html", content: "temas/css_basico_resumen.html", enabled: true },
  { id: "res-html-avanzado", title: "HTML avanzado", type: "html", content: "temas/html_intermedio_resumen.html", enabled: true },
  { id: "res-css-avanzado", title: "Css avanzado", type: "html", content: "temas/ResumenCCSI.html", enabled: true },
  { id: "res-flexbox", title: "CSS flexbox", type: "html", content: "temas/flex-resumen.html", enabled: true },
  { id: "res-responsive", title: "Responsive design", type: "html", content: "temas/responsive-resumen.html", enabled: true },
  { id: "res-grid", title: "CSS grid", type: "html", content: "temas/grid-resumen.html", enabled: true },
  { id: "res-animaciones", title: "Resumen animaciones", type: "html", content: "temas/00-resumen.html", enabled: false },
  { id: "res-bootstrap", title: "Resumen Bootstrap", type: "html", content: "temas/bootstrap/00-resumen.html", enabled: false },
];

export const ejercicios = [
  {
    grupo: "Html y CSS básico",
    items: [
      { id: "integrador-1", title: "INTEGRADOR 1", type: "html", content: "temas/IntegradorI.html", enabled: true },
      { id: "integrador-2", title: "INTEGRADOR 2", type: "html", content: "temas/IntegradorII.html", enabled: true },
      { id: "integrador-3", title: "INTEGRADOR 3", type: "html", content: "temas/integrador-instrucciones.html", enabled: false },
    ],
  },
];

export const toolbox = [
  { icon: "🚀", url: "https://www.transparenttextures.com/", title: "Transparent Textures", desc: "Texturas transparentes" },
  { icon: "🎨", url: "https://coolors.co/", title: "Coolors", desc: "Paletas de colores" },
  { icon: "💡", url: "https://onepagelove.com/", title: "One Page Love", desc: "Inspiración de sitios" },
  { icon: "🎯", url: "https://dribbble.com/", title: "Dribbble", desc: "Diseño profesional" },
  { icon: "⚙️", url: "https://cssgradient.io/", title: "CSS Gradient", desc: "Fondos con gradientes" },
  { icon: "🔤", url: "https://htmlentities.dev/", title: "HTML Entities", desc: "Caracteres especiales" },
  { icon: "💻", url: "https://codepen.io/", title: "CodePen", desc: "Probar código online" },
];

// -----------------------------------------------------
// Índice plano por id. Lo usan el modal, los deep links
// y (más adelante) el buscador y el progreso.
// -----------------------------------------------------
export const topicsById = new Map();

for (const mod of modules) {
  for (const topic of mod.topics) {
    topicsById.set(topic.id, { ...topic, moduleId: mod.id, nivel: mod.nivel });
  }
}
for (const item of resumenes) {
  topicsById.set(item.id, { ...item, moduleId: "resumenes" });
}
for (const grupo of ejercicios) {
  for (const item of grupo.items) {
    topicsById.set(item.id, { ...item, moduleId: "ejercicios" });
  }
}

export function getTopic(id) {
  return topicsById.get(id) ?? null;
}

// Un tema es "disponible" si está habilitado y tiene material cargado.
export function disponible(topic) {
  return !!topic && topic.enabled !== false && !!topic.content;
}

// -----------------------------------------------------
// Secuencias: el orden en que se recorren los temas con
// las flechas ‹ › del modal. Solo entran los disponibles,
// así las flechas nunca caen en un "próximamente".
// -----------------------------------------------------
export const secuencias = new Map();
export const nombreColeccion = new Map();

for (const mod of modules) {
  secuencias.set(mod.id, mod.topics.filter(disponible).map((t) => t.id));
  nombreColeccion.set(mod.id, mod.title);
}

secuencias.set("resumenes", resumenes.filter(disponible).map((t) => t.id));
nombreColeccion.set("resumenes", "Resúmenes");

secuencias.set(
  "ejercicios",
  ejercicios.flatMap((g) => g.items).filter(disponible).map((t) => t.id)
);
nombreColeccion.set("ejercicios", "Ejercicios");

// Devuelve { anterior, siguiente, posicion, total, coleccion } para un tema.
export function contexto(id) {
  const topic = getTopic(id);
  if (!topic) return null;

  const lista = secuencias.get(topic.moduleId) ?? [];
  const i = lista.indexOf(id);
  if (i === -1) return null;

  return {
    anterior: i > 0 ? lista[i - 1] : null,
    siguiente: i < lista.length - 1 ? lista[i + 1] : null,
    posicion: i + 1,
    total: lista.length,
    coleccion: nombreColeccion.get(topic.moduleId) ?? "",
  };
}
