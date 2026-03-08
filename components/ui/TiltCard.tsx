"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

const TiltCard = ({
  children,
  className,
  intensity = 10,
  glowColor,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 400, damping: 40 };
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-intensity, intensity]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [intensity, -intensity]),
    springConfig
  );

  const glareX = useTransform(mouseX, [0, 1], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [0, 1], ["10%", "90%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.10) 0%, transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (glowColor) {
      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (glowColor) {
      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${glowColor}, 0 12px 40px rgba(0,0,0,0.18)`;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {/* Moving glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ background: glareBg }}
      />
    </motion.div>
  );
};

export default TiltCard;
