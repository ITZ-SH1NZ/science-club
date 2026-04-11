"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export function NewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const news = [
    {
      id: 1,
      tag: "ACHIEVEMENTS",
      title: "Club wins the NSF Grant for IoT Research",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "PROJECTS",
      title: "Breakthrough in renewable energy models",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "INTERVIEW",
      title: "Faculty Advisor Dr. Alan Turing",
      img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-white py-20 font-inter" ref={ref}>
      <div className="container mx-auto px-4 lg:px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-6xl font-oswald uppercase font-bold text-navy tracking-tight mb-12 border-b-4 border-navy pb-4 inline-block"
        >
          Latest News
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto lg:h-[600px]">
          {/* Main Article */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="lg:col-span-8"
          >
            <Link href="#" className="group overflow-hidden relative cursor-pointer min-h-[400px] lg:min-h-full bg-gray-100 flex rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-400">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                style={{ backgroundImage: `url(${news[0].img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12 text-white font-oswald w-full">
                <span className="bg-red text-white uppercase tracking-widest px-4 py-1 text-xs font-bold mb-4 inline-block rounded-full">
                  {news[0].tag}
                </span>
                <h3 className="text-4xl lg:text-5xl uppercase font-bold leading-tight group-hover:text-gray-200 transition-colors duration-300">
                  {news[0].title}
                </h3>
                {/* Animated underline reveal */}
                <span className="block mt-4 w-0 h-[2px] bg-red group-hover:w-24 transition-all duration-500 ease-out" />
              </div>
              {/* Corner arrow */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Secondary Articles */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 h-full">
            {news.slice(1).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22,1,0.36,1] }}
                className="flex-1"
              >
                <Link href="#" className="group overflow-hidden relative cursor-pointer min-h-[280px] lg:min-h-0 h-full bg-gray-100 flex rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-400">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 xl:p-8 text-white font-oswald w-full">
                    <span className="text-red uppercase tracking-widest text-xs font-bold mb-3 inline-block bg-white px-3 py-1 rounded-full shadow-sm">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl xl:text-3xl uppercase font-bold leading-tight group-hover:text-gray-200 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="block mt-3 w-0 h-[2px] bg-red group-hover:w-12 transition-all duration-500 ease-out" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link
              href="/news"
              className="font-oswald uppercase text-xl font-bold bg-navy text-white px-10 py-4 rounded-full tracking-wider transition-colors hover:bg-red relative overflow-hidden group inline-flex items-center gap-3"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              Discover All News
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
