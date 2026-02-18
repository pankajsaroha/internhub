"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  QUIZ_QUESTIONS_PER_ATTEMPT,
  QUIZ_ADVANCED_PER_ATTEMPT,
  QUIZ_EASY_PER_ATTEMPT,
  type QuizQuestion,
  type QuizProgram,
} from "@/app/quiz/quizData";

type QuizRunnerProps = {
  program: QuizProgram;
};

function pickRandomQuestions(questionBank: QuizQuestion[]) {
  const easyPool = questionBank.filter((q) => q.difficulty === "easy");
  const advancedPool = questionBank.filter((q) => q.difficulty === "advanced");

  const shuffle = (items: QuizQuestion[]) => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const easyPicked = shuffle(easyPool).slice(
    0,
    Math.min(QUIZ_EASY_PER_ATTEMPT, easyPool.length)
  );
  const advancedPicked = shuffle(advancedPool).slice(
    0,
    Math.min(QUIZ_ADVANCED_PER_ATTEMPT, advancedPool.length)
  );

  const selected = [...easyPicked, ...advancedPicked];
  if (selected.length < QUIZ_QUESTIONS_PER_ATTEMPT) {
    const pickedIds = new Set(selected.map((q) => q.id));
    const remaining = shuffle(questionBank.filter((q) => !pickedIds.has(q.id)));
    selected.push(
      ...remaining.slice(
        0,
        Math.min(
          QUIZ_QUESTIONS_PER_ATTEMPT - selected.length,
          remaining.length
        )
      )
    );
  }

  const shuffled = shuffle(selected);
  return shuffled.slice(
    0,
    Math.min(QUIZ_QUESTIONS_PER_ATTEMPT, shuffled.length)
  );
}

export default function QuizRunner({ program }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptQuestions, setAttemptQuestions] = useState<QuizQuestion[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setAttemptQuestions(pickRandomQuestions(program.questionBank));
    setIsReady(true);
  }, [program.slug, program.questionBank]);

  const currentQuestion = attemptQuestions[currentIndex];
  const totalQuestions = attemptQuestions.length;
  const answeredCount = attemptQuestions.reduce((count, _, idx) => {
    return answers[idx] !== undefined ? count + 1 : count;
  }, 0);
  const score = attemptQuestions.reduce((total, question, idx) => {
    return answers[idx] === question.answerIndex ? total + 1 : total;
  }, 0);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

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
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setAttemptQuestions(pickRandomQuestions(program.questionBank));
  }

  return (
    <section className="page-container quiz-detail-page">
      <header className="quiz-header">
        <h1>{program.title}</h1>
        <p>{program.description}</p>
        <div className="quiz-meta">
          <span>{totalQuestions} Questions</span>
          <span>{program.durationMinutes} Minutes</span>
        </div>
      </header>

      {!submitted ? (
        <div className="quiz-panel">
          <div className="quiz-progress">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{answeredCount} answered</span>
          </div>

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
            Your score: {score}/{totalQuestions} ({percentage}%)
          </p>

          <div className="quiz-review">
            {attemptQuestions.map((question, idx) => {
              const selected = answers[idx];
              const isCorrect = selected === question.answerIndex;

              return (
                <article key={question.id} className="quiz-review-item">
                  <h3>{question.question}</h3>
                  <p>
                    Your answer:{" "}
                    <strong>
                      {selected !== undefined
                        ? question.options[selected]
                        : "Not answered"}
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
            <Link href="/quiz" className="btn-primary">
              Back to Quiz List
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
