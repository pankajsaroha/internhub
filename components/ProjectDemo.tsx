"use client";

import { Activity, Server, Database, Zap } from "lucide-react";

export default function ProjectDemo() {
  return (
    <section className="py-24 bg-muted/50 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">Systems Engineering Mastery</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Go beyond surface-level development. Architect the complex internals 
            that power global platforms at scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8" data-aos="fade-right">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Distributed Storage</h3>
                <p className="text-secondary">Implement sharding, replication, and consensus algorithms like Raft to build highly available databases.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-time Messaging</h3>
                <p className="text-secondary">Build low-latency communication systems using WebSockets, handling millions of concurrent connections.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Server className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">System Scalability</h3>
                <p className="text-secondary">Learn to design load balancers, CDNs, and caching layers to scale systems for massive traffic.</p>
              </div>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="glass-card rounded-2xl overflow-hidden border border-border shadow-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="font-bold">System Monitor</span>
                </div>
                <div className="flex gap-2">
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">Operational</div>
                  <div className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">v2.4.0</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-[10px] text-secondary uppercase font-bold mb-1">Total Throughput</div>
                  <div className="text-2xl font-bold">124k <span className="text-sm font-normal text-secondary">req/s</span></div>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-[10px] text-secondary uppercase font-bold mb-1">Avg Latency</div>
                  <div className="text-2xl font-bold">42 <span className="text-sm font-normal text-secondary">ms</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Database Replicas</span>
                  <span className="font-mono">3 / 3 Active</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%] rounded-full" />
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-secondary">Cache Hit Rate</span>
                  <span className="font-mono">92.4%</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[92%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -top-6 -right-6 glass-card p-3 rounded-lg shadow-xl hidden sm:block">
              <div className="text-[10px] font-bold text-secondary mb-2">NETWORK TOPOLOGY</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1.5 h-6 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
