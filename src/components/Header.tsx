"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu, X, Atom, User, Search, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { 
    name: "NEWS", 
    href: "#news",
    subLinks: [
      { name: "Latest Announcements", href: "/news/latest" },
      { name: "Research Papers", href: "/news/research" },
      { name: "Alumni Stories", href: "/news/alumni" }
    ]
  },
  { 
    name: "RESOURCES", 
    href: "#resources",
    subLinks: [
      { name: "Lab Access", href: "/resources/labs" },
      { name: "Funding Applications", href: "/resources/funding" },
      { name: "Tech Library", href: "/resources/library" }
    ]
  },
  { 
    name: "EVENTS", 
    href: "#events",
    subLinks: [
      { name: "Hackathons", href: "/events/hackathons" },
      { name: "Guest Seminars", href: "/events/seminars" },
      { name: "Workshops", href: "/events/workshops" }
    ]
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 28, 88, 1)"] 
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  return (
    <>
      <motion.header
        id="main-nav-header"
        style={{ backgroundColor }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 font-oswald text-white shadow-sm flex items-center transition-[height,background-color,opacity] duration-300",
          isScrolled ? "h-[4.5rem]" : "h-24"
        )}
      >
        {/* Animated backdrop dimmer for desktop mega-menu */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-full left-0 w-full h-[100vh] bg-black/40 backdrop-blur-[2px] -z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="container mx-auto w-full h-full relative z-20 px-4 md:px-8">
          <div className="flex items-center justify-between h-full relative">
            
            {/* Left side: Burger & Desktop Nav */}
            <div className="flex items-center gap-8 flex-[1.5] h-full relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                className="hover:opacity-70 transition-opacity flex items-center justify-center p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-8 h-8" />
              </button>
              
              <nav className="hidden lg:flex items-center gap-8 h-full">
                {NAV_LINKS.map((link) => (
                  <div 
                    key={link.name} 
                    className="h-full flex flex-col justify-center"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg tracking-wide transition-colors flex items-center gap-1 relative py-2 group",
                        activeDropdown === link.name ? "text-red" : "text-white hover:text-red"
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === link.name ? "rotate-180" : "rotate-0")} />
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Shared Mega Menu Dropdown */}
              <AnimatePresence>
                {activeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-16 mt-2 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden min-w-[300px] border border-gray-100"
                  >
                    {/* Animate content strictly */}
                    {NAV_LINKS.map(link => link.name === activeDropdown && (
                      <motion.div 
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-8 flex flex-col gap-5 text-navy"
                      >
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest border-b border-gray-100 pb-3">
                          {link.name} OVERVIEW
                        </span>
                        {link.subLinks.map((sub) => (
                          <Link 
                            key={sub.name} 
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="font-inter font-semibold text-lg hover:text-red transition-colors flex items-center group"
                          >
                            <span className="w-2 h-2 rounded-full bg-red mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 h-full flex items-center justify-center">
              <Link href="/" className="flex items-center justify-center h-full cursor-pointer">
                <motion.div 
                  style={{ scale: logoScale }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isScrolled ? 180 : 0 }}
                  whileHover={{ rotate: isScrolled ? 360 : 180 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Atom className="text-red w-12 h-12" />
                </motion.div>
              </Link>
            </div>

            {/* Right side: Helpers & CTA */}
            <div className="flex items-center justify-end gap-4 md:gap-6 flex-[1.5] h-full">
              
              {/* Expanding Search Pill */}
              <button className="hidden sm:flex items-center justify-start overflow-hidden rounded-full transition-all duration-500 ease-[0.22,1,0.36,1] w-10 h-10 hover:w-[130px] hover:bg-white/10 group px-[9px]">
                <Search className="w-5 h-5 flex-shrink-0 text-white group-hover:text-red transition-colors" />
                <span className="ml-3 text-[13px] font-oswald tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap mt-0.5 flex-shrink-0">
                  SEARCH...
                </span>
              </button>

              <button className="hover:text-red transition-colors hidden sm:flex items-center justify-center p-2 w-10 h-10 rounded-full hover:bg-white/5">
                <User className="w-5 h-5" />
              </button>
              <motion.a
                href="#join"
                className="hidden md:flex items-center gap-2 bg-red text-white px-8 py-2.5 uppercase text-[17px] font-bold tracking-wide rounded-full overflow-hidden relative group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>Join Us</span>
                <motion.span
                  className="inline-flex items-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </div>
            
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-navy text-white font-oswald overflow-y-auto shadow-2xl rounded-r-3xl"
            >
              <div className="p-8 pb-32">
                <div className="flex justify-between items-center mb-16">
                  <Atom className="w-10 h-10 text-red" />
                  <button
                    className="hover:text-red transition-colors rounded-full bg-white/10 p-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-2 uppercase tracking-wider font-bold">
                  <Link 
                    href="/" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-4xl hover:text-red transition-colors py-4 border-b border-white/10"
                  >
                    Home
                  </Link>

                  {NAV_LINKS.map(link => (
                    <div key={link.name} className="flex flex-col border-b border-white/10">
                      <button 
                        onClick={() => setExpandedMobileCategory(expandedMobileCategory === link.name ? null : link.name)}
                        className="flex items-center justify-between py-4 text-4xl hover:text-red transition-colors text-left"
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: expandedMobileCategory === link.name ? 180 : 0 }}
                        >
                          <ChevronDown className="w-6 h-6 text-red" />
                        </motion.div>
                      </button>
                      
                      {/* Mobile Accordion */}
                      <AnimatePresence>
                        {expandedMobileCategory === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 py-4 pl-4 font-inter text-gray-300">
                              {link.subLinks.map(sub => (
                                <Link 
                                  key={sub.name} 
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-lg font-semibold hover:text-red transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  
                  <Link
                    href="#join"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-12 bg-red text-center text-white py-4 rounded-full text-xl shadow-lg hover:bg-white hover:text-navy transition-colors"
                  >
                    JOIN THE CLUB
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
