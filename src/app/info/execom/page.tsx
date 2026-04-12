"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const teams = [
  {
    label: "01", name: "Core Team",
    members: [
      { name: "Dr. Rajan K.", role: "Faculty Advisor", img: "https://i.pravatar.cc/150?img=51" },
      { name: "Arjun Menon",  role: "Chairperson",    img: "https://i.pravatar.cc/150?img=11" },
      { name: "Priya Nair",   role: "Vice Chair",     img: "https://i.pravatar.cc/150?img=45" },
      { name: "Rohan Das",    role: "Secretary",      img: "https://i.pravatar.cc/150?img=12" },
      { name: "Sneha Pillai", role: "Treasurer",      img: "https://i.pravatar.cc/150?img=47" },
      { name: "Aditya Raj",   role: "Jt. Secretary",  img: "https://i.pravatar.cc/150?img=13" },
    ],
  },
  {
    label: "02", name: "Technical",
    members: [
      { name: "Kiran Kumar",  role: "Tech Lead",     img: "https://i.pravatar.cc/150?img=14" },
      { name: "Anjali Seth",  role: "Backend Dev",   img: "https://i.pravatar.cc/150?img=46" },
      { name: "Dev Prakash",  role: "Frontend Dev",  img: "https://i.pravatar.cc/150?img=15" },
      { name: "Mehak Gupta",  role: "AI/ML Lead",    img: "https://i.pravatar.cc/150?img=48" },
      { name: "Rahul Varma",  role: "Hardware Lead", img: "https://i.pravatar.cc/150?img=16" },
      { name: "Tara Bose",    role: "Research Lead", img: "https://i.pravatar.cc/150?img=49" },
    ],
  },
  {
    label: "03", name: "Media",
    members: [
      { name: "Nisha Thomas", role: "Media Head",     img: "https://i.pravatar.cc/150?img=44" },
      { name: "Jay Krishnan", role: "Photographer",   img: "https://i.pravatar.cc/150?img=17" },
      { name: "Anika Roy",    role: "Video Editor",   img: "https://i.pravatar.cc/150?img=50" },
      { name: "Sam Philip",   role: "Content Writer", img: "https://i.pravatar.cc/150?img=18" },
    ],
  },
  {
    label: "04", name: "Events",
    members: [
      { name: "Cyril Mathew",   role: "Events Head",    img: "https://i.pravatar.cc/150?img=19" },
      { name: "Lakshmi Nair",   role: "Logistics Lead", img: "https://i.pravatar.cc/150?img=43" },
      { name: "Dev Mohan",      role: "Sponsorship",    img: "https://i.pravatar.cc/150?img=20" },
      { name: "Pooja Srinivas", role: "Outreach",       img: "https://i.pravatar.cc/150?img=42" },
    ],
  },
];

export default function ExecomPage() {
  return (
    <div className="font-inter text-navy">

      {/* Hero */}
      <section className="bg-navy text-white py-32 md:py-44 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-red font-oswald uppercase tracking-[0.3em] text-sm font-bold mb-6">
              <span className="w-8 h-[2px] bg-red" /> Info
            </span>
            <h1 className="font-oswald text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase leading-[0.9] tracking-tight mb-8">
              The<br /><span className="text-red">Execom</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              The executive committee driving every initiative — from core leadership to technical, media, and events teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teams */}
      {teams.map((team, ti) => (
        <section key={team.name} className={ti % 2 === 0 ? "bg-white py-20" : "bg-[#FAFAFA] py-20"}>
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="flex items-baseline gap-4 mb-12 border-b border-gray-100 pb-6">
              <span className="font-oswald text-6xl font-bold text-gray-100">{team.label}</span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-navy">{team.name}</h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {team.members.map((m, mi) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: mi * 0.07 }}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group-hover:border-red/30 transition-colors">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors" />
                  </div>
                  <div>
                    <p className="font-oswald font-bold text-navy text-base uppercase leading-tight">{m.name}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-0.5">{m.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy py-20 text-white text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase mb-6">Want to Be Part of the Team?</h2>
          <p className="text-white/60 mb-10 font-inter max-w-md mx-auto">Execom applications open every semester. Show us what you are made of.</p>
          <Link href="/info/join" className="inline-flex items-center gap-2 bg-red text-white px-10 py-4 rounded-full font-oswald uppercase tracking-widest font-bold hover:bg-white hover:text-navy transition-colors text-sm">
            Apply Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
