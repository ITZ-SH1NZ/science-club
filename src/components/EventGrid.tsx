"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { eventsData, ScienceEvent } from "@/lib/events";
import { EventGridCard } from "./EventGridCard";
import { EventModal } from "./EventModal";
import { cn } from "@/lib/utils";

type FilterTab = "ALL" | "UPCOMING" | "COMPLETED";

export function EventGrid() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<ScienceEvent | null>(null);

  const filteredEvents = useMemo(() => {
    if (activeTab === "ALL") return eventsData;
    return eventsData.filter((event) => event.status === activeTab);
  }, [activeTab]);

  return (
    <section className="py-12 md:py-24 bg-white min-h-[50vh]">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-full relative">
            {(["ALL", "UPCOMING", "COMPLETED"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-6 py-2.5 text-sm md:text-base font-oswald uppercase font-bold tracking-widest rounded-full transition-colors z-10",
                  activeTab === tab ? "text-white" : "text-navy/50 hover:text-navy"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-red rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventGridCard 
                key={event.id} 
                event={event} 
                onClick={() => setSelectedEvent(event)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-navy/50 font-oswald uppercase tracking-widest font-bold">
            No events found for this category.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
