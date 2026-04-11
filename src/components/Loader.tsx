"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to ensure fonts/assets parse smoothly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-navy flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6 overflow-hidden">
             {/* Progressing Red Line */}
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 200 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-1 bg-red"
             />
             <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
               className="font-oswald text-5xl md:text-7xl text-white font-bold tracking-widest uppercase"
             >
               Science<span className="text-red px-2">Club</span>
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
