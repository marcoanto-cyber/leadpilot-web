import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/servicios", "/planes", "/casos", "/contacto"];
  const serviceRoutes = services.map((s) => `/servicios/${s.slug}`);

  return [...routes, ...serviceRoutes].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
