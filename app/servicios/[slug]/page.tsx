import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServicePage } from "@/components/ServicePage";
import { ServiceAutomationVisual } from "@/components/ServiceAutomationVisual";

// Motion graphics propio por servicio (los demás usan el placeholder on-brand).
const visuals: Record<string, ReactNode> = {
  "automatizaciones-ia": <ServiceAutomationVisual />,
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
  return <ServicePage service={service} visual={visuals[service.slug]} />;
}
