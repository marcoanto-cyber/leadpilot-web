// ============================================================
//  CONFIGURACIÓN DE LEAD PILOT
//  Cambia aquí tus enlaces, número de WhatsApp y datos de marca.
//  No necesitas tocar el resto del código.
// ============================================================

export const site = {
  name: "Lead Pilot",
  // Texto que aparece en la pestaña del navegador y en buscadores
  title: "Lead Pilot — Automatización con IA para PyMEs en México",
  description:
    "Deja de perder clientes por no responder a tiempo. Automatizamos tu atención, seguimiento y tareas repetitivas con inteligencia artificial. Agenda una llamada.",
  // Cambia esto cuando tengas tu dominio (para Open Graph / SEO)
  url: "https://leadpilot.mx",
  locale: "es_MX",
};

// --- Botón principal: agendar llamada (Cal.com) ---
export const CALENDAR_URL =
  "https://cal.com/marco-antonio-hernandez-gonzalez-416bep/30min";

// --- WhatsApp ---
// Número en formato internacional, solo dígitos (sin +, espacios ni guiones).
export const WHATSAPP_NUMBER = "526684242824";
export const WHATSAPP_MESSAGE =
  "Hola, vengo de la web de Lead Pilot y quiero agendar una llamada.";

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
