import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
4;
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
  variant?: "default" | "slide";
}

export const AutoReveal = ({ children, className, width, variant }: Props) => {
  let showSlider, delayControls;

  switch (variant) {
    case "default":
      showSlider = false;
      delayControls = 0;
    case "slide":
      showSlider = true;
      delayControls = 0.25;
  }

  return (
    <div className={cn("relative overflow-hidden ", width, className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 150 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          delay: delayControls,
        }}
      >
        {children}
      </motion.div>
      {showSlider ? (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="absolute top-4 bottom-4 left-0 right-0 bg-accent z-20"
        />
      ) : null}
    </div>
  );
};
