"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  QUIZ_QUESTIONS_PER_ATTEMPT,
  QUIZ_EXPERIENCED_TOTAL_PER_ATTEMPT,
  QUIZ_PREMIUM_TOTAL_PER_ATTEMPT,
  QUIZ_ADVANCED_PER_ATTEMPT,
  QUIZ_EASY_PER_ATTEMPT,
  QUIZ_EXPERIENCED_EASY_PER_ATTEMPT,
  QUIZ_EXPERIENCED_ADVANCED_PER_ATTEMPT,
  QUIZ_MAX_QUESTIONS_PER_ATTEMPT,
  QUIZ_PREMIUM_EASY_PER_ATTEMPT,
  QUIZ_PREMIUM_ADVANCED_PER_ATTEMPT,
  QUIZ_PREMIUM_PER_ATTEMPT,
  type QuizQuestion,
  type QuizProgram,
} from "@/app/quiz/quizData";

type QuizRunnerProps = {
  program: QuizProgram;
};

type QuizAttemptLevel = "basic" | "intermediate" | "premium";

type AttemptFilters = {
  level: QuizAttemptLevel;
};

function pickRandomQuestions(questionBank: QuizQuestion[], filters: AttemptFilters) {
  const easyPool = questionBank.filter((q) => q.difficulty === "easy");
  const advancedPool = questionBank.filter((q) => q.difficulty === "advanced");
  const premiumPool = questionBank.filter((q) => q.difficulty === "premium");

  const shuffle = (items: QuizQuestion[]) => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const easyTarget =
    filters.level === "premium"
      ? QUIZ_PREMIUM_EASY_PER_ATTEMPT
      : filters.level === "intermediate"
      ? QUIZ_EXPERIENCED_EASY_PER_ATTEMPT
      : QUIZ_EASY_PER_ATTEMPT;
  const advancedTarget =
    filters.level === "premium"
      ? QUIZ_PREMIUM_ADVANCED_PER_ATTEMPT
      : filters.level === "intermediate"
      ? QUIZ_EXPERIENCED_ADVANCED_PER_ATTEMPT
      : QUIZ_ADVANCED_PER_ATTEMPT;
  const premiumTarget = filters.level === "premium" ? QUIZ_PREMIUM_PER_ATTEMPT : 0;
  const totalTarget =
    filters.level === "premium"
      ? QUIZ_PREMIUM_TOTAL_PER_ATTEMPT
      : filters.level === "intermediate"
      ? QUIZ_EXPERIENCED_TOTAL_PER_ATTEMPT
      : QUIZ_QUESTIONS_PER_ATTEMPT;

  const easyPicked = shuffle(easyPool).slice(0, Math.min(easyTarget, easyPool.length));
  const advancedPicked = shuffle(advancedPool).slice(
    0,
    Math.min(advancedTarget, advancedPool.length)
  );
  const premiumPicked = shuffle(premiumPool).slice(
    0,
    Math.min(premiumTarget, premiumPool.length)
  );

  const selected = [...easyPicked, ...advancedPicked, ...premiumPicked];
  if (selected.length < totalTarget) {
    const pickedIds = new Set(selected.map((q) => q.id));
    const preferredFallbackPool =
      filters.level === "premium"
        ? [
            ...shuffle(premiumPool),
            ...shuffle(advancedPool),
            ...shuffle(easyPool),
          ]
        : filters.level === "intermediate"
        ? [...shuffle(advancedPool), ...shuffle(easyPool), ...shuffle(premiumPool)]
        : [...shuffle(easyPool), ...shuffle(advancedPool)];
    const remaining = preferredFallbackPool.filter((q) => !pickedIds.has(q.id));
    selected.push(
      ...remaining.slice(
        0,
        Math.min(
          totalTarget - selected.length,
          remaining.length
        )
      )
    );
  }

  const shuffled = shuffle(selected);
  return shuffled.slice(
    0,
    Math.min(totalTarget, QUIZ_MAX_QUESTIONS_PER_ATTEMPT, shuffled.length)
  );
}

