import Link from "next/link";
import type { Metadata } from "next";
import { quizPrograms } from "./quizData";
import { BrainCircuit, ArrowRight, Zap, Code2, Globe, ShieldCheck } from "lucide-react";

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
      </section>

      {/* Modern Quiz Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languageQuizzes.map((program) => {
              const style = quizCardStyle[program.slug] || { color: "text-primary", icon: <BrainCircuit className="h-6 w-6" /> };
              return (
                <Link 
                  key={program.slug} 
                  href={`/quiz/${program.slug}`}
                  className="glass-card p-8 rounded-[32px] border border-border hover:border-primary/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${style.color}`}>
                      {style.icon}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2 opacity-60">Quiz Module</div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed opacity-70 mb-8 line-clamp-2">
                      {program.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
                    Start Assessment <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
