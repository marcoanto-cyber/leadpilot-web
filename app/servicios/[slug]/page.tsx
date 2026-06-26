import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServicePage } from "@/components/ServicePage";
import { ServiceAutomationVisual } from "@/components/ServiceAutomationVisual";
import { ServiceMarketingVisual } from "@/components/ServiceMarketingVisual";
import { ServiceCRMVisual } from "@/components/ServiceCRMVisual";
import { WhatsAppChatDemo } from "@/components/WhatsAppChatDemo";

// Motion graphics propio por servicio (los demás usan el placeholder on-brand).
const visuals: Record<string, ReactNode> = {
  "automatizaciones-ia": <ServiceAutomationVisual />,
  marketing: <ServiceMarketingVisual />,
  "ventas-crm": <ServiceCRMVisual />,
};

// Animación interactiva dentro del mockup de teléfono (sección "Así se ve").
const phoneDemos: Record<string, ReactNode> = {
  "automatizaciones-ia": <WhatsAppChatDemo />,
};

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.name} — Lead Pilot`,
    description: service.tagline,
    alternates: { canonical: `/servicios/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      visual={visuals[service.slug]}
      phoneDemo={phoneDemos[service.slug]}
    />
  );
}
