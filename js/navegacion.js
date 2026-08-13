// js/navegacion.js
// Centraliza "abrir un tema": actualiza el modal, la URL (para poder
// compartir el link de un tema puntual) y el progreso del alumno.

import { getTopic, contexto, disponible } from "./course.js";
import { marcarVisto } from "./progreso.js";

const PREFIJO = "#tema=";

function temaDeLaURL() {
  const hash = decodeURIComponent(location.hash);
  return hash.startsWith(PREFIJO) ? hash.slice(PREFIJO.length) : null;
}

export class Navegador {
  constructor(modal) {
    this.modal = modal;
    this.actual = null;
    this.sincronizando = false;

    this.$prev = document.querySelector("#modalPrev");
    this.$next = document.querySelector("#modalNext");
    this.$pos = document.querySelector("#modalPos");

    this.$prev?.addEventListener("click", () => this.ir(-1));
    this.$next?.addEventListener("click", () => this.ir(1));

    // Flechas del teclado mientras el modal está abierto
    document.addEventListener("keydown", (e) => {
      if (!this.modal.abierto || !this.actual) return;
      if (e.key === "ArrowLeft") this.ir(-1);
      if (e.key === "ArrowRight") this.ir(1);
    });

    // El modal avisa cuando lo cierran (X, Escape o click afuera)
    this.modal.alCerrar = () => this.#alCerrarModal();

    window.addEventListener("popstate", () => this.#sincronizarConURL());

    // Deep link al entrar: capacitartec.../#tema=grid-areas
    const inicial = temaDeLaURL();
    if (inicial) this.abrir(inicial, { push: false });
  }

  abrir(id, { push = true } = {}) {
    const topic = getTopic(id);

    if (!disponible(topic)) {
      this.actual = null;
      this.#actualizarControles(null);
      this.modal.openNotice(topic?.title ?? id);
      return;
    }

    this.actual = id;
    marcarVisto(id);
    this.modal.openContent(topic.type, topic.content, topic.title);
    this.#actualizarControles(contexto(id));
    this.#revelarEnLaPagina(id);

    if (push && temaDeLaURL() !== id) {
      history.pushState({ tema: id }, "", PREFIJO + encodeURIComponent(id));
    } else if (!push) {
      history.replaceState({ tema: id }, "", PREFIJO + encodeURIComponent(id));
    }
  }

  ir(direccion) {
    const ctx = this.actual ? contexto(this.actual) : null;
    const destino = direccion < 0 ? ctx?.anterior : ctx?.siguiente;
    if (destino) this.abrir(destino);
  }

  // Deja el tema abierto y visible detrás del modal, así al cerrar
  // el alumno queda parado justo donde estaba.
  #revelarEnLaPagina(id) {
    const item = document.querySelector(`[data-item="${CSS.escape(id)}"]`);
    if (!item) return;
    item.closest("details")?.setAttribute("open", "");
    item.scrollIntoView({ block: "center", behavior: "auto" });
  }

  #actualizarControles(ctx) {
    if (this.$prev) this.$prev.disabled = !ctx?.anterior;
    if (this.$next) this.$next.disabled = !ctx?.siguiente;
    if (this.$pos) {
      this.$pos.textContent = ctx ? `${ctx.coleccion} · ${ctx.posicion}/${ctx.total}` : "";
      this.$pos.hidden = !ctx;
    }
  }

  #alCerrarModal() {
    this.actual = null;
    this.#actualizarControles(null);
    if (this.sincronizando) return;

    // Si el tema abierto agregó una entrada al historial, la sacamos
    // con "atrás" para que el botón del navegador siga siendo intuitivo.
    if (history.state?.tema && temaDeLaURL()) history.back();
    else if (temaDeLaURL()) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  #sincronizarConURL() {
    this.sincronizando = true;
    const id = temaDeLaURL();
    if (id) this.abrir(id, { push: false });
    else if (this.modal.abierto) this.modal.close();
    this.sincronizando = false;
  }
}
