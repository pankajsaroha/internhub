"use client";

import { MessageSquare, MapPin, Globe, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "WhatsApp Core",
    description: "Build a real-time messaging engine with end-to-end encryption and binary protocol optimization.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    link: "/programs/backend-development"
  },
  {
    title: "Uber Tracker",
    description: "Implement a geospatial tracking system capable of handling millions of real-time location updates.",
    icon: <MapPin className="h-6 w-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    link: "/programs/full-stack-development"
  },
  {
    title: "Netflix CDN",
    description: "Design a content delivery network with adaptive bitrate streaming and edge caching logic.",
    icon: <Globe className="h-6 w-6" />,
    color: "text-red-500",
    bg: "bg-red-500/10",
    link: "/programs/backend-development"
  },
  {
    title: "Auth Sentinel",
    description: "Build a distributed authentication service with OAuth2, JWT, and multi-factor security.",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    link: "/programs/java-programming"
  }
];

export default function RealProjects() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">Enterprise-Scale Architectures</h2>
            <p className="text-lg text-secondary leading-relaxed">
              We don't build Todo lists. We build the mission-critical systems 
              that form the backbone of the global tech economy.
            </p>
          </div>
          <Link href="/programs" className="btn btn-secondary flex items-center gap-2 group">
            View all projects
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-2xl flex flex-col h-full border border-border hover:shadow-xl hover:-translate-y-1 transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`w-12 h-12 rounded-xl ${project.bg} ${project.color} flex items-center justify-center mb-6`}>
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-secondary mb-8 flex-grow">{project.description}</p>
              <Link href={project.link} className="text-primary font-bold inline-flex items-center gap-1 group">
                Learn more
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

