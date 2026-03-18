import type { MetadataRoute } from "next";
import { programs } from "./programs/ProgramData";
import { quizPrograms } from "./quiz/quizData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inzivoo.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/apply",
    "/contact",
    "/how-it-works",
    "/privacy",
    "/programs",
    "/quiz",
    "/submit",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const programRoutes = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const quizRoutes = quizPrograms.map((program) => ({
    url: `${baseUrl}/quiz/${program.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...programRoutes, ...quizRoutes];
}
