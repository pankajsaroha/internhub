"use client";

import { ShieldCheck, Award, FileCheck, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function CertificationsSection() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Validate your skills with <br />
              <span className="text-primary">Rigorous Certification.</span>
            </h2>
            <p className="text-lg text-secondary mb-10 leading-relaxed">
              Our certification process is a comprehensive evaluation of your technical 
              competency. We don't just teach systems; we ensure you have mastered the 
              architecture and implementation of every project.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Cryptographically Verified</h3>
                  <p className="text-secondary text-sm">Every certificate is unique and can be verified by recruiters via our public ledger.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Industry Recognition</h3>
                  <p className="text-secondary text-sm">Designed in collaboration with lead engineers from top-tier tech companies.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <FileCheck className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Portfolio Integrated</h3>
                  <p className="text-secondary text-sm">Directly links to your GitHub repository and system documentation for full transparency.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
             <div className="relative glass-card p-4 rounded-2xl border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl overflow-hidden shadow-inner">
                  {/* Mock Certificate Visual */}
                  <div className="p-12 text-center text-slate-900 font-serif">
                    <div className="mb-8 opacity-20"><Award className="h-16 w-16 mx-auto" /></div>
                    <div className="text-xs uppercase tracking-[0.3em] mb-4 text-slate-500">Certificate of Achievement</div>
                    <div className="text-2xl mb-2 font-bold">Pankaj Saroha</div>
                    <div className="text-sm italic text-slate-500 mb-8">has successfully completed the program</div>
                    <div className="text-xl font-bold text-primary mb-12 uppercase tracking-wider">Distributed Systems Architect</div>
                    <div className="flex justify-between items-end border-t border-slate-100 pt-8 text-[10px] text-slate-400">
                      <div className="text-left">
                        <div className="font-mono mb-1">REF: IV-9283-X1</div>
                        <div>VERIFIED BY INZIVOO</div>
                      </div>
                      <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded border border-slate-100 italic font-bold text-slate-200">SEAL</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 glass-card p-3 rounded-lg shadow-xl border border-white/20">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                     </div>
                     <div className="text-[10px] font-bold">VERIFIED<br/>MASTER</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
