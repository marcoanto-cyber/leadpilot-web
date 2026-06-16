import { CALENDAR_URL, whatsappUrl, site } from "@/lib/config";
import { PlaneMark } from "@/components/icons";

const links = [
  { href: "#problema", label: "Problema" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#planes", label: "Planes" },
  { href: "#casos", label: "Casos" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-cloud/70">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a
              href="#inicio"
              className="flex items-center gap-2.5 font-display text-lg font-bold text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-coral text-white">
                <PlaneMark className="h-5 w-5" />
              </span>
              {site.name}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Tu copiloto de inteligencia artificial. Automatizamos la atención,
              el seguimiento y las tareas repetitivas de tu PyME para que dejes
              de perder clientes.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Agenda una llamada
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row">
          <p>
            © {year} {site.name}. Hecho en México.
          </p>
          <p className="text-cloud/50">
            Automatización con IA para PyMEs.
          </p>
        </div>
      </div>
    </footer>
  );
}
