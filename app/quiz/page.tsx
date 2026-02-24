import Link from "next/link";
import { quizPrograms } from "./quizData";

const quizCardStyle: Record<string, { accent: string; tag: string; card: string; iconClass: string }> = {
  "java-programming": {
    accent: "quiz-card-purple",
    tag: "Language",
    card: "card card-purple",
    iconClass: "purple",
  },
  "python-programming": {
    accent: "quiz-card-emerald",
    tag: "Language",
    card: "card card-emerald",
    iconClass: "emerald",
  },
  "go-programming": {
    accent: "quiz-card-sky",
    tag: "Language",
    card: "card card-sky",
    iconClass: "sky",
  },
  "cpp-programming": {
    accent: "quiz-card-indigo",
    tag: "Language",
    card: "card card-indigo",
    iconClass: "indigo",
  },
  "javascript-programming": {
    accent: "quiz-card-green",
    tag: "Language",
    card: "card card-green",
    iconClass: "green",
  },
  "csharp-programming": {
    accent: "quiz-card-sky",
    tag: "Language",
    card: "card card-sky",
    iconClass: "sky",
  },
  "rust-programming": {
    accent: "quiz-card-purple",
    tag: "Language",
    card: "card card-purple",
    iconClass: "purple",
  },
  "pseudocode-programming": {
    accent: "quiz-card-blue",
    tag: "Algorithm",
    card: "card card-blue",
    iconClass: "blue",
  },
};

function renderProgramIcon(slug: string) {
  switch (slug) {
    case "java-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 17h6a3 3 0 003-3V7H5v7a3 3 0 003 3z"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <path d="M17 9h1a2 2 0 010 4h-1" stroke="#a855f7" strokeWidth="2" />
          <path
            d="M9 3s2 1 2 3-2 2-2 4"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "python-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 3c4 0 4 2 4 4H8c0-2 0-4 4-4z" stroke="#10b981" strokeWidth="2" />
          <path d="M12 21c-4 0-4-2-4-4h8c0 2 0 4-4 4z" stroke="#10b981" strokeWidth="2" />
          <circle cx="10" cy="6" r="1" fill="#10b981" />
          <circle cx="14" cy="18" r="1" fill="#10b981" />
        </svg>
      );
    case "go-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M4 12h10l-3-3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 12l-3 3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="12" r="2" stroke="#0ea5e9" strokeWidth="2" />
        </svg>
      );
    case "cpp-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="#6366f1" strokeWidth="2" />
          <path d="M9 12h4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 10v4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 10v4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "javascript-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#22c55e" strokeWidth="2" />
          <path
            d="M9 9h2v6a2 2 0 01-2 2"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 15c0 1 1 2 2 2s2-1 2-2c0-2-4-1-4-3 0-1 1-2 2-2s2 1 2 2"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "csharp-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M8 12h4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 10v4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 10v4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "rust-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#a855f7" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" stroke="#a855f7" strokeWidth="2" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="#a855f7" strokeWidth="2" />
        </svg>
      );
    case "pseudocode-programming":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#3b82f6" strokeWidth="2" />
          <path d="M8 8h8M8 12h6M8 16h5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 12l2 2 3-3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function QuizListPage() {
  const languageQuizzes = quizPrograms
    .sort((a, b) => a.title.localeCompare(b.title));

  function renderQuizCards(programs: typeof quizPrograms) {
    return programs.map((program) => {
      const style = quizCardStyle[program.slug];
      return (
        <div key={program.slug} className={style?.card ?? "card"}>
          <div className={`program-icon ${style?.iconClass ?? ""}`}>
            {renderProgramIcon(program.slug)}
          </div>
          <span className="program-tag">{style?.tag ?? "Program"}</span>
          <h3>{program.title}</h3>
          <p>{program.description}</p>
          <Link href={`/quiz/${program.slug}`} className="view-link">
            Start Quiz
          </Link>
        </div>
      );
    });
  }

  return (
    <section className="page-container quiz-page">
      <header className="quiz-list-header">
        <h1>Programming Quizzes</h1>
        <p>
          Practice topic-wise quizzes with fresher and experienced levels to build confidence step by step.
        </p>
      </header>

      <div className="cards">
        {renderQuizCards(languageQuizzes)}
      </div>
    </section>
  );
}
