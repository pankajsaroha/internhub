import fs from "fs";
import path from "path";
import { BookOpen, ArrowLeft, ArrowRight, Zap, Clock, Cpu, Layers, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categoryMeta: any = {
    architecture: {
        title: "System Architecture",
        desc: "High-level blueprints and distributed systems design.",
        icon: <Layers className="h-8 w-8 text-blue-500" />,
        color: "bg-blue-600",
        pillar: "Pillar 01"
    },
    internals: {
        title: "Language Internals",
        desc: "Deep-dives into runtimes, GC, and memory management.",
        icon: <Cpu className="h-8 w-8 text-indigo-500" />,
        color: "bg-indigo-600",
        pillar: "Pillar 02"
    },
    infrastructure: {
        title: "Cloud & Infra",
        desc: "Kubernetes, networking, and platform engineering.",
        icon: <Server className="h-8 w-8 text-emerald-500" />,
        color: "bg-emerald-600",
        pillar: "Pillar 03"
    },
    interviews: {
        title: "Interview Mastery",
        desc: "Production-grade interview prep and case studies.",
        icon: <ShieldCheck className="h-8 w-8 text-amber-500" />,
        color: "bg-amber-600",
        pillar: "Pillar 04"
    }
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = categoryMeta[category] || categoryMeta.architecture;

  // 1. Get local articles for THIS category
  const dirPath = path.join(process.cwd(), "content", category);
  let localArticles: any[] = [];
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    localArticles = files.filter(f => f.endsWith('.md')).map(f => ({
      slug: f.replace('.md', ''),
      title: f.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
      source: 'OFFICIAL',
      description: 'Official engineering guide.'
    }));
  }

  // 2. Get DB articles for THIS category
  const { data: dbArticles } = await supabase
    .from("articles")
    .select("slug, title, description")
    .eq("category", category)
    .order("created_at", { ascending: false });

  const communityArticles = (dbArticles || []).map(a => ({
    ...a,
    source: 'COMMUNITY',
    description: a.description || 'Community contributed guide.'
  }));

  const allArticles = [...localArticles, ...communityArticles];

  return (
    <main className="min-h-screen bg-background">
      {/* Premium Compact Category Hero */}
      <section className="relative pt-20 pb-16 border-b border-border bg-[#0d1117] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
        
        <div className="container relative z-10">
          <Link href="/system-design" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-black text-[10px] uppercase tracking-widest group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Hub
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm shrink-0">
                {meta.icon}
            </div>
            <div>
                <div className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">{meta.pillar}</div>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">{meta.title}</h1>
                <p className="text-base lg:text-lg text-gray-400 mt-2 opacity-80 max-w-2xl">{meta.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.length > 0 ? allArticles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/articles/${article.slug}`}
                className="glass-card p-8 rounded-[32px] border border-border hover:border-primary/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${article.source === 'OFFICIAL' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                      {article.source}
                    </span>
                    <span className="text-secondary text-xs font-bold flex items-center gap-1.5 opacity-40">
                        <Clock className="h-3.5 w-3.5" /> 12m
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-8 opacity-70">
                    {article.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
                  Start Deep Dive <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[40px]">
                    <p className="text-secondary font-bold opacity-60">No modules available in this category yet.</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
