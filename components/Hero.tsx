import Link from "next/link";
import { Terminal, Cpu, ArrowRight, ShieldCheck, BrainCircuit, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-12 lg:py-20 bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)]" />
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="max-w-3xl lg:max-w-none text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-primary/20 shadow-sm" data-aos="fade-down">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            Community Driven & Open Source
                        </div>
                        
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]" data-aos="fade-right">
                            Explore the <span className="text-primary">Internals</span> <br />
                            of the Modern Web.
                        </h1>

                        <p className="text-base lg:text-lg text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium" data-aos="fade-right" data-aos-delay="100">
                            Stop guessing. Dive into the source code and architectural designs 
                            of the world's most scalable systems. Built by engineers, for engineers.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6" data-aos="fade-up" data-aos-delay="200">
                            <a href="/system-design" className="btn btn-primary px-10 py-5 text-lg w-full sm:w-auto shadow-xl shadow-primary/20 group">
                                Start Learning
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/demo/url-shortener" className="btn btn-secondary px-10 py-5 text-lg w-full sm:w-auto border-2 hover:bg-muted transition-all flex items-center gap-2">
                                <Play className="h-4 w-4 fill-current" /> Live Demo
                            </a>
                        </div>

                        <div className="mt-16 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center lg:justify-start gap-10 opacity-50 font-bold text-xs tracking-widest uppercase" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified Quality</div>
                            <div className="flex items-center gap-2"><Cpu className="h-4 w-4" /> System Design</div>
                            <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4" /> Deep Tech</div>
                        </div>
                    </div>

                    <div className="flex-1 w-full" data-aos="fade-left">
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                            
                            <div className="glass-card rounded-2xl overflow-hidden border border-border shadow-2xl">
                                <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="text-xs text-secondary font-mono ml-2">distributed-kv-store.go</div>
                                </div>
                                <div className="p-6 bg-[#1e1e1e] font-mono text-sm overflow-x-auto">
                                    <pre className="text-[#d4d4d4]">
                                        <code className="block">
                                            <span className="text-[#569cd6]">type</span> Node <span className="text-[#569cd6]">struct</span> &#123;<br />
                                            &nbsp;&nbsp;ID      <span className="text-[#4ec9b0]">string</span><br />
                                            &nbsp;&nbsp;Addr    <span className="text-[#4ec9b0]">string</span><br />
                                            &nbsp;&nbsp;Data    <span className="text-[#569cd6]">map</span>[<span className="text-[#4ec9b0]">string</span>]<span className="text-[#4ec9b0]">string</span><br />
                                            &nbsp;&nbsp;isLeader <span className="text-[#4ec9b0]">bool</span><br />
                                            &#125;<br /><br />
                                            <span className="text-[#569cd6]">func</span> (n *Node) Replicate(key, val <span className="text-[#4ec9b0]">string</span>) &#123;<br />
                                            &nbsp;&nbsp;<span className="text-[#6a9955]">// Implement Raft consensus</span><br />
                                            &nbsp;&nbsp;n.Data[key] = val<br />
                                            &nbsp;&nbsp;n.broadcastAppendEntries()<br />
                                            &#125;
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            {/* Floating Architecture Visual */}
                            <div className="absolute -bottom-6 -right-6 lg:-right-12 glass-card p-4 rounded-xl shadow-xl animate-bounce-slow">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                            <Cpu className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold">Node A (Leader)</div>
                                            <div className="text-[10px] text-secondary">Latency: 12ms</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-border" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                            <Cpu className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold">Node B (Follower)</div>
                                            <div className="text-[10px] text-secondary">Synced: 100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
