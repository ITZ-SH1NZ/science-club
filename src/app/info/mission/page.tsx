"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
  { num: "01", title: "Curiosity First", desc: "Every question is worth asking. We create an environment where intellectual curiosity is celebrated, not suppressed." },
  { num: "02", title: "Build, Don't Just Study", desc: "We believe learning accelerates 10× when you are making something real. Prototypes, projects, and experiments are our curriculum." },
  { num: "03", title: "Radical Openness", desc: "Our research, our code, and our findings are openly shared — internally and with the broader scientific community." },
  { num: "04", title: "No Hierarchy of Ideas", desc: "The best idea wins, regardless of who's in what year or which department. First-year insights are as valid as senior wisdom." },
];

const goals = [
  "Establish at least one peer-reviewed research publication per semester by 2026.",
  "Build a dedicated student-run hardware lab with 3D printing, PCB fabrication, and sensor arrays.",
  "Launch a Science Club open-source initiative with public GitHub repositories.",
  "Partner with two industry organisations for live internship placements annually.",
  "Build the largest inter-college science fest in Kerala by 2027.",
];

export default function MissionPage() {
  return (
    <div className="font-inter text-navy">

      {/* Hero */}
      <section className="bg-navy text-white py-32 md:py-44 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#0a1a4a]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-red font-oswald uppercase tracking-[0.3em] text-sm font-bold mb-6">
              <span className="w-8 h-[2px] bg-red" /> Info
            </span>
            <h1 className="font-oswald text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase leading-[0.9] tracking-tight mb-8">
              Our<br /><span className="text-red">Mission</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              To make science a lived practice — not just a subject to pass. We exist to bridge the gap between curiosity and creation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="flex items-center gap-2 text-red font-oswald uppercase tracking-[0.25em] text-xs font-bold mb-8">
              <span className="w-6 h-[2px] bg-red" /> Statement
            </span>
            <blockquote className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.0] text-navy mb-10">
              &ldquo;Science is not a spectator sport. It demands participation.&rdquo;
            </blockquote>
            <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-red pl-6">
              Science Club ASIET was built on a single premise: the best way to understand the world is to try and change it. Our mission is to empower every member — regardless of their major or year — to conduct real science, ship real projects, and become real scientists before they leave ASIET.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="flex items-center gap-2 text-red font-oswald uppercase tracking-[0.25em] text-xs font-bold mb-12">
            <span className="w-6 h-[2px] bg-red" /> Core Values
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }} className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-red/30 hover:shadow-md transition-all">
                <span className="font-oswald text-5xl font-bold text-gray-100 block mb-2">{v.num}</span>
                <h3 className="font-oswald text-2xl font-bold uppercase text-navy mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="flex items-center gap-2 text-red font-oswald uppercase tracking-[0.25em] text-xs font-bold mb-12">
            <span className="w-6 h-[2px] bg-red" /> 2025 – 2027 Goals
          </span>
          <div className="flex flex-col divide-y divide-gray-100">
            {goals.map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-6 py-6 group">
                <span className="font-oswald text-3xl font-bold text-gray-100 flex-shrink-0 w-10 group-hover:text-red transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-gray-600 text-base leading-relaxed pt-1 font-inter">{g}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 text-white text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-6">Help Us Get There</h2>
          <p className="text-white/60 mb-10 font-inter max-w-md mx-auto">Our mission only works with more curious people in the room.</p>
          <Link href="/info/join" className="inline-flex items-center gap-3 bg-red text-white px-10 py-4 rounded-full font-oswald uppercase tracking-widest font-bold hover:bg-white hover:text-navy transition-colors text-sm">
            Join the Mission <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
