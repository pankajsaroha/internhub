"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";

const weeks = [
  {
    week: "01",
    title: "Core Infrastructure",
    topics: ["High-Concurrency Design", "Low-Latency Protocols", "Memory Management"],
    accent: "text-blue-500"
  },
  {
    week: "02",
    title: "Data Architecture",
    topics: ["Distributed Storage Engine", "Consistency Models", "Advanced Caching"],
    accent: "text-indigo-500"
  },
  {
    week: "03",
    title: "Distributed Coordination",
    topics: ["Consensus (Raft/Paxos)", "Service Discovery", "Fault Tolerance"],
    accent: "text-emerald-500"
  },
  {
    week: "04",
    title: "Global Scalability",
    topics: ["Traffic Orchestration", "Edge Computing", "Performance Profiling"],
    accent: "text-amber-500"
  }
];

export default function LearningPath() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">Structured Mastery</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Our research-backed curriculum guide you through the transition from 
            writing code to architecting complex, resilient software systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map((item, index) => (
            <div key={index} className="group relative p-8 rounded-2xl border border-border hover:border-primary/50 transition-all bg-card overflow-hidden" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="absolute top-0 right-0 p-4 text-4xl font-black opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                {item.week}
              </div>
              
              <div className={`text-xs font-bold uppercase tracking-widest ${item.accent} mb-4`}>
                Phase {item.week}
              </div>
              <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors">{item.title}</h3>
              
              <ul className="space-y-4">
                {item.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
