import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import { getQuizProgramBySlug } from "../quizData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getQuizProgramBySlug(slug);

  if (!program) {
    return {
      title: "Quiz Not Found",
    };
  }

  const quizKeywords = [
    program.title.toLowerCase(),
    `${program.title.toLowerCase()} quiz`,
    `${program.title.toLowerCase()} mcq`,
    `${program.title.toLowerCase()} interview questions`,
    `${program.slug.replace(/-/g, " ")} quiz`,
    "programming quiz",
    "technical mcq",
    "coding interview practice",
    "online coding quiz",
  ];

  return {
    title: `${program.title}`,
    description: `${program.description} Practice level-based technical MCQs on Inzivoo.`,
    keywords: Array.from(new Set(quizKeywords)),
    alternates: {
      canonical: `/quiz/${program.slug}`,
    },
    openGraph: {
      title: `${program.title} | Inzivoo`,
      description: `${program.description} Practice technical MCQs and improve coding interview readiness.`,
      url: `/quiz/${program.slug}`,
    },
  };
}

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getQuizProgramBySlug(slug);

  if (!program) {
    return notFound();
  }

  return <QuizRunner program={program} />;
}
