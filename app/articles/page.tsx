import fs from "fs";
import path from "path";
import { BookOpen, ArrowRight, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ArticlesListPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const queryParams = await searchParams;
  const activeCategory = queryParams.category || "all";

  // 1. Get local articles from all category folders
  const categories = ["architecture", "internals", "infrastructure", "interviews"];
  let localArticles: any[] = [];
  
  categories.forEach(cat => {
    const dirPath = path.join(process.cwd(), "content", cat);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const articles = files.filter(f => f.endsWith('.md')).map(f => ({
        slug: f.replace('.md', ''),
        title: f.replace('.md', '').replace(/-/g, ' ').toUpperCase(),
        source: 'OFFICIAL',
        category: cat,
        description: `Engineering deep dive into ${cat}.`
      }));
      localArticles = [...localArticles, ...articles];
    }
  });

  // 2. Get DB articles
  const { data: dbArticles } = await supabase
    .from("articles")
    .select("slug, title, description, category")
    .order("created_at", { ascending: false });

  const communityArticles = (dbArticles || []).map(a => ({
    ...a,
    source: 'COMMUNITY',
    category: a.category || 'architecture',
    description: a.description || 'Community contributed engineering insight.'
  }));

  const allArticles = [...localArticles, ...communityArticles];
  
  // 3. Filter by category
  const filteredArticles = activeCategory === "all" 
    ? allArticles 
    : allArticles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  const filterCategories = ["all", "architecture", "internals", "infrastructure", "interviews"];

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
                    Engineering <br />
                    <span className="text-primary text-glow">Library</span>
                </h1>
                <p className="text-base text-secondary leading-relaxed opacity-70">
                    Deep dives into distributed systems, language internals, and high-scale architectures.
                </p>
            </div>
            
            <div className="flex flex-wrap gap-2 p-1.5 bg-muted/50 border border-border rounded-2xl">
                {filterCategories.map((cat) => (
                    <Link 
                        key={cat}
                        href={cat === "all" ? "/articles" : `/articles?category=${cat}`}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-primary/10 text-secondary'}`}
                    >
                        {cat}
                    </Link>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? filteredArticles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/articles/${article.slug}`}
              className="glass-card p-8 rounded-[40px] border border-border hover:border-primary/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${article.source === 'OFFICIAL' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                    {article.source}
                  </div>
                  <div className="text-secondary text-xs flex items-center gap-1 font-bold">
                    <Clock className="h-3 w-3" /> 12m
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">
                  {article.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                Read Deep Dive <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[40px]">
                <p className="text-secondary font-bold">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
