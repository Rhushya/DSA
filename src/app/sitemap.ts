import type { MetadataRoute } from "next";

const BASE_URL = "https://studynotes.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        { path: "/", priority: 1.0 },
        { path: "/dsa", priority: 0.9 },
        { path: "/cn", priority: 0.8 },
        { path: "/os", priority: 0.8 },
        { path: "/sql", priority: 0.8 },
    ];

    return routes.map((route) => ({
        url: `${BASE_URL}${route.path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route.priority,
    }));
}
