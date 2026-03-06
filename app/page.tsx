"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Terminal, Database, Award, ChevronRight, Zap } from "lucide-react";
import data from "../data/resume.json";

// Spring transition settings for premium feel
const spring = { type: "spring", stiffness: 100, damping: 20 };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: spring },
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    const updateMouse = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", updateMouse);
    };
  },[]);

  return (
    <main className="min-h-screen relative selection:bg-primary/30 selection:text-white">
      {/* Interactive Cursor Glow (Only visible on desktop) */}
      <div 
        className="hidden lg:block fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[-1]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.03) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      <AnimatePresence>
        {loading && <SplashScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar />
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 space-y-40">
            <HeroSection />
            <ImpactHighlights />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
          </div>
          <Footer />
        </motion.div>
      )}
    </main>
  );
}

function SplashScreen() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 rounded-full" />
        <h1 className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 z-10">
          AS
        </h1>
      </motion.div>
      
      <div className="mt-12 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="mt-4 text-xs tracking-[0.3em] text-primary/70 uppercase font-mono"
      >
        Initializing DataSpace
      </motion.p>
    </motion.div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-xl tracking-wide text-white">
          <span className="text-primary">/</span>ATUL
        </span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#experience" className="hover:text-primary hover:text-glow transition-all">Experience</a>
          <a href="#skills" className="hover:text-primary hover:text-glow transition-all">Skills</a>
          <a href="#education" className="hover:text-primary hover:text-glow transition-all">Education</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="min-h-[75vh] flex flex-col justify-center relative">
      <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10 max-w-4xl">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for New Opportunities
          </span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient">
            Data Platforms.
          </span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-2xl leading-relaxed mb-10 max-w-2xl font-light">
          {data.basics.summary}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
          <a href="#experience" className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden flex items-center justify-center gap-2 transition-transform hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            View Experience <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={() => window.print()} className="group px-8 py-4 glass-card text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white/5">
            Download Resume <Download size={20} className="text-primary group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ImpactHighlights() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-3xl font-bold tracking-tight">Platform Impact & Achievements</h3>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={spring}
        /* 👇 Changed grid to handle multiple rows beautifully */
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* 👇 Removed the .slice(0, 3) so ALL achievements will now show */}
        {data.achievements.map((ach, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl group relative overflow-hidden">
            {/* Animated background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="text-5xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-500 drop-shadow-lg">
                {ach.metric}
              </div>
              <p className="text-gray-400 leading-relaxed font-light">{ach.context}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative">
      <div className="flex items-center gap-4 mb-16">
        <div className="p-3 glass-card rounded-lg border-primary/30 text-primary">
          <Terminal size={24} />
        </div>
        <h3 className="text-4xl font-bold tracking-tight">Work Experience</h3>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* The glowing timeline line */}
        <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-[2px] timeline-line opacity-30 md:-translate-x-[1px]" />

        <div className="space-y-12">
          {data.experience.map((exp, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...spring, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-37px] md:left-[50%] md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-primary z-10 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />

                <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-8 rounded-2xl relative group">
                    <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h4>
                    <div className="flex justify-between items-center mb-6 text-sm">
                      <span className="font-semibold text-primary/80">{exp.company}</span>
                      <span className="text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full">{exp.dates}</span>
                    </div>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet: string, j: number) => (
                        <li key={j} className="flex gap-3 text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                          <ChevronRight size={16} className="text-primary/50 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills">
      <div className="flex items-center gap-4 mb-16">
        <div className="p-3 glass-card rounded-lg border-secondary/30 text-secondary">
          <Database size={24} />
        </div>
        <h3 className="text-4xl font-bold tracking-tight">Core Stack</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.skills.map((skillGroup, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.1 }}
            className="glass-card p-8 rounded-2xl group"
          >
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <Zap size={18} className="text-primary group-hover:animate-pulse" />
              {skillGroup.group}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill: string, j: number) => (
                <span 
                  key={j} 
                  className="text-xs font-medium px-4 py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 glass-card rounded-lg text-yellow-400 border-yellow-400/30">
            <Award size={24} />
          </div>
          <h3 className="text-3xl font-bold">Education</h3>
        </div>
        <div className="glass-card p-8 rounded-2xl border-l-4 border-l-yellow-400/50">
          {data.education.map((edu, i) => (
            <div key={i}>
              <h4 className="font-bold text-xl text-white mb-2">{edu.institution}</h4>
              <p className="text-primary font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-500 mb-4 font-mono mt-1">{edu.dates}</p>
              <ul className="text-gray-400 space-y-2">
                {edu.bullets.map((b: string, j: number) => (
                  <li key={j} className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" /> {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 glass-card rounded-lg text-blue-400 border-blue-400/30">
            <Award size={24} />
          </div>
          <h3 className="text-3xl font-bold">Certifications</h3>
        </div>
        <div className="glass-card p-8 rounded-2xl">
          <ul className="space-y-4">
            {data.certifications.map((cert: string, i: number) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="p-1 rounded bg-blue-400/10 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform">
                  <Award size={14} />
                </span> 
                <span className="text-gray-300 group-hover:text-white transition-colors">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-white/5 text-center text-gray-500 text-sm bg-black/50 backdrop-blur-lg">
      <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-6">
        <a href={`mailto:${data.basics.email}`} className="hover:text-primary transition-colors hover:text-glow">{data.basics.email}</a>
        <span className="hidden md:inline text-white/20">•</span>
        <span className="hover:text-primary transition-colors cursor-default">{data.basics.phone}</span>
        <span className="hidden md:inline text-white/20">•</span>
        <a href={`https://linkedin.com/in/${data.basics.links[0].url.replace('@','')}`} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors hover:text-glow">LinkedIn {data.basics.links[0].url}</a>
      </div>
      <p className="font-mono text-xs tracking-widest uppercase opacity-50">
        © {new Date().getFullYear()} {data.basics.name} // System Online
      </p>
    </footer>
  );
}