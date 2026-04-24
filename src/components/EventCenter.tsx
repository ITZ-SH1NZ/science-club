"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  { 
    title: "AI Horizons Summit '25", 
    dateDay: "12",
    dateMonth: "OCT", 
    type: "CONFERENCE", 
    status: "UPCOMING", 
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Quantum Computing Hardware", 
    dateDay: "18",
    dateMonth: "OCT", 
    type: "SEMINAR", 
    status: "UPCOMING", 
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Autonomous Robotics Build V2", 
    dateDay: "04",
    dateMonth: "NOV", 
    type: "WORKSHOP", 
    status: "UPCOMING", 
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Neural Network Research Seminar", 
    dateDay: "22",
    dateMonth: "SEP", 
    type: "SEMINAR", 
    status: "COMPLETED", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "Advanced Electronics Architecture", 
    dateDay: "14",
    dateMonth: "AUG", 
    type: "WORKSHOP", 
    status: "COMPLETED", 
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
  }
];

const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds per card

export function EventCenter() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Guards handleScroll from firing during programmatic smooth-scroll
  const isAutoScrolling = useRef(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll the carousel to center a specific card index
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    // +1 to skip the leading spacer div at position 0
    const card = container.children[index + 1] as HTMLElement;
    if (!card) return;
    const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
    // Lock out handleScroll for the duration of the smooth scroll animation
    isAutoScrolling.current = true;
    container.scrollTo({ left: offset, behavior: "smooth" });
    setTimeout(() => { isAutoScrolling.current = false; }, 700);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % events.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, scrollToIndex]);

  // Detect MANUAL scroll only — gated by isAutoScrolling
  const handleScroll = useCallback(() => {
    // Ignore scroll events fired by our own programmatic scrollTo()
    if (isAutoScrolling.current) return;

    const container = scrollRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    const allChildren = Array.from(container.children);
    // Skip the leading spacer (index 0) and trailing spacer (last index)
    allChildren.slice(1, allChildren.length - 1).forEach((child, i) => {
      const el = child as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setActiveIndex(closest);
    // Pause auto-scroll for 6s after any manual interaction
    setIsPaused(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsPaused(false), 6000);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
    setIsPaused(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section className="bg-white py-12 md:py-16 text-navy font-inter border-b border-gray-200 relative z-30 -mt-16 sm:-mt-24 w-full max-w-[95%] mx-auto left-0 right-0 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden">
      
      {/* Header lives in a padded container */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-5xl font-oswald uppercase font-bold tracking-tight text-navy"
          >
            Event Center
          </motion.h2>
          <motion.button
            className="flex items-center gap-2 font-oswald uppercase text-base md:text-lg text-red hover:text-navy transition-colors font-bold tracking-wide group"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            All Events
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Carousel: full section width — rounded-3xl + overflow-hidden clips edges cleanly */}
      <div>
        <div
          ref={(el: HTMLDivElement | null) => {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
            (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-4 pt-4 hide-scrollbar"
        >
          {/* Leading spacer */}
          <div className="min-w-[calc(50vw-39vw)] sm:min-w-[calc(50vw-29vw)] md:min-w-[calc(50vw-200px)] lg:min-w-[calc(50vw-220px)] flex-shrink-0" />
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => goTo(i)}
              className={cn(
                "relative min-w-[78vw] h-[72vw] sm:min-w-[58vw] sm:h-[58vw] md:min-w-[400px] md:h-[520px] lg:min-w-[440px] flex-shrink-0 snap-center rounded-2xl md:rounded-[2rem] flex flex-col group cursor-pointer overflow-hidden transition-all duration-500 isolate",
                event.status === "UPCOMING" 
                  ? "border-2 border-transparent hover:border-red" 
                  : "border-2 border-transparent hover:border-navy"
              )}
            >
              
              {/* Full Bleed Background Image & Gradients */}
              <div className="absolute inset-0 z-0 bg-navy/20">
                <img 
                  src={event.img} 
                  alt={event.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-90 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Meta Badges */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex items-center gap-2">
                <span className={cn(
                  "backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-white border border-white/20 transition-colors duration-500",
                  event.status === "UPCOMING" ? "bg-red/90 group-hover:bg-red" : "bg-black/60"
                )}>
                  {event.status}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] uppercase font-bold text-white tracking-widest border border-white/10 hidden sm:block">
                  {event.type}
                </span>
              </div>

              {/* Main Content Block */}
              <div className="relative z-10 mt-auto p-5 md:p-8 flex flex-col h-full justify-end overflow-hidden">
                
                <div className="flex items-start gap-4 md:gap-5 transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] mb-2">
                  
                  {/* Date Block */}
                  <div className="flex flex-col items-center justify-center shrink-0 mt-0 md:mt-1">
                      <span className={cn(
                        "font-oswald text-2xl md:text-4xl lg:text-5xl font-bold leading-none transition-colors duration-500 text-white drop-shadow-md",
                        event.status === "UPCOMING" && "md:group-hover:text-red"
                      )}>
                        {event.dateDay}
                      </span>
                      <span className="font-oswald uppercase text-white/70 text-[10px] md:text-xs tracking-[0.2em] mt-1">
                        {event.dateMonth}
                      </span>
                  </div>
                  
                  <div className="w-[1px] h-[30px] md:h-[50px] bg-white/30 shrink-0 mt-1" />
                  
                  <h3 className="font-oswald uppercase text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.05] font-bold line-clamp-3 md:line-clamp-2 tracking-tight drop-shadow-md">
                    {event.title}
                  </h3>
                </div>

                <div className="flex justify-between items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-all duration-500 delay-100 ease-[0.22,1,0.36,1] pt-4 md:pt-6 ml-0 md:ml-[90px] border-t border-white/20 mt-4 md:mt-0">
                  <span className="text-white text-[10px] md:text-sm font-oswald uppercase tracking-[0.2em] font-bold">
                    {event.status === "UPCOMING" ? "Register Now" : "View Recap"}
                  </span>
                  <div className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-500 ease-out md:group-hover:rotate-45",
                    event.status === "UPCOMING" ? "bg-red text-white" : "bg-white/20 text-white backdrop-blur-md"
                  )}>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45 md:-rotate-45" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
          {/* Trailing spacer */}
          <div className="min-w-[calc(50vw-39vw)] sm:min-w-[calc(50vw-29vw)] md:min-w-[calc(50vw-200px)] lg:min-w-[calc(50vw-220px)] flex-shrink-0" />
        </div>
      </div>

      {/* Indicators in a padded container */}
      <div className="container mx-auto px-4 lg:px-8 pt-6 pb-2">
        {/* ── Morphing Circle-to-Pill Indicator ── */}
        <div className="flex items-center gap-[6px]">
          <AnimatePresence>
            {events.map((_, i) => {
              const nextIndex = (activeIndex + 1) % events.length;
              const isActive = i === activeIndex;
              const isNext   = i === nextIndex;

              return (
                <motion.button
                  key={i}
                  layout
                  onClick={() => goTo(i)}
                  aria-label={`Go to event ${i + 1}`}
                  // Morphs: small circle → medium pill → wide active pill
                  animate={{
                    width: isActive ? 36 : isNext ? 20 : 8,
                    opacity: isActive ? 1 : isNext ? 0.7 : 0.35,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-2 rounded-full bg-gray-300 focus:outline-none flex-shrink-0 overflow-hidden"
                >
                  {/* The FM layoutId span slides between active positions smoothly */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="active-pip"
                        className="absolute inset-0 bg-navy rounded-full"
                        initial={false}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Sweep on the next dot — driven by FM, not CSS keyframes */}
                  {isNext && !isPaused && (
                    <motion.span
                      key={`sweep-${activeIndex}`}
                      className="absolute inset-y-0 left-0 bg-navy/50 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: AUTO_SCROLL_INTERVAL / 1000,
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
  );
}
