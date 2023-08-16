import React from "react";

import { MotionDiv } from "@/components/animation/motion-element";
import Container from "@/components/layout/container";

import Timeline from "./timeline";

export default function TimelineSection() {
  return (
    <Container
      id="social"
      className="min-h-[calc(100vh-72.6px-4rem)] h-full flex justify-center"
    >
      <MotionDiv
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Timeline />
      </MotionDiv>
    </Container>
  );
}
