"use client";

import { BookOpen, Code2, BrainCircuit, Layout, ArrowRight, Cpu, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    title: "System Design",
    description: "Deep-dives into distributed systems, database internals, and performance engineering.",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    link: "/system-design",
    count: "12+ Case Studies"
  },
  {
    title: "Language Internals",
    description: "Master the low-level runtimes of Go, Java, and Rust. From GC to Schedulers.",
    icon: <Cpu className="h-6 w-6 text-indigo-500" />,
    link: "/system-design",
    count: "8+ Deep Dives"
  },
  {
    title: "Cloud Native",
    description: "Infrastructure engineering, Kubernetes, and scalable cloud architectures.",
    icon: <Server className="h-6 w-6 text-emerald-500" />,
    link: "/system-design",
    count: "15+ Modules"
  },
  {
    title: "Interview Mastery",
    description: "Production-grade interview prep for System Design and Software Architecture.",
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    link: "/system-design",
    count: "20+ Guides"
  }
];

export default function ResourceHub() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">The Learning Hub</h2>
            <p className="text-lg text-secondary leading-relaxed">
              Explore our comprehensive ecosystem of free and premium resources designed to help 
              you master the complexities of modern software systems.
            </p>
          </div>
          <Link href="/articles" className="group flex items-center gap-2 text-primary font-bold">
            Explore Engineering Library
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, index) => (
            <Link 
              key={index} 
              href={res.link}
              className="glass-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {res.icon}
              </div>
              <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">{res.count}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{res.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-6">{res.description}</p>
              <div className="text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
