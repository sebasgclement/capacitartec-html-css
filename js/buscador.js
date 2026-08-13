// js/buscador.js
// Filtra los 120 temas de la página en vivo. Busca sobre el título
// del tema, el del módulo y los tags opcionales, ignorando acentos
// y mayúsculas (para que "grafico" encuentre "gráfico").

import { modules, resumenes, ejercicios, topicsById } from "./course.js";

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

// id → texto sobre el que buscamos
const indice = new Map();

function indexar(topic, contexto = "") {
  const partes = [topic.title, contexto, ...(topic.tags ?? [])];
  indice.set(topic.id, normalizar(partes.join(" ")));
}

for (const mod of modules) {
  for (const topic of mod.topics) indexar(topic, mod.title);
}
for (const topic of resumenes) indexar(topic, "resumen");
for (const grupo of ejercicios) {
  for (const topic of grupo.items) indexar(topic, `ejercicio ${grupo.grupo}`);
}

function coincide(id, terminos) {
  const heno = indice.get(id) ?? "";
  return terminos.every((t) => heno.includes(t));
}

export function wireBuscador() {
  const input = document.querySelector("#buscar");
  const salida = document.querySelector("#buscarResultado");
  const limpiar = document.querySelector("#buscarLimpiar");
  if (!input) return;

  const items = [...document.querySelectorAll("[data-item]")];
  const modulos = [...document.querySelectorAll(".modulo")];
  const grupos = [...document.querySelectorAll(".grupo-titulo")];

  // Recordamos qué módulos estaban abiertos antes de buscar, para
  // devolverlos a su estado cuando se limpia el campo.
  let abiertosPrevios = null;

  function filtrar() {
    const consulta = normalizar(input.value);
    const terminos = consulta.split(/\s+/).filter(Boolean);
    const buscando = terminos.length > 0;

    if (buscando && abiertosPrevios === null) {
      abiertosPrevios = modulos.filter((m) => m.open).map((m) => m.dataset.modulo);
    }

    let encontrados = 0;

    for (const li of items) {
      const visible = !buscando || coincide(li.dataset.item, terminos);
      li.hidden = !visible;
      if (visible && buscando) encontrados++;
    }

    for (const modulo of modulos) {
      const conResultados = [...modulo.querySelectorAll("[data-item]")].some((li) => !li.hidden);
      modulo.hidden = buscando && !conResultados;
      if (buscando) modulo.open = conResultados;
    }

    // Ocultamos el subtítulo de un grupo de ejercicios si quedó vacío
    for (const titulo of grupos) {
      const lista = titulo.nextElementSibling;
      const conResultados = lista
        ? [...lista.querySelectorAll("[data-item]")].some((li) => !li.hidden)
        : false;
      titulo.hidden = buscando && !conResultados;
    }

    if (!buscando && abiertosPrevios !== null) {
      for (const modulo of modulos) {
        modulo.open = abiertosPrevios.includes(modulo.dataset.modulo);
      }
      abiertosPrevios = null;
    }

    if (salida) {
      if (!buscando) salida.textContent = "";
      else if (encontrados === 0) salida.textContent = `Sin resultados para "${input.value.trim()}"`;
      else salida.textContent = `${encontrados} ${encontrados === 1 ? "tema" : "temas"}`;
    }

    if (limpiar) limpiar.hidden = !buscando;
  }

  input.addEventListener("input", filtrar);

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    input.value = "";
    filtrar();
  });

  limpiar?.addEventListener("click", () => {
    input.value = "";
    filtrar();
    input.focus();
  });

  // Atajo: "/" enfoca el buscador desde cualquier parte de la página
  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const activo = document.activeElement;
    if (activo && /^(INPUT|TEXTAREA|SELECT)$/.test(activo.tagName)) return;
    e.preventDefault();
    input.focus();
    input.select();
  });

  filtrar();
}
