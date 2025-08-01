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
  "Historia": {
    type: "html",
    content: "temas/historia.html"
  },
  "Estructura del DOM": {
    type: "pdf",
    content: "pdfs/dom.pdf"
  },
  "Párrafo": {
    type: "img",
    content: "img/parrafo-ejemplo.png"
  }
};

document.querySelectorAll("details ul li").forEach(item => {
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

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalHtml.src = "";
    modalPdf.src = "";
    modalImg.src = "";
  }
});
