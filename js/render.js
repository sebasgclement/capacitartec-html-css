// js/render.js
// Construye el DOM de las secciones a partir de los datos del curso.
// Usamos createElement + textContent (en vez de innerHTML) para no
// tener que escapar comillas ni acentos en los títulos.

import { modules, resumenes, ejercicios, toolbox, secuencias } from "./course.js";
import { estaVisto, contar } from "./progreso.js";

const ICONOS = { html: "📄", pdf: "📕", img: "🖼️" };
const NOMBRE_TIPO = { html: "Ficha", pdf: "PDF", img: "Imagen" };

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("data-") || key.startsWith("aria-")) node.setAttribute(key, value);
    else node[key] = value;
  }
  for (const child of [].concat(children)) {
    if (child) node.append(child);
  }
  return node;
}

function chip(texto, clase) {
  return el("span", { class: `chip ${clase}`, text: texto });
}

// "básico" → "basico", para poder usarlo como clase CSS
function sinAcentos(texto) {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

// Un tema = <li> con un <button>. Botón y no <li> pelado para que
// funcione con teclado y los lectores de pantalla lo anuncien.
function temaItem(topic) {
  const disponible = topic.enabled !== false && !!topic.content;

  const boton = el(
    "button",
    {
      type: "button",
      class: "tema",
      "data-topic": topic.id,
      "aria-disabled": disponible ? null : "true",
    },
    [
      el("span", { class: "tema-icono", "aria-hidden": "true", text: ICONOS[topic.type] ?? "📄" }),
      el("span", { class: "solo-lectores", text: `${NOMBRE_TIPO[topic.type] ?? "Ficha"}: ` }),
      el("span", { class: "tema-titulo", text: topic.title }),
      topic.duracion ? chip(topic.duracion, "chip-meta") : null,
      disponible ? null : chip("próximamente", "chip-soon"),
      disponible ? el("span", { class: "tema-check", "aria-hidden": "true", text: "✓" }) : null,
    ]
  );

  return el("li", { "data-item": topic.id }, boton);
}

function moduloItem(mod) {
  const total = mod.topics.length;
  const pendientes = mod.topics.filter((t) => t.enabled === false || !t.content).length;
  const conMaterial = secuencias.get(mod.id)?.length ?? 0;

  const barra = conMaterial
    ? el(
        "span",
        {
          class: "barra",
          "data-barra": mod.id,
          role: "progressbar",
          "aria-label": `Progreso de ${mod.title}`,
          "aria-valuemin": "0",
          "aria-valuemax": String(conMaterial),
          "aria-valuenow": "0",
        }
      )
    : null;

  const resumen = el("summary", {}, [
    el("span", { class: "modulo-titulo", text: mod.title }),
    chip(mod.nivel, `chip-nivel nivel-${sinAcentos(mod.nivel)}`),
    pendientes ? chip(`${pendientes} en preparación`, "chip-soon") : null,
    el("span", { class: "modulo-meta" }, [
      barra,
      el("span", {
        class: "modulo-conteo",
        "data-conteo": mod.id,
        text: conMaterial ? `0/${conMaterial}` : `${total} temas`,
      }),
    ]),
  ]);

  const lista = el("ul", { class: "temas" }, mod.topics.map(temaItem));

  return el("details", { class: "modulo", id: `mod-${mod.id}`, "data-modulo": mod.id }, [
    resumen,
    lista,
  ]);
}

export function renderCurso() {
  const contenedorClases = document.querySelector("#lista-modulos");
  if (contenedorClases) {
    contenedorClases.replaceChildren(...modules.map(moduloItem));
  }

  const contenedorResumenes = document.querySelector("#lista-resumenes");
  if (contenedorResumenes) {
    contenedorResumenes.replaceChildren(...resumenes.map(temaItem));
  }

  const contenedorEjercicios = document.querySelector("#lista-ejercicios");
  if (contenedorEjercicios) {
    const bloques = ejercicios.flatMap((grupo) => [
      el("h3", { class: "grupo-titulo", text: grupo.grupo }),
      el("ul", { class: "temas" }, grupo.items.map(temaItem)),
    ]);
    contenedorEjercicios.replaceChildren(...bloques);
  }

  const contenedorToolbox = document.querySelector("#lista-toolbox");
  if (contenedorToolbox) {
    const items = toolbox.map((tool) =>
      el("li", {}, [
        el("span", { class: "tema-icono", "aria-hidden": "true", text: tool.icon }),
        el("a", { class: "no-link", href: tool.url, target: "_blank", rel: "noopener noreferrer" }, [
          el("span", { class: "tool-nombre", text: tool.title }),
          el("span", { class: "tool-desc", text: ` — ${tool.desc}` }),
        ]),
      ])
    );
    contenedorToolbox.replaceChildren(...items);
  }

  sincronizarProgreso();
}

// -----------------------------------------------------
// Refleja en el DOM el estado guardado en progreso.js.
// Se llama al arrancar y cada vez que cambia el progreso.
// -----------------------------------------------------
export function sincronizarProgreso() {
  document.querySelectorAll("[data-topic]").forEach((boton) => {
    boton.classList.toggle("visto", estaVisto(boton.dataset.topic));
  });

  let hechos = 0;
  let totales = 0;

  for (const [coleccionId, ids] of secuencias) {
    const vistos = contar(ids);
    hechos += vistos;
    totales += ids.length;

    const barra = document.querySelector(`[data-barra="${coleccionId}"]`);
    if (barra) {
      const pct = ids.length ? (vistos / ids.length) * 100 : 0;
      barra.style.setProperty("--avance", `${pct}%`);
      barra.setAttribute("aria-valuenow", String(vistos));
      barra.classList.toggle("completa", ids.length > 0 && vistos === ids.length);
    }

    const conteo = document.querySelector(`[data-conteo="${coleccionId}"]`);
    if (conteo && ids.length) conteo.textContent = `${vistos}/${ids.length}`;
  }

  const global = document.querySelector("#progresoGlobal");
  if (global) {
    const pct = totales ? Math.round((hechos / totales) * 100) : 0;
    global.style.setProperty("--avance", `${pct}%`);
    global.setAttribute("aria-valuenow", String(hechos));
    global.setAttribute("aria-valuemax", String(totales));
  }

  const texto = document.querySelector("#progresoTexto");
  if (texto) {
    texto.textContent = hechos
      ? `${hechos} de ${totales} temas vistos`
      : `${totales} temas disponibles`;
  }

  const btnReiniciar = document.querySelector("#reiniciarProgreso");
  if (btnReiniciar) btnReiniciar.hidden = hechos === 0;
}
