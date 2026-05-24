"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Technologies Used" },
  { value: 2, suffix: "+", label: "Years Experience" },
];

const timeline = [
  {
    year: "2022",
    title: "Started Coding Journey",
    description: "Discovered the world of programming and fell in love with web development.",
    color: "from-purple-500 to-purple-600",
  },
  {
    year: "2023",
    title: "Mastered Frontend",
    description: "Deep-dived into React, Next.js, and modern CSS frameworks to build stunning interfaces.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    year: "2024",
    title: "Full Stack Development",
    description: "Expanded into backend with Node.js, Express, and databases like MongoDB and PostgreSQL.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    year: "2025+",
    title: "AI Integration & Innovation",
    description: "Incorporating AI/ML capabilities into web applications and building intelligent digital experiences.",
    color: "from-pink-500 to-rose-600",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p variants={itemVariants} className="text-emerald-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Get to know me
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight">
            About <span className="text-gradient">Me</span>
          </motion.h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Avatar / visual side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-6 border border-dashed border-purple-500/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-12 border border-dashed border-emerald-500/20 rounded-full"
              />

              {/* Avatar box */}
              <div className="relative w-64 h-64 rounded-3xl overflow-hidden glass-card border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-emerald-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center text-4xl font-black text-white mx-auto mb-3">
                      AH
                    </div>
                    <p className="text-white font-bold text-lg">Arham Hussain</p>
                    <p className="text-white/50 text-sm">Full Stack Developer</p>
                  </div>
                </div>

                {/* Floating tags */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3 py-1.5 rounded-full text-xs text-emerald-400 border border-emerald-500/30"
                >
                  ⚡ Full Stack
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 glass px-3 py-1.5 rounded-full text-xs text-purple-400 border border-purple-500/30"
                >
                  🤖 AI Developer
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 text-white">
              Crafting Digital Experiences with Passion
            </motion.h3>
            <motion.p variants={itemVariants} className="text-white/60 leading-relaxed mb-4">
              I&apos;m Arham Hussain, a passionate Full Stack Developer and AI enthusiast based in Pakistan.
              With a strong foundation in modern web technologies, I specialize in building immersive,
              performant, and scalable applications.
            </motion.p>
            <motion.p variants={itemVariants} className="text-white/60 leading-relaxed mb-6">
              My journey started with a curiosity about how things work on the internet, which quickly evolved
              into a deep passion for creating meaningful digital products. I blend technical expertise with
              a sharp design eye to build experiences that truly stand out.
            </motion.p>

            {/* Tech tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "TailwindCSS"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg glass text-xs font-medium text-white/70 border border-white/10 hover:border-purple-500/50 hover:text-purple-300 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center group hover:border-purple-500/30 transition-all">
                  <div className="text-2xl font-black text-gradient mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-white/80">My Journey</h3>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-emerald-500/30 to-transparent hidden md:block" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}>
                    <div className="glass-card p-5 hover:border-white/20 transition-all group">
                      <div className={`text-sm font-bold mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.year}
                      </div>
                      <h4 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color} shrink-0 shadow-lg hidden md:block`} />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
