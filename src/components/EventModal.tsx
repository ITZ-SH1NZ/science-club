"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, MapPin, Clock, User } from "lucide-react";
import { ScienceEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

interface EventModalProps {
  event: ScienceEvent;
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`card-${event.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image (Full height on desktop, top half on mobile) */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto shrink-0 bg-navy">
          <motion.img
            layoutId={`img-${event.id}`}
            src={event.img}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <motion.span 
              layoutId={`status-${event.id}`}
              className={cn(
                "inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border transition-colors mb-3",
                event.status === "UPCOMING" ? "bg-red/90 border-red" : "bg-black/60 border-white/20"
              )}
            >
              {event.status}
            </motion.span>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center">
                <motion.span 
                  layoutId={`dateDay-${event.id}`}
                  className="font-oswald text-4xl font-bold leading-none text-white drop-shadow-md"
                >
                  {event.dateDay}
                </motion.span>
                <motion.span 
                  layoutId={`dateMonth-${event.id}`}
                  className="font-oswald uppercase text-white/70 text-xs tracking-[0.2em] mt-1"
                >
                  {event.dateMonth}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <span className="text-navy/50 font-oswald uppercase tracking-[0.2em] text-sm font-bold block mb-2">
            {event.type}
          </span>
          <motion.h2 
            layoutId={`title-${event.id}`}
            className="font-oswald text-3xl md:text-5xl uppercase font-bold text-navy leading-[1.1] mb-6 tracking-tight"
          >
            {event.title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {event.time && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-red" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-navy/50 uppercase tracking-wider mb-1">Time</span>
                  <span className="text-sm font-medium text-navy">{event.time}</span>
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-red" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-navy/50 uppercase tracking-wider mb-1">Location</span>
                  <span className="text-sm font-medium text-navy">{event.location}</span>
                </div>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-red" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-navy/50 uppercase tracking-wider mb-1">Speaker(s)</span>
                  <span className="text-sm font-medium text-navy">{event.speaker}</span>
                </div>
              </div>
            )}
          </div>

          <div className="prose prose-sm md:prose-base prose-navy max-w-none mb-10">
            <h3 className="font-oswald uppercase text-xl font-bold mb-3 tracking-wide">About This Event</h3>
            <p className="text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="mt-auto">
            {event.status === "UPCOMING" ? (
              <button className="w-full sm:w-auto px-8 py-4 bg-red text-white font-oswald uppercase font-bold tracking-widest text-sm hover:bg-navy transition-colors rounded-full text-center">
                Register Now
              </button>
            ) : (
              <button className="w-full sm:w-auto px-8 py-4 bg-navy text-white font-oswald uppercase font-bold tracking-widest text-sm hover:bg-navy/80 transition-colors rounded-full text-center">
                Watch Recap
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
