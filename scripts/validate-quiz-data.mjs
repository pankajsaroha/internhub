import { quizPrograms } from "../app/quiz/quizData.ts";

const issues = [];

for (const program of quizPrograms) {
  const seenIds = new Set();

  for (const question of program.questionBank) {
    if (seenIds.has(question.id)) {
      issues.push(`${program.slug}: duplicate id ${question.id}`);
    }
    seenIds.add(question.id);

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      issues.push(
        `${program.slug}#${question.id}: expected 4 options, found ${question.options?.length}`
      );
    }

    if (
      !Number.isInteger(question.answerIndex) ||
      question.answerIndex < 0 ||
      question.answerIndex >= question.options.length
    ) {
      issues.push(
        `${program.slug}#${question.id}: invalid answerIndex ${question.answerIndex}`
      );
    }

    const uniqueOptions = new Set(question.options);
    if (uniqueOptions.size !== question.options.length) {
      issues.push(`${program.slug}#${question.id}: duplicate option text found`);
    }

    if (!question.topic?.trim()) {
      issues.push(`${program.slug}#${question.id}: empty topic`);
    }
    if (!question.question?.trim()) {
      issues.push(`${program.slug}#${question.id}: empty question text`);
    }
    if (!question.explanation?.trim()) {
      issues.push(`${program.slug}#${question.id}: empty explanation`);
    }
  }

  const difficultyDistribution = program.questionBank.reduce(
    (acc, question) => {
      acc[question.difficulty] = (acc[question.difficulty] ?? 0) + 1;
      return acc;
    },
    /** @type {Record<string, number>} */ ({})
  );

  console.log(
    `${program.slug}: ${program.questionBank.length} questions`,
    difficultyDistribution
  );
}

if (issues.length > 0) {
  console.error(`\nValidation failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("\nQuiz validation passed: no answer-key structural issues found.");
