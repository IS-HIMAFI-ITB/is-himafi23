"use client";

import "./styles.css";

import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { misi } from "./misi";

interface VisiMisiProps {
  className?: string;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const VisiMisi: React.FC<VisiMisiProps> = ({ className }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const misiIndex = wrap(0, misi.data.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const autoPaginate = paginate;
    const timer = setTimeout(() => {
      autoPaginate(1);
    }, 8000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className={cn(className)}>
      <div className="prev bg-accent text-black" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="text-center w-[600px] absolute flex-shrink"
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <p className="text-2xl md:drop-shadow-glow font-semibold text-accent my-3">
            {misi.data[misiIndex].title}
          </p>
          <p className="text-xl">{misi.data[misiIndex].description}</p>
        </motion.div>
      </AnimatePresence>
      <div className="next bg-accent text-black" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="flex flex-row justify-center mt-10 relative top-[90px]">
        {misi.data.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full bg-accent mx-2 cursor-pointer",
              i === misiIndex && "bg-white"
            )}
            onClick={() => {
              setPage([i, i > misiIndex ? 1 : -1]);
            }}
          />
        ))}
      </div>
    </div>
  );
};
