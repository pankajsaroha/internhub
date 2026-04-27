"use client";

import React from "react";
import { 
  Layout, Database, Server, Zap, Globe, 
  ShieldCheck, Cpu, ArrowRight, BookOpen,
  Layers, GitBranch, Terminal
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "System Design",
    description: "Architectural blueprints and distributed systems theory.",
    icon: <Layers className="h-6 w-6 text-blue-500" />,
    topics: ["Load Balancing", "CAP Theorem", "Microservices", "Event-Driven"]
  },
  {
    title: "Language Internals",
    description: "Deep-dives into Go, Java, and Rust runtime internals.",
    icon: <Cpu className="h-6 w-6 text-indigo-500" />,
    topics: ["Go Scheduler (GMP)", "JVM Garbage Collection", "Rust Memory Safety", "JIT Compilers"]
  },
  {
    title: "Infra & Cloud Native",
    description: "Engineering at the platform and infrastructure level.",
    icon: <Server className="h-6 w-6 text-emerald-500" />,
    topics: ["Kubernetes Internals", "Docker Networking", "IaC (Terraform)", "Service Meshes"]
  },
  {
    title: "Interview Series",
    description: "Mastering the FAANG System Design interview.",
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    topics: ["Mock Interviews", "LLD Patterns", "FAANG Case Studies", "Scalability Cheat-sheet"]
  }
];

export default function SystemDesignPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 border-b border-border bg-muted/30">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6 border border-primary/20">
              <Cpu className="h-3 w-3" /> Engineering Hub
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
              Engineering <br />
              <span className="text-primary">& System Design</span>
            </h1>
            <p className="text-xl text-secondary leading-relaxed">
              Dive deep into the internals of production systems. Learn how the 
              world's most scalable platforms are built from the ground up.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <div key={i} id={cat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')} className="glass-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all group" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                <p className="text-sm text-secondary mb-8 leading-relaxed">{cat.description}</p>
                
                <div className="space-y-3">
                  {cat.topics.map((topic, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs font-bold text-foreground/70">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {topic}
                    </div>
                  ))}
                </div>
                
                <button className="mt-8 text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                  Explore Module <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Preview */}
      <section className="py-24 bg-muted/20 border-y border-border">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2" data-aos="fade-right">
              <div className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Featured Analysis</div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">
                WhatsApp: How 50 Engineers Handled 900M Users.
              </h2>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                An in-depth architectural breakdown of WhatsApp's Erlang-based BEAM VM 
                utilization, custom protocols, and their horizontal scaling strategy.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <span className="px-4 py-2 rounded-lg bg-card border border-border text-xs font-bold">#DistributedSystems</span>
                <span className="px-4 py-2 rounded-lg bg-card border border-border text-xs font-bold">#Erlang</span>
                <span className="px-4 py-2 rounded-lg bg-card border border-border text-xs font-bold">#Scalability</span>
              </div>
              <Link href="/system-design/whatsapp" className="btn btn-primary px-8 py-4">
                Read Analysis
              </Link>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="glass-card aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="p-8 font-mono text-[10px] text-secondary overflow-hidden">
                  <div className="text-primary mb-4">// WhatsApp Architecture Discovery</div>
                  <div className="space-y-1">
                    <div>{`class ConnectionManager {`}</div>
                    <div className="pl-4">{`constructor() {`}</div>
                    <div className="pl-8 text-emerald-500">{`// Handled 2M+ connections per node`}</div>
                    <div className="pl-8">{`this.nodes = new DistributedCluster();`}</div>
                    <div className="pl-4">{`}`}</div>
                    <div className="pl-4">{`async broadcast(message) { ... }`}</div>
                    <div>{`}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-6">Want to build systems like this?</h2>
            <p className="text-secondary mb-10">
              Join our Engineering Track and get hands-on experience building 
              production-grade distributed systems with professional mentorship.
            </p>
            <Link href="/programs" className="btn btn-primary px-10 py-5">
              Explore Engineering Tracks
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
