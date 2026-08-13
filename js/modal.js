// js/modal.js

export class ModalController {
  constructor({
    overlay = "#modal",
    box = ".modal-box",
    btnClose = "#modalClose",
    title = "#modalTitle",
    htmlFrame = "#modalHtml",
    pdfFrame = "#modalPdf",
    imgEl = "#modalImg",
    notice = "#modalNotice",
    noticeClose = "#noticeClose",
    noticeTopic = "#noticeTopic",
  } = {}) {
    // Cache de elementos
    this.$overlay = document.querySelector(overlay);
    this.$box = document.querySelector(box);
    this.$btnClose = document.querySelector(btnClose);
    this.$title = document.querySelector(title);
    this.$html = document.querySelector(htmlFrame);
    this.$pdf = document.querySelector(pdfFrame);
    this.$img = document.querySelector(imgEl);
    this.$notice = document.querySelector(notice);
    this.$noticeClose = document.querySelector(noticeClose);
    this.$noticeTopic = document.querySelector(noticeTopic);

    // Validación mínima
    if (!this.$overlay) throw new Error("Modal overlay no encontrado");
    if (!this.$box) throw new Error("Modal box no encontrada");

    // A quién le devolvemos el foco al cerrar
    this.$ultimoFoco = null;

    // Hook opcional: js/navegacion.js lo usa para limpiar la URL
    this.alCerrar = null;

    this.#bindEvents();
  }

  // Eventos (click fuera, X, botón de aviso, Escape)
  #bindEvents() {
    this.$btnClose?.addEventListener("click", () => this.close());
    this.$overlay.addEventListener("click", (e) => {
      if (e.target === this.$overlay) this.close();
    });
    this.$noticeClose?.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.abierto) this.close();
    });
  }

  get abierto() {
    return this.$overlay.classList.contains("is-open");
  }

  // Helpers internos
  #hide(el) { if (el) el.hidden = true; }
  #show(el) { if (el) el.hidden = false; }

  #clearMedia() {
    if (this.$html) { this.$html.src = ""; this.#hide(this.$html); }
    if (this.$pdf)  { this.$pdf.src  = ""; this.#hide(this.$pdf);  }
    if (this.$img)  { this.$img.src  = ""; this.#hide(this.$img);  }
  }

  #hideAll() {
    this.#clearMedia();
    this.#hide(this.$notice);
    this.#hide(this.$box);
  }

  #abrirOverlay() {
    // Solo recordamos el foco de afuera. Si el modal ya estaba abierto
    // (se navegó con ‹ ›), el activeElement es un botón interno.
    if (!this.abierto) this.$ultimoFoco = document.activeElement;
    this.$overlay.classList.add("is-open");
    document.body.classList.add("modal-abierto");
  }

  // API pública
  openContent(type, src, titulo = "") {
    const yaEstabaAbierto = this.abierto;
    this.#hideAll();
    this.#show(this.$box);

    if (this.$title) {
      this.$title.textContent = titulo;
      this.$title.hidden = !titulo;
    }

    switch (type) {
      case "html":
        this.$html.src = src;
        this.$html.title = titulo || "Contenido del tema";
        this.#show(this.$html);
        break;
      case "pdf":
        this.$pdf.src = src;
        this.$pdf.title = titulo || "Documento PDF";
        this.#show(this.$pdf);
        break;
      case "img":
        this.$img.src = src;
        this.$img.alt = titulo || "Imagen del tema";
        this.#show(this.$img);
        break;
      default:
        return this.openNotice(titulo);
    }

    this.#abrirOverlay();
    // Al navegar con ‹ › no robamos el foco: se queda en la flecha.
    if (!yaEstabaAbierto) setTimeout(() => this.$btnClose?.focus(), 0);
  }

  openNotice(topicText = "") {
    this.#hideAll();
    if (this.$noticeTopic) {
      this.$noticeTopic.textContent = topicText ? `Tema: ${topicText}` : "";
      this.$noticeTopic.hidden = !topicText;
    }
    this.#show(this.$notice);
    this.#abrirOverlay();
    setTimeout(() => this.$noticeClose?.focus(), 0);
  }

  close() {
    this.$overlay.classList.remove("is-open");
    document.body.classList.remove("modal-abierto");
    this.#hideAll();
    this.$ultimoFoco?.focus?.();
    this.$ultimoFoco = null;
    this.alCerrar?.();
  }
}
