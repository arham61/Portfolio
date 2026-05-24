"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/30 text-sm"
        >
          © {new Date().getFullYear()} Arham Hussain. All rights reserved.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/20 text-sm"
        >
          Built with{" "}
          <span className="text-purple-400">Next.js</span>,{" "}
          <span className="text-emerald-400">Tailwind CSS</span> &{" "}
          <span className="text-blue-400">Framer Motion</span>
        </motion.div>
      </div>
    </footer>
  );
}
