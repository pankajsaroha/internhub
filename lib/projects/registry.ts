// Types and registry

export interface Project {
    id: string;
    title: string;
    category: "student" | "professional";
    experience: "no-prior" | "basic" | "built-small" | "production";
    filePath: string;
}

export const PROJECTS: Project[] = [
    // STUDENTS - No Prior Experience
    {
        id: "std-np-001",
        title: "URL Shortener",
        category: "student",
        experience: "no-prior",
        filePath: "students/no-prior/url-shortener.md",
    },
    {
        id: "std-np-002",
        title: "Task Manager",
        category: "student",
        experience: "no-prior",
        filePath: "students/no-prior/task-manager.md",
    },
    {
        id: "std-np-003",
        title: "Expense Tracker",
        category: "student",
        experience: "no-prior",
        filePath: "students/no-prior/expense-tracker.md",
    },
    {
        id: "std-np-004",
        title: "Todo List Application",
        category: "student",
        experience: "no-prior",
        filePath: "students/no-prior/todo-list-application.md",
    },
    {
        id: "std-np-005",
        title: "Calculator Application",
        category: "student",
        experience: "no-prior",
        filePath: "students/no-prior/calculator-application.md",
    },
    // STUDENTS - Basic Understanding
    {
        id: "std-basic-001",
        title: "Weather Dashboard",
        category: "student",
        experience: "basic",
        filePath: "students/basic/weather-dashboard.md",
    },
    {
        id: "std-basic-002",
        title: "E-commerce Page",
        category: "student",
        experience: "basic",
        filePath: "students/basic/ecommerce-page.md",
    },
    {
        id: "std-basic-003",
        title: "Movie Discovery App",
        category: "student",
        experience: "basic",
        filePath: "students/basic/movie-discovery.md",
    },
    {
        id: "std-basic-004",
        title: "Blog Application",
        category: "student",
        experience: "basic",
        filePath: "students/basic/blog-application.md",
    },
    // STUDENTS - Built Small Projects
    {
        id: "std-built-001",
        title: "Social Media Feed",
        category: "student",
        experience: "built-small",
        filePath: "students/built-small/social-feed.md",
    },
    {
        id: "std-built-002",
        title: "SaaS Dashboard",
        category: "student",
        experience: "built-small",
        filePath: "students/built-small/saas-dashboard.md",
    },
    {
        id: "std-built-003",
        title: "Learning Management Mini Platform",
        category: "student",
        experience: "built-small",
        filePath: "students/built-small/lms-mini-platform.md",
    },
    // STUDENTS - Production Level
    {
        id: "std-prod-001",
        title: "Enterprise SaaS Platform",
        category: "student",
        experience: "production",
        filePath: "students/production/enterprise-saas.md",
    },
    {
        id: "std-prod-002",
        title: "Video Streaming Service",
        category: "student",
        experience: "production",
        filePath: "students/production/video-streaming.md",
    },
    {
        id: "std-prod-003",
        title: "Multi-region E-commerce Platform",
        category: "student",
        experience: "production",
        filePath: "students/production/multiregion-ecommerce.md",
    },
    // PROFESSIONALS - No Prior Experience
    {
        id: "pro-np-001",
        title: "API Health Monitor",
        category: "professional",
        experience: "no-prior",
        filePath: "professionals/no-prior/api-health-monitor.md",
    },
    {
        id: "pro-np-002",
        title: "CRM Lead Tracker",
        category: "professional",
        experience: "no-prior",
        filePath: "professionals/no-prior/crm-lead-tracker.md",
    },
    {
        id: "pro-np-003",
        title: "Bug Tracker Starter",
        category: "professional",
        experience: "no-prior",
        filePath: "professionals/no-prior/bug-tracker-starter.md",
    },
    // PROFESSIONALS - Basic Understanding
    {
        id: "pro-basic-001",
        title: "Notification Service",
        category: "professional",
        experience: "basic",
        filePath: "professionals/basic/notification-service.md",
    },
    {
        id: "pro-basic-002",
        title: "Feature Flag Dashboard",
        category: "professional",
        experience: "basic",
        filePath: "professionals/basic/feature-flag-dashboard.md",
    },
    {
        id: "pro-basic-003",
        title: "Metrics Aggregation Service",
        category: "professional",
        experience: "basic",
        filePath: "professionals/basic/metrics-aggregation-service.md",
    },
    // PROFESSIONALS - Built Small Projects
    {
        id: "pro-be-001",
        title: "Distributed KV Store",
        category: "professional",
        experience: "built-small",
        filePath: "professionals/built-small/distributed-kv.md",
    },
    {
        id: "pro-be-002",
        title: "Library Management System",
        category: "professional",
        experience: "built-small",
        filePath: "professionals/built-small/library-management-system.md",
    },
    {
        id: "pro-be-003",
        title: "Event-Driven Order Processing",
        category: "professional",
        experience: "built-small",
        filePath: "professionals/built-small/event-driven-order-processing.md",
    },
    // PROFESSIONALS - Production Level
    {
        id: "pro-fe-001",
        title: "Design System Library",
        category: "professional",
        experience: "production",
        filePath: "professionals/production/design-system.md",
    },
    {
        id: "pro-fe-002",
        title: "Micro-frontend Platform Shell",
        category: "professional",
        experience: "production",
        filePath: "professionals/production/microfrontend-shell.md",
    },
    {
        id: "pro-fs-001",
        title: "Real-time Collaboration Tool",
        category: "professional",
        experience: "production",
        filePath: "professionals/production/collab-tool.md",
    },
    {
        id: "pro-fs-002",
        title: "Team Project Management Suite",
        category: "professional",
        experience: "production",
        filePath: "professionals/production/project-management-suite.md",
    },
    {
        id: "pro-fs-003",
        title: "Realtime Support Platform",
        category: "professional",
        experience: "production",
        filePath: "professionals/production/realtime-support-platform.md",
    },
];
