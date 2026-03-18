export const QUIZ_QUESTIONS_PER_ATTEMPT = 10;
export const QUIZ_MAX_QUESTIONS_PER_ATTEMPT = 15;
export const QUIZ_DURATION_MINUTES = 10;
export const QUIZ_EASY_PER_ATTEMPT = 10;
export const QUIZ_ADVANCED_PER_ATTEMPT = 0;
export const QUIZ_EXPERIENCED_EASY_PER_ATTEMPT = 4;
export const QUIZ_EXPERIENCED_ADVANCED_PER_ATTEMPT = 6;
export const QUIZ_PREMIUM_EASY_PER_ATTEMPT = 2;
export const QUIZ_PREMIUM_ADVANCED_PER_ATTEMPT = 4;
export const QUIZ_PREMIUM_PER_ATTEMPT = 4;
export const QUIZ_EXPERIENCED_TOTAL_PER_ATTEMPT = 12;
export const QUIZ_PREMIUM_TOTAL_PER_ATTEMPT = 15;

export type QuizDifficulty = "easy" | "advanced" | "premium";

export type QuizQuestion = {
  id: number;
  topic: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  difficulty: QuizDifficulty;
};

export type QuizProgram = {
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  questionBank: QuizQuestion[];
};

const CURATED_TOPIC_QUESTION_PACKS: Record<string, Omit<QuizQuestion, "id">[]> = {
  "java-programming": [
    { topic: "Loops", question: "Which loop is best when the number of iterations is known in advance?", options: ["for", "while", "do-while", "switch"], answerIndex: 0, explanation: "A `for` loop is commonly used when initialization, condition, and update are known upfront.", difficulty: "easy" },
    { topic: "Loops", question: "What happens if the update expression is missing in a `for` loop and the condition never becomes false?", options: ["Loop runs once", "Compile error", "Loop can become infinite", "Java converts it to while false"], answerIndex: 2, explanation: "Without a valid update or exit condition, the loop may never stop.", difficulty: "advanced" },
    { topic: "Collections", question: "Which part of the Java Collections Framework maintains insertion order and allows duplicates?", options: ["Set", "Map", "List", "Queue only"], answerIndex: 2, explanation: "List implementations like ArrayList preserve insertion order and allow duplicates.", difficulty: "easy" },
    { topic: "Collections", question: "Which interface is implemented by `HashMap` in the Java Collections Framework?", options: ["List", "Queue", "Map", "Set"], answerIndex: 2, explanation: "HashMap is a Map implementation, not a Collection implementation directly.", difficulty: "advanced" },
  ],
  "python-programming": [
    { topic: "Loops", question: "Which statement skips the current iteration and moves to the next one in Python?", options: ["stop", "continue", "pass", "break"], answerIndex: 1, explanation: "`continue` skips the rest of the current loop body and proceeds with the next iteration.", difficulty: "easy" },
    { topic: "Loops", question: "When does the `else` block on a Python loop run?", options: ["Only on syntax error", "Only when loop uses range()", "When the loop finishes without `break`", "After every iteration"], answerIndex: 2, explanation: "Loop `else` executes when the loop completes normally without hitting `break`.", difficulty: "advanced" },
    { topic: "Collections", question: "Which Python collection stores unique unordered elements?", options: ["list", "tuple", "set", "dict"], answerIndex: 2, explanation: "A set stores unique elements and does not preserve insertion order in the same way as a list.", difficulty: "easy" },
    { topic: "Collections", question: "Which Python structure is best for fast lookup by key?", options: ["list", "dict", "tuple", "range"], answerIndex: 1, explanation: "A dictionary is the standard key-value structure for fast lookups.", difficulty: "advanced" },
  ],
  "go-programming": [
    { topic: "Loops", question: "Which looping keyword does Go provide for iteration?", options: ["for", "while", "loop", "repeat"], answerIndex: 0, explanation: "Go uses `for` for all loop forms, including while-style loops.", difficulty: "easy" },
    { topic: "Loops", question: "What does `break` do inside a Go loop?", options: ["Skips to next iteration", "Exits the loop", "Restarts the loop", "Closes the channel"], answerIndex: 1, explanation: "`break` exits the nearest enclosing loop or switch.", difficulty: "advanced" },
    { topic: "Collections", question: "Which Go type is most suitable for key-value storage?", options: ["slice", "struct", "map", "array"], answerIndex: 2, explanation: "Go maps are used for key-value data.", difficulty: "easy" },
    { topic: "Collections", question: "Which built-in is commonly used to add elements to a slice?", options: ["push", "append", "insert", "merge"], answerIndex: 1, explanation: "`append` is the idiomatic way to add elements to a slice.", difficulty: "advanced" },
  ],
  "cpp-programming": [
    { topic: "Loops", question: "Which statement immediately exits a loop in C++?", options: ["continue", "break", "return false", "pass"], answerIndex: 1, explanation: "`break` exits the nearest loop immediately.", difficulty: "easy" },
    { topic: "Loops", question: "Which loop guarantees the body runs at least once?", options: ["for", "while", "do-while", "range-for"], answerIndex: 2, explanation: "A `do-while` loop checks its condition after the body executes.", difficulty: "advanced" },
    { topic: "STL", question: "Which STL container is usually preferred for dynamic contiguous storage?", options: ["set", "vector", "map", "stack"], answerIndex: 1, explanation: "`vector` provides contiguous dynamic storage and fast access by index.", difficulty: "easy" },
    { topic: "STL", question: "Which STL container offers key-value pairs with average O(1) lookup?", options: ["vector", "list", "unordered_map", "set"], answerIndex: 2, explanation: "`unordered_map` is hash-based and offers average constant-time lookup.", difficulty: "advanced" },
  ],
  "javascript-programming": [
    { topic: "Loops", question: "Which statement skips to the next iteration of a JavaScript loop?", options: ["pass", "continue", "next", "yield"], answerIndex: 1, explanation: "`continue` skips the rest of the current iteration.", difficulty: "easy" },
    { topic: "Loops", question: "Which loop is designed to iterate over iterable values like arrays?", options: ["for...of", "for...in", "while", "switch"], answerIndex: 0, explanation: "`for...of` iterates over values from iterables such as arrays and strings.", difficulty: "advanced" },
    { topic: "Arrays", question: "Which array method returns a new array containing only matching elements?", options: ["map", "filter", "reduce", "find"], answerIndex: 1, explanation: "`filter` returns a new array of elements that satisfy the condition.", difficulty: "easy" },
    { topic: "Arrays", question: "Which method adds one or more elements to the end of an array?", options: ["shift", "push", "pop", "slice"], answerIndex: 1, explanation: "`push` appends elements to the end of an array.", difficulty: "advanced" },
  ],
  "csharp-programming": [
    { topic: "Loops", question: "Which loop is commonly used when a counter variable controls iteration in C#?", options: ["foreach", "for", "switch", "lock"], answerIndex: 1, explanation: "`for` is the standard loop when using a counter pattern.", difficulty: "easy" },
    { topic: "Loops", question: "What does `continue` do inside a C# loop?", options: ["Ends the method", "Exits the loop", "Skips to the next iteration", "Throws an exception"], answerIndex: 2, explanation: "`continue` skips the remaining statements in the current iteration.", difficulty: "advanced" },
    { topic: "Collections", question: "Which C# collection is best for storing key-value pairs?", options: ["List<T>", "Queue<T>", "Dictionary<TKey,TValue>", "Stack<T>"], answerIndex: 2, explanation: "Dictionary is the idiomatic key-value structure in C#.", difficulty: "easy" },
    { topic: "Collections", question: "Which collection is most appropriate for first-in-first-out processing in C#?", options: ["Stack<T>", "Queue<T>", "HashSet<T>", "List<T>"], answerIndex: 1, explanation: "Queue follows FIFO order.", difficulty: "advanced" },
  ],
  "rust-programming": [
    { topic: "Loops", question: "Which Rust keyword starts an unconditional loop that runs until broken?", options: ["for", "while", "loop", "iterate"], answerIndex: 2, explanation: "`loop` creates an infinite loop until a `break` occurs.", difficulty: "easy" },
    { topic: "Loops", question: "Which Rust loop is typically used to iterate over items in a collection?", options: ["loop", "for", "match", "if let"], answerIndex: 1, explanation: "`for` is the usual way to iterate over items from an iterator.", difficulty: "advanced" },
    { topic: "Collections", question: "Which Rust collection is commonly used for an ordered growable list?", options: ["HashMap", "Vec", "Option", "Result"], answerIndex: 1, explanation: "`Vec<T>` is Rust's growable contiguous collection type.", difficulty: "easy" },
    { topic: "Collections", question: "Which collection should you choose for key-value storage in Rust?", options: ["Vec", "HashMap", "String", "Box"], answerIndex: 1, explanation: "HashMap is the standard key-value collection in Rust.", difficulty: "advanced" },
  ],
  "pseudocode-programming": [
    { topic: "Loop Analysis", question: "If `i` starts at 0 and increases by 1 until `i < 4` is false, how many iterations run?", options: ["3", "4", "5", "Infinite"], answerIndex: 1, explanation: "The values are 0, 1, 2, and 3, so the loop runs 4 times.", difficulty: "easy" },
    { topic: "Loop Analysis", question: "Which update is most likely to create an infinite loop if `n` starts positive and the condition is `WHILE n > 0`?", options: ["n <- n - 1", "n <- n / 2", "n <- n + 1", "n <- 0"], answerIndex: 2, explanation: "Increasing `n` while checking `n > 0` prevents the loop from terminating.", difficulty: "advanced" },
    { topic: "Array Analysis", question: "Which operation is usually fastest for reading the third element of an array?", options: ["Direct indexing", "Linear scan", "Binary search", "Sorting first"], answerIndex: 0, explanation: "Array indexing provides direct access by position.", difficulty: "easy" },
    { topic: "Array Analysis", question: "If an algorithm compares each element of an array with every other element, what time complexity is most likely?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 3, explanation: "Comparing each element with every other element typically leads to quadratic time.", difficulty: "premium" },
  ],
};

function mergeCuratedQuestions(
  programSlug: string,
  questions: Omit<QuizQuestion, "id">[]
): Omit<QuizQuestion, "id">[] {
  const curatedQuestions = CURATED_TOPIC_QUESTION_PACKS[programSlug] ?? [];
  const merged = [...questions];
  const seen = new Set(
    questions.map(
      (question) => `${question.topic}::${question.question.trim().toLowerCase()}`
    )
  );

  for (const question of curatedQuestions) {
    const key = `${question.topic}::${question.question.trim().toLowerCase()}`;
    if (!seen.has(key)) {
      merged.push(question);
      seen.add(key);
    }
  }

  return merged;
}

function buildJavaQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    {
      topic: "OOP",
      question: "Which OOP pillar is achieved by method overriding in Java?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
      answerIndex: 2,
      explanation: "Overriding lets same method name show different behavior at runtime.",
      difficulty: "easy",
    },
    {
      topic: "JDK/JRE/JVM",
      question: "Which component is required to compile Java source code?",
      options: ["JRE", "JDK", "JVM", "JIT only"],
      answerIndex: 1,
      explanation: "JDK includes javac compiler and development tools.",
      difficulty: "easy",
    },
    {
      topic: "String",
      question: "What is true about `String` in Java?",
      options: ["It is mutable", "It is immutable", "It cannot be compared", "It cannot store Unicode"],
      answerIndex: 1,
      explanation: "String objects are immutable once created.",
      difficulty: "easy",
    },
    {
      topic: "Collections",
      question: "Which collection does NOT allow duplicate elements?",
      options: ["ArrayList", "LinkedList", "HashSet", "Vector"],
      answerIndex: 2,
      explanation: "Set implementations store unique elements.",
      difficulty: "easy",
    },
    {
      topic: "Exception Handling",
      question: "Which block always executes after try/catch (except JVM crash)?",
      options: ["throw", "throws", "finally", "final"],
      answerIndex: 2,
      explanation: "Finally block is used for cleanup and executes in normal cases.",
      difficulty: "easy",
    },
    {
      topic: "Access Modifiers",
      question: "Which access modifier provides widest visibility?",
      options: ["private", "protected", "default", "public"],
      answerIndex: 3,
      explanation: "Public members are accessible from anywhere.",
      difficulty: "easy",
    },
    {
      topic: "Static",
      question: "What is true for a static method?",
      options: ["Requires object to call", "Can directly use non-static fields", "Belongs to class, not object", "Can be overridden normally"],
      answerIndex: 2,
      explanation: "Static methods are class-level methods.",
      difficulty: "easy",
    },
    {
      topic: "Interfaces",
      question: "A class in Java can implement how many interfaces?",
      options: ["Only one", "Two", "Unlimited", "None"],
      answerIndex: 2,
      explanation: "Java supports multiple interface implementation.",
      difficulty: "easy",
    },
    {
      topic: "Array",
      question: "Default value of `int[] arr = new int[3]` elements is:",
      options: ["null", "0", "1", "undefined"],
      answerIndex: 1,
      explanation: "Primitive int default is 0.",
      difficulty: "easy",
    },
    {
      topic: "Wrapper Classes",
      question: "Which is wrapper class for `int`?",
      options: ["Int", "Number", "Integer", "Long"],
      answerIndex: 2,
      explanation: "Integer is wrapper for primitive int.",
      difficulty: "easy",
    },
    {
      topic: "Output",
      question: "Output of this code?",
      codeSnippet: "int x = 5;\nSystem.out.println(x++ + ++x);",
      options: ["10", "11", "12", "13"],
      answerIndex: 2,
      explanation: "x++ gives 5 (x becomes 6), ++x gives 7, total 12.",
      difficulty: "easy",
    },
    {
      topic: "Loops",
      question: "How many times does this loop run?",
      codeSnippet: "for (int i = 0; i < 5; i++) {\n  // do work\n}",
      options: ["4", "5", "6", "Infinite"],
      answerIndex: 1,
      explanation: "i values: 0,1,2,3,4 => 5 iterations.",
      difficulty: "easy",
    },
    {
      topic: "Streams",
      question: "Which Stream operation transforms each element?",
      options: ["filter", "map", "forEach", "collect"],
      answerIndex: 1,
      explanation: "map converts each element to another form.",
      difficulty: "advanced",
    },
    {
      topic: "Collections",
      question: "Best structure for frequent key lookup by unique id?",
      options: ["ArrayList", "HashMap", "LinkedList", "Stack"],
      answerIndex: 1,
      explanation: "HashMap provides efficient key-based lookup.",
      difficulty: "advanced",
    },
    {
      topic: "Output",
      question: "What do `==` and `equals()` print for these Java strings?",
      codeSnippet: "String s1 = \"java\";\nString s2 = new String(\"java\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));",
      options: [
        "First line prints true, second line prints true",
        "First line prints false, second line prints true",
        "First line prints true, second line prints false",
        "First line prints false, second line prints false",
      ],
      answerIndex: 1,
      explanation: "`==` compares reference (false), `equals` compares content (true).",
      difficulty: "advanced",
    },
    {
      topic: "Inheritance",
      question: "What happens if parent and child have same static method signature?",
      options: ["Runtime override", "Compile error", "Method hiding", "Abstract enforcement"],
      answerIndex: 2,
      explanation: "Static methods are hidden, not polymorphically overridden.",
      difficulty: "advanced",
    },
    {
      topic: "Exception Handling",
      question: "Which is a checked exception?",
      options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"],
      answerIndex: 2,
      explanation: "IOException must be handled or declared.",
      difficulty: "advanced",
    },
    {
      topic: "Concurrency",
      question: "Which is preferred to create managed thread pools?",
      options: ["new Thread()", "ExecutorService", "ThreadGroup", "System.runFinalization()"],
      answerIndex: 1,
      explanation: "ExecutorService manages pooling and task execution cleanly.",
      difficulty: "advanced",
    },
    {
      topic: "Output",
      question: "What is the sum printed by this enhanced for-loop?",
      codeSnippet: "int[] a = {2, 4, 6};\nint sum = 0;\nfor (int v : a) sum += v;\nSystem.out.println(sum);",
      options: ["8", "10", "12", "14"],
      answerIndex: 2,
      explanation: "2 + 4 + 6 = 12.",
      difficulty: "advanced",
    },
    {
      topic: "Generics",
      question: "Why are generics used in Java collections?",
      options: ["Faster bytecode only", "Avoid runtime exceptions and casts", "Allow primitive arrays only", "Disable polymorphism"],
      answerIndex: 1,
      explanation: "Generics improve type safety at compile time.",
      difficulty: "advanced",
    },
    {
      topic: "Output",
      question: "Output of this code:",
      codeSnippet: "List<Integer> list = Arrays.asList(1, 2, 3, 4);\nlong c = list.stream().filter(x -> x % 2 == 0).count();\nSystem.out.println(c);",
      options: ["1", "2", "3", "4"],
      answerIndex: 1,
      explanation: "Even values are 2 and 4, so count is 2.",
      difficulty: "premium",
    },
    {
      topic: "Complexity",
      question: "Time complexity of linear search on unsorted array is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answerIndex: 2,
      explanation: "Worst case checks all n elements.",
      difficulty: "premium",
    },
    {
      topic: "JVM",
      question: "Which memory area stores local variables of methods?",
      options: ["Heap", "Method Area", "Stack", "Metaspace only"],
      answerIndex: 2,
      explanation: "Method local variables are stored in stack frames.",
      difficulty: "premium",
    },
    {
      topic: "Collections",
      question: "Best pair for queue behavior (FIFO) in Java:",
      options: ["Stack + pop", "ArrayDeque + poll", "HashSet + remove", "TreeMap + firstKey"],
      answerIndex: 1,
      explanation: "ArrayDeque supports queue operations efficiently.",
      difficulty: "premium",
    },
    {
      topic: "Output",
      question: "What sequence is printed by this while loop?",
      codeSnippet: "int n = 3;\nwhile (n > 0) {\n  System.out.print(n + \" \");\n  n--;\n}",
      options: ["1 2 3", "3 2 1", "3 2 1 0", "0 1 2 3"],
      answerIndex: 1,
      explanation: "n prints before decrement until it reaches 0.",
      difficulty: "premium",
    },
    {
      topic: "Design",
      question: "Which principle is most related to programming to interface?",
      options: ["Tight coupling", "Abstraction", "Code duplication", "Global state"],
      answerIndex: 1,
      explanation: "Interfaces promote abstraction and loose coupling.",
      difficulty: "premium",
    },
    {
      topic: "Exception Handling",
      question: "What does `throw` do in Java?",
      options: ["Declares exception in method signature", "Creates package", "Actually throws an exception object", "Suppresses exception"],
      answerIndex: 2,
      explanation: "`throw` raises an exception at runtime.",
      difficulty: "premium",
    },
    {
      topic: "Output",
      question: "What string does this StringBuilder code print?",
      codeSnippet: "StringBuilder sb = new StringBuilder(\"ab\");\nsb.append(\"cd\");\nSystem.out.println(sb.toString());",
      options: ["ab", "abcd", "cdab", "ab cd"],
      answerIndex: 1,
      explanation: "append adds text at the end => abcd.",
      difficulty: "premium",
    },
  ];

  return mergeCuratedQuestions("java-programming", questions).map((question, index) => ({
    id: index + 1,
    ...question,
  }));
}

function buildPythonQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: "Syntax", question: "What defines a code block in Python?", options: ["Curly braces", "Indentation", "Semicolon", "Parentheses"], answerIndex: 1, explanation: "Python uses indentation to define blocks.", difficulty: "easy" },
    { topic: "Data Types", question: "Which type is immutable?", options: ["list", "set", "dict", "tuple"], answerIndex: 3, explanation: "Tuple is immutable in Python.", difficulty: "easy" },
    { topic: "Output", question: "Output of this code?", codeSnippet: "x = [1, 2, 3]\nprint(x[-1])", options: ["1", "2", "3", "Error"], answerIndex: 2, explanation: "Negative index -1 accesses last element.", difficulty: "easy" },
    { topic: "Built-ins", question: "What does `len(\"python\")` return?", options: ["5", "6", "7", "Error"], answerIndex: 1, explanation: "The string has 6 characters.", difficulty: "easy" },
    { topic: "Range", question: "What is `list(range(3))`?", options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[3, 2, 1]"], answerIndex: 1, explanation: "range(3) yields 0, 1, 2.", difficulty: "easy" },
    { topic: "List", question: "What does `append()` do on a list?", options: ["Removes last item", "Adds item at end", "Sorts list", "Returns list length"], answerIndex: 1, explanation: "append inserts one element at the end.", difficulty: "easy" },
    { topic: "Dictionary", question: "Which syntax reads key `name` from dict `d`?", options: ["d.name", "d->name", "d['name']", "d(name)"], answerIndex: 2, explanation: "Dictionary values are accessed by key with brackets.", difficulty: "easy" },
    { topic: "Boolean", question: "Boolean value of empty list `[]` is:", options: ["True", "False", "None", "Error"], answerIndex: 1, explanation: "Empty collections are falsy in Python.", difficulty: "easy" },
    { topic: "String", question: "Which creates uppercase text from `s`?", options: ["s.upper()", "upper(s)", "s.toUpper()", "s.capitalizeAll()"], answerIndex: 0, explanation: "upper() returns an uppercase copy.", difficulty: "easy" },
    { topic: "Loops", question: "Which loop iterates over each item in list `nums`?", options: ["for x in nums:", "for(x=0;x<nums;x++)", "loop nums", "foreach nums as x"], answerIndex: 0, explanation: "This is valid Python for-each style loop.", difficulty: "easy" },
    { topic: "Functions", question: "What does this print?", codeSnippet: "def f(a=[]):\n  a.append(1)\n  return len(a)\nprint(f(), f())", options: ["1 1", "1 2", "2 2", "Error"], answerIndex: 1, explanation: "Default mutable arg is reused, so lengths are 1 then 2.", difficulty: "advanced" },
    { topic: "Comprehension", question: "Result of `[x*x for x in range(3)]`?", options: ["[1, 4, 9]", "[0, 1, 4]", "[0, 1, 2]", "[1, 2, 3]"], answerIndex: 1, explanation: "range(3) gives 0,1,2 and squares are 0,1,4.", difficulty: "advanced" },
    { topic: "OOP", question: "Purpose of `self` in class methods?", options: ["Keyword for static methods", "Reference to class", "Reference to current object", "Optional decorator"], answerIndex: 2, explanation: "self refers to the current instance.", difficulty: "advanced" },
    { topic: "Complexity", question: "Average membership check complexity in `set`?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 0, explanation: "Hash-based set gives average O(1) lookup.", difficulty: "premium" },
    { topic: "Async", question: "What is true for `async def`?", options: ["Runs in separate process by default", "Must always use threads", "Returns coroutine object", "Cannot use await"], answerIndex: 2, explanation: "Calling async function returns coroutine until awaited.", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("python-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildGoQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: "Basics", question: "Which keyword starts a goroutine?", options: ["thread", "async", "go", "spawn"], answerIndex: 2, explanation: "`go` launches function concurrently.", difficulty: "easy" },
    { topic: "Data Types", question: "Which type is dynamic array-like in Go?", options: ["array", "slice", "map", "struct"], answerIndex: 1, explanation: "Slices are flexible views over arrays.", difficulty: "easy" },
    { topic: "Output", question: "Output of this code?", codeSnippet: "x := []int{1,2,3}\nfmt.Println(len(x), cap(x))", options: ["3 3", "2 3", "3 2", "Error"], answerIndex: 0, explanation: "Literal slice len and cap both are 3.", difficulty: "easy" },
    { topic: "Entry Point", question: "Which function is program entry point in Go?", options: ["start()", "main()", "run()", "initMain()"], answerIndex: 1, explanation: "Execution starts from main() in package main.", difficulty: "easy" },
    { topic: "Variables", question: "What does `:=` do in Go?", options: ["Pointer declaration", "Short variable declaration", "Type casting", "Package import"], answerIndex: 1, explanation: "`:=` declares and initializes variable with inferred type.", difficulty: "easy" },
    { topic: "Zero Values", question: "Default value of uninitialized `int` variable is:", options: ["-1", "0", "null", "undefined"], answerIndex: 1, explanation: "Numeric zero value for int is 0.", difficulty: "easy" },
    { topic: "Maps", question: "Which creates an empty map from string to int?", options: ["map[string]int{}", "make(map[string]int)", "new map[string]int", "dict<string,int>()"], answerIndex: 1, explanation: "make initializes map for use.", difficulty: "easy" },
    { topic: "Output", question: "What does this print?", codeSnippet: "m := map[string]int{\"a\": 2}\nfmt.Println(m[\"b\"])", options: ["0", "nil", "Error", "2"], answerIndex: 0, explanation: "Missing key in map returns zero value for int.", difficulty: "easy" },
    { topic: "Functions", question: "Which keyword is used to define a function?", options: ["function", "func", "def", "fn"], answerIndex: 1, explanation: "Go uses `func` for function declarations.", difficulty: "easy" },
    { topic: "Slices", question: "What does `append(s, 10)` do?", options: ["Removes first element", "Adds 10 to slice end", "Sorts slice", "Creates map"], answerIndex: 1, explanation: "append adds element(s) to a slice.", difficulty: "easy" },
    { topic: "Error Handling", question: "Idiomatic error handling in Go is:", options: ["exceptions", "panic only", "error return values", "try/catch"], answerIndex: 2, explanation: "Go typically returns `(value, err)`.", difficulty: "advanced" },
    { topic: "Channels", question: "What does `<-ch` do?", options: ["Sends to channel", "Receives from channel", "Closes channel", "Creates channel"], answerIndex: 1, explanation: "`<-ch` receives a value.", difficulty: "advanced" },
    { topic: "Pointers", question: "Meaning of `*p` in Go?", options: ["Address of p", "Dereference pointer", "Declare pointer", "Multiply by p"], answerIndex: 1, explanation: "`*p` gets value pointed by p.", difficulty: "advanced" },
    { topic: "Concurrency", question: "Why use `sync.Mutex`?", options: ["For faster I/O", "To avoid race on shared data", "To create channels", "To parse JSON"], answerIndex: 1, explanation: "Mutex protects critical sections.", difficulty: "premium" },
    { topic: "Complexity", question: "Average key lookup complexity in Go map?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 0, explanation: "Hash maps are average O(1).", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("go-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildCppQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: "OOP", question: "Which enables runtime polymorphism in C++?", options: ["templates", "virtual functions", "macros", "namespaces"], answerIndex: 1, explanation: "Virtual functions dispatch at runtime.", difficulty: "easy" },
    { topic: "Memory", question: "Which pair is correct for dynamic array allocation?", options: ["malloc/free", "new[]/delete[]", "new/delete", "alloc/drop"], answerIndex: 1, explanation: "Use new[] with delete[].", difficulty: "easy" },
    { topic: "STL", question: "Which STL container stores unique sorted keys?", options: ["vector", "unordered_map", "set", "deque"], answerIndex: 2, explanation: "`set` stores unique sorted keys.", difficulty: "easy" },
    { topic: "References", question: "What is true for reference in C++?", options: ["Can be null", "Can be reseated", "Must bind at initialization", "Same as pointer arithmetic"], answerIndex: 2, explanation: "References bind on initialization.", difficulty: "easy" },
    { topic: "Constructors", question: "Constructor name in C++ must be:", options: ["Any name", "Same as class name", "start", "init only"], answerIndex: 1, explanation: "Constructor has same name as class.", difficulty: "easy" },
    { topic: "Vector", question: "What does `v.push_back(10)` do?", options: ["Adds at front", "Adds at end", "Removes last", "Sorts vector"], answerIndex: 1, explanation: "push_back appends element at end.", difficulty: "easy" },
    { topic: "Keywords", question: "Which keyword represents null pointer in modern C++?", options: ["NULLPTR", "nil", "nullptr", "void"], answerIndex: 2, explanation: "Use `nullptr` in modern C++.", difficulty: "easy" },
    { topic: "Class Access", question: "Default member access in `class` is:", options: ["public", "private", "protected", "internal"], answerIndex: 1, explanation: "Class members are private by default.", difficulty: "easy" },
    { topic: "Output", question: "Output of code?", codeSnippet: "int x=5;\ncout << x++ << ' ' << x;", options: ["5 5", "5 6", "6 6", "Compilation error"], answerIndex: 1, explanation: "First prints 5, then x becomes 6.", difficulty: "easy" },
    { topic: "Header", question: "Which header is commonly used for `cout`?", options: ["<math.h>", "<iostream>", "<vector.h>", "<string.h>"], answerIndex: 1, explanation: "`cout` is in `<iostream>`.", difficulty: "easy" },
    { topic: "RAII", question: "RAII primarily helps with:", options: ["syntax highlighting", "automatic resource cleanup", "faster compile time", "network calls"], answerIndex: 1, explanation: "Resources tied to object lifetime.", difficulty: "advanced" },
    { topic: "Pointers", question: "What does `*p` mean in expression context?", options: ["Address of p", "Dereference pointer", "Declare pointer", "Create reference"], answerIndex: 1, explanation: "`*p` accesses value at pointer address.", difficulty: "advanced" },
    { topic: "STL", question: "When should you prefer `vector` over raw arrays?", options: ["Never", "For automatic sizing and safer container operations", "Only for sorting", "Only for pointers"], answerIndex: 1, explanation: "vector manages memory and provides useful APIs.", difficulty: "advanced" },
    { topic: "Complexity", question: "Average lookup complexity in `unordered_map`?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 0, explanation: "Hash map gives average O(1).", difficulty: "premium" },
    { topic: "Modern C++", question: "`unique_ptr` provides:", options: ["shared ownership", "exclusive ownership", "manual delete only", "raw pointer aliasing"], answerIndex: 1, explanation: "unique_ptr owns object exclusively.", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("cpp-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildJavaScriptQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: "Basics", question: "Which keyword creates block-scoped variable?", options: ["var", "let", "function", "const only"], answerIndex: 1, explanation: "`let` is block-scoped.", difficulty: "easy" },
    { topic: "Types", question: "Type of `null` in JavaScript?", options: ["null", "object", "undefined", "number"], answerIndex: 1, explanation: "Historically, `typeof null` is 'object'.", difficulty: "easy" },
    { topic: "Output", question: "Output?", codeSnippet: "console.log([1,2,3].map(x => x*2))", options: ["[1,2,3]", "[2,4,6]", "[1,4,9]", "Error"], answerIndex: 1, explanation: "map doubles each element.", difficulty: "easy" },
    { topic: "Const", question: "What is true about `const` array?", options: ["Cannot change elements", "Cannot reassign variable binding", "Creates immutable deep object", "Same as let"], answerIndex: 1, explanation: "const prevents reassignment, not internal mutation.", difficulty: "easy" },
    { topic: "Equality", question: "Which checks value and type both?", options: ["==", "=", "===", "!="], answerIndex: 2, explanation: "Strict equality `===` compares both value and type.", difficulty: "easy" },
    { topic: "Truthy/Falsy", question: "Boolean value of `[]` is:", options: ["true", "false", "undefined", "error"], answerIndex: 0, explanation: "Empty array is truthy in JavaScript.", difficulty: "easy" },
    { topic: "Strings", question: "Which syntax supports embedded expressions in strings?", options: ["'single quotes'", "\"double quotes\"", "Backticks `...`", "[]"], answerIndex: 2, explanation: "Template literals use backticks.", difficulty: "easy" },
    { topic: "Numbers", question: "What is `typeof NaN`?", options: ["nan", "undefined", "number", "object"], answerIndex: 2, explanation: "NaN is of type number.", difficulty: "easy" },
    { topic: "Arrays", question: "After `const a=[1,2]; a.push(3);`, `a.length` is:", options: ["2", "3", "Error", "undefined"], answerIndex: 1, explanation: "push adds one item, length becomes 3.", difficulty: "easy" },
    { topic: "Output", question: "What is printed by `console.log('5' + 2)`?", codeSnippet: "console.log('5' + 2)", options: ["7", "52", "Error", "NaN"], answerIndex: 1, explanation: "String concatenation produces '52'.", difficulty: "easy" },
    { topic: "Functions", question: "Which keyword declares a standard function?", options: ["def", "func", "function", "fn"], answerIndex: 2, explanation: "JavaScript uses `function` keyword.", difficulty: "easy" },
    { topic: "Promises", question: "Purpose of `await`?", options: ["Creates promise", "Pauses async function until promise settles", "Blocks entire JS runtime", "Converts to callback"], answerIndex: 1, explanation: "await pauses inside async function only.", difficulty: "advanced" },
    { topic: "Closures", question: "Closure means:", options: ["Function with no params", "Function remembering outer scope", "Object with private class", "Module import"], answerIndex: 1, explanation: "Closure retains lexical environment.", difficulty: "advanced" },
    { topic: "Output", question: "What happens when this function reads `x` before local `let` initialization?", codeSnippet: "let x = 1;\nfunction f(){\n  console.log(x);\n  let x = 2;\n}\nf();", options: ["1", "2", "undefined", "ReferenceError"], answerIndex: 3, explanation: "Temporal dead zone before local let init.", difficulty: "advanced" },
    { topic: "Complexity", question: "Time complexity of linear array scan is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 2, explanation: "Scan may inspect all n elements.", difficulty: "premium" },
    { topic: "Event Loop", question: "Which runs first?", codeSnippet: "console.log('A');\nsetTimeout(()=>console.log('B'),0);\nPromise.resolve().then(()=>console.log('C'));", options: ["A B C", "A C B", "C A B", "B A C"], answerIndex: 1, explanation: "Sync A, microtask C, then timer B.", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("javascript-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildCSharpQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: ".NET", question: "Which runtime executes C# code?", options: ["JVM", "CLR", "V8", "CPython"], answerIndex: 1, explanation: "CLR executes .NET managed code.", difficulty: "easy" },
    { topic: "LINQ", question: "LINQ is mainly used for:", options: ["thread locking", "querying data collections", "network sockets", "UI rendering"], answerIndex: 1, explanation: "LINQ queries collections/data sources.", difficulty: "easy" },
    { topic: "OOP", question: "Keyword to define interface implementation in class header?", options: [":", "implements", "extends", "->"], answerIndex: 0, explanation: "C# uses colon for inheritance/interfaces.", difficulty: "easy" },
    { topic: "Variables", question: "What does `var` do in C#?", options: ["Creates dynamic type always", "Type is inferred at compile time", "Same as object", "Creates nullable only"], answerIndex: 1, explanation: "`var` uses compile-time type inference.", difficulty: "easy" },
    { topic: "Strings", question: "Are strings mutable in C#?", options: ["Yes", "No", "Only in .NET 8", "Only with ref"], answerIndex: 1, explanation: "String is immutable in C#.", difficulty: "easy" },
    { topic: "Types", question: "Which is a value type in C#?", options: ["string", "int", "object", "class"], answerIndex: 1, explanation: "`int` is a value type.", difficulty: "easy" },
    { topic: "Collections", question: "Which is generic list type in C#?", options: ["Array", "List<T>", "Dictionary", "Queue"], answerIndex: 1, explanation: "`List<T>` is the generic list collection.", difficulty: "easy" },
    { topic: "Output", question: "What prints?", codeSnippet: "int x = 3;\nConsole.WriteLine(x * 2);", options: ["3", "5", "6", "Error"], answerIndex: 2, explanation: "3 * 2 = 6.", difficulty: "easy" },
    { topic: "Null Handling", question: "What does `a ?? b` return?", options: ["Always a", "Always b", "a if not null, else b", "Throws on null"], answerIndex: 2, explanation: "Null-coalescing chooses fallback value.", difficulty: "easy" },
    { topic: "Methods", question: "Which keyword returns a value from method?", options: ["break", "yield", "return", "out"], answerIndex: 2, explanation: "`return` sends value back to caller.", difficulty: "easy" },
    { topic: "Properties", question: "What is an auto-property example?", options: ["public int Age;", "public int Age { get; set; }", "int Age()", "property int Age;"], answerIndex: 1, explanation: "This is the standard auto-property syntax.", difficulty: "easy" },
    { topic: "Async", question: "`async` method typically returns:", options: ["int only", "Task / Task<T>", "void only", "bool only"], answerIndex: 1, explanation: "Async methods usually return Task.", difficulty: "advanced" },
    { topic: "Output", question: "Output?", codeSnippet: "int x = 5;\nConsole.WriteLine(x++ + ++x);", options: ["10", "11", "12", "13"], answerIndex: 2, explanation: "5 + 7 = 12.", difficulty: "advanced" },
    { topic: "Collections", question: "Best structure for key-value lookups?", options: ["List<T>", "Dictionary<TKey,TValue>", "Queue<T>", "Stack<T>"], answerIndex: 1, explanation: "Dictionary is hash map style structure.", difficulty: "advanced" },
    { topic: "Complexity", question: "Average lookup in Dictionary is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 0, explanation: "Hash-based average constant time.", difficulty: "premium" },
    { topic: "OOP", question: "Difference between `abstract` and `interface` (core idea)?", options: ["Both identical always", "Interface defines contract; abstract may include implementation", "Abstract cannot have methods", "Interface must have fields with state"], answerIndex: 1, explanation: "Interface is contract; abstract can share base behavior.", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("csharp-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildRustQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    { topic: "Ownership", question: "Core purpose of Rust ownership model?", options: ["Faster UI rendering", "Memory safety without GC", "Dynamic typing", "Runtime reflection"], answerIndex: 1, explanation: "Ownership enforces memory safety at compile time.", difficulty: "easy" },
    { topic: "Cargo", question: "Cargo is used for:", options: ["Only formatting", "Build and dependency management", "Database migrations only", "GUI design"], answerIndex: 1, explanation: "Cargo manages build/test/dependencies.", difficulty: "easy" },
    { topic: "Enums", question: "Which Rust type models optional value?", options: ["Result", "Option", "Tuple", "Vec"], answerIndex: 1, explanation: "Option<T> is Some/None.", difficulty: "easy" },
    { topic: "Mutability", question: "Which keyword allows variable reassignment?", options: ["let", "mut", "var", "static"], answerIndex: 1, explanation: "Rust uses `mut` with `let` for mutable bindings.", difficulty: "easy" },
    { topic: "Output", question: "Which macro prints text in Rust?", options: ["print()", "println!", "echo!", "log()"], answerIndex: 1, explanation: "println! prints text with newline.", difficulty: "easy" },
    { topic: "Vectors", question: "Which creates vector with 3 elements?", options: ["[1,2,3]", "vec![1,2,3]", "Vector(1,2,3)", "new Vec(1,2,3)"], answerIndex: 1, explanation: "`vec![]` macro constructs a vector.", difficulty: "easy" },
    { topic: "Output", question: "What is printed?", codeSnippet: "let x = 4;\nprintln!(\"{}\", x + 1);", options: ["4", "5", "41", "Compile error"], answerIndex: 1, explanation: "x + 1 is 5.", difficulty: "easy" },
    { topic: "Types", question: "Which type stores UTF-8 owned string?", options: ["str", "String", "&str only", "char[]"], answerIndex: 1, explanation: "`String` is growable owned UTF-8 string.", difficulty: "easy" },
    { topic: "Pattern Matching", question: "Which keyword is used for pattern matching?", options: ["switch", "match", "case", "select"], answerIndex: 1, explanation: "Rust uses `match`.", difficulty: "easy" },
    { topic: "Booleans", question: "Boolean type in Rust is:", options: ["bool", "boolean", "Bool", "truth"], answerIndex: 0, explanation: "Rust boolean type is `bool`.", difficulty: "easy" },
    { topic: "Borrowing", question: "Meaning of `&value` in Rust?", options: ["Move ownership", "Immutable borrow", "Mutable borrow", "Raw pointer only"], answerIndex: 1, explanation: "`&` creates immutable reference.", difficulty: "advanced" },
    { topic: "Result", question: "Idiomatic error type for success/failure?", options: ["Option<T>", "Result<T, E>", "bool", "panic! only"], answerIndex: 1, explanation: "Result represents recoverable errors.", difficulty: "advanced" },
    { topic: "Output", question: "What does `v.len()` print for this Rust vector?", codeSnippet: "let v = vec![1,2,3];\nprintln!(\"{}\", v.len());", options: ["2", "3", "4", "Compile error"], answerIndex: 1, explanation: "Vector has 3 elements.", difficulty: "advanced" },
    { topic: "Complexity", question: "Average lookup complexity in HashMap is:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answerIndex: 0, explanation: "HashMap average lookup is O(1).", difficulty: "premium" },
    { topic: "Traits", question: "Trait in Rust is closest to:", options: ["Thread", "Interface/behavior contract", "Garbage collector", "Package manager"], answerIndex: 1, explanation: "Trait defines shared behavior signatures.", difficulty: "premium" },
  ];

  return mergeCuratedQuestions("rust-programming", questions).map((question, index) => ({ id: index + 1, ...question }));
}

function buildPseudoCodeQuestionBank(): QuizQuestion[] {
  const questions: Omit<QuizQuestion, "id">[] = [
    {
      topic: "Trace Output",
      question: "What is the output?",
      codeSnippet: "sum <- 0\nFOR i <- 1 TO 5\n  sum <- sum + i\nPRINT sum",
      options: ["10", "15", "20", "5"],
      answerIndex: 1,
      explanation: "1+2+3+4+5 = 15.",
      difficulty: "easy",
    },
    {
      topic: "Condition Flow",
      question: "If n = 7, what is printed?",
      codeSnippet: "IF n % 2 == 0 THEN\n  PRINT \"Even\"\nELSE\n  PRINT \"Odd\"",
      options: ["Even", "Odd", "0", "Nothing"],
      answerIndex: 1,
      explanation: "7 is not divisible by 2, so else branch runs.",
      difficulty: "easy",
    },
    {
      topic: "Array Analysis",
      question: "For input array [-1, 2, 0, 4, -3], what is the output?",
      codeSnippet:
        "count <- 0\nFOR each x in arr\n  IF x > 0 THEN\n    count <- count + 1\nPRINT count",
      options: ["1", "2", "3", "4"],
      answerIndex: 1,
      explanation: "Positive values are 2 and 4, so count is 2.",
      difficulty: "easy",
    },
    {
      topic: "Loop Analysis",
      question: "If n starts with 5, what is the output?",
      codeSnippet:
        "count <- 0\nWHILE n > 0\n  count <- count + 1\n  n <- n - 2\nPRINT count",
      options: ["2", "3", "4", "5"],
      answerIndex: 1,
      explanation: "n becomes 5, 3, 1, then -1. Loop runs 3 times.",
      difficulty: "easy",
    },
    {
      topic: "Assignment",
      question: "If a = 3 and b = 8, what is output (a, b) after execution?",
      codeSnippet: "temp <- a\na <- b\nb <- temp\nPRINT a, b",
      options: ["3, 8", "8, 3", "8, 8", "3, 3"],
      answerIndex: 1,
      explanation: "Standard swap logic exchanges a and b.",
      difficulty: "easy",
    },
    {
      topic: "Nested Loops",
      question: "What is the output?",
      codeSnippet:
        "count <- 0\nFOR i <- 1 TO 3\n  FOR j <- 1 TO i\n    count <- count + 1\nPRINT count",
      options: ["3", "5", "6", "9"],
      answerIndex: 2,
      explanation: "Iterations are 1 + 2 + 3 = 6.",
      difficulty: "advanced",
    },
    {
      topic: "Control Statements",
      question: "For array [10, 14, 21], what is printed?",
      codeSnippet:
        "FOR each x in arr\n  IF x % 7 == 0 THEN\n    PRINT x\n    BREAK",
      options: ["21", "14", "10", "Nothing"],
      answerIndex: 1,
      explanation: "14 is the first element divisible by 7.",
      difficulty: "advanced",
    },
    {
      topic: "Control Statements",
      question: "What is the output?",
      codeSnippet:
        "sum <- 0\nFOR i <- 1 TO 6\n  IF i % 2 == 0 THEN\n    CONTINUE\n  sum <- sum + i\nPRINT sum",
      options: ["6", "9", "12", "15"],
      answerIndex: 1,
      explanation: "Odd numbers are 1, 3, 5. Sum = 9.",
      difficulty: "advanced",
    },
    {
      topic: "Array Analysis",
      question: "For array [4, 9, 2, 9, 1], what is the output?",
      codeSnippet:
        "max <- arr[0]\nFOR each x in arr\n  IF x > max THEN\n    max <- x\nPRINT max",
      options: ["4", "8", "9", "1"],
      answerIndex: 2,
      explanation: "Maximum value in the array is 9.",
      difficulty: "advanced",
    },
    {
      topic: "Search Logic",
      question:
        "For sorted array [2, 5, 7, 11, 14] and target 11 (0-based index), what is returned?",
      codeSnippet:
        "left <- 0, right <- n - 1\nWHILE left <= right\n  mid <- (left + right) // 2\n  IF arr[mid] == target RETURN mid\n  IF arr[mid] < target left <- mid + 1 ELSE right <- mid - 1\nRETURN -1",
      options: ["2", "3", "4", "-1"],
      answerIndex: 1,
      explanation: "11 is at index 3.",
      difficulty: "advanced",
    },
    {
      topic: "Complexity",
      question: "What is the time complexity of doubling `i` until it reaches `n`?",
      codeSnippet: "i <- 1\nWHILE i < n\n  i <- i * 2",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answerIndex: 1,
      explanation: "Value doubles each step, so number of iterations is logarithmic.",
      difficulty: "premium",
    },
    {
      topic: "Complexity",
      question: "What is the time complexity of these two nested loops?",
      codeSnippet: "FOR i <- 1 TO n\n  FOR j <- 1 TO n\n    constant work",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(n^3)"],
      answerIndex: 2,
      explanation: "Two full nested loops give n * n operations.",
      difficulty: "premium",
    },
    {
      topic: "Complexity",
      question: "What is the time complexity of this two-pointer loop?",
      codeSnippet:
        "left <- 0, right <- n - 1\nWHILE left < right\n  IF condition THEN left <- left + 1 ELSE right <- right - 1",
      options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
      answerIndex: 1,
      explanation: "Each pointer moves at most n times total.",
      difficulty: "premium",
    },
    {
      topic: "Complexity",
      question: "What is space complexity?",
      codeSnippet:
        "temp <- new array of size n\nFOR i <- 0 TO n-1\n  temp[i] <- arr[i]",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answerIndex: 2,
      explanation: "Temp array requires linear extra space.",
      difficulty: "premium",
    },
    {
      topic: "Trace Output",
      question: "For array [5, 1, 9, 7], what is the output?",
      codeSnippet:
        "max1 <- -INF, max2 <- -INF\nFOR each x in arr\n  IF x > max1 THEN\n    max2 <- max1\n    max1 <- x\n  ELSE IF x > max2 THEN\n    max2 <- x\nPRINT max2",
      options: ["9", "7", "5", "1"],
      answerIndex: 1,
      explanation: "Largest is 9, second largest is 7.",
      difficulty: "premium",
    },
  ];

  return mergeCuratedQuestions("pseudocode-programming", questions).map((question, index) => ({
    id: index + 1,
    ...question,
  }));
}

export const quizPrograms: QuizProgram[] = [
  {
    slug: "java-programming",
    title: "Java Programming Quiz",
    description:
      "Java quiz with concept, output, and scenario-based MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildJavaQuestionBank(),
  },
  {
    slug: "python-programming",
    title: "Python Programming Quiz",
    description:
      "Python quiz with output, syntax, and scenario-based MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildPythonQuestionBank(),
  },
  {
    slug: "go-programming",
    title: "Go Programming Quiz",
    description:
      "Go quiz with concurrency, pointers, and idiomatic pattern MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildGoQuestionBank(),
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming Quiz",
    description:
      "C++ quiz with STL, OOP, memory, and output-based MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildCppQuestionBank(),
  },
  {
    slug: "javascript-programming",
    title: "JavaScript Programming Quiz",
    description:
      "JavaScript quiz with async, closures, and output-tracing MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildJavaScriptQuestionBank(),
  },
  {
    slug: "csharp-programming",
    title: "C# Programming Quiz",
    description:
      "C# quiz with .NET, LINQ, OOP, and output-based MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildCSharpQuestionBank(),
  },
  {
    slug: "rust-programming",
    title: "Rust Programming Quiz",
    description:
      "Rust quiz with ownership, traits, and systems reasoning MCQs.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildRustQuestionBank(),
  },
  {
    slug: "pseudocode-programming",
    title: "Pseudo Code Quiz",
    description:
      "Pseudo code analysis quiz focused on trace output, flow analysis, and complexity reasoning.",
    durationMinutes: QUIZ_DURATION_MINUTES,
    questionBank: buildPseudoCodeQuestionBank(),
  },
];

export function getQuizProgramBySlug(slug: string) {
  return quizPrograms.find((program) => program.slug === slug);
}
