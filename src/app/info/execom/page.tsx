"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Trophy, Target, Zap, Mail, Flame, Code, 
  Fingerprint, Activity, Network, ArrowRight, Atom, User
} from "lucide-react";
import Link from "next/link";

// ─── Custom Icons ─────────────────────────────────────────────────────────────

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Data Structures ──────────────────────────────────────────────────────────

const currentExecom = [
  {
    id: "core",
    name: "Core Team",
    members: [
      { name: "Dr. Rajan K.", role: "Faculty Advisor", img: "https://i.pravatar.cc/150?img=51", bio: "15+ years guiding student science projects at ASIET.", linkedin: "#", email: "mailto:rajan@asiet.edu.in", icon: Flame },
      { name: "Arjun Menon", role: "Chairperson", img: "https://i.pravatar.cc/150?img=11", bio: "Leads the club to 3 consecutive national awards.", linkedin: "#", email: "mailto:arjun@asiet.edu.in", icon: Code },
      { name: "Priya Nair", role: "Vice Chair", img: "https://i.pravatar.cc/150?img=45", bio: "Coordinating strategy, outreach and partnerships.", linkedin: "#", email: "mailto:priya@asiet.edu.in", icon: Zap },
      { name: "Rohan Das", role: "Secretary", img: "https://i.pravatar.cc/150?img=12", bio: "Keeps the minutes and ensures operational excellence.", linkedin: "#", email: "mailto:rohan@asiet.edu.in", icon: Fingerprint },
      { name: "Sneha Pillai", role: "Treasurer", img: "https://i.pravatar.cc/150?img=47", bio: "Manages grants, budgets and sponsorship funds.", linkedin: "#", email: "mailto:sneha@asiet.edu.in", icon: Activity },
      { name: "Aditya Raj", role: "Jt. Secretary", img: "https://i.pravatar.cc/150?img=13", bio: "Liaises between departments and schedules technical workshops.", linkedin: "#", email: "mailto:aditya@asiet.edu.in", icon: Network },
    ]
  },
  {
    id: "technical",
    name: "Technical",
    members: [
      { name: "Kiran Kumar", role: "Tech Lead", img: "https://i.pravatar.cc/150?img=14", bio: "Architecting our main platforms and overseeing all tech projects.", linkedin: "#", email: "mailto:kiran@asiet.edu.in", icon: Code },
      { name: "Anjali Seth", role: "Backend Dev", img: "https://i.pravatar.cc/150?img=46", bio: "Building robust APIs and managing database infrastructure.", linkedin: "#", email: "mailto:anjali@asiet.edu.in", icon: Network },
      { name: "Dev Prakash", role: "Frontend Dev", img: "https://i.pravatar.cc/150?img=15", bio: "Crafting seamless user experiences and modern web interfaces.", linkedin: "#", email: "mailto:dev@asiet.edu.in", icon: Activity },
      { name: "Mehak Gupta", role: "AI/ML Lead", img: "https://i.pravatar.cc/150?img=48", bio: "Exploring machine learning models and conducting AI workshops.", linkedin: "#", email: "mailto:mehak@asiet.edu.in", icon: Fingerprint },
      { name: "Rahul Varma", role: "Hardware Lead", img: "https://i.pravatar.cc/150?img=16", bio: "Prototyping embedded systems and IoT solutions.", linkedin: "#", email: "mailto:rahul@asiet.edu.in", icon: Zap },
      { name: "Tara Bose", role: "Research Lead", img: "https://i.pravatar.cc/150?img=49", bio: "Leading research papers and academic tech writing.", linkedin: "#", email: "mailto:tara@asiet.edu.in", icon: Flame },
    ]
  },
  {
    id: "media",
    name: "Media",
    members: [
      { name: "Nisha Thomas", role: "Media Head", img: "https://i.pravatar.cc/150?img=44", bio: "Curating the club's visual identity and digital presence.", linkedin: "#", email: "mailto:nisha@asiet.edu.in", icon: Flame },
      { name: "Jay Krishnan", role: "Photographer", img: "https://i.pravatar.cc/150?img=17", bio: "Capturing the best moments from all our flagship events.", linkedin: "#", email: "mailto:jay@asiet.edu.in", icon: Activity },
      { name: "Anika Roy", role: "Video Editor", img: "https://i.pravatar.cc/150?img=50", bio: "Producing engaging video content and promotional teasers.", linkedin: "#", email: "mailto:anika@asiet.edu.in", icon: Zap },
      { name: "Sam Philip", role: "Content Writer", img: "https://i.pravatar.cc/150?img=18", bio: "Crafting narratives, blog posts, and newsletter content.", linkedin: "#", email: "mailto:sam@asiet.edu.in", icon: Code },
    ]
  },
  {
    id: "events",
    name: "Events",
    members: [
      { name: "Cyril Mathew", role: "Events Head", img: "https://i.pravatar.cc/150?img=19", bio: "Planning and executing hackathons and workshops.", linkedin: "#", email: "mailto:cyril@asiet.edu.in", icon: Target },
      { name: "Lakshmi Nair", role: "Logistics Lead", img: "https://i.pravatar.cc/150?img=43", bio: "Ensuring venues, catering, and materials are perfectly managed.", linkedin: "#", email: "mailto:lakshmi@asiet.edu.in", icon: Network },
      { name: "Dev Mohan", role: "Sponsorship", img: "https://i.pravatar.cc/150?img=20", bio: "Securing funding and partnerships with tech companies.", linkedin: "#", email: "mailto:devm@asiet.edu.in", icon: Fingerprint },
      { name: "Pooja Srinivas", role: "Outreach", img: "https://i.pravatar.cc/150?img=42", bio: "Managing PR and external communications for events.", linkedin: "#", email: "mailto:pooja@asiet.edu.in", icon: Flame },
    ]
  }
];

