import type { SVGProps } from "react";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ChainBreakIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 13a4 4 0 0 0 5.66 0l1.5-1.5" />
      <path d="M15 11a4 4 0 0 0-5.66 0L7.5 12.5" />
      <path d="M5 5l2 2" />
      <path d="M17 17l2 2" />
    </svg>
  );
}

export function RepeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9a5 5 0 0 1 5-5h7l-2-2m2 2-2 2" />
      <path d="M20 15a5 5 0 0 1-5 5H8l2 2m-2-2 2-2" />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z" />
    </svg>
  );
}

export function WrenchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.6-.7-.7-2.6z" />
    </svg>
  );
}

export function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l3.5-3.5" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} {...props}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.985-1.04zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  );
}

export function PlaneMark(props: SVGProps<SVGSVGElement>) {
  // Marca de avión estilizada para el logotipo
  return (
    <svg viewBox="0 0 24 24" fill="none" width={24} height={24} {...props}>
      <path
        d="M3 13.5 21 4l-6.5 17-3-7-7.5-1Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="m11.5 14 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} {...props}>
      <path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c.3 0 .6 0 .8-.1-.5 1.6-1.9 2.8-3.6 3.1l.5 1.9c3.2-.6 5.8-3.4 5.8-7.4V10.5C11 8 9 6 7.5 6Zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c.3 0 .6 0 .8-.1-.5 1.6-1.9 2.8-3.6 3.1l.5 1.9c3.2-.6 5.8-3.4 5.8-7.4V10.5C20 8 18 6 16.5 6Z" />
    </svg>
  );
}
