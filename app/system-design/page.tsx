"use client";

import React from "react";
import { 
  Server, ShieldCheck, Cpu, ArrowRight, 
  Layers, GitBranch, Terminal, BookOpen,
  Hash, Clock, Zap
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "System Design",
    slug: "architecture",
    description: "Architectural blueprints and distributed systems theory.",
    icon: <Layers className="h-6 w-6 text-blue-500" />,
    topics: ["Load Balancing", "CAP Theorem", "Microservices", "Event-Driven"]
  },
  {
    title: "Language Internals",
    slug: "internals",
    description: "Deep-dives into Go, Java, and Rust runtime internals.",
    icon: <Cpu className="h-6 w-6 text-indigo-500" />,
    topics: ["Go Scheduler (GMP)", "JVM Garbage Collection", "Rust Memory Safety", "JIT Compilers"]
  },
  {
    title: "Infra & Cloud Native",
    slug: "infrastructure",
    description: "Engineering at the platform and infrastructure level.",
    icon: <Server className="h-6 w-6 text-emerald-500" />,
    topics: ["Kubernetes Internals", "Docker Networking", "IaC (Terraform)", "Service Meshes"]
  },
  {
    title: "Interview Series",
    slug: "interviews",
    description: "Mastering the FAANG System Design interview.",
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    topics: ["Mock Interviews", "LLD Patterns", "FAANG Case Studies", "Scalability Cheat-sheet"]
  }
];

const featuredArticles = [
    {
        slug: "url-shortener",
        title: "Building a High-Scale URL Shortener",
        category: "Architecture",
        time: "12m",
        desc: "Learn Base62 encoding, Redis caching, and ID generation for billions of redirects."
    },
    {
        slug: "whatsapp-architecture",
        title: "WhatsApp: Engineering for 900M Users",
        category: "Case Study",
        time: "15m",
        desc: "How 50 engineers built a global communication giant using Erlang and custom protocols."
    }
];

export default function SystemDesignPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Premium Compact Hero */}
      <section className="relative pt-20 pb-16 border-b border-border bg-[#0d1117] overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/70 text-[10px] font-black tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free Knowledge Base
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4 text-white leading-[0.95]">
                Engineering <br />
                <span className="text-primary text-glow-sm">System Design</span>
            </h1>
            <p className="text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl">
                Explore the internal mechanics of high-scale systems. From low-level 
                runtimes to global-scale distributed architectures.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                <p className="text-sm text-secondary mb-8 leading-relaxed opacity-80">{cat.description}</p>
                
                <div className="space-y-2 mb-10">
                  {cat.topics.map((topic, j) => (
                    <div key={j} className="flex items-center gap-2 text-[11px] font-bold text-foreground/60">
                      <div className="w-1 h-1 rounded-full bg-primary/40" />
                      {topic}
                    </div>
                  ))}
                </div>
                
                <Link href={`/system-design/${cat.slug}`} className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                  Explore Module <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Preview */}
      <section className="py-24 bg-muted/20 border-y border-border">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
                <h2 className="text-3xl lg:text-4xl font-black mb-4">Latest Deep Dives</h2>
                <p className="text-secondary max-w-xl opacity-70">Freshly published architectural breakdowns and engineering insights from the core team.</p>
            </div>
            <Link href="/articles" className="btn btn-secondary px-6 py-2.5 text-xs border border-border rounded-xl font-black uppercase tracking-widest flex items-center gap-2 group hover:bg-primary hover:text-white hover:border-primary transition-all">
                Full Library <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article, i) => (
              <Link key={i} href={`/articles/${article.slug}`} className="glass-card p-10 rounded-[40px] border border-border hover:border-primary/30 transition-all group flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-8">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/20">
                            {article.category}
                        </span>
                        <span className="text-secondary text-xs font-bold flex items-center gap-1.5 opacity-40">
                            <Clock className="h-3.5 w-3.5" /> {article.time}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                    </h3>
                    <p className="text-secondary leading-relaxed mb-10 opacity-70">
                        {article.desc}
                    </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                    Read Guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
