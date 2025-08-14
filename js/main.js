// js/main.js
import { ModalController } from "./modal.js";
import { wireContentClicks } from "./ui.js";

const modalCtrl = new ModalController(); // usa los selectores por defecto
wireContentClicks(modalCtrl);

// Listo. Si querés exponerlo en consola para debug:
// window.modalCtrl = modalCtrl;
