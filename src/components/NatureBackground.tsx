"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function NatureBackground() {
  // Normalized mouse coordinates: -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy, liquid-smooth spring physics (calm, water-like dampening)
  const springConfig = { damping: 40, stiffness: 45, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle opposite-direction parallax offset: max 15-20 pixels
  const translateX = useTransform(smoothX, [-1, 1], [18, -18]);
  const translateY = useTransform(smoothY, [-1, 1], [18, -18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (!innerWidth || !innerHeight) return;
      // Convert to normalized space (-1 to 1) from window center
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden select-none"
    >
      {/* Parallax & Breathing Motion Container */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
        }}
        animate={{
          scale: [1.0, 1.05, 1.0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute -inset-[30px] w-[calc(100%+60px)] h-[calc(100%+60px)]"
      >
        <img
          src="/plant-background.webp"
          alt=""
          className="w-full h-full object-cover object-center will-change-transform contrast-[1.06] saturate-[1.12] brightness-[0.98]"
        />
      </motion.div>

      {/* Gentle, minimal ambient tint preserving rich background clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/25 pointer-events-none" />
    </div>
  );
}
