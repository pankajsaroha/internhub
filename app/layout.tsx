import "./globals.css";
import "aos/dist/aos.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

export const metadata: Metadata = {
  metadataBase: new URL("https://inzivoo.com"),
  title: {
    default: "Inzivoo | Project-Based Training, Programming Quizzes & Certificates",
    template: "%s | Inzivoo",
  },
  description:
    "Inzivoo offers project-based training programs, programming quizzes, practical skill development, and completion certificates for learners and early-career developers.",
  keywords: [
    "inzivoo",
    "inzivoo training",
    "inzivoo programs",
    "inzivoo quizzes",
    "project based training",
    "project based internship",
    "online training platform",
    "online programming quizzes",
    "internship certificate",
    "developer training",
    "software development training",
    "project based learning platform",
    "coding practice platform",
    "frontend development",
    "backend development",
    "full stack development",
    "java programming",
    "python programming",
    "go programming",
    "javascript programming",
    "c++ programming",
    "c# programming",
    "rust programming",
    "technical interview preparation",
    "coding assessment practice",
    "software engineering training",
    "java quiz",
    "python quiz",
    "javascript quiz",
    "c++ quiz",
    "go quiz",
    "full stack training",
  ],
  applicationName: "Inzivoo",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://inzivoo.com",
    siteName: "Inzivoo",
    title: "Inzivoo | Project-Based Training, Programming Quizzes & Certificates",
    description:
      "Project-based training programs, technical quizzes, practical learning paths, and completion certificates for software learners.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Inzivoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inzivoo | Project-Based Training, Programming Quizzes & Certificates",
    description:
      "Build practical skills with project-based training, language quizzes, and guided learning at Inzivoo.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  category: "education",
};


import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <AOSInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
