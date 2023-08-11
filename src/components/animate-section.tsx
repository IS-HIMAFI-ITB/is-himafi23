"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

type AnimateSectionProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export default function AnimateSection(props: AnimateSectionProps) {
  return (
    <motion.section {...props} className={cn(props.className)}>
      {props.children}
    </motion.section>
  );
}
