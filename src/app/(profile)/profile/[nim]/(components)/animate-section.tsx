"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

export default function AnimateSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
