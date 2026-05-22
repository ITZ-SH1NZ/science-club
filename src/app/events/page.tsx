import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventGrid } from "@/components/EventGrid";
import { CtaSection } from "@/components/CtaSection";

export const metadata = {
  title: "Events | Science Club",
  description: "Discover all upcoming and past events hosted by the Science Club. Workshops, Seminars, and Conferences.",
};

export default function EventsPage() {
  return (
    <div className="bg-white text-navy selection:bg-red selection:text-white min-h-screen flex flex-col relative w-full">
      <Header />
      
      {/* Front Layer */}
      <main className="relative z-10 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] border-b border-gray-200/50 rounded-b-3xl pb-16">
        
        {/* Events Hero */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-navy">
          <div className="absolute inset-0 z-0">
            {/* Dark elegant background with grid lines pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-red opacity-20 blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
            <span className="text-red font-oswald uppercase tracking-[0.2em] font-bold text-sm md:text-base mb-4">
              Explore Our Timeline
            </span>
            <h1 className="font-oswald uppercase text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold text-white tracking-tighter leading-none mb-6 drop-shadow-lg">
              Science Club <br />
              <span className="text-red">Events</span>
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-xl font-inter leading-relaxed">
              From hands-on workshops building autonomous rovers to deep-dive seminars on quantum computing. Join us in shaping the future.
            </p>
          </div>
        </section>

        {/* The Grid Component with Filters and Modals */}
        <EventGrid />

        <CtaSection />
      </main>

      {/* Sticky Footer */}
      <div className="md:sticky md:bottom-0 md:z-0 z-10 relative">
        <Footer />
      </div>
    </div>
  );
}
