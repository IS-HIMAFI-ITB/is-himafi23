"use client";

import { useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

import { MotionDiv } from "@/components/animation/motion-element";
import { cn } from "@/lib/utils";

4;
interface Props {
  children: React.ReactNode;
  className?: string;
  width?: "fit" | "full";
  variant?: "default" | "slide";
}

export const Reveal = ({ children, className, width, variant }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    const useMainControls = mainControls;
    const useSlideControls = slideControls;
    if (isInView) {
      useMainControls.start("visible");
      useSlideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

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
    <div
      ref={ref}
      className={cn("relative overflow-hidden", `w-${width}`, className)}
    >
      <MotionDiv
        variants={{
          hidden: { opacity: 0, y: 150 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          delay: delayControls,
        }}
      >
        {children}
      </MotionDiv>
      {showSlider ? (
        <MotionDiv
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="absolute top-4 bottom-4 left-0 right-0 bg-accent h-full z-20"
        />
      ) : null}
    </div>
  );
};
