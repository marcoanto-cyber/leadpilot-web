import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServicePage } from "@/components/ServicePage";

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
  return <ServicePage service={service} />;
}
