export type Program = {
    slug: string;
    title: string;
    tagline: string;

    duration: string;
    level: string;
    mode: string;

    learningOutcomes: string[];
    projects: {
        title: string;
        points: string[];
    }[];

    techStack: {
        category: string;
        items: string[];
    }[];

    idealFor: string[];
    notFor: string[];

    faqs: {
        q: string;
        a: string;
    }[];
};

export const programs: Program[] = [
    // ===============================
    // FULL STACK
    // ===============================
    {
        slug: "full-stack-web-development",
        title: "Full Stack Web Development",
        tagline:
            "Build complete web applications by working on real frontend and backend projects.",

        duration: "8 Weeks",
        level: "Beginner to Intermediate",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Build responsive user interfaces",
            "Design and implement backend APIs",
            "Integrate frontend with backend systems",
            "Work with databases and authentication",
            "Understand real-world web architecture",
        ],

        projects: [
            {
                title: "Portfolio Website",
                points: ["Responsive UI", "Deployed application", "Personal branding"],
            },
            {
                title: "Task Management App",
                points: ["CRUD APIs", "Frontend-backend integration", "JWT authentication"],
            },
            {
                title: "Capstone Project",
                points: ["End-to-end ownership", "Clean architecture", "Code review"],
            },
        ],

        techStack: [
            { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
            { category: "Backend", items: ["Node.js", "Express.js", "Spring Boot", "Go"] },
            { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL"] },
            { category: "Tools", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "GoLand"] },
        ],

        idealFor: [
            "Students starting web development",
            "Freshers building full projects",
            "Self-learners needing structure",
        ],

        notFor: [
            "People looking only for certificates",
            "Those expecting placement guarantees",
        ],

        faqs: [
            {
                q: "Is this a paid internship?",
                a: "No. This is a learning-focused, unpaid, project-based program.",
            },
            {
                q: "Do I need prior experience?",
                a: "Basic programming knowledge is helpful but not mandatory.",
            },
        ],
    },

    // ===============================
    // BACKEND
    // ===============================
    {
        slug: "backend-development",
        title: "Backend Development",
        tagline: "Learn how to design scalable, production-ready backend systems.",

        duration: "6 Weeks",
        level: "Intermediate",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Design RESTful APIs",
            "Understand backend architecture",
            "Work with databases and transactions",
            "Handle authentication and authorization",
            "Write clean, maintainable backend code",
        ],

        projects: [
            {
                title: "User Management System",
                points: ["Auth flows", "Role-based access", "Database modeling"],
            },
            {
                title: "Backend Service API",
                points: ["REST APIs", "Validation", "Error handling"],
            },
        ],

        techStack: [
            { category: "Languages", items: ["Java", "JavaScript", "Go"] },
            { category: "Frameworks", items: ["Spring Boot", "Node.js"] },
            { category: "Database", items: ["PostgreSQL", "MySQL"] },
            { category: "Tools", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "GoLand", "Eclipse"] },
        ],

        idealFor: [
            "Developers interested in backend systems",
            "Students with basic programming knowledge",
        ],

        notFor: ["Absolute beginners with no coding background"],

        faqs: [
            {
                q: "Can I choose Java or Node.js?",
                a: "Yes. You will work with one primary backend stack.",
            },
        ],
    },

    // ===============================
    // FRONTEND
    // ===============================
    {
        slug: "frontend-development",
        title: "Frontend Development",
        tagline: "Build modern, responsive user interfaces used in real applications.",

        duration: "6 Weeks",
        level: "Beginner to Intermediate",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Build responsive layouts",
            "Work with component-based UI",
            "Manage application state",
            "Consume backend APIs",
            "Optimize frontend performance",
        ],

        projects: [
            {
                title: "UI Dashboard",
                points: ["Component design", "Reusable UI", "Clean layout"],
            },
            {
                title: "Frontend Web App",
                points: ["API integration", "State management", "User flows"],
            },
        ],

        techStack: [
            { category: "Core", items: ["HTML", "CSS", "JavaScript"] },
            { category: "Frameworks", items: ["React", "Angular"] },
            { category: "Tools", items: ["Git", "VS Code", "Browser DevTools"] },
        ],

        idealFor: [
            "Students interested in UI development",
            "Designers moving into frontend",
        ],

        notFor: ["Those looking for backend-focused learning"],

        faqs: [
            {
                q: "Do I need design skills?",
                a: "No. Focus is on implementation, not visual design.",
            },
        ],
    },

    // ===============================
    // JAVA
    // ===============================
    {
        slug: "java-development",
        title: "Java Development",
        tagline: "Strengthen your Java fundamentals by building backend-focused projects.",

        duration: "6 Weeks",
        level: "Intermediate",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Write clean object-oriented Java code",
            "Understand Spring Boot fundamentals",
            "Build REST APIs",
            "Work with databases using JPA",
        ],

        projects: [
            {
                title: "Java Backend Service",
                points: ["REST APIs", "Spring Boot", "JPA & Hibernate"],
            },
        ],

        techStack: [
            { category: "Language", items: ["Java"] },
            { category: "Frameworks", items: ["Spring Boot"] },
            { category: "ORM", items: ["JPA", "Hibernate"] },
            { category: "Database", items: ["PostgreSQL", "MySQL"] },
            { category: "Tools", items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Eclipse", "STS"] },
        ],

        idealFor: ["Java learners", "Backend-focused students"],

        notFor: ["Absolute beginners"],

        faqs: [
            {
                q: "Is this only Java?",
                a: "Yes. This program focuses deeply on Java backend development.",
            },
        ],
    },

    // ===============================
    // PYTHON
    // ===============================
    {
        slug: "python-development",
        title: "Python Development",
        tagline: "Learn Python by building practical scripts and backend-style projects.",

        duration: "5 Weeks",
        level: "Beginner",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Write clean Python code",
            "Understand core programming concepts",
            "Build backend-style applications",
        ],

        projects: [
            {
                title: "Python Utility App",
                points: ["File handling", "Data processing", "Logic building"],
            },
        ],

        techStack: [
            { category: "Language", items: ["Python"] },
            { category: "Frameworks", items: ["Flask", "Django"] },
            { category: "Database", items: ["PostgreSQL", "MySQL"] },
            { category: "Tools", items: ["Git", "GitHub", "VS Code", "PyCharm"] },
        ],

        idealFor: ["Beginners", "Non-CS students"],

        notFor: ["Advanced backend developers"],

        faqs: [
            {
                q: "Is this suitable for beginners?",
                a: "Yes. This program is beginner-friendly.",
            },
        ],
    },

    // ===============================
    // GO
    // ===============================
    {
        slug: "go-backend-development",
        title: "Go Backend Development",
        tagline: "Build fast, scalable backend services using Go.",

        duration: "6 Weeks",
        level: "Intermediate",
        mode: "Online · Project-based",

        learningOutcomes: [
            "Understand Go fundamentals",
            "Build high-performance APIs",
            "Work with concurrency",
        ],

        projects: [
            {
                title: "Go REST API",
                points: ["HTTP services", "Clean architecture", "Performance focus"],
            },
        ],

        techStack: [
            { category: "Language", items: ["Go"] },
            { category: "Concepts", items: ["Concurrency", "REST APIs"] },
            { category: "Database", items: ["PostgreSQL", "MySQL"] },
            { category: "Tools", items: ["Git", "GitHub", "VS Code", "GoLand"] },
        ],

        idealFor: ["Backend developers", "System-oriented learners"],

        notFor: ["Absolute beginners"],

        faqs: [
            {
                q: "Is Go beginner-friendly?",
                a: "Basic programming experience is recommended.",
            },
        ],
    },
];