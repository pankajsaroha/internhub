import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, BookOpen, Clock, Share2, 
  AlertCircle, ChevronRight, Hash
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let content = "";
  let title = "";
  let source = "OFFICIAL";
  let description = "";

  // 1. Try to fetch from Supabase first
  const { data: dbArticle } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (dbArticle) {
    content = dbArticle.content;
    title = dbArticle.title;
    source = "COMMUNITY";
    description = dbArticle.description;
  } else {
    // 2. Fallback to local files (scan all category folders)
    const categoryFolders = ["architecture", "internals", "infrastructure", "interviews"];
    for (const folder of categoryFolders) {
        const filePath = path.join(process.cwd(), "content", folder, `${slug}.md`);
        if (fs.existsSync(filePath)) {
            content = fs.readFileSync(filePath, "utf8");
            title = slug.replace(/-/g, ' ').toUpperCase();
            source = "OFFICIAL";
            break;
        }
    }
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Article Not Found</h1>
          <p className="text-secondary">The article "{slug}" hasn't been published yet.</p>
          <Link href="/articles" className="btn btn-primary px-8 py-3 rounded-full">Back to Library</Link>
        </div>
      </div>
    );
  }

  const lines = content.split(/\r?\n/);

  // Robust Markdown Parsing Logic for Inline Formatting
  const renderMarkdown = (text: string) => {
    if (!text) return "";
    // Handle Bold (**text**)
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-black">$1</strong>');
    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-[110]">
        <div className="h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)] w-1/3" />
      </div>

      {/* Hero Header */}
      <div className="bg-muted/30 border-b border-border pt-24 pb-16">
        <div className="container max-w-4xl">
            <Link href="/articles" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-all mb-8 font-bold text-[10px] uppercase tracking-[0.2em] group">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Engineering Library
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border ${source === 'OFFICIAL' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                    {source}
                </span>
                <span className="text-secondary text-xs font-bold flex items-center gap-1.5 opacity-60">
                    <Clock className="h-3.5 w-3.5" /> 12 MIN READ
                </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
                {title || lines[0].replace('# ', '')}
            </h1>
            
            <p className="text-lg text-secondary leading-relaxed max-w-2xl font-medium opacity-80">
                {description || "A deep dive into production-grade systems, internals, and architecture."}
            </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container max-w-4xl mt-12">
        <article className="article-body space-y-6">
          {lines.map((line, i) => {
            // Horizontal Rule
            if (line.trim() === '---') return <hr key={i} className="my-10 border-border" />;

            // Table detection
            if (line.startsWith('|')) {
                const cells = line.split('|').filter(c => c.trim() !== '' || line.includes('||'));
                if (line.includes('---')) return null; // Skip separator line
                
                const isHeader = !lines[i-1]?.startsWith('|');
                
                if (isHeader) {
                    return (
                        <div key={i} className="overflow-x-auto my-6 border border-border rounded-xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-muted/50">
                                    <tr>
                                        {cells.map((cell, ci) => (
                                            <th key={ci} className="p-3 text-[10px] font-black uppercase tracking-widest text-primary border-b border-border">{cell.trim()}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    );
                } else {
                    return (
                        <div key={i} className="border-x border-b border-border -mt-6 px-4 py-3 grid grid-cols-2 text-sm font-medium">
                            {cells.map((cell, ci) => (
                                <div key={ci} className={ci === 0 ? "text-foreground font-bold" : "text-secondary"}>
                                    {renderMarkdown(cell.trim())}
                                </div>
                            ))}
                        </div>
                    );
                }
            }

            // Headers
            if (line.startsWith('# ') && i > 0) return <h1 key={i} className="text-3xl font-black text-foreground mt-12 mb-6 tracking-tight">{line.replace('# ', '')}</h1>;
            if (line.startsWith('## ')) return (
                <h2 key={i} className="text-2xl font-black text-foreground mt-12 mb-4 flex items-center gap-3">
                    <span className="w-1 h-5 bg-primary rounded-full" />
                    {line.replace('## ', '')}
                </h2>
            );
            if (line.startsWith('### ')) return <h3 key={i} className="text-base font-black text-foreground mt-8 mb-3 uppercase tracking-wider text-primary/80">{line.replace('### ', '')}</h3>;

            // Code Blocks
            if (line.startsWith('```')) {
                let codeLines = [];
                let j = i + 1;
                while (j < lines.length && !lines[j].startsWith('```')) {
                    codeLines.push(lines[j]);
                    j++;
                }
                if (codeLines.length > 0) {
                    return (
                        <div key={i} className="my-6 rounded-xl overflow-hidden border border-border bg-[#0d1117]">
                            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/50">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-amber-500/20" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                                </div>
                                <div className="text-[8px] font-mono text-secondary uppercase tracking-[0.2em] opacity-40">Code</div>
                            </div>
                            <pre className="p-5 font-mono text-[12px] overflow-x-auto text-gray-300 leading-relaxed">
                                {codeLines.join('\n')}
                            </pre>
                        </div>
                    );
                }
                return null;
            }
            const isInsideCode = (index: number) => {
                let open = false;
                for (let k = 0; k < index; k++) {
                    if (lines[k].startsWith('```')) open = !open;
                }
                return open;
            };
            if (isInsideCode(i)) return null;

            // List Items
            if (line.startsWith('- ')) return (
                <div key={i} className="flex gap-3 mb-1 pl-2 group">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0 opacity-40" />
                    <span className="text-secondary text-sm lg:text-base leading-relaxed">{renderMarkdown(line.replace('- ', ''))}</span>
                </div>
            );

            // Plain Paragraphs
            if (line.trim() === '') return null;
            if (i === 0 && line.startsWith('# ')) return null; 

            return <p key={i} className="text-sm lg:text-base text-secondary leading-relaxed font-medium opacity-80">{renderMarkdown(line)}</p>;
          })}
        </article>

        {/* Footer Info */}
        <div className="mt-24 p-8 rounded-[32px] border border-border bg-muted/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-black text-white text-xl">
                    {source === 'OFFICIAL' ? 'IZ' : 'U'}
                </div>
                <div>
                    <div className="text-base font-black">{source === 'OFFICIAL' ? 'Inzivoo Engineering' : 'Community Author'}</div>
                    <div className="text-xs text-secondary font-bold opacity-60">Published Oct 2023</div>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all">
                    <Share2 className="h-5 w-5" />
                </button>
                <Link href="/apply" className="btn btn-primary px-6 py-3 rounded-xl font-bold text-sm">
                    Join the Track
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
