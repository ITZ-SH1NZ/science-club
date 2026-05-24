"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  Trophy, 
  Award, 
  GraduationCap, 
  Cpu, 
  Globe, 
  Rocket, 
  Users, 
  Target, 
  Flame, 
  Code, 
  Zap, 
  Clock, 
  HeartPulse, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Aperture
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom LinkedIn SVG component for cross-version compatibility
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// Custom Section Header component to replicate the mockup headers
function SectionHeader({ 
  number, 
  title, 
  lightTheme = true,
  rightElement
}: { 
  number: string; 
  title: string; 
  lightTheme?: boolean;
  rightElement?: React.ReactNode;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 w-full"
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Bold Large Red Number */}
        <motion.span 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-oswald text-[2.5rem] sm:text-[3.5rem] font-bold text-red leading-none shrink-0"
        >
          {number}
        </motion.span>
        
        {/* Faint vertical separator */}
        <div className={cn("hidden sm:block w-[1px] h-8 mx-2", lightTheme ? "bg-navy/10" : "bg-white/10")} />

        {/* Uppercase Section Title */}
        <h2 className={cn(
          "font-oswald text-xl sm:text-2xl font-bold tracking-wide uppercase whitespace-nowrap",
          lightTheme ? "text-navy" : "text-white"
        )}>
          {title}
        </h2>
        
        {/* Premium trailing line with dot */}
        <div className="hidden md:flex items-center flex-1 mx-4 relative h-4 overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={cn("h-[1px] w-full origin-left", lightTheme ? "bg-navy/15" : "bg-white/15")} 
          />
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="w-1.5 h-1.5 rounded-full bg-red shrink-0 absolute right-0" 
          />
        </div>
      </div>
      
      {rightElement && (
        <div className="shrink-0 self-end md:self-auto">
          {rightElement}
        </div>
      )}
    </motion.div>
  );
}

// ─── HIGH-FIDELITY MOCK DATA ───────────────────────────────────────────────

