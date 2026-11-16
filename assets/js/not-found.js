import { waLink } from "./whatsapp.js";

document.querySelectorAll(".js-wa-link").forEach((link) => {
  link.href = waLink();
});