const pastYearsData = {
  "2023-2024": {
    summary: "The year we expanded our horizons. Focused heavily on open-source contributions and launched community-wide mentorship programs that transformed our tech culture.",
    achievements: [
      { icon: Trophy, title: "Innovation Excellence", desc: "Recognized for community-driven projects." },
      { icon: Target, title: "National Symposium", desc: "Hosted over 500 delegates nationwide." },
      { icon: Zap, title: "Tech Mentorship", desc: "Mentored 200+ students in web dev & AI." }
    ],
    members: [
      { name: "Vishnu Prasad", role: "Chairperson", img: "https://i.pravatar.cc/150?img=61", linkedin: "#", email: "mailto:vishnu@asiet.edu.in" },
      { name: "Sarah John", role: "Vice Chair", img: "https://i.pravatar.cc/150?img=62", linkedin: "#", email: "mailto:sarah@asiet.edu.in" },
      { name: "Kevin Paul", role: "Secretary", img: "https://i.pravatar.cc/150?img=63", linkedin: "#", email: "mailto:kevin@asiet.edu.in" },
      { name: "Alan George", role: "Tech Lead", img: "https://i.pravatar.cc/150?img=64", linkedin: "#", email: "mailto:alan@asiet.edu.in" },
      { name: "Riya Singh", role: "Frontend Dev", img: "https://i.pravatar.cc/150?img=65", linkedin: "#", email: "mailto:riya@asiet.edu.in" },
      { name: "David Chen", role: "Media Head", img: "https://i.pravatar.cc/150?img=66", linkedin: "#", email: "mailto:david@asiet.edu.in" },
      { name: "Emma Watson", role: "Events Head", img: "https://i.pravatar.cc/150?img=67", linkedin: "#", email: "mailto:emma@asiet.edu.in" },
      { name: "Omar Farooq", role: "Logistics Lead", img: "https://i.pravatar.cc/150?img=68", linkedin: "#", email: "mailto:omar@asiet.edu.in" },
      { name: "Nina Dobrev", role: "Sponsorship", img: "https://i.pravatar.cc/150?img=69", linkedin: "#", email: "mailto:nina@asiet.edu.in" },
      { name: "Liam Hemsworth", role: "Hardware", img: "https://i.pravatar.cc/150?img=70", linkedin: "#", email: "mailto:liam@asiet.edu.in" },
      { name: "Zendaya", role: "Outreach", img: "https://i.pravatar.cc/150?img=41", linkedin: "#", email: "mailto:zendaya@asiet.edu.in" },
      { name: "Tom Holland", role: "Designer", img: "https://i.pravatar.cc/150?img=42", linkedin: "#", email: "mailto:tom@asiet.edu.in" },
    ]
  },
  "2022-2023": {
    summary: "The foundational year that set everything in motion. We established our core pillars, launched our first major tech-talk series, and built a tight-knit community of innovators.",
    achievements: [
      { icon: Trophy, title: "Best Startup Initiative", desc: "Incubated 3 successful student startups." },
      { icon: Target, title: "First Tech-Talk Series", desc: "Invited industry leaders from top MNCs." },
      { icon: Zap, title: "300+ Founding Members", desc: "The beginning of our vibrant community." }
    ],
    members: [
      { name: "Rohan Mathew", role: "Chairperson", img: "https://i.pravatar.cc/150?img=11", linkedin: "#", email: "mailto:rohan@asiet.edu.in" },
      { name: "Kavya Menon", role: "Vice Chair", img: "https://i.pravatar.cc/150?img=12", linkedin: "#", email: "mailto:kavya@asiet.edu.in" },
      { name: "Alex Varghese", role: "Tech Lead", img: "https://i.pravatar.cc/150?img=13", linkedin: "#", email: "mailto:alex@asiet.edu.in" },
      { name: "Siddharth Rao", role: "Events Head", img: "https://i.pravatar.cc/150?img=14", linkedin: "#", email: "mailto:siddharth@asiet.edu.in" },
      { name: "Meera Krishnan", role: "Media Head", img: "https://i.pravatar.cc/150?img=15", linkedin: "#", email: "mailto:meera@asiet.edu.in" },
      { name: "Rahul Sharma", role: "Backend Dev", img: "https://i.pravatar.cc/150?img=16", linkedin: "#", email: "mailto:rahul@asiet.edu.in" },
      { name: "Priya Patel", role: "Frontend Dev", img: "https://i.pravatar.cc/150?img=17", linkedin: "#", email: "mailto:priya@asiet.edu.in" },
      { name: "Amit Kumar", role: "AI/ML Lead", img: "https://i.pravatar.cc/150?img=18", linkedin: "#", email: "mailto:amit@asiet.edu.in" },
      { name: "Neha Singh", role: "Outreach", img: "https://i.pravatar.cc/150?img=21", linkedin: "#", email: "mailto:neha@asiet.edu.in" },
      { name: "Vikram Raj", role: "Logistics", img: "https://i.pravatar.cc/150?img=22", linkedin: "#", email: "mailto:vikram@asiet.edu.in" },
    ]
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExecomPage() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const pastYears = Object.keys(pastYearsData) as (keyof typeof pastYearsData)[];
  const [selectedPastYear, setSelectedPastYear] = useState<keyof typeof pastYearsData>(pastYears[0]);
  
  const currentTeam = currentExecom[currentTeamIndex];
  const pastYearInfo = pastYearsData[selectedPastYear];

  // Split members into two rows for the marquee
  const midPoint = Math.ceil(pastYearInfo.members.length / 2);
  const marqueeRow1 = pastYearInfo.members.slice(0, midPoint);
  const marqueeRow2 = pastYearInfo.members.slice(midPoint);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="font-inter bg-white min-h-screen">
      
      {/* ── CSS for Seamless Infinite Marquee ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 60s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 60s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-left,
        .pause-on-hover:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}} />

      {/* ── 1. Hero Section ── */}
      <section className="bg-[#02112A] text-white relative overflow-hidden pb-32 pt-32 lg:pt-48 z-10 rounded-br-[60px] md:rounded-br-[100px]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red/20 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none translate-x-1/3 -translate-y-1/3 animate-[pulse_8s_ease-in-out_infinite]" />
        
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-red" />
              <span className="font-oswald uppercase tracking-widest text-sm font-bold text-red">LEADERSHIP DOSSIER</span>
            </div>
          </div>
          
          <h1 className="font-oswald text-[14vw] md:text-[11vw] lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter mix-blend-normal">
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                THE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 text-red italic pr-4">
              <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                VISIONARY
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                EXECOM.
              </motion.span>
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed font-inter font-light mt-12"
          >
            Minds engineered to collaborate, discover, and lead. Dive into the structure of our technical and creative teams.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Current Execom Slider ── */}
      <section className="pt-20 pb-20 bg-white z-0 -mt-10 relative">
        <div className="px-4 lg:px-12 xl:px-24 max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            
            <div className="flex flex-col gap-6 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <span className="font-oswald text-6xl md:text-7xl font-bold text-gray-100 leading-none">
                  0{currentTeamIndex + 1}
                </span>
                <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-[#02112A] tracking-tight">
                  {currentTeam.name}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto hide-scrollbar pb-1 w-full max-w-[90vw] md:max-w-none">
                {currentExecom.map((team, idx) => (
                  <button 
                    key={team.id}
                    onClick={() => setCurrentTeamIndex(idx)}
                    className={`font-oswald uppercase tracking-widest text-sm whitespace-nowrap px-4 py-2 transition-all border-b-2 -mb-[1px] ${
                      idx === currentTeamIndex 
                        ? 'text-red font-bold border-red' 
                        : 'text-gray-400 hover:text-[#02112A] border-transparent'
                    }`}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 pb-2">
               <button onClick={() => scrollSlider('left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#02112A] hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button onClick={() => scrollSlider('right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#02112A] hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
             <motion.div
               key={currentTeam.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 lg:px-12 xl:px-24 hide-scrollbar w-full"
               ref={sliderRef}
             >
                <div className="snap-start shrink-0 w-[260px] md:w-[280px] bg-[#F8F9FB] rounded-2xl p-8 flex flex-col justify-between border border-gray-100 shadow-sm">
                   <div>
                      <div className="text-red mb-6">
                         <Atom className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-oswald font-bold text-[#02112A] text-2xl uppercase leading-tight tracking-tight mb-6">
                         DIFFERENT MINDS.<br/>ONE MISSION.<br/>BOUNDLESS<br/>POSSIBILITIES.
                      </h3>
                      <div className="w-6 h-1 bg-red" />
                   </div>
                   <div className="mt-12 opacity-40">
                      <svg viewBox="0 0 100 100" className="w-full h-24 stroke-[#02112A] fill-none" strokeWidth="1">
                         <path d="M10 80 L90 80 M50 80 L50 60 M20 40 Q50 70 80 40 M30 30 L50 60 L70 30" />
                         <circle cx="50" cy="50" r="5" />
                         <path strokeDasharray="2 4" d="M0 85 L100 85 M20 20 L40 40 M80 20 L60 40" />
                      </svg>
                   </div>
                </div>

                {currentTeam.members.map((m) => (
                  <div key={m.name} className="snap-start shrink-0 w-[240px] md:w-[260px] bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden group shadow-sm transition-shadow hover:shadow-md">
                     <div className="relative h-[180px] md:h-[200px] bg-[#02112A] shrink-0 p-3 pt-4">
                        <img src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02112A]/90 to-transparent pointer-events-none" />
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-red">
                           {m.icon ? <m.icon className="w-4 h-4" strokeWidth={2.5} /> : <Zap className="w-4 h-4" strokeWidth={2.5} />}
                        </div>
                     </div>
                     <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-oswald font-bold text-[#02112A] text-xl uppercase leading-tight">{m.name}</h3>
                        <p className="text-red font-oswald text-[11px] uppercase tracking-widest font-semibold mt-1 mb-3">{m.role}</p>
                        <p className="text-gray-500 text-xs font-inter leading-relaxed flex-grow line-clamp-2">
                           {m.bio}
                        </p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                           <a href={m.linkedin} className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:bg-blue-50 transition-colors">
                              <LinkedinIcon className="w-3.5 h-3.5" />
                           </a>
                           <a href={m.email} className="w-7 h-7 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red hover:bg-red/5 transition-colors">
                              <Mail className="w-3.5 h-3.5" />
                           </a>
                        </div>
                     </div>
                  </div>
                ))}
             </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 3. Quick Transition Banner ── */}
      <section className="pb-12 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="bg-[#02112A] rounded-tl-[60px] md:rounded-tl-[80px] rounded-bl-2xl rounded-br-2xl md:rounded-r-none p-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
             <div className="flex items-center gap-6 relative z-10">
                <span className="font-oswald text-7xl md:text-8xl font-bold text-white/5 leading-none absolute -left-4 top-1/2 -translate-y-1/2 pointer-events-none">02</span>
                <div className="flex items-center gap-4 pl-20 md:pl-28">
                   <div className="w-2 h-2 rounded-full bg-red" />
                   <h3 className="font-oswald text-xl md:text-2xl font-bold uppercase text-white tracking-widest">
                      HISTORICAL ARCHIVES
                   </h3>
                </div>
             </div>
             <Link href="#past-execoms" onClick={(e) => {
                 e.preventDefault();
                 document.getElementById('past-execoms')?.scrollIntoView({ behavior: 'smooth' });
               }} 
               className="relative z-10 flex items-center gap-3 text-red font-oswald font-bold uppercase tracking-widest text-sm hover:text-white transition-colors group mt-4 md:mt-0 pl-20 md:pl-0 cursor-pointer"
             >
                EXPLORE LEGACY
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Past Execoms (Highly Innovative Dark Mode + Infinite Hover Marquee) ── */}
      <section id="past-execoms" className="py-24 bg-[#02112A] border-t border-gray-800 overflow-hidden relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="font-oswald text-4xl md:text-6xl font-black uppercase text-white mb-8 tracking-tighter">
              PAST COUNCILS & MILESTONES
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {pastYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedPastYear(year)}
                  className={`px-8 py-3 rounded-full font-oswald uppercase tracking-widest text-sm font-bold transition-all duration-300 ${
                    selectedPastYear === year 
                      ? "bg-red text-white shadow-xl scale-105" 
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPastYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Year Summary & Glassmorphic Achievements */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32 max-w-7xl mx-auto">
                <div className="lg:col-span-5">
                  <h3 className="font-oswald text-3xl font-bold uppercase text-white mb-4 leading-tight">
                    Year in Review <br/><span className="text-red">{selectedPastYear}</span>
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed font-inter">
                    {pastYearInfo.summary}
                  </p>
                </div>
                
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pastYearInfo.achievements.map((ach, idx) => (
                    <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-tl-[30px] rounded-br-[30px] rounded-tr-lg rounded-bl-lg border border-white/10 group hover:border-red/50 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-5 text-red group-hover:bg-red group-hover:text-white transition-colors">
                        <ach.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-oswald font-bold text-white text-lg uppercase mb-2 leading-tight">{ach.title}</h4>
                      <p className="text-white/50 text-sm font-inter leading-relaxed">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Innovative Infinite Hover Marquees for ALL Members ── */}
        <div className="w-full relative z-20 pause-on-hover">
          <div className="text-center mb-8">
             <h3 className="font-oswald text-sm text-white/30 font-bold uppercase tracking-[0.3em]">
               THE FULL ROSTER — HOVER TO REVEAL DOSSIER
             </h3>
          </div>

          {/* Row 1: Scrolling Left */}
          <div className="flex overflow-visible whitespace-nowrap w-full mb-4">
             <div className="flex w-max animate-scroll-left">
                {[...marqueeRow1, ...marqueeRow1].map((m, i) => (
                  <div key={i} className="relative group/token inline-flex items-center cursor-pointer px-4 lg:px-8">
                     <span className="font-oswald text-[4rem] lg:text-[7rem] font-black uppercase text-white/5 transition-all duration-300 group-hover/token:text-white group-hover/token:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                       {m.name}
                     </span>
                     <span className="ml-8 lg:ml-16 text-white/5 text-4xl">•</span>
                     
                     {/* The Abstract Dossier Popup (Hover to Reveal, Interactive) */}
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[260px] aspect-[4/5] bg-white p-2 rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] opacity-0 group-hover/token:opacity-100 transition-all duration-300 z-50 pointer-events-none group-hover/token:pointer-events-auto origin-bottom transform-gpu scale-90 group-hover/token:scale-100 flex flex-col">
                       <div className="w-full h-full rounded-tl-[50px] rounded-br-[50px] rounded-tr-xl rounded-bl-xl overflow-hidden relative bg-[#02112A]">
                          <img src={m.img} className="absolute inset-0 w-full h-full object-cover opacity-80" alt={m.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02112A] via-[#02112A]/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                             <h4 className="font-oswald text-3xl text-white uppercase font-bold leading-tight mb-1">{m.name}</h4>
                             <p className="text-red font-oswald text-[10px] uppercase tracking-widest font-bold mb-4">{m.role}</p>
                             <div className="flex gap-2">
                                <a href={m.linkedin} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-[#0A66C2] transition-colors"><LinkedinIcon className="w-4 h-4 text-white"/></a>
                                <a href={m.email} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-red transition-colors"><Mail className="w-4 h-4 text-white"/></a>
                             </div>
                          </div>
                       </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="flex overflow-visible whitespace-nowrap w-full relative left-[-50%]">
             <div className="flex w-max animate-scroll-right">
                {[...marqueeRow2, ...marqueeRow2].map((m, i) => (
                  <div key={i} className="relative group/token inline-flex items-center cursor-pointer px-4 lg:px-8">
                     <span className="font-oswald text-[4rem] lg:text-[7rem] font-black uppercase text-white/5 transition-all duration-300 group-hover/token:text-white group-hover/token:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                       {m.name}
                     </span>
                     <span className="ml-8 lg:ml-16 text-white/5 text-4xl">•</span>
                     
                     {/* The Abstract Dossier Popup (Hover to Reveal, Interactive) */}
                     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] aspect-[4/5] bg-white p-2 rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] opacity-0 group-hover/token:opacity-100 transition-all duration-300 z-50 pointer-events-none group-hover/token:pointer-events-auto origin-top transform-gpu scale-90 group-hover/token:scale-100 flex flex-col">
                       <div className="w-full h-full rounded-tl-[50px] rounded-br-[50px] rounded-tr-xl rounded-bl-xl overflow-hidden relative bg-[#02112A]">
                          <img src={m.img} className="absolute inset-0 w-full h-full object-cover opacity-80" alt={m.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02112A] via-[#02112A]/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                             <h4 className="font-oswald text-3xl text-white uppercase font-bold leading-tight mb-1">{m.name}</h4>
                             <p className="text-red font-oswald text-[10px] uppercase tracking-widest font-bold mb-4">{m.role}</p>
                             <div className="flex gap-2">
                                <a href={m.linkedin} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-[#0A66C2] transition-colors"><LinkedinIcon className="w-4 h-4 text-white"/></a>
                                <a href={m.email} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-red transition-colors"><Mail className="w-4 h-4 text-white"/></a>
                             </div>
                          </div>
                       </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
