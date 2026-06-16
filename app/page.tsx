import { Navbar } from "@/components/Navbar";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Plans } from "@/components/sections/Plans";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
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
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Plans />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
