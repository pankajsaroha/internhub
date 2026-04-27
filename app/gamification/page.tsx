"use client";

import React from "react";
import { 
  Zap, Flame, Target, Trophy, 
  Star, Lock, Unlock, ArrowRight,
  ShieldCheck, Cpu, Code2, Layers
} from "lucide-react";
import Link from "next/link";

const levels = [
  { level: "1-5", title: "Junior Engineer", perk: "Access to Starter Projects", color: "text-blue-500", bg: "bg-blue-500/10" },
  { level: "6-15", title: "System Architect", perk: "Access to Distributed Systems Track", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { level: "16-30", title: "Principal Engineer", perk: "Early access to Beta Features", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { level: "31+", title: "Elite Architect", perk: "Direct Mentorship & Industry Referrals", color: "text-amber-500", bg: "bg-amber-500/10" }
];

export default function GamificationPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 border-b border-border bg-muted/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6 border border-primary/20">
              <Zap className="h-3 w-3 fill-current" /> The Progression System
            </div>
            <h1 className="text-4xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Level Up Your <br />
              <span className="text-primary text-glow">Engineering Career</span>
            </h1>
            <p className="text-xl text-secondary leading-relaxed mb-10">
              Our gamified ecosystem tracks every task you complete, turning your 
              learning journey into a professional progression track.
            </p>
            <div className="flex gap-6">
              <Link href="/dashboard" className="btn btn-primary px-10 py-5">
                View My Progress
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanics Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[40px] border border-border hover:border-primary/50 transition-all group" data-aos="fade-up">
              <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Flame className="h-8 w-8 text-orange-500 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4">Daily Streaks</h3>
              <p className="text-secondary leading-relaxed">
                Log in and complete at least one task daily to maintain your streak. 
                7+ day streaks grant a <span className="text-primary font-bold">1.5x XP Boost</span>.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[40px] border border-border hover:border-primary/50 transition-all group" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-blue-500 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4">XP Points</h3>
              <p className="text-secondary leading-relaxed">
                Earn XP for everything: Code reviews (+20), Task completion (+50), 
                and Project milestones (+500). Total XP determines your rank.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[40px] border border-border hover:border-primary/50 transition-all group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Trophy className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black mb-4">Rare Badges</h3>
              <p className="text-secondary leading-relaxed">
                Unlock limited-edition badges by participating in coding sprints 
                and contributing to our open-source internals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Timeline */}
      <section className="py-24 bg-muted/20 border-y border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Ranking Roadmap</h2>
            <p className="text-secondary">Climb the hierarchy from Apprentice to Principal.</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {levels.map((lvl, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-border flex flex-col md:flex-row items-center gap-8 group hover:bg-card transition-all">
                <div className={`w-20 h-20 rounded-2xl ${lvl.bg} flex items-center justify-center shrink-0 font-black text-2xl ${lvl.color}`}>
                  {lvl.level}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-black mb-1">{lvl.title}</h3>
                  <p className="text-secondary text-sm">{lvl.perk}</p>
                </div>
                <div className="opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlockable Projects Preview */}
      <section className="py-24 overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-8">Unlock Advanced Challenges</h2>
              <p className="text-xl text-secondary mb-10 leading-relaxed">
                As you level up, you'll unlock high-fidelity project tracks that 
                focus on the most complex engineering domains.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-muted/50 grayscale opacity-60">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black">Distributed SQL Database</div>
                    <div className="text-[10px] uppercase font-black text-secondary">Required: Level 10</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-primary/20 bg-primary/5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Unlock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-primary">Microservices Orchestrator</div>
                    <div className="text-[10px] uppercase font-black text-primary">Unlocked at Level 5</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="glass-card aspect-square rounded-[60px] border border-border shadow-2xl bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center p-20 text-center">
                  <div>
                    <Trophy className="h-32 w-32 text-amber-500 mx-auto mb-8 animate-bounce" />
                    <h3 className="text-3xl font-black mb-4">Level Up!</h3>
                    <p className="text-secondary mb-8">You've reached <span className="text-primary font-bold">System Architect</span> status.</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[75%] shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                    </div>
                    <div className="mt-4 text-xs font-bold text-secondary">2,450 / 3,000 XP to Level 11</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-black mb-8">Ready to start the grind?</h2>
            <Link href="/apply" className="btn btn-primary px-12 py-5 text-lg shadow-2xl shadow-primary/20">
              Launch Your First Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
