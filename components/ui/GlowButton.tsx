"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const GlowButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled = false,
  size = "md",
}: GlowButtonProps) => {
  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500",
    secondary:
      "border border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 bg-transparent",
    outline:
      "border border-violet-500/40 text-violet-300 hover:border-violet-400 hover:bg-violet-500/10 bg-transparent",
  };

  const glowOnHover = {
    primary: {
      boxShadow:
        "0 0 25px rgba(124, 58, 237, 0.55), 0 0 60px rgba(124, 58, 237, 0.25)",
    },
    secondary: {
      boxShadow:
        "0 0 20px rgba(6, 182, 212, 0.45), 0 0 50px rgba(6, 182, 212, 0.2)",
    },
    outline: {
      boxShadow:
        "0 0 20px rgba(124, 58, 237, 0.4), 0 0 50px rgba(124, 58, 237, 0.15)",
    },
  };

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 overflow-hidden cursor-pointer select-none",
    sizeStyles[size],
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const motionProps = disabled
    ? {}
    : {
        whileHover: { scale: 1.05, ...glowOnHover[variant] },
        whileTap: { scale: 0.97 },
        transition: { duration: 0.2, ease: "easeOut" },
      };

  if (href) {
    return (
      <motion.a href={href} className={baseClass} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