const EXECOM_CATEGORIES = [
  {
    id: "core",
    name: "CORE TEAM",
    tagline: <>DIFFERENT MINDS.<br />ONE MISSION.<br />BOUNDLESS POSSIBILITIES.</>,
    members: [
      { name: "Dr. Rajan K.", role: "Faculty Advisor", bio: "18+ years guiding student science projects at ASIET. Expert in applied research and innovation.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", icon: Flame },
      { name: "Arjun Menon", role: "Chairperson", bio: "Leads the club to 3 consecutive national awards. Focused on cross-functional collaboration.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", icon: Code },
      { name: "Priya Nair", role: "Vice Chair", bio: "Coordinating strategy, outreach and partnerships. Former events head with a track record.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", icon: Zap },
      { name: "Rohan Das", role: "Secretary", bio: "Keeps the minutes, keeps the peace, and ensures zero operational chaos.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", icon: Clock },
      { name: "Sheha Pillai", role: "Treasurer", bio: "Manages grants, budgets and sponsorship funds with absolute precision.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", icon: HeartPulse },
      { name: "Aditya Raj", role: "Jt. Secretary", bio: "Liaises between departments and schedules all technical workshops.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", icon: Settings },
    ]
  },
  {
    id: "media",
    name: "MEDIA TEAM",
    tagline: <>EVERY FRAME,<br />A STORY.<br />ENDLESS CREATIVITY.</>,
    members: [
      { name: "Sarah John", role: "Media Head", bio: "Directs all visual content and branding strategies for the club.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", icon: Aperture },
      { name: "Rahul S.", role: "Lead Designer", bio: "Creates stunning graphics and visual identities for all our events.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", icon: Code },
      { name: "Neha K.", role: "Content Writer", bio: "Crafts compelling narratives and copies for our campaigns.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", icon: Clock },
    ]
  },
  {
    id: "tech",
    name: "TECHNICAL TEAM",
    tagline: <>BUILDING THE<br />FUTURE,<br />ONE LINE OF CODE.</>,
    members: [
      { name: "Vivek M.", role: "Tech Head", bio: "Oversees all software and hardware projects within the club.", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop", icon: Cpu },
      { name: "Anjali P.", role: "Lead Developer", bio: "Full-stack developer responsible for the club's platforms.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", icon: Code },
    ]
  },
  {
    id: "events",
    name: "EVENTS TEAM",
    tagline: <>PLANNING<br />EXPERIENCES,<br />DELIVERING EXCELLENCE.</>,
    members: [
      { name: "Kiran Dev", role: "Events Head", bio: "Mastermind behind our flagship tech fests and workshops.", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop", icon: Target },
      { name: "Meera R.", role: "Logistics Lead", bio: "Ensures smooth execution of all on-ground activities and scheduling.", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop", icon: Rocket },
    ]
  }
];

const ACHIEVEMENTS = [
  {
    title: "National Level Robotics Championship 2024",
    subtitle: "1ST PLACE",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    icon: Trophy,
  },
  {
    title: "Best Student Chapter Award 2023",
    subtitle: "WINNER",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    icon: Award,
  },
  {
    title: "50+ Technical Workshops Conducted",
    subtitle: "2023-24",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    icon: Cpu,
  },
  {
    title: "20+ Research Projects Completed",
    subtitle: "2023-24",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    icon: GraduationCap,
  },
  {
    title: "Partnerships with 15+ Industry Leaders",
    subtitle: "2022-24",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    icon: Globe,
  }
];

const DISPLAY_ACHIEVEMENTS = [...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS];

const PAST_EXECOM = [
  { name: "Nikhil Sridhar", role: "Chairperson", year: "2023-24", category: "Core", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" },
  { name: "Megha Nair", role: "Vice Chair", year: "2023-24", category: "Core", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" },
  { name: "Vivek Menon", role: "Secretary", year: "2023-24", category: "Core", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" },
  { name: "Farah Khan", role: "Treasurer", year: "2023-24", category: "Core", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
  { name: "Karthik S.", role: "Jt. Secretary", year: "2023-24", category: "Core", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" },
  { name: "Ananya B.", role: "Events Head", year: "2023-24", category: "Events", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop" },
  
  { name: "Siddharth R.", role: "Chairperson", year: "2022-23", category: "Core", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
  { name: "Pooja G.", role: "Secretary", year: "2022-23", category: "Core", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
  { name: "Devadathan S.", role: "Vice Chair", year: "2022-23", category: "Core", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop" },

  { name: "Gautam K.", role: "Chairperson", year: "2021-22", category: "Core", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
  { name: "Neha M.", role: "Vice Chair", year: "2021-22", category: "Core", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" },

  { name: "Abhinav S.", role: "Chairperson", year: "2020-21", category: "Core", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop" },
  { name: "Ritu P.", role: "Secretary", year: "2020-21", category: "Core", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop" },

  { name: "Madhav E.", role: "Chairperson", year: "2019-20", category: "Core", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=300&auto=format&fit=crop" }
];

export default function ExecomPage() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isCategoryPaused, setIsCategoryPaused] = useState(false);
  const [selectedPastYear, setSelectedPastYear] = useState("ALL");
  const pastTimelineRef = useRef<HTMLDivElement>(null);
  
  // Interactive Astrolabe tilt state and refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroRectRef = useRef<DOMRect | null>(null);

  const handleHeroMouseEnter = (e: React.MouseEvent) => {
    heroRectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    let rect = heroRectRef.current;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      heroRectRef.current = rect;
    }
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map cursor offset from center to a gentle max 12 degree tilt
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    const hero = heroRef.current;
    if (hero) {
      hero.style.setProperty("--tilt-x", `${rotateX}deg`);
      hero.style.setProperty("--tilt-y", `${rotateY}deg`);
    }
  };
  const handleHeroMouseLeave = () => {
    heroRectRef.current = null;
    const hero = heroRef.current;
    if (!hero) return;
    // Smoothly reset tilt variables on exit
    hero.style.setProperty("--tilt-x", "0deg");
    hero.style.setProperty("--tilt-y", "0deg");
  };

  // Gallery (Achievements) Carousel State
  const [currentAchieveIndex, setCurrentAchieveIndex] = useState(0);
  const [activeDisplayIndex, setActiveDisplayIndex] = useState(5);
  const achieveScrollRef = useRef<HTMLDivElement>(null);
  const [isAchievePaused, setIsAchievePaused] = useState(false);
  const [isAchieveHovered, setIsAchieveHovered] = useState(false);
  const isAchieveAutoScrolling = useRef(false);
  const achieveScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Category navigation for current execom
  const nextCategory = () => setCurrentCategoryIndex((prev) => (prev + 1) % EXECOM_CATEGORIES.length);
  const prevCategory = () => setCurrentCategoryIndex((prev) => (prev - 1 + EXECOM_CATEGORIES.length) % EXECOM_CATEGORIES.length);
  const activeCategory = EXECOM_CATEGORIES[currentCategoryIndex];

  // InView refs for auto-rotate pause
  const currentExecomSectionRef = useRef<HTMLElement>(null);
  const isCurrentExecomInView = useInView(currentExecomSectionRef, { margin: "-20%" });
  
  const achieveSectionRef = useRef<HTMLElement>(null);
  const isAchieveInView = useInView(achieveSectionRef, { margin: "-20%" });

  const pastTimelineSectionRef = useRef<HTMLElement>(null);
  const isPastTimelineSectionInView = useInView(pastTimelineSectionRef, { margin: "-20%" });

  // Auto-rotate Current Execom
  useEffect(() => {
    if (isCategoryPaused || !isCurrentExecomInView) return;
    const timer = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % EXECOM_CATEGORIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isCategoryPaused, isCurrentExecomInView]);

  // Gallery scrolling controls
  const scrollAchieveToIndex = useCallback((index: number, smooth = true) => {
    const container = achieveScrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    
    // Clear any pending scroll debounce timers to prevent collision mid-scroll
    if (scrollDebounceTimeoutRef.current) {
      clearTimeout(scrollDebounceTimeoutRef.current);
    }
    
    const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
    isAchieveAutoScrolling.current = true;
    container.scrollTo({ left: offset, behavior: smooth ? "smooth" : "auto" });
    
    setTimeout(() => { 
      isAchieveAutoScrolling.current = false; 
    }, smooth ? 850 : 50);
  }, []);

  const handleAchieveScroll = useCallback(() => {
    const container = achieveScrollRef.current;
    if (!container) return;

    // Pause auto-rotation when user interacts/scrolls
    setIsAchievePaused(true);
    if (achieveScrollTimerRef.current) clearTimeout(achieveScrollTimerRef.current);
    achieveScrollTimerRef.current = setTimeout(() => setIsAchievePaused(false), 6000);

    // Debounce the snap calculations and state updates until scroll momentum completely settles (120ms of stillness)
    if (scrollDebounceTimeoutRef.current) clearTimeout(scrollDebounceTimeoutRef.current);
    
    scrollDebounceTimeoutRef.current = setTimeout(() => {
      if (isAchieveAutoScrolling.current) return;
      
      const latestCenter = container.scrollLeft + container.offsetWidth / 2;
      let snapIndex = 5;
      let snapDist = Infinity;
      
      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(latestCenter - cardCenter);
        if (dist < snapDist) {
          snapDist = dist;
          snapIndex = i;
        }
      });

      // 1. Update React states EXACTLY ONCE when scrolling has fully come to a halt
      setActiveDisplayIndex(snapIndex);
      setCurrentAchieveIndex(snapIndex % ACHIEVEMENTS.length);

      // 2. Silently reposition inside middle set (indices 5-9) if snapped in outer sections
      if (snapIndex < 5 || snapIndex >= 10) {
        const targetIndex = (snapIndex % ACHIEVEMENTS.length) + 5;
        isAchieveAutoScrolling.current = true;
        const targetCard = container.children[targetIndex] as HTMLElement;
        if (targetCard) {
          const offset = targetCard.offsetLeft - container.offsetWidth / 2 + targetCard.offsetWidth / 2;
          container.scrollLeft = offset;
          setActiveDisplayIndex(targetIndex);
          setCurrentAchieveIndex(targetIndex % ACHIEVEMENTS.length);
        }
        isAchieveAutoScrolling.current = false;
      }
    }, 120);
  }, []);

  const goToAchieve = (index: number) => {
    setActiveDisplayIndex(index);
    setCurrentAchieveIndex(index % ACHIEVEMENTS.length);
    scrollAchieveToIndex(index);
    setIsAchievePaused(true);
    if (achieveScrollTimerRef.current) clearTimeout(achieveScrollTimerRef.current);
    achieveScrollTimerRef.current = setTimeout(() => setIsAchievePaused(false), 6000);
  };

  const nextAchieve = useCallback(() => {
    const nextIndex = activeDisplayIndex + 1;
    setActiveDisplayIndex(nextIndex);
    setCurrentAchieveIndex(nextIndex % ACHIEVEMENTS.length);
    scrollAchieveToIndex(nextIndex);
    
    setIsAchievePaused(true);
    if (achieveScrollTimerRef.current) clearTimeout(achieveScrollTimerRef.current);
    achieveScrollTimerRef.current = setTimeout(() => setIsAchievePaused(false), 6000);
  }, [activeDisplayIndex, scrollAchieveToIndex]);

  const prevAchieve = useCallback(() => {
    const prevIndex = activeDisplayIndex - 1;
    setActiveDisplayIndex(prevIndex);
    setCurrentAchieveIndex((prevIndex + ACHIEVEMENTS.length * 2) % ACHIEVEMENTS.length);
    scrollAchieveToIndex(prevIndex);
    
    setIsAchievePaused(true);
    if (achieveScrollTimerRef.current) clearTimeout(achieveScrollTimerRef.current);
    achieveScrollTimerRef.current = setTimeout(() => setIsAchievePaused(false), 6000);
  }, [activeDisplayIndex, scrollAchieveToIndex]);

  useEffect(() => {
    if (isAchievePaused || isAchieveHovered || !isAchieveInView) return;
    const timer = setInterval(() => {
      nextAchieve();
    }, 4000);
    return () => clearInterval(timer);
  }, [isAchievePaused, isAchieveHovered, isAchieveInView, nextAchieve]);

  // Initial scroll to center first card of the middle set
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollAchieveToIndex(5, false);
    }, 100);
    return () => clearTimeout(timeout);
  }, [scrollAchieveToIndex]);

  // Timeline scrolling controls for past execom
  const scrollTimeline = (direction: "left" | "right") => {
    const el = pastTimelineRef.current;
    if (el) {
      const scrollAmount = 450;
      el.scrollTo({
        left: el.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      });
    }
  };

  // Autoscrolling past timeline to hint at more items
  useEffect(() => {
    if (selectedPastYear !== "ALL" || !isPastTimelineSectionInView) return;
    const el = pastTimelineRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: el.scrollLeft + 160, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [selectedPastYear, isPastTimelineSectionInView]);

  // Filtered past members
  const filteredPastExecom = PAST_EXECOM.filter(
    (member) => selectedPastYear === "ALL" || member.year === selectedPastYear
  );

  return (
    <div className="bg-[#FFFFFF] text-navy selection:bg-red selection:text-white min-h-screen relative w-full overflow-x-hidden font-inter">
      
      {/* ─── GLOBAL FILM GRAIN OVERLAY (GPU-tiled static noise for 0% render lag) ─── */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.012] mix-blend-overlay" 
        style={{ 
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAV7TSKAAAAS1BMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/g1sIAAAAFnRSTlMAC0BfYG59j4+PkJCSkpOTo6Ojqaqrq8sDR70AAAAJcEhZcwAACxMAAAsTAQCanBgAAAA2SURBVEjH7dK5CgAgDMRQc9H//8tFBLERtDGF92pS5CR5Vq6eZub2bXW2xn7fQY21/4F9s4BqC4B9yV6+9oAAAAASUVORK5CYII=")' 
        }} 
      />

      {/* ─── HERO SECTION (Light Theme - Left-Aligned) ─── */}
      <section 
        ref={heroRef}
        onMouseEnter={handleHeroMouseEnter}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[85vh] flex items-center px-6 sm:px-12 md:px-20 lg:px-32 pt-32 pb-20 overflow-hidden bg-white"
      >
        
        {/* Subtle, faint dark navy background grid with coordinate intersects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#001c5804_1px,transparent_1px),linear-gradient(to_bottom,#001c5804_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none">
          {/* Staggered pulsing stellar coordinate intersects */}
          <div className="stellar-node stellar-node-slow top-[25%] left-[20%]" />
          <div className="stellar-node stellar-node-fast top-[70%] left-[15%]" />
          <div className="stellar-node stellar-node-gold top-[55%] left-[80%]" />
          <div className="stellar-node stellar-node-slow top-[30%] left-[85%]" />
        </div>

        {/* Concentric planetary / astrolabe SVG coordinate art */}
        <div 
          style={{
            perspective: "1000px"
          }}
          className="absolute top-[40%] -translate-y-1/2 right-[-10%] md:right-[5%] lg:right-[10%] w-[85vw] h-[85vw] md:w-[60vw] md:h-[60vw] lg:w-[45vw] lg:h-[45vw] pointer-events-none z-0"
        >
          {/* Interactive 3D tilt block */}
          <div 
            style={{
              transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
              transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
              willChange: "transform",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden"
            }}
            className="w-full h-full"
          >
            <svg 
              viewBox="0 0 500 500" 
              className="w-full h-full text-navy/[0.04] stroke-current stroke-[0.75] fill-none astrolabe-spin"
            >
              {/* Concentric rings */}
              <circle cx="250" cy="250" r="230" strokeDasharray="3 6" />
              <circle cx="250" cy="250" r="210" />
              <circle cx="250" cy="250" r="185" strokeDasharray="10 3" />
              <circle cx="250" cy="250" r="150" />
              <circle cx="250" cy="250" r="110" strokeDasharray="2 3" />
              <circle cx="250" cy="250" r="70" />
              <circle cx="250" cy="250" r="35" strokeDasharray="4 8" />

              {/* Dotted orbital sphere */}
              <g className="opacity-40">
                <circle cx="250" cy="250" r="12" className="fill-navy/[0.1] stroke-none" />
                <path d="M250,210 A40,40 0 0,1 290,250" />
                <path d="M210,250 A40,40 0 0,1 250,290" strokeDasharray="2 2" />
                <path d="M250,170 A80,80 0 0,1 330,250" />
                <path d="M170,250 A80,80 0 0,1 250,330" strokeDasharray="3 3" />
              </g>

              {/* Crossing grids */}
              <line x1="250" y1="5" x2="250" y2="495" />
              <line x1="5" y1="250" x2="495" y2="250" />
              <line x1="70" y1="70" x2="430" y2="430" strokeDasharray="4 8" />
              <line x1="430" y1="70" x2="70" y2="430" strokeDasharray="4 8" />
              
              {/* Dots */}
              <circle cx="250" cy="40" r="3" className="fill-navy/[0.08]" />
              <circle cx="250" cy="460" r="3" className="fill-navy/[0.08]" />
              <circle cx="40" cy="250" r="3" className="fill-navy/[0.08]" />
              <circle cx="460" cy="250" r="3" className="fill-navy/[0.08]" />
              <circle cx="100" cy="100" r="4.5" className="fill-navy/[0.06] stroke-navy/[0.1]" />
              <circle cx="400" cy="400" r="4.5" className="fill-navy/[0.06] stroke-navy/[0.1]" />

              {/* Glowing active cosmic orbiting nodes (GPU-bound dynamic orbits) */}
              <circle cx="250" cy="65" r="4.5" className="cosmic-orbit-cw fill-red stroke-white stroke-2 z-30" />
              <circle cx="250" cy="140" r="4.5" className="cosmic-orbit-ccw fill-gold stroke-white stroke-2 z-30" />
            </svg>
          </div>
        </div>

        {/* Left Side Accent indices */}
        <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 font-oswald text-[10px] tracking-[0.2em] text-navy/40 pointer-events-none select-none">
          <span>01</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-navy/15 via-red to-navy/15 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red shrink-0" />
          </div>
          <span>05</span>
        </div>

        {/* Right Side Accent navigator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-6 font-oswald text-[9px] tracking-[0.2em] text-navy/40 pointer-events-none uppercase font-medium select-none text-right">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[7px] text-red">|</span>
            <span className="text-navy/80">LEAD</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[7px] text-red">|</span>
            <span>COLLABORATE</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[7px] text-red">|</span>
            <span>INNOVATE</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[7px] text-red">|</span>
            <span>IMPACT</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl text-left flex flex-col items-start mr-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-4 h-[1.5px] bg-red" />
            <span className="font-oswald text-red text-[11px] font-medium tracking-[0.2em] uppercase">
              THE EXECUTIVE COMMITTEE
            </span>
          </motion.div>

          {/* Cinematic line-by-line masked typography reveal */}
          <h1 className="font-oswald text-5xl sm:text-6xl md:text-[5rem] lg:text-[5.5rem] font-bold uppercase tracking-tight leading-[1] text-navy mb-6">
            <div className="relative overflow-hidden block py-1.5">
              <motion.span
                initial={{ opacity: 0, y: "100%", letterSpacing: "0.02em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "-0.015em" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="block"
              >
                LEADING TODAY.
              </motion.span>
            </div>
            <div className="relative overflow-hidden block py-1.5">
              <motion.span
                initial={{ opacity: 0, y: "100%", letterSpacing: "0.02em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "-0.015em" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="block"
              >
                <span className="text-shine">INNOVATING</span> TOMORROW.
              </motion.span>
            </div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-md mb-10"
          >
            The Executive Committee drives the vision forward.<br />
            We plan, build, manage, and inspire — together.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row items-center gap-8 w-full"
          >
            <Link
              href="#section-current"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#section-current');
                const lenis = (window as any).__lenis;
                if (el) {
                  if (lenis) {
                    lenis.scrollTo(el);
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="bg-navy text-white hover:bg-red px-6 py-3.5 text-[10px] font-bold tracking-widest rounded-md transition-all duration-300 flex items-center gap-3 group uppercase"
            >
              MEET THE TEAM 
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#section-current"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#section-current');
                const lenis = (window as any).__lenis;
                if (el) {
                  if (lenis) {
                    lenis.scrollTo(el);
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="font-oswald text-[10px] font-medium uppercase tracking-[0.2em] text-navy/50 hover:text-navy transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
            >
              SCROLL TO EXPLORE 
              <span className="animate-bounce mt-0.5">↓</span>
            </Link>
          </motion.div>

        </div>

      </section>

      {/* ─── CURRENT EXECOM SECTION (Split Layout) ─── */}
      <section id="section-current" ref={currentExecomSectionRef} className="py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-16 relative"
        onMouseEnter={() => setIsCategoryPaused(true)}
        onMouseLeave={() => setIsCategoryPaused(false)}
      >
        <div className="max-w-[90rem] mx-auto">
          
          <SectionHeader 
            number="01" 
            title="Current Executive Committee" 
            lightTheme={true}
            rightElement={
              <div className="flex items-center gap-4 shrink-0">
                <button 
                  onClick={prevCategory}
                  className="w-8 h-8 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:border-red hover:text-red transition-all cursor-pointer bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-[6px]">
                  <AnimatePresence>
                    {EXECOM_CATEGORIES.map((_, idx) => {
                      const isActive = idx === currentCategoryIndex;
                      const nextIndex = (currentCategoryIndex + 1) % EXECOM_CATEGORIES.length;
                      const isNext = idx === nextIndex;
                      return (
                        <motion.button
                          key={idx}
                          layout
                          onClick={() => setCurrentCategoryIndex(idx)}
                          aria-label={`Go to category ${idx + 1}`}
                          animate={{
                            width: isActive ? 36 : isNext ? 20 : 8,
                            opacity: isActive ? 1 : isNext ? 0.7 : 0.35,
                          }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="relative h-2 rounded-full bg-navy/20 focus:outline-none flex-shrink-0 overflow-hidden"
                        >
                          <AnimatePresence>
                            {isActive && (
                              <motion.span
                                layoutId="active-category-pip"
                                className="absolute inset-0 bg-red rounded-full"
                                initial={false}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              />
                            )}
                          </AnimatePresence>
                          {isNext && !isCategoryPaused && (
                            <motion.span
                              key={`sweep-${currentCategoryIndex}`}
                              className="absolute inset-y-0 left-0 bg-red/40 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 5,
                                ease: "linear",
                              }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={nextCategory}
                  className="w-8 h-8 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:border-red hover:text-red transition-all cursor-pointer bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-4 items-stretch">
            
            {/* Left sidebar info (Same width as member cards) */}
            <div className="lg:col-span-1 h-full">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`sidebar-${activeCategory.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8F9FA] rounded-[12px] p-4 lg:p-5 flex flex-col h-full items-start justify-between min-h-[300px] border border-gray-50/50"
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full mb-6">
                      <Aperture className="w-6 h-6 text-red stroke-[2]" />
                    </div>
                    
                    <h3 className="font-oswald text-[14px] text-navy font-bold uppercase tracking-wider mb-2">
                      {activeCategory.name}
                    </h3>
                    
                    <p className="font-oswald text-[12px] leading-[1.5] text-navy font-bold uppercase tracking-[0.05em] mb-4 text-left opacity-80">
                      {activeCategory.tagline}
                    </p>
                    <div className="w-6 h-[2px] bg-red" />
                  </div>
                  <div className="mt-8 flex flex-col items-start">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] mb-1">EST.</span>
                    <span className="text-[10px] text-red font-bold uppercase tracking-[0.1em]">2012</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right side Grid - Categorized Members */}
            <div className="lg:col-span-6 h-full">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, staggerChildren: 0.05 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 w-full h-full"
                >
                  {activeCategory.members.map((member, i) => {
                  const IconComponent = member.icon;
                  return (
                    <motion.div 
                      key={member.name} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex flex-col group w-full relative bg-white rounded-[12px] overflow-hidden h-full"
                      whileHover={{ y: -6 }}
                    >
                      {/* Image Box */}
                      <div className="p-2 pb-0">
                        <div className="relative w-full aspect-[4/5] rounded-[8px] overflow-hidden bg-[#F5F5F5]">
                          <img 
                            src={member.img} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale brightness-[1.05] contrast-100 group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105" 
                          />
                          {/* Floating red icon inside the photo container at top right */}
                          <div className="absolute top-2 right-2 z-20 text-red">
                            <IconComponent className="w-[14px] h-[14px]" />
                          </div>
                        </div>
                      </div>

                      {/* Typo Block */}
                      <div className="flex-1 flex flex-col text-left p-3 pt-4">
                        <h4 className="font-oswald text-[15px] font-bold uppercase text-navy leading-tight mb-1">
                          {member.name}
                        </h4>
                        <p className="text-red text-[9px] font-bold uppercase tracking-widest mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-500 text-[10px] leading-[1.6] mb-4 pr-1 flex-1">
                          {member.bio}
                        </p>

                        {/* Social Icons - simple outlines, no grey circles */}
                        <div className="flex items-center gap-3 mt-auto pt-2">
                          <a href="#" className="text-gray-400 hover:text-navy transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-navy transition-colors">
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* ─── GALLERY SECTION (Dark Theme Carousel) ─── */}
      <section ref={achieveSectionRef} className="py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-16 bg-white relative">
        <div 
          className="max-w-[95rem] mx-auto bg-[#051129] rounded-[24px] md:rounded-[40px] px-6 sm:px-12 lg:px-16 py-16 md:py-20 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          onMouseEnter={() => { setIsAchievePaused(true); setIsAchieveHovered(true); }}
          onMouseLeave={() => { setIsAchievePaused(false); setIsAchieveHovered(false); }}
        >
          
          <SectionHeader 
            number="02" 
            title="What We've Achieved" 
            lightTheme={false}
            rightElement={
              <Link 
                href="/events"
                className="font-oswald text-[10px] font-bold uppercase tracking-[0.15em] text-red hover:text-white transition-colors duration-300 flex items-center gap-2 group shrink-0"
              >
                VIEW ALL ACHIEVEMENTS 
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />

          {/* Scrollable Carousel Wrapper */}
          <div className="relative group/achieve">
            {/* Left Navigation Arrow */}
            <button
              onClick={prevAchieve}
              className="absolute -left-4 lg:-left-6 top-[calc(50%-10px)] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white text-navy hover:text-red hover:scale-105 transition-all flex items-center justify-center opacity-0 group-hover/achieve:opacity-100 shadow-md pointer-events-none group-hover/achieve:pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={nextAchieve}
              className="absolute -right-4 lg:-right-6 top-[calc(50%-10px)] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white text-navy hover:text-red hover:scale-105 transition-all flex items-center justify-center opacity-0 group-hover/achieve:opacity-100 shadow-md pointer-events-none group-hover/achieve:pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Scroll Container */}
            <div 
              ref={achieveScrollRef}
              onScroll={handleAchieveScroll}
              className="relative flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-8 hide-scrollbar -mx-2 px-2"
            >
              {DISPLAY_ACHIEVEMENTS.map((item, i) => {
                const IconComp = item.icon;
                const isActive = i === activeDisplayIndex;
                
                return (
                  <motion.div
                    key={i}
                    onClick={() => goToAchieve(i)}
                    className={cn(
                      "relative bg-transparent border border-white/10 rounded-[12px] flex flex-col overflow-hidden group cursor-pointer flex-shrink-0 snap-center min-w-[280px] w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] xl:w-[28vw] transition-all duration-500 isolate",
                      isActive 
                        ? "opacity-100 blur-0 scale-[1.1] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                        : "opacity-40 hover:opacity-100 blur-[2px] hover:blur-0 grayscale hover:grayscale-0 scale-[0.9] z-0"
                    )}
                  >
                    {/* Top Image Box */}
                    <div className="relative w-full aspect-[5/4] overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] transition-all duration-700 ease-out" 
                      />
                      {/* Floating circular icon at top right */}
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center text-navy shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                        <IconComp className="w-[18px] h-[18px] stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Bottom Text Panel */}
                    <div className="flex flex-col flex-1 p-5 text-left justify-between bg-[#0A1835]/30">
                      <h3 className="text-[13px] font-semibold text-white/90 leading-[1.5] mb-5 pr-2">
                        {item.title}
                      </h3>
                      <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Morphing Dot Indicators with Sweep */}
          <div className="flex justify-center items-center mt-6 gap-[6px]">
            <AnimatePresence>
              {ACHIEVEMENTS.map((_, i) => {
                const nextIndex = (currentAchieveIndex + 1) % ACHIEVEMENTS.length;
                const isActive = i === currentAchieveIndex;
                const isNext = i === nextIndex;
                
                return (
                  <motion.button
                    key={i}
                    layout
                    onClick={() => goToAchieve(i)}
                    aria-label={`Go to achievement ${i + 1}`}
                    animate={{
                      width: isActive ? 36 : isNext ? 20 : 8,
                      opacity: isActive ? 1 : isNext ? 0.7 : 0.4,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-2 rounded-full bg-white/20 focus:outline-none flex-shrink-0 overflow-hidden"
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="active-achieve-dot"
                          className="absolute inset-0 bg-red rounded-full"
                          initial={false}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </AnimatePresence>
                    {isNext && !isAchievePaused && !isAchieveHovered && (
                      <motion.span
                        key={`sweep-achieve-${currentAchieveIndex}`}
                        className="absolute inset-y-0 left-0 bg-red/40 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 4,
                          ease: "linear",
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ─── SECTION 03: PAST EXECOM MEMBERS (Timeline Roster) ─── */}
      <section ref={pastTimelineSectionRef} className="py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          
          <SectionHeader 
            number="03" 
            title="Past Execom Members" 
            lightTheme={true}
            rightElement={
              <div className="flex items-center gap-6 shrink-0">
                <span className="font-oswald text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/40 hidden sm:inline-block">
                  EXPLORE THE LEGACY
                </span>
                <div className="hidden sm:flex gap-2">
                  <button 
                    onClick={() => scrollTimeline("left")}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:border-red hover:text-red transition-all cursor-pointer bg-white shadow-sm hover:scale-105 active:scale-95"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button 
                    onClick={() => scrollTimeline("right")}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:border-red hover:text-red transition-all cursor-pointer bg-white shadow-sm hover:scale-105 active:scale-95"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            }
          />

          {/* Chronological Timeline Filter Bar (Scrollable for future-proof responsiveness) */}
          <div className="relative w-full overflow-x-auto hide-scrollbar scroll-smooth mb-16 select-none z-20 py-2">
            <div className="relative flex justify-start sm:justify-center items-center gap-12 sm:gap-16 min-w-max mx-auto px-6 sm:px-12">
              {/* Connecting Horizontal Line (aligned perfectly to vertical node center) */}
              <div className="absolute left-10 right-10 h-[1.5px] bg-gray-200 bottom-[7.25px] z-0 pointer-events-none" />
              
              {/* Timeline Nodes */}
              {["ALL", "2023-24", "2022-23", "2021-22", "2020-21", "2019-20"].map((year) => {
                const isActive = selectedPastYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedPastYear(year)}
                    className="flex flex-col items-center group relative cursor-pointer focus:outline-none flex-shrink-0"
                  >
                    {/* Year Label */}
                    <span className={cn(
                      "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-2.5 transition-colors duration-300 whitespace-nowrap",
                      isActive ? "text-red" : "text-navy/40 group-hover:text-navy"
                    )}>
                      {year === "ALL" ? (
                        "ALL"
                      ) : (
                        <>
                          <span className="hidden sm:inline">{year}</span>
                          <span className="inline sm:hidden">{year.replace("20", "")}</span>
                        </>
                      )}
                    </span>
                    
                    {/* Timeline Dot Node */}
                    <motion.div 
                      animate={{
                        scale: isActive ? 1.25 : 1,
                        borderColor: isActive ? "#DA291C" : "#D1D5DB"
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-colors duration-300 relative",
                        isActive ? "border-red" : "border-gray-300 group-hover:border-navy"
                      )}
                    >
                      {isActive && (
                        <>
                          <div className="active-dot-ping" />
                          <motion.div 
                            layoutId="filter-active-core"
                            className="w-1.5 h-1.5 rounded-full bg-red" 
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        </>
                      )}
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8 relative z-10">
            
            {/* Sidebar info */}
            <div className="lg:col-span-2 flex flex-col gap-4 items-start pt-6">
              <Users className="w-7 h-7 text-red stroke-[1.5]" />
              <div className="flex flex-col items-start mt-2">
                <h3 className="font-oswald text-lg sm:text-xl md:text-[1.35rem] xl:text-[1.5rem] leading-[1.25] text-navy font-bold uppercase tracking-wider text-left mb-3">
                  GREAT LEADERS<br />BUILD GREAT<br />LEGACIES.
                </h3>
                <div className="w-6 h-[2.5px] bg-red" />
              </div>
            </div>

            {/* Horizontal Timeline Slider track */}
            <div className="lg:col-span-10 relative w-full overflow-hidden pt-4">
              
              {/* Premium Static Wavy Mesh Background */}
              <svg 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.08] z-0" 
                style={{ willChange: "transform" }}
                viewBox="0 0 1000 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {[...Array(6)].map((_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${120 + i * 10} C 250 ${40 + i * 15}, 500 ${260 - i * 15}, 750 ${120 + i * 10} C 875 ${50 + i * 5}, 1000 ${220 - i * 10}, 1100 ${120 + i * 10}`}
                    stroke={i % 2 === 0 ? "#DA291C" : "#001C58"}
                    strokeWidth={1}
                  />
                ))}
              </svg>

              <div 
                ref={pastTimelineRef}
                className="flex gap-10 sm:gap-14 overflow-x-auto pb-12 pt-8 hide-scrollbar relative items-start min-h-[220px] md:min-h-[250px] xl:min-h-[280px] scroll-smooth"
              >
                {/* Horizontal Timeline Red Dashed Axis line (Mathematically centered with avatar centers) */}
                <div className="absolute left-0 right-0 h-[2px] border-t border-dashed border-red/25 top-[85px] sm:top-[95px] z-0 pointer-events-none" />

                <AnimatePresence mode="popLayout">
                  {filteredPastExecom.map((member, i) => (
                    <motion.div
                      key={`${member.name}-${member.year}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-[120px] md:w-[140px] xl:w-[150px] flex flex-col items-center text-center relative z-10 group"
                    >
                      {/* Red Dot resting on the Axis Line halfway between this card and the next card (NO face dots!) */}
                      {i < filteredPastExecom.length - 1 && (
                        <div className="absolute right-[-24px] sm:right-[-32px] top-[49px] sm:top-[59px] w-2 h-2 rounded-full bg-red border border-white z-20 pointer-events-none" />
                      )}

                      {/* Avatar */}
                      <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden border border-gray-200 bg-gray-50 z-10 transition-all duration-300 group-hover:border-red group-hover:scale-105 mt-2">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      {/* Text */}
                      <h4 className="font-oswald text-[12px] md:text-[14px] xl:text-[15px] font-bold uppercase text-navy tracking-wider leading-tight mt-5 mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[9px] md:text-[10px] xl:text-[11px] text-red font-bold uppercase tracking-widest mb-1.5">
                        {member.role}
                      </p>
                      
                      {/* Metadata Row: Year and Department Category Tag */}
                      <div className="flex items-center gap-1.5 justify-center mt-0.5">
                        <span className="text-[9px] md:text-[10px] xl:text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                          {member.year}
                        </span>
                        <span className="text-[8px] md:text-[9.5px] xl:text-[10px] text-gray-300 font-bold select-none">•</span>
                        <span className="text-[8px] md:text-[9.5px] xl:text-[10px] bg-navy/[0.04] text-navy/60 font-bold uppercase px-1.5 py-0.5 rounded-[4px] tracking-wider select-none">
                          {member.category}
                        </span>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>

              </div>

            </div>

          </div>

          {/* Centered globally below the grid container for perfect page center alignment */}
          <div className="w-full text-center mt-8 relative z-20">
            <span className="text-[9px] md:text-[11px] text-navy/40 font-bold uppercase tracking-[0.18em]">
              AND MANY MORE LEADERS WHO MADE AN IMPACT.
            </span>
          </div>

        </div>
      </section>

      {/* ─── SECTION 04: HELP US SHAPE THE FUTURE (CTA & Features) ─── */}
      <section className="py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#FFFFFF] relative overflow-hidden">
        
        {/* Dynamic Wave Ribbon Background Overlay */}
        <svg 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-full pointer-events-none opacity-[0.06] z-0" 
          style={{ willChange: "transform" }}
          viewBox="0 0 800 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M 0 ${200 + i * 12} C 150 ${100 + i * 15}, 350 ${300 - i * 15}, 500 ${200 + i * 10} C 650 ${100 + i * 5}, 750 ${300 - i * 10}, 900 ${200 + i * 12}`}
              stroke={i % 2 === 0 ? "#DA291C" : "#001C58"}
              strokeWidth={1}
            />
          ))}
        </svg>

        <div className="max-w-[90rem] mx-auto relative z-10">
          
          {/* Custom high-fidelity header with dot above 04 and red underline */}
          <div className="flex flex-col mb-16 w-full items-start relative">
            <div className="flex items-center gap-4 relative">
              {/* Red dot above the "0" of "04" */}
              <div className="absolute -top-3 left-1.5 w-1.5 h-1.5 rounded-full bg-red shrink-0" />
              
              {/* Bold Large Red Number */}
              <span className="font-oswald text-[2.5rem] sm:text-[3.5rem] font-bold text-red leading-none">04</span>
              
              {/* Faint vertical separator */}
              <div className="hidden sm:block w-[1px] h-8 mx-2 bg-navy/10" />

              {/* Uppercase Section Title */}
              <h2 className="font-oswald text-xl sm:text-2xl font-bold tracking-wide uppercase whitespace-nowrap text-navy">
                HELP US SHAPE THE FUTURE
              </h2>
            </div>
            {/* Small red underline */}
            <div className="w-8 h-[2.5px] bg-red mt-4 ml-0 sm:ml-[74px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column CTA */}
            <div className="lg:col-span-4 text-left">
              <p className="text-gray-500 text-[13px] leading-[1.65] mb-8 max-w-[320px] font-medium pr-4">
                Have ideas? Drive? Passion? Join the team that turns ideas into impact. Be a part of something bigger than yourself.
              </p>

              <Link
                href="/info/join"
                className="bg-[#051129] hover:bg-red text-white px-7 py-4 text-[10px] font-bold tracking-[0.15em] rounded-[8px] transition-all duration-300 flex items-center gap-3 w-fit uppercase group shadow-[0_10px_25px_rgba(5,17,41,0.15)] hover:shadow-[0_10px_25px_rgba(218,41,28,0.2)] hover:-translate-y-0.5 cursor-pointer"
              >
                APPLY FOR EXECOM
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column Benefits - Separated by vertical dashed/dotted borders */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 w-full gap-y-12 gap-x-0">
              {[
                {
                  title: "Lead Initiatives",
                  desc: "Take ownership and lead projects that create real impact on campus and beyond.",
                  icon: Rocket
                },
                {
                  title: "Grow Together",
                  desc: "Work with passionate minds and grow your skills & network.",
                  icon: Users
                },
                {
                  title: "Leave a Legacy",
                  desc: "Build something that future members will look up to.",
                  icon: Target
                }
              ].map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <div 
                    key={idx}
                    className={cn(
                      "px-8 py-4 flex flex-col w-full text-left transition-all duration-300 hover:scale-[1.02] group cursor-pointer",
                      idx !== 2 ? "sm:border-r border-dashed border-navy/15" : ""
                    )}
                  >
                    {/* Outline Red Icon standing freely (floating up on card hover) */}
                    <div className="text-red mb-6 transform group-hover:-translate-y-2 transition-transform duration-300 ease-out will-change-transform">
                      <CardIcon className="w-7 h-7 stroke-[1.25]" />
                    </div>

                    {/* Title with expanding hover underline */}
                    <div className="relative w-fit mb-3">
                      <h4 className="font-oswald text-[14px] md:text-[16px] xl:text-[18px] font-bold uppercase text-navy tracking-wider">
                        {card.title}
                      </h4>
                      <div className="w-0 h-[1.5px] bg-red transition-all duration-300 group-hover:w-full mt-1" />
                    </div>

                    <p className="text-gray-500 text-[11px] md:text-[13px] leading-[1.65] font-medium max-w-[200px]">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
