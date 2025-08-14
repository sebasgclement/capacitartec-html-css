// js/modal.js

export class ModalController {
  constructor({
    overlay = "#modal",
    box = ".modal-box",
    btnClose = "#modalClose",
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
    this.$html = document.querySelector(htmlFrame);
    this.$pdf = document.querySelector(pdfFrame);
    this.$img = document.querySelector(imgEl);
    this.$notice = document.querySelector(notice);
    this.$noticeClose = document.querySelector(noticeClose);
    this.$noticeTopic = document.querySelector(noticeTopic);

    // Validación mínima
    if (!this.$overlay) throw new Error("Modal overlay no encontrado");
    if (!this.$box) throw new Error("Modal box no encontrada");

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
      if (e.key === "Escape" && this.$overlay.style.display === "flex") {
        this.close();
      }
    });
  }

  // Helpers internos
  #hide(el) { if (el) el.hidden = true; }
  #show(el, asFlex = false) {
    if (!el) return;
    el.hidden = false;
    if (asFlex) el.style.display = "flex";
    else el.style.removeProperty("display");
  }
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

  // API pública
  openContent(type, src) {
    this.#hideAll();
    this.#show(this.$box, true);

    switch (type) {
      case "html":
        this.$html.src = src;
        this.#show(this.$html);
        break;
      case "pdf":
        this.$pdf.src = src;
        this.#show(this.$pdf);
        break;
      case "img":
        this.$img.src = src;
        this.#show(this.$img);
        break;
      default:
        return this.openNotice();
    }

    this.$overlay.style.display = "flex";
  }

  openNotice(topicText = "") {
    this.#hideAll();
    if (this.$noticeTopic) {
      this.$noticeTopic.textContent = topicText ? `Tema: ${topicText}` : "";
      this.$noticeTopic.style.display = topicText ? "inline-block" : "none";
    }
    this.#show(this.$notice, true);      // notice como flex-card
    this.$overlay.style.display = "flex";
    setTimeout(() => this.$noticeClose?.focus(), 0);
  }

  close() {
    this.$overlay.style.display = "none";
    this.#hideAll();
  }
}
