"use client";

import { whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
}
