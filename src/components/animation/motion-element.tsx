"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

type AnimateElementProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export function MotionSection(props: AnimateElementProps) {
  return (
    <motion.section {...props} className={cn(props.className)}>
      {props.children}
    </motion.section>
  );
}

export function MotionDiv(props: AnimateElementProps) {
  return (
    <motion.div {...props} className={cn(props.className)}>
      {props.children}
    </motion.div>
  );
}
