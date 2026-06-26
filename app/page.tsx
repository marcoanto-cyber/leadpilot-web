import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site, CALENDAR_URL, whatsappUrl } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  areaServed: "MX",
  serviceType: "Automatización con inteligencia artificial para PyMEs",
  availableLanguage: "es-MX",
  sameAs: [CALENDAR_URL, whatsappUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        {/* Todo lo que va debajo del hero se renderiza de forma diferida:
            el navegador omite su paint hasta que el usuario se acerca. */}
        <div className="cv-auto"><Problem /></div>
        <div className="cv-auto"><Benefits /></div>
        <div className="cv-auto"><HowItWorks /></div>
        <div className="cv-auto"><Services /></div>
        <div className="cv-auto"><Plans /></div>
        <div className="cv-auto"><Testimonials /></div>
        <div className="cv-auto"><FinalCTA /></div>
      </main>
    </>
  );
}
