// js/ui.js
import { contentMap } from "./content-map.js"

export function wireContentClicks(modalCtrl) {
  // Delegamos sobre los 3 bloques que contienen <li>
  const roots = document.querySelectorAll("#clases, #recursos, #consultas");
  roots.forEach((root) => {
    root.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (!li) return;

      const texto = li.textContent.trim();
      const data = contentMap[texto];

      // No existe o disabled → aviso
      if (!data || data.enabled === false) {
        modalCtrl.openNotice(texto);
        return;
      }

      modalCtrl.openContent(data.type, data.content);
    });
  });
}
