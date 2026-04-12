"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Beaker, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "240+", label: "Active Members" },
  { value: "38", label: "Live Projects" },
  { value: "12yrs", label: "Established" },
  { value: "6", label: "Departments" },
];

const pillars = [
  { icon: Beaker, title: "Hands-On Science", desc: "Every project starts in a real lab. We prioritise physical experimentation over pure theory." },
  { icon: Users, title: "Peer Mentorship", desc: "Senior members mentor juniors directly. Knowledge flows laterally, not just top-down." },
  { icon: Trophy, title: "Competitive Edge", desc: "We regularly compete and win at inter-college science and engineering fests across Kerala." },
  { icon: BookOpen, title: "Open Research", desc: "We publish internal research papers and welcome collaboration with external institutions." },
];

export default function AboutPage() {
  return (
    <div className="font-inter text-navy">

      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden py-32 md:py-44">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-red font-oswald uppercase tracking-[0.3em] text-sm font-bold mb-6">
              <span className="w-8 h-[2px] bg-red" /> Info
            </span>
            <h1 className="font-oswald text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase leading-[0.9] tracking-tight mb-8">
              About<br /><span className="text-red">Science</span><br />Club
            </h1>
            <p className="font-inter text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              A student-run community at the intersection of curiosity and creation — built at ASIET since 2012.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex flex-col gap-1">
                <span className="font-oswald text-5xl font-bold text-navy leading-none">{s.value}</span>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="flex items-center gap-2 text-red font-oswald uppercase tracking-[0.25em] text-xs font-bold mb-6">
              <span className="w-6 h-[2px] bg-red" /> Our Story
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-navy leading-tight mb-6">
              Built by<br /><span className="text-red">Curious</span> Minds.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Science Club ASIET was founded in 2012 by a group of engineering students frustrated by the gap between classroom theory and real-world application. What started as an informal Friday evening tinkering group has grown into one of the most active technical clubs in the region.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Today we run 38+ active projects across six departments — from autonomous robotics and IoT mesh networks to green energy research and computational neuroscience. We&apos;re not a club. We&apos;re a lab with a membership card.
            </p>
            <Link href="/info/mission" className="inline-flex items-center gap-3 font-oswald uppercase font-bold text-navy hover:text-red transition-colors group">
              Read Our Mission
              <span className="w-9 h-9 rounded-full border-2 border-navy group-hover:border-red group-hover:bg-red group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <img src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Science Club Lab" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-red text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Since 2012</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="flex items-center gap-2 text-red font-oswald uppercase tracking-[0.25em] text-xs font-bold mb-12">
            <span className="w-6 h-[2px] bg-red" /> What We Stand For
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex flex-col gap-4 p-8 rounded-2xl bg-white border border-gray-100 hover:border-red/30 hover:shadow-lg transition-all group">
                <p.icon className="w-8 h-8 text-red" />
                <h3 className="font-oswald text-xl font-bold uppercase text-navy">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-navy py-20 text-white text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase mb-6">Ready to Build Something Real?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto font-inter">Membership is open to all ASIET students. No experience required — just curiosity.</p>
          <Link href="/info/join" className="inline-flex items-center gap-3 bg-red text-white px-10 py-4 rounded-full font-oswald uppercase tracking-widest font-bold hover:bg-white hover:text-navy transition-colors text-sm">
            Join Science Club <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
