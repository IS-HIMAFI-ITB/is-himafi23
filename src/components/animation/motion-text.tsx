"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

type AnimateTextProps = MotionProps &
  React.HTMLAttributes<HTMLParagraphElement>;

export function MotionParagraph({
  children,
  className,
  ...props
}: AnimateTextProps) {
  return (
    <motion.p className={cn(className)} {...props}>
      {children}
    </motion.p>
  );
}
