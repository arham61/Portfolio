"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Star, GitBranch, Globe, Zap } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  JavaScript: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Python: "text-green-400 bg-green-400/10 border-green-400/20",
  CSS: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  HTML: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  default: "text-white/50 bg-white/5 border-white/10",
};

function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-5 bg-white/10 rounded-lg w-3/4 mb-3" />
      <div className="h-3 bg-white/5 rounded w-full mb-2" />
      <div className="h-3 bg-white/5 rounded w-5/6 mb-6" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-white/5 rounded-full" />
        <div className="h-6 w-16 bg-white/5 rounded-full" />
      </div>
      <div className="flex gap-3 mt-auto">
        <div className="h-8 w-24 bg-white/5 rounded-lg" />
        <div className="h-8 w-24 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const [hovered, setHovered] = useState(false);
  const langStyle = languageColors[repo.language || ""] || languageColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="glass-card group flex flex-col h-full overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-emerald-500/5 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-purple-400 shrink-0" />
              <h3 className="text-white font-bold text-lg leading-tight capitalize group-hover:text-purple-300 transition-colors">
                {repo.name.replace(/-/g, " ")}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-amber-400 text-xs">
            <Star size={12} className="fill-amber-400" />
            <span>{repo.stargazers_count}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
          {repo.description || "No description provided."}
        </p>

        {/* Topics / tags */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-full text-[10px] text-white/40 bg-white/5 border border-white/10"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Language & updated */}
        <div className="flex items-center gap-3 mb-5 text-xs">
          {repo.language && (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${langStyle}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {repo.language}
            </span>
          )}
          <span className="text-white/30 flex items-center gap-1">
            <GitBranch size={11} />
            {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            <GithubIcon />
            Source
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-xs text-white hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              <Globe size={12} />
              Live Demo
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto p-2 rounded-lg glass border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.github.com/users/arham61/repos?sort=updated&direction=desc&per_page=6",
          { next: { revalidate: 3600 } } as RequestInit
        );
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data: Repo[] = await res.json();
        // Filter out forked repos, take top 3
        const filtered = data.filter((r) => !r.name.includes("forked")).slice(0, 3);
        setRepos(filtered.length > 0 ? filtered : data.slice(0, 3));
      } catch (err) {
        setError("Could not load repositories. Showing placeholder data.");
        setRepos([
          {
            id: 1,
            name: "portfolio-website",
            description: "A premium Next.js portfolio with 3D animations and real-time GitHub integration.",
            html_url: "https://github.com/arham61",
            homepage: null,
            stargazers_count: 12,
            language: "TypeScript",
            topics: ["nextjs", "framer-motion", "threejs"],
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "full-stack-app",
            description: "A scalable full-stack application with React, Node.js, and MongoDB.",
            html_url: "https://github.com/arham61",
            homepage: null,
            stargazers_count: 8,
            language: "JavaScript",
            topics: ["react", "nodejs", "mongodb"],
            updated_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: "ai-chat-app",
            description: "Real-time AI-powered chat application with WebSocket and OpenAI integration.",
            html_url: "https://github.com/arham61",
            homepage: null,
            stargazers_count: 5,
            language: "TypeScript",
            topics: ["ai", "websocket", "openai"],
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="text-emerald-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            What I&apos;ve built
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/40 mt-4 max-w-xl mx-auto">
            Live repositories fetched directly from GitHub — always up to date.
          </motion.p>
        </motion.div>

        {/* Error notice */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs text-amber-400 border border-amber-400/20">
              ⚠ {error}
            </span>
          </motion.div>
        )}

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : repos.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://github.com/arham61"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/20 text-white font-semibold text-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
          >
            <GithubIcon />
            View All Repositories
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
