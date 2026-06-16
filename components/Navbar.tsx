"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALENDAR_URL, site } from "@/lib/config";
import { PlaneMark } from "./icons";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/planes", label: "Planes" },
  { href: "/casos", label: "Casos" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`container-px flex items-center justify-between rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-navy/85 py-2.5 shadow-card backdrop-blur-md"
            : "border-transparent bg-transparent py-3"
        }`}
        aria-label="Navegación principal"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-coral text-white">
            <PlaneMark className="h-5 w-5" />
          </span>
          {site.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white ${
                  isActive(l.href) ? "text-white" : "text-cloud/80"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2.5 !text-sm"
          >
            Agenda una llamada
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white md:hidden"
        >
          <span className="sr-only">Menú</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="container-px mt-2 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-card backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-medium hover:bg-white/10 hover:text-white ${
                    isActive(l.href) ? "text-white" : "text-cloud/85"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3 w-full"
          >
            Agenda una llamada
          </a>
        </div>
      )}
    </header>
  );
}
