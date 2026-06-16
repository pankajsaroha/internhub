"use client";

import { Trophy, Rocket, Briefcase, Star } from "lucide-react";

export default function Outcome() {
  return (
    <section className="py-24 bg-background border-t border-border relative overflow-hidden">
      {/* Decorative background grid/dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">The Professional Standard</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            Our graduates are recognized by industry leaders for their ability to design 
            robust, scalable systems that power the digital economy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm" data-aos="zoom-in" data-aos-delay="0">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Elite Portfolio</h3>
            <p className="text-secondary text-sm leading-relaxed">Showcase high-performance systems that prove your technical depth to any engineering team.</p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm" data-aos="zoom-in" data-aos-delay="100">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Career Mobility</h3>
            <p className="text-secondary text-sm leading-relaxed">Transition from feature developer to system architect with the skills top tech firms demand.</p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm" data-aos="zoom-in" data-aos-delay="200">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Architect Mindset</h3>
            <p className="text-secondary text-sm leading-relaxed">Master the trade-offs of distributed computing, consistency, and global scalability.</p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm" data-aos="zoom-in" data-aos-delay="300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Accelerated Growth</h3>
            <p className="text-secondary text-sm leading-relaxed">Skip the plateau of senior engineering by mastering complex system internals today.</p>
          </div>
        </div>

        <div className="mt-20 text-center" data-aos="fade-up">
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-12 p-10 rounded-3xl border-border bg-card shadow-xl">
            <div className="text-left">
              <div className="text-2xl font-bold mb-2">Ready to define your professional legacy?</div>
              <div className="text-secondary">Join the elite community of system architects.</div>
            </div>
            <a href="/apply" className="btn btn-primary px-10 py-5 text-lg shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
              Begin Application
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
