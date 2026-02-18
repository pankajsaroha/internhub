export const QUIZ_QUESTIONS_PER_ATTEMPT = 10;
export const QUIZ_DURATION_MINUTES = 15;
export const QUIZ_EASY_PER_ATTEMPT = 10;
export const QUIZ_ADVANCED_PER_ATTEMPT = 0;

export type QuizDifficulty = "easy" | "advanced";

export type QuizQuestion = {
  id: number;
  question: string;
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

type QuizConcept = {
  term: string;
  definition: string;
  example: string;
  useCase: string;
};

function optionSet(
  correct: string,
  wrongA: string,
  wrongB: string,
  wrongC: string,
  seed: number
) {
  const options = [correct, wrongA, wrongB, wrongC];
  const rotated = [...options.slice(seed % 4), ...options.slice(0, seed % 4)];
  return {
    options: rotated,
    answerIndex: rotated.indexOf(correct),
  };
}

function nextConcept(concepts: QuizConcept[], index: number, offset: number) {
  return concepts[(index + offset) % concepts.length];
}

function buildQuestionBank(trackName: string, concepts: QuizConcept[]): QuizQuestion[] {
  const bank: QuizQuestion[] = [];
  let id = 1;

  concepts.forEach((concept, index) => {
    const conceptDifficulty: QuizDifficulty = "easy";

    const c1 = nextConcept(concepts, index, 1);
    const c2 = nextConcept(concepts, index, 2);
    const c3 = nextConcept(concepts, index, 3);

    const defOptions = optionSet(
      concept.definition,
      c1.definition,
      c2.definition,
      c3.definition,
      id
    );
    bank.push({
      id: id++,
      question: `In ${trackName}, what is "${concept.term}"?`,
      options: defOptions.options,
      answerIndex: defOptions.answerIndex,
      explanation: concept.definition,
      difficulty: conceptDifficulty,
    });

    const exOptions = optionSet(concept.example, c1.example, c2.example, c3.example, id);
    bank.push({
      id: id++,
      question: `Which is the best example of "${concept.term}"?`,
      options: exOptions.options,
      answerIndex: exOptions.answerIndex,
      explanation: concept.example,
      difficulty: conceptDifficulty,
    });

    const termFromDefOptions = optionSet(
      concept.term,
      c1.term,
      c2.term,
      c3.term,
      id
    );
    bank.push({
      id: id++,
      question: `Pick the correct term for this statement: "${concept.definition}"`,
      options: termFromDefOptions.options,
      answerIndex: termFromDefOptions.answerIndex,
      explanation: `${concept.term}: ${concept.definition}`,
      difficulty: conceptDifficulty,
    });

    const useCaseOptions = optionSet(
      concept.useCase,
      c1.useCase,
      c2.useCase,
      c3.useCase,
      id
    );
    bank.push({
      id: id++,
      question: `"${concept.term}" is mainly useful for which case?`,
      options: useCaseOptions.options,
      answerIndex: useCaseOptions.answerIndex,
      explanation: concept.useCase,
      difficulty: conceptDifficulty,
    });

    const termFromUseCaseOptions = optionSet(
      concept.term,
      c1.term,
      c2.term,
      c3.term,
      id
    );
    bank.push({
      id: id++,
      question: `Which term best matches this scenario: "${concept.useCase}"`,
      options: termFromUseCaseOptions.options,
      answerIndex: termFromUseCaseOptions.answerIndex,
      explanation: `${concept.term} fits because it is used for this scenario.`,
      difficulty: conceptDifficulty,
    });
  });

  return bank;
}

const frontendConcepts: QuizConcept[] = [
  { term: "Semantic HTML", definition: "Using meaningful HTML tags to improve accessibility and structure.", example: "Using <header>, <main>, and <article> instead of plain <div> blocks.", useCase: "Building accessible page layouts for content-rich websites." },
  { term: "CSS Flexbox", definition: "A one-dimensional layout system for aligning items in rows or columns.", example: "Centering nav links horizontally with display:flex and justify-content:center.", useCase: "Creating responsive horizontal or vertical UI alignment." },
  { term: "CSS Grid", definition: "A two-dimensional layout system for rows and columns.", example: "Defining dashboard sections with grid-template-columns and grid-template-rows.", useCase: "Designing complex page structures with multi-axis control." },
  { term: "Responsive Design", definition: "Adapting UI for different screen sizes and devices.", example: "Using media queries to adjust card columns on mobile.", useCase: "Making web apps usable on phones, tablets, and desktops." },
  { term: "DOM Manipulation", definition: "Changing HTML elements and attributes using JavaScript.", example: "Updating text content of a button after user click.", useCase: "Adding interactivity to web pages." },
  { term: "Event Bubbling", definition: "An event propagation model where events move from child to parent elements.", example: "A button click also triggering a parent container click listener.", useCase: "Implementing delegated event handling." },
  { term: "React State", definition: "Component-local data that can change and trigger re-renders.", example: "Tracking selected menu item using useState.", useCase: "Managing dynamic values inside a React component." },
  { term: "React Props", definition: "Read-only inputs passed from parent component to child component.", example: "Passing a title string into a Card component.", useCase: "Reusing components with different data." },
  { term: "Component Reusability", definition: "Building UI pieces that can be reused across screens.", example: "A single Button component used in forms and modals.", useCase: "Reducing duplicated frontend code." },
  { term: "API Integration", definition: "Connecting frontend UI with backend endpoints.", example: "Fetching internship programs from /api/programs and rendering cards.", useCase: "Displaying real-time or stored server data." },
  { term: "Form Validation", definition: "Checking user input rules before submission.", example: "Blocking submit when email format is invalid.", useCase: "Improving form quality and reducing bad requests." },
  { term: "Client-side Routing", definition: "Navigating between pages without full browser reloads.", example: "Using Next.js Link to move from /programs to /quiz.", useCase: "Creating fast, app-like navigation." },
  { term: "TypeScript Interfaces", definition: "Type contracts that define object shapes in TypeScript.", example: "Defining a Program interface with title and slug fields.", useCase: "Preventing frontend type errors in larger codebases." },
  { term: "Accessibility (a11y)", definition: "Designing UI so people with disabilities can use it.", example: "Adding alt text and keyboard focus styles.", useCase: "Meeting usability and compliance requirements." },
  { term: "Lazy Loading", definition: "Loading resources only when needed to improve initial performance.", example: "Deferring heavy component import until it is opened.", useCase: "Improving first page load speed." },
  { term: "Code Splitting", definition: "Breaking JavaScript bundles into smaller chunks.", example: "Dynamic import of an admin chart module.", useCase: "Reducing initial bundle size and time-to-interactive." },
  { term: "Memoization", definition: "Caching computed values to avoid unnecessary recalculation.", example: "Using useMemo for filtered lists in React.", useCase: "Optimizing expensive render-time operations." },
  { term: "State Lifting", definition: "Moving shared state to the nearest common parent.", example: "Keeping selected quiz answer state in parent and passing down callbacks.", useCase: "Synchronizing sibling component behavior." },
  { term: "Error Boundaries", definition: "React components that catch runtime render errors in child trees.", example: "Showing fallback UI when a child widget crashes.", useCase: "Improving reliability of frontend experiences." },
  { term: "Design System", definition: "A consistent collection of UI components, styles, and patterns.", example: "Shared button variants, spacing tokens, and typography rules.", useCase: "Maintaining visual and behavioral consistency across features." },
];

const backendConcepts: QuizConcept[] = [
  { term: "REST API", definition: "An HTTP-based interface for resources using verbs like GET and POST.", example: "GET /users/42 to fetch a user resource.", useCase: "Building service interfaces consumed by frontend apps." },
  { term: "HTTP Status Code", definition: "Numeric response code indicating request result.", example: "Returning 404 when a resource is not found.", useCase: "Communicating backend outcomes to clients." },
  { term: "Authentication", definition: "Verifying who a user is.", example: "Checking login credentials before issuing a token.", useCase: "Allowing only valid users into protected systems." },
  { term: "Authorization", definition: "Determining what an authenticated user can do.", example: "Allowing only admins to delete records.", useCase: "Enforcing role-based access control." },
  { term: "JWT", definition: "A signed token format used for stateless auth claims.", example: "Sending a bearer token in Authorization header.", useCase: "Maintaining user identity across API requests." },
  { term: "Input Validation", definition: "Checking incoming data meets required format and constraints.", example: "Rejecting passwords shorter than minimum length.", useCase: "Preventing invalid or unsafe data from entering services." },
  { term: "SQL Index", definition: "A database structure that speeds up lookups on selected columns.", example: "Indexing email column in users table.", useCase: "Improving query performance at scale." },
  { term: "Database Transaction", definition: "A sequence of operations treated as one atomic unit.", example: "Debiting and crediting two accounts in one transaction.", useCase: "Preserving data consistency for multi-step updates." },
  { term: "ORM", definition: "A layer mapping objects/classes to database tables.", example: "Using JPA entities for user records.", useCase: "Reducing manual SQL boilerplate in application code." },
  { term: "Caching", definition: "Storing frequently requested data for faster access.", example: "Caching program list response in Redis.", useCase: "Reducing database load and API latency." },
  { term: "Rate Limiting", definition: "Restricting request frequency from clients.", example: "Allowing max 100 requests per minute per IP.", useCase: "Protecting APIs from abuse and spikes." },
  { term: "Message Queue", definition: "Asynchronous buffer for background task processing.", example: "Publishing email jobs for worker consumption.", useCase: "Decoupling heavy tasks from synchronous requests." },
  { term: "Idempotency", definition: "A property where repeated same requests have same effect.", example: "Repeated PUT request keeps resource state unchanged.", useCase: "Making retry behavior safe in distributed systems." },
  { term: "Load Balancer", definition: "A component distributing traffic across multiple servers.", example: "Routing incoming API traffic across 3 backend nodes.", useCase: "Improving scalability and reliability under load." },
  { term: "Pagination", definition: "Splitting large result sets into smaller pages.", example: "Returning 20 records with page=2 query.", useCase: "Handling large datasets efficiently in APIs." },
  { term: "Observability", definition: "Collecting logs, metrics, and traces to understand system health.", example: "Tracking request latency in monitoring dashboard.", useCase: "Diagnosing and preventing production incidents." },
  { term: "Circuit Breaker", definition: "Pattern to prevent cascading failures by stopping repeated failing calls.", example: "Temporarily halting requests to an unstable dependency.", useCase: "Improving fault tolerance in microservices." },
  { term: "Dependency Injection", definition: "Providing object dependencies from outside instead of constructing internally.", example: "Injecting repository into service constructor.", useCase: "Improving testability and modular backend design." },
  { term: "Schema Migration", definition: "Versioned change to database structure over time.", example: "Adding nullable phone column in users table migration.", useCase: "Evolving data models safely across releases." },
  { term: "WebSocket", definition: "Persistent two-way communication channel between client and server.", example: "Broadcasting live notification updates.", useCase: "Enabling real-time features beyond request-response." },
];

const fullStackConcepts: QuizConcept[] = [
  { term: "Client-Server Architecture", definition: "System split where client handles UI and server handles business/data logic.", example: "React app consuming Spring Boot APIs.", useCase: "Designing maintainable full stack products." },
  { term: "API Contract", definition: "Agreed request and response structure between frontend and backend.", example: "Frontend expects {id,title,status} in task response.", useCase: "Avoiding integration breakage during development." },
  { term: "End-to-End Flow", definition: "A complete user journey across UI, API, and database.", example: "User signs up, backend stores profile, dashboard updates.", useCase: "Validating real product behavior." },
  { term: "Session Management", definition: "Handling authenticated user context across requests.", example: "Persisting login via secure cookies or tokens.", useCase: "Keeping users signed in safely." },
  { term: "Form-to-API Binding", definition: "Mapping frontend form fields to backend payload schema.", example: "Applying selected program slug in POST body.", useCase: "Submitting structured user input correctly." },
  { term: "Error Handling Strategy", definition: "Consistent way to handle and display failures across layers.", example: "Backend returns 400 with message, frontend shows inline error.", useCase: "Improving reliability and user trust." },
  { term: "Validation Layers", definition: "Combining UI validation with strict backend validation.", example: "Email checked in browser and again on server.", useCase: "Balancing UX and security." },
  { term: "State Synchronization", definition: "Keeping UI state aligned with backend data updates.", example: "Refreshing list after successful create API call.", useCase: "Avoiding stale or misleading interfaces." },
  { term: "Deployment Pipeline", definition: "Automated build, test, and release process for frontend and backend.", example: "CI builds Next.js and Spring Boot on merge.", useCase: "Shipping features safely and repeatedly." },
  { term: "Environment Configuration", definition: "Separating config values by dev, test, and production environments.", example: "Using different API base URLs by environment.", useCase: "Preventing configuration mistakes in releases." },
  { term: "Cross-Origin Policy", definition: "Browser security rule controlling cross-domain requests.", example: "Configuring CORS in backend for frontend origin.", useCase: "Allowing secure frontend-backend communication." },
  { term: "Optimistic UI", definition: "Updating UI before server confirmation, then reconciling on result.", example: "Temporarily showing a new comment immediately.", useCase: "Making apps feel faster for users." },
  { term: "Rollback Strategy", definition: "Plan to revert changes when deployment causes issues.", example: "Reverting to previous stable backend version.", useCase: "Reducing downtime during failures." },
  { term: "Versioning", definition: "Managing API or application changes without breaking consumers.", example: "Serving /api/v1 and /api/v2 endpoints.", useCase: "Supporting gradual client migration." },
  { term: "Data Consistency", definition: "Ensuring data remains correct across systems and operations.", example: "Order and payment status staying synchronized.", useCase: "Preventing conflicting user-visible states." },
  { term: "Integration Testing", definition: "Tests verifying multiple components work together.", example: "Testing frontend submission through backend to test database.", useCase: "Catching cross-layer regressions early." },
  { term: "Observability Dashboard", definition: "Unified visibility into frontend and backend runtime metrics.", example: "Viewing API errors and page load times in one place.", useCase: "Monitoring product health in production." },
  { term: "Domain Modeling", definition: "Representing business entities and rules in code structures.", example: "Program, Application, and QuizResult domain entities.", useCase: "Keeping code aligned with business logic." },
  { term: "Security Headers", definition: "HTTP headers that improve browser-side security posture.", example: "Using Content-Security-Policy and X-Frame-Options.", useCase: "Reducing risk from common web attacks." },
  { term: "Performance Budget", definition: "Defined limits for response time, bundle size, and resource use.", example: "Keeping first load JS under a fixed threshold.", useCase: "Maintaining good UX as product grows." },
];

const javaConcepts: QuizConcept[] = [
  { term: "JVM", definition: "Runtime engine that executes Java bytecode.", example: "Running a .class file on any OS with JVM support.", useCase: "Platform-independent Java application execution." },
  { term: "JDK", definition: "Java Development Kit containing compiler and development tools.", example: "Using javac to compile Java source files.", useCase: "Building and packaging Java applications." },
  { term: "JRE", definition: "Java Runtime Environment required to run Java apps.", example: "Running a packaged Java app without compiler tools.", useCase: "Executing Java software in production environments." },
  { term: "OOP Basics", definition: "Object-Oriented Programming organizes code using classes and objects.", example: "Creating Student class and Student objects with data and methods.", useCase: "Designing clean and reusable Java application code." },
  { term: "Class", definition: "Blueprint defining fields and methods for objects.", example: "Creating a User class with name and email fields.", useCase: "Modeling structured entities in object-oriented Java." },
  { term: "Object", definition: "Instance of a class with actual state and behavior.", example: "new User(\"Asha\", \"a@x.com\")", useCase: "Representing real data and actions at runtime." },
  { term: "Inheritance", definition: "Mechanism where a class derives properties from another class.", example: "AdminUser extends User in Java.", useCase: "Reusing and specializing behavior across classes." },
  { term: "Polymorphism", definition: "Using a common interface with different implementations.", example: "Calling process() on multiple PaymentProcessor types.", useCase: "Writing flexible, extensible Java code." },
  { term: "Encapsulation", definition: "Bundling data and methods while restricting direct field access.", example: "Private fields with public getters/setters.", useCase: "Protecting object integrity and invariants." },
  { term: "Interface", definition: "Contract defining method signatures without implementation details.", example: "Repository interface implemented by JpaRepository class.", useCase: "Decoupling abstractions from concrete implementations." },
  { term: "Exception Handling", definition: "Structured way to catch and manage runtime errors.", example: "Using try-catch-finally around risky I/O operations.", useCase: "Preventing crashes and returning controlled errors." },
  { term: "Collection Framework", definition: "Standard Java data structure APIs like List, Set, and Map.", example: "Using HashMap for key-value storage.", useCase: "Managing in-memory structured data effectively." },
  { term: "Generics", definition: "Type parameterization for reusable and type-safe classes/methods.", example: "List<String> for compile-time safety.", useCase: "Reducing casting and runtime type issues." },
  { term: "Multithreading", definition: "Running multiple execution threads concurrently.", example: "Executing background tasks with ExecutorService.", useCase: "Improving throughput in Java backend services." },
  { term: "Streams API", definition: "Functional-style operations over data collections.", example: "Filtering users with stream().filter().collect().", useCase: "Writing concise data processing pipelines." },
  { term: "Lambda Expressions", definition: "Short function-like syntax used with functional interfaces.", example: "(a, b) -> a + b in a comparator or stream operation.", useCase: "Writing concise logic with Stream API and callbacks." },
  { term: "Spring Boot", definition: "Java framework for rapid backend application development.", example: "Creating REST APIs with @RestController.", useCase: "Building production-grade Java web services quickly." },
  { term: "Dependency Injection", definition: "Providing object dependencies externally via IoC container.", example: "Injecting UserService into controller with constructor injection.", useCase: "Improving modularity and testability in Spring apps." },
  { term: "JPA", definition: "Java persistence specification for ORM-based database access.", example: "Mapping User entity to users table.", useCase: "Simplifying relational data operations in Java apps." },
  { term: "Hibernate", definition: "Popular JPA implementation for Java ORM.", example: "Auto-generating SQL from entity operations.", useCase: "Managing persistence with less manual SQL code." },
  { term: "Maven", definition: "Java build and dependency management tool.", example: "Declaring spring-boot-starter-web in pom.xml.", useCase: "Managing project dependencies and build lifecycle." },
  { term: "Unit Testing", definition: "Testing small isolated units of application logic.", example: "Testing service methods with JUnit and Mockito.", useCase: "Catching regressions early in Java projects." },
];

const pythonConcepts: QuizConcept[] = [
  { term: "Indentation", definition: "Whitespace-based syntax block structure in Python.", example: "Using four spaces to define function body.", useCase: "Creating valid Python control flow and blocks." },
  { term: "List", definition: "Mutable ordered collection type in Python.", example: "numbers = [1, 2, 3] and append(4).", useCase: "Storing and updating ordered data." },
  { term: "Tuple", definition: "Immutable ordered collection type in Python.", example: "coords = (10, 20) for fixed position data.", useCase: "Representing read-only grouped values." },
  { term: "Dictionary", definition: "Key-value mapping data type in Python.", example: "user = {'name': 'Riya', 'age': 21}", useCase: "Fast lookup and structured record storage." },
  { term: "Set", definition: "Unordered collection of unique elements.", example: "unique_tags = {'python', 'api', 'ml'}", useCase: "Removing duplicates and membership checks." },
  { term: "List Comprehension", definition: "Compact syntax for creating transformed lists.", example: "[x * 2 for x in nums if x > 0]", useCase: "Readable data transformation in one expression." },
  { term: "Function", definition: "Reusable block of code defined with def.", example: "def calculate_total(price, tax): return price + tax", useCase: "Organizing reusable logic units." },
  { term: "Lambda", definition: "Small anonymous inline function expression.", example: "sorted(items, key=lambda x: x['score'])", useCase: "Short functional callbacks and quick transforms." },
  { term: "Module", definition: "A Python file containing reusable code.", example: "import math to use sqrt.", useCase: "Splitting code into maintainable units." },
  { term: "Package", definition: "Collection of related Python modules.", example: "Using a package with __init__.py for API utilities.", useCase: "Organizing larger Python applications." },
  { term: "Virtual Environment", definition: "Isolated dependency environment for a Python project.", example: "Creating venv and installing project-specific libraries.", useCase: "Preventing dependency conflicts between projects." },
  { term: "PIP", definition: "Package installer for Python libraries.", example: "pip install fastapi", useCase: "Adding external dependencies to a Python project." },
  { term: "PEP 8", definition: "Style guide for writing readable Python code.", example: "snake_case naming and consistent spacing.", useCase: "Maintaining consistent coding standards." },
  { term: "Exception", definition: "Runtime error handling construct using try/except.", example: "Catching ValueError during integer parsing.", useCase: "Building robust, failure-safe scripts." },
  { term: "Generator", definition: "Lazy iterable created with yield statements.", example: "Yielding rows from a large CSV file one at a time.", useCase: "Memory-efficient processing of large datasets." },
  { term: "Decorator", definition: "Function that wraps and extends another function behavior.", example: "@login_required before protected API handler.", useCase: "Applying cross-cutting logic cleanly." },
  { term: "Flask", definition: "Lightweight Python web framework.", example: "Defining route with @app.route('/health').", useCase: "Building simple web APIs quickly." },
  { term: "Django", definition: "Full-featured Python framework with batteries included.", example: "Using Django ORM and admin panel out of the box.", useCase: "Developing structured web applications rapidly." },
  { term: "Asyncio", definition: "Python library for asynchronous I/O programming.", example: "Running concurrent HTTP calls with async/await.", useCase: "Handling high I/O workloads efficiently." },
  { term: "Unit Test", definition: "Automated test for isolated Python logic.", example: "Testing utility functions with pytest assertions.", useCase: "Preventing regressions and ensuring correctness." },
];

const goConcepts: QuizConcept[] = [
  { term: "Goroutine", definition: "Lightweight concurrent function execution unit in Go.", example: "go processOrder(orderID)", useCase: "Running tasks concurrently with low overhead." },
  { term: "Channel", definition: "Typed conduit for communication between goroutines.", example: "results <- value and <-results", useCase: "Synchronizing and sharing data safely." },
  { term: "Go Scheduler", definition: "Runtime system that manages goroutine execution.", example: "Multiplexing many goroutines onto OS threads.", useCase: "Efficient concurrency without manual thread management." },
  { term: "Interface", definition: "Type defined by method set, enabling polymorphism.", example: "io.Reader implemented by many concrete types.", useCase: "Writing flexible and testable Go code." },
  { term: "Struct", definition: "Composite data type grouping related fields.", example: "type User struct { Name string; Age int }", useCase: "Modeling domain data in Go applications." },
  { term: "Pointer", definition: "Variable holding memory address of another value.", example: "Passing *User to modify fields in place.", useCase: "Controlling mutation and reducing copy costs." },
  { term: "Error Handling", definition: "Explicit error return pattern in Go functions.", example: "value, err := parse(input)", useCase: "Handling failures predictably in production code." },
  { term: "Defer", definition: "Schedules function call to run when current function returns.", example: "defer file.Close()", useCase: "Guaranteeing cleanup of resources." },
  { term: "Slice", definition: "Dynamic view over arrays with length and capacity.", example: "append(items, newItem)", useCase: "Flexible collection manipulation in Go." },
  { term: "Map", definition: "Hash table key-value collection in Go.", example: "counts[word]++", useCase: "Fast keyed lookups and aggregations." },
  { term: "Package", definition: "Basic unit of code organization and reuse in Go.", example: "import \"net/http\"", useCase: "Structuring larger Go projects cleanly." },
  { term: "Module", definition: "Versioned collection of Go packages managed by go.mod.", example: "go mod init project-name", useCase: "Dependency and build version control." },
  { term: "net/http", definition: "Go standard library package for HTTP clients and servers.", example: "http.HandleFunc(\"/health\", handler)", useCase: "Building APIs and web services in Go." },
  { term: "Context", definition: "Request-scoped values, cancellation, and deadlines.", example: "ctx, cancel := context.WithTimeout(...)", useCase: "Controlling lifecycle of concurrent operations." },
  { term: "Mutex", definition: "Synchronization primitive for protecting shared data.", example: "mu.Lock() and mu.Unlock() around critical section.", useCase: "Avoiding race conditions in concurrent code." },
  { term: "Race Condition", definition: "Bug caused by unsynchronized concurrent access to shared state.", example: "Two goroutines incrementing same variable unsafely.", useCase: "Diagnosing and fixing concurrency correctness issues." },
  { term: "Worker Pool", definition: "Pattern where fixed workers process queued jobs.", example: "N goroutines consume tasks from channel.", useCase: "Controlling concurrency and resource utilization." },
  { term: "JSON Marshalling", definition: "Encoding and decoding structs to and from JSON.", example: "json.Unmarshal(payload, &request)", useCase: "Building JSON APIs in Go services." },
  { term: "Testing Package", definition: "Built-in framework for writing Go tests.", example: "func TestAdd(t *testing.T) { ... }", useCase: "Automating correctness checks in Go projects." },
  { term: "go fmt", definition: "Official formatter enforcing standard Go style.", example: "Running go fmt ./... before commit.", useCase: "Keeping codebase consistently formatted." },
];

function buildProgram(
  slug: string,
  title: string,
  description: string,
  durationMinutes: number,
  concepts: QuizConcept[]
): QuizProgram {
  return {
    slug,
    title,
    description,
    durationMinutes,
    questionBank: buildQuestionBank(title.replace(" Quiz", ""), concepts),
  };
}

export const quizPrograms: QuizProgram[] = [
  buildProgram(
    "frontend-development",
    "Frontend Development Quiz",
    "Beginner-friendly frontend quiz with core and easy MCQs.",
    QUIZ_DURATION_MINUTES,
    frontendConcepts
  ),
  buildProgram(
    "backend-development",
    "Backend Development Quiz",
    "Beginner-friendly backend quiz with core and easy MCQs.",
    QUIZ_DURATION_MINUTES,
    backendConcepts
  ),
  buildProgram(
    "full-stack-development",
    "Full Stack Development Quiz",
    "Beginner-friendly full stack quiz with core and easy MCQs.",
    QUIZ_DURATION_MINUTES,
    fullStackConcepts
  ),
  buildProgram(
    "java-programming",
    "Java Programming Quiz",
    "Beginner-friendly Java quiz with OOP, streams, lambda, and exception handling basics.",
    QUIZ_DURATION_MINUTES,
    javaConcepts
  ),
  buildProgram(
    "python-programming",
    "Python Programming Quiz",
    "Beginner-friendly Python quiz with core and easy MCQs.",
    QUIZ_DURATION_MINUTES,
    pythonConcepts
  ),
  buildProgram(
    "go-programming",
    "Go Programming Quiz",
    "Beginner-friendly Go quiz with core and easy MCQs.",
    QUIZ_DURATION_MINUTES,
    goConcepts
  ),
];

export function getQuizProgramBySlug(slug: string) {
  return quizPrograms.find((program) => program.slug === slug);
}
