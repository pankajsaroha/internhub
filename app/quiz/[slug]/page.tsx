import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import { getQuizProgramBySlug } from "../quizData";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function QuizDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getQuizProgramBySlug(slug);

  if (!program) {
    return notFound();
  }

  return <QuizRunner program={program} />;
}
