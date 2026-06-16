import Link from "next/link";
import type { Metadata } from "next";
import { quizPrograms } from "./quizData";

export const metadata: Metadata = {
  title: "Programming Quizzes",
  description:
    "Practice Java, Python, Go, JavaScript, C++, C#, Rust, and pseudocode quizzes on Inzivoo with level-based technical MCQs.",
  keywords: [
    "programming quizzes",
    "java quiz",
    "python quiz",
    "go quiz",
    "javascript quiz",
    "c++ quiz",
    "c# quiz",
    "rust quiz",
    "technical mcq quiz",
    "coding interview quiz",
    "level based programming quiz",
  ],
  alternates: {
    canonical: "/quiz",
  },
};

const quizCardStyle: Record<string, { color: string; icon: any }> = {
  "java-programming": {
    color: "text-purple-500",
    icon: <Code2 className="h-6 w-6" />,
  },
  "python-programming": {
    color: "text-emerald-500",
    icon: <Zap className="h-6 w-6" />,
  },
  "go-programming": {
    color: "text-sky-500",
    icon: <Globe className="h-6 w-6" />,
  },
  "cpp-programming": {
    color: "text-indigo-500",
    icon: <Code2 className="h-6 w-6" />,
  },
  "javascript-programming": {
    color: "text-green-500",
    icon: <Code2 className="h-6 w-6" />,
  },
  "csharp-programming": {
    color: "text-sky-500",
    icon: <Code2 className="h-6 w-6" />,
  },
  "rust-programming": {
    color: "text-purple-500",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  "pseudocode-programming": {
    color: "text-blue-500",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
};

export default function QuizListPage() {
  const languageQuizzes = quizPrograms
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="min-h-screen bg-background">
      {/* Premium Hero */}
      <section className="relative pt-20 pb-16 border-b border-border bg-[#0d1117] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/70 text-[10px] font-black tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm">
              <BrainCircuit className="h-3 w-3 text-primary" />
              Skill Validation
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 text-white leading-tight">
                Technical <br />
                <span className="text-primary text-glow-sm">Assessments</span>
            </h1>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl opacity-80">
              Validate your expertise with production-grade quizzes. 
              Switch between Fresher, Experienced, and Premium tiers.
            </p>
          </div>
        </div>
      );
    });
  }

  return (
    <section className="page-container quiz-page">
      <header className="quiz-list-header">
        <h1>Programming Quizzes</h1>
        <p>
          Practice level-based programming quizzes to build confidence in core concepts, coding logic, and technical interview preparation.
        </p>
      </header>

      <div className="cards">
        {renderQuizCards(languageQuizzes)}
      </div>
    </section>
  );
}
