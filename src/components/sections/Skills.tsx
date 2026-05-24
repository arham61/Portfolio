"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    glow: "shadow-purple-500/20",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 80 },
      { name: "Redux", level: 78 },
    ],
  },
  {
    title: "Backend",
    icon: Code2,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 88 },
      { name: "GraphQL", level: 65 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL", level: 75 },
      { name: "Redis", level: 60 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/20",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Docker", level: 65 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/70 font-medium">{name}</span>
        <span className="text-xs text-white/40 tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 bg-grid-white -z-10" />

      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            What I work with
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight">
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/40 mt-4 max-w-xl mx-auto">
            A curated set of technologies I&apos;ve mastered through building real-world projects.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.title}
                variants={itemVariants}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === i
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : "glass border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
                {cat.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            const isActive = activeCategory === catIdx;
            return (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className={`glass-card p-6 cursor-pointer transition-all duration-500 ${
                  isActive ? `border-white/20 shadow-xl ${cat.glow}` : "opacity-60 hover:opacity-80"
                }`}
                onClick={() => setActiveCategory(catIdx)}
                whileHover={{ scale: 1.01 }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                  <span className="ml-auto text-white/30 text-xs">{cat.skills.length} skills</span>
                </div>

                {/* Skill bars */}
                <div>
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={isActive ? si * 0.08 : 0}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm mb-6 uppercase tracking-widest">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "Vercel", "Netlify", "Linux", "Postman", "Jest", "Prisma", "Socket.io"].map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 glass border border-white/10 rounded-full text-xs text-white/50 hover:text-white hover:border-white/30 transition-all cursor-default"
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
