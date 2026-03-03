// Types and registry

export interface Project {
    id: string;
    title: string;
    category: "student" | "professional";
    experience: "no-prior" | "basic" | "built-small" | "production" | "backend" | "frontend" | "fullstack";
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
    // PROFESSIONALS
    {
        id: "pro-be-001",
        title: "Distributed KV Store",
        category: "professional",
        experience: "backend",
        filePath: "professionals/backend/distributed-kv.md",
    },
    {
        id: "pro-fe-001",
        title: "Design System Library",
        category: "professional",
        experience: "frontend",
        filePath: "professionals/frontend/design-system.md",
    },
    {
        id: "pro-fs-001",
        title: "Real-time Collaboration Tool",
        category: "professional",
        experience: "fullstack",
        filePath: "professionals/fullstack/collab-tool.md",
    },
];
