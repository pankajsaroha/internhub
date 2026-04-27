"use client";

import React from "react";
import { 
  Terminal, Code2, GitBranch, ArrowRight, 
  CheckCircle2, Play, Layout,
  Zap, Database, BarChart3, Globe
} from "lucide-react";
import Link from "next/link";

export default function URLShortenerDemo() {
  const tasks = [
    {
      title: "Data Modeling",
      description: "Design a schema that handles high-throughput reads. Choose between SQL for consistency or NoSQL for scale.",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Hashing Algorithm",
      description: "Implement Base62 encoding to generate short, unique identifiers while managing collision strategies.",
      icon: <Code2 className="h-5 w-5" />
    },
    {
      title: "Redirection Logic",
      description: "Optimize for <10ms redirection latency using in-memory caches like Redis.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Analytics Engine",
      description: "Track clicks, geo-location, and referrers using an event-driven data pipeline.",
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Header */}
      <section className="py-20 border-b border-border bg-muted/20 overflow-hidden">
        <div className="container relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6 border border-primary/20">
                <Play className="h-3 w-3 fill-current" /> Live Demo Project
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
                Build a Scalable <br />
                <span className="text-primary text-glow">URL Shortener</span>
              </h1>
              <p className="text-xl text-secondary leading-relaxed mb-10">
                Go beyond "Hello World". Build a production-grade service that 
                handles billions of redirects with sub-millisecond latency.
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#build" className="btn btn-primary px-10 py-5 text-lg shadow-xl shadow-primary/20">
                  Start Building Now
                </a>
                <div className="flex items-center gap-3 text-secondary text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  No Sign-up required to start
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
              <div className="glass-card rounded-3xl overflow-hidden border border-border shadow-2xl">
                <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/30" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                  </div>
                  <div className="text-[10px] font-mono text-secondary">output.log</div>
                </div>
                <div className="p-8 font-mono text-xs space-y-3">
                  <div className="flex gap-3">
                    <span className="text-emerald-500 font-bold">[200 OK]</span>
                    <span className="text-secondary">POST /v1/shorten</span>
                    <span className="text-primary">"https://google.com/search?q=..."</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-amber-500 font-bold">[CACHE MISS]</span>
                    <span className="text-secondary">Fetching ID: 8xK9p2</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-500 font-bold">[REDIRECT]</span>
                    <span className="text-secondary">8xK9p2 {"->"} Redirecting to Source</span>
                    <span className="text-emerald-500 font-bold">8ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-up">
              <h2 className="text-3xl font-black mb-8 tracking-tight">The Engineering Challenge</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> High Scale
                  </h3>
                  <p className="text-secondary text-sm">Handle 1 Billion+ redirection requests per month without service degradation.</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" /> Latency Budget
                  </h3>
                  <p className="text-secondary text-sm">The redirection overhead must be under 10ms to ensure a seamless user experience.</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-10 rounded-3xl border-primary/20 bg-primary/[0.02]" data-aos="fade-up" data-aos-delay="100">
              <div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Core Goal</div>
              <p className="text-xl font-bold leading-relaxed">
                "Design a system that generates a unique 6-character alias for any URL 
                and manages global redirection at 100k requests per second."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Tasks */}
      <section id="build" className="py-24 bg-muted/10">
        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">The Build Track</h2>
            <p className="text-secondary max-w-2xl mx-auto">Follow this systematic engineering approach to build the system.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all group" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  {task.icon}
                </div>
                <div className="text-[10px] font-black text-primary uppercase mb-2">Phase 0{i + 1}</div>
                <h3 className="text-lg font-bold mb-3">{task.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Preview */}
      <section className="py-24 border-y border-border overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl font-black mb-6">Open Source Reference</h2>
              <p className="text-secondary mb-10 leading-relaxed">
                Stuck? Explore our production-ready implementation on GitHub. 
                Learn how we handle edge cases like collision management and cache eviction.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Clean Architecture
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Unit & Load Tests included
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Docker-ready deployment
                </div>
              </div>
              <button className="btn btn-secondary px-8 py-4 flex items-center gap-3 font-bold border-2">
                <Code2 className="h-5 w-5" /> View Solution Repo
              </button>
            </div>
            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <div className="glass-card rounded-3xl border border-border shadow-2xl p-1 bg-muted/50">
                <div className="rounded-[20px] overflow-hidden bg-[#0d1117] p-6 font-mono text-[10px] text-gray-400">
                  <div className="flex items-center gap-2 mb-4 text-gray-500">
                    <GitBranch className="h-3 w-3" /> main / src / lib / hasher.ts
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-purple-400">export function</span>{" "}
                      <span className="text-blue-400">generateHash</span>(id: <span className="text-orange-400">number</span>){" {"}
                    </div>
                    <div className="pl-4">
                      const chars = <span className="text-emerald-400">"abcdefghijklmnopqrstuvwxyz..."</span>;
                    </div>
                    <div className="pl-4">
                      let hash = <span className="text-emerald-400">""</span>;
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">while</span> (id &gt; <span className="text-orange-400">0</span>){" {"}
                    </div>
                    <div className="pl-8">
                      hash = chars[id % <span className="text-orange-400">62</span>] + hash;
                    </div>
                    <div className="pl-8">
                      id = Math.<span className="text-blue-400">floor</span>(id / <span className="text-orange-400">62</span>);
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span> hash;
                    </div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container">
          <div className="max-w-2xl mx-auto glass-card p-16 rounded-[40px] border border-primary/20 bg-primary/[0.02]">
            <h2 className="text-4xl font-black mb-6">Ready to Ship?</h2>
            <p className="text-secondary mb-10 text-lg">
              Download the project starter kit and start coding the internals of a 
              massive redirection engine today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply" className="btn btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/30">
                Get the Starter Kit
              </Link>
              <button className="px-8 py-5 font-bold text-secondary hover:text-foreground transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
