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
      "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500",
    secondary:
      "border border-sky-500/50 text-sky-600 dark:text-sky-400 hover:border-sky-500 dark:hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 bg-transparent",
    outline:
      "border border-sky-500/40 text-sky-600 dark:text-sky-300 hover:border-sky-500 dark:hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 bg-transparent",
  };

  const glowOnHover = {
    primary: {
      boxShadow:
        "0 0 25px rgba(14, 165, 233, 0.55), 0 0 60px rgba(14, 165, 233, 0.25)",
    },
    secondary: {
      boxShadow:
        "0 0 20px rgba(14, 165, 233, 0.45), 0 0 50px rgba(14, 165, 233, 0.2)",
    },
    outline: {
      boxShadow:
        "0 0 20px rgba(14, 165, 233, 0.4), 0 0 50px rgba(14, 165, 233, 0.15)",
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
