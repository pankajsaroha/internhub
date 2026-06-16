"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Send, Save, ArrowLeft, 
  Eye, Edit3, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("architecture");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { error } = await supabase
            .from("articles")
            .insert([
                { 
                    title, 
                    slug: slug || title.toLowerCase().replace(/ /g, '-'), 
                    category,
                    content, 
                    description,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            alert("Error saving article: " + error.message);
        } else {
            alert("Article published successfully!");
            router.push("/articles");
        }
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="container max-w-5xl">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Admin
                </Link>

                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black tracking-tight">Create New Article</h1>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setPreviewMode(!previewMode)}
                            className="btn btn-secondary px-6 py-2 flex items-center gap-2"
                        >
                            {previewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {previewMode ? "Edit Mode" : "Preview"}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {!previewMode ? (
                        <div className="grid gap-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-secondary">Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Scaling Redis for 1M Requests"
                                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-secondary">URL Slug</label>
                                    <input 
                                        type="text" 
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        placeholder="e.g. scaling-redis-1m"
                                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-secondary">Category</label>
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:border-primary outline-none appearance-none"
                                    >
                                        <option value="architecture">Architecture</option>
                                        <option value="internals">Internals</option>
                                        <option value="infrastructure">Infrastructure</option>
                                        <option value="interviews">Interviews</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-secondary">Description (Short Summary)</label>
                                <textarea 
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={2}
                                    placeholder="Brief summary for the listing card..."
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:border-primary outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-secondary">Content (Markdown Support)</label>
                                <textarea 
                                    required
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={15}
                                    placeholder="# My Article\n\nStart writing here..."
                                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="btn btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                            >
                                <Send className="h-5 w-5" />
                                {isSubmitting ? "Publishing..." : "Publish Article"}
                            </button>
                        </div>
                    ) : (
                        <div className="glass-card p-12 rounded-[40px] border border-border prose prose-invert max-w-none">
                            <h1 className="text-5xl font-black mb-8">{title || "Article Title Preview"}</h1>
                            <div className="text-secondary whitespace-pre-wrap leading-relaxed">
                                {content || "Write some content to see a preview..."}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}