export default function QuizRunner({ program }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptQuestions, setAttemptQuestions] = useState<QuizQuestion[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<QuizAttemptLevel>("basic");
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(
    program.durationMinutes * 60
  );

  function setLevel(level: QuizAttemptLevel) {
    setSelectedLevel(level);
  }

  function startAttempt(filters: AttemptFilters) {
    if (!hasStarted && typeof window !== "undefined") {
      window.history.pushState({ quizAttempt: true }, "", window.location.href);
    }
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setAttemptQuestions(pickRandomQuestions(program.questionBank, filters));
    setTimeLeftSeconds(program.durationMinutes * 60);
    setHasStarted(true);
    setIsReady(true);
  }

  const confirmExitAttempt = useCallback(() => {
    if (submitted || !hasStarted) return true;

    return window.confirm(
      "Are you sure you want to exit the quiz? Your current progress will be lost."
    );
  }, [
    submitted,
    hasStarted,
  ]);

  useEffect(() => {
    const initialFilters: AttemptFilters = { level: "basic" };
    setLevel(initialFilters.level);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setAttemptQuestions([]);
    setHasStarted(false);
    setTimeLeftSeconds(program.durationMinutes * 60);
    setIsReady(true);
  }, [program.slug, program.questionBank, program.durationMinutes]);

  useEffect(() => {
    if (!isReady || submitted || !hasStarted) return;

    const intervalId = window.setInterval(() => {
      setTimeLeftSeconds((previous) => {
        if (previous <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isReady, submitted, hasStarted]);

  useEffect(() => {
    if (!isReady || submitted || !hasStarted || timeLeftSeconds > 0) return;
    setSubmitted(true);
  }, [isReady, submitted, hasStarted, timeLeftSeconds]);

  useEffect(() => {
    const onPopState = () => {
      if (!hasStarted) return;
      if (!confirmExitAttempt()) {
        window.history.pushState({ quizAttempt: true }, "", window.location.href);
        return;
      }
      setCurrentIndex(0);
      setAnswers({});
      setSubmitted(false);
      setAttemptQuestions([]);
      setTimeLeftSeconds(program.durationMinutes * 60);
      setHasStarted(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [hasStarted, program.durationMinutes, confirmExitAttempt]);

  useEffect(() => {
    if (!hasStarted || submitted) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const onLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank") return;

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (nextUrl.href === currentUrl.href) return;

      if (!confirmExitAttempt()) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onLinkClick, true);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [hasStarted, submitted, confirmExitAttempt]);

  const currentQuestion = attemptQuestions[currentIndex];
  const totalQuestions = attemptQuestions.length;
  const answeredCount = attemptQuestions.reduce((count, _, idx) => {
    return answers[idx] !== undefined ? count + 1 : count;
  }, 0);
  const attemptedQuestions = attemptQuestions
    .map((question, idx) => ({ question, idx, selected: answers[idx] }))
    .filter((entry) => entry.selected !== undefined);
  const score = attemptedQuestions.reduce((total, entry) => {
    return entry.selected === entry.question.answerIndex ? total + 1 : total;
  }, 0);

  const percentage =
    attemptedQuestions.length > 0
      ? Math.round((score / attemptedQuestions.length) * 100)
      : 0;
  const timerMinutes = Math.floor(timeLeftSeconds / 60);
  const timerSeconds = timeLeftSeconds % 60;
  const formattedTimeLeft = `${String(timerMinutes).padStart(2, "0")}:${String(
    timerSeconds
  ).padStart(2, "0")}`;

  if (!isReady) {
    return (
      <section className="page-container quiz-detail-page">
        <header className="quiz-header">
          <h1>{program.title}</h1>
          <p>{program.description}</p>
        </header>
        <div className="quiz-panel">
          <div className="quiz-progress">
            <span>Loading questions…</span>
          </div>
        </div>
      </section>
    );
  }

  if (!hasStarted) {
    return (
      <section className="page-container quiz-detail-page">
        <header className="quiz-header">
          <h1>{program.title}</h1>
          <p>{program.description}</p>
          <div className="quiz-meta">
            <span>{program.durationMinutes} Minutes</span>
            <span>Select experience level and start quiz</span>
          </div>
        </header>

        <div className="quiz-panel">
          <div className="quiz-actions">
            <select
              value={selectedLevel}
              onChange={(event) =>
                setLevel(event.target.value as QuizAttemptLevel)
              }
              aria-label="Select level"
            >
              <option value="basic">Basic Level</option>
              <option value="intermediate">Intermediate Level</option>
              <option value="premium">Advanced Level</option>
            </select>
            <button type="button" onClick={applyFilters} className="btn-primary">
              Start Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="page-container quiz-detail-page">
        <header className="quiz-header">
          <h1>{program.title}</h1>
          <p>No questions available right now.</p>
        </header>
      </section>
    );
  }

  function selectOption(optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  }

  function goNext() {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function submitQuiz() {
    setSubmitted(true);
  }

  function restartQuiz() {
    startAttempt({ level: selectedLevel });
  }

  function applyFilters() {
    startAttempt({ level: selectedLevel });
  }

  function returnToSetup() {
    if (!confirmExitAttempt()) return;
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setAttemptQuestions([]);
    setTimeLeftSeconds(program.durationMinutes * 60);
    setHasStarted(false);
  }

  return (
    <section className="page-container quiz-detail-page">
      <header className="quiz-header">
        <h1>{program.title}</h1>
        <p>{program.description}</p>
        <div className="quiz-meta">
          <span>{totalQuestions} Questions</span>
          <span>Time Left: {formattedTimeLeft}</span>
        </div>
      </header>

      {!submitted ? (
        <div className="quiz-panel">
          <div className="quiz-progress">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>
              {answeredCount} answered |{" "}
              {selectedLevel === "basic"
                ? "Basic"
                : selectedLevel === "intermediate"
                ? "Intermediate"
                : "Expert"}
            </span>
          </div>

          {currentQuestion.codeSnippet ? (
            <pre className="quiz-code">{currentQuestion.codeSnippet}</pre>
          ) : null}

          <h2>{currentQuestion.question}</h2>

          <div className="quiz-options">
            {currentQuestion.options.map((option, optionIndex) => {
              const isSelected = answers[currentIndex] === optionIndex;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectOption(optionIndex)}
                  className={`quiz-option ${isSelected ? "selected" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button type="button" onClick={returnToSetup} className="btn-secondary">
              Change Setup
            </button>
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0}
              className="btn-secondary"
            >
              Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button type="button" onClick={goNext} className="btn-primary">
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submitQuiz}
                className="btn-primary"
                disabled={answeredCount !== totalQuestions}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Completed</h2>
          <p>
            Your score: {score}/{attemptedQuestions.length} ({percentage}%)
          </p>
          {attemptedQuestions.length < totalQuestions ? (
            <p>
              You attempted only {attemptedQuestions.length} out of {totalQuestions} questions.
            </p>
          ) : null}

          <div className="quiz-review">
            {attemptedQuestions.map(({ question, selected }) => {
              const isCorrect = selected === question.answerIndex;

              return (
                <article key={question.id} className="quiz-review-item">
                  {question.codeSnippet ? (
                    <pre className="quiz-code">{question.codeSnippet}</pre>
                  ) : null}
                  <h3>{question.question}</h3>
                  <p>
                    Your answer:{" "}
                    <strong>
                      {selected !== undefined ? question.options[selected] : "Not answered"}
                    </strong>
                  </p>
                  <p>
                    Correct answer:{" "}
                    <strong>{question.options[question.answerIndex]}</strong>
                  </p>
                  <p className={isCorrect ? "correct" : "incorrect"}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  <p>{question.explanation}</p>
                </article>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button type="button" onClick={restartQuiz} className="btn-secondary">
              Retake Quiz
            </button>
            <button type="button" onClick={returnToSetup} className="btn-secondary">
              Change Setup
            </button>
            <Link href="/quiz" className="btn-primary">
              Back to Quiz List
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
