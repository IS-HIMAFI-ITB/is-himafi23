"use client";

import "./styles.css";

import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { useEffect, useState } from "react";
import { images } from "./imagemockup";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DokumentasiProps {
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

export const Dokumentasi: React.FC<DokumentasiProps> = ({ className }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  //ntar bikin database buat image dokumentasi, biar pubdok bisa langsung upload foto

  const imageIndex = wrap(0, images.length, page);

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
      <div className="hidden lg:flex">
        <div
          className="prev bg-accent image text-black"
          onClick={() => paginate(-1)}
        >
          {"‣"}
        </div>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="flex text-center w-[300px] h-[175px] xs:w-[400px] xs:h-[233px] lg:w-[600px] lg:h-[350px] top-3 absolute flex-shrink"
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
          <Image
            src={images[imageIndex]}
            alt={imageIndex.toString()}
            fill
            className="object-scale-down -z-20"
          />
        </motion.div>
      </AnimatePresence>
      <div className="hidden lg:flex">
        <div
          className="next bg-accent image text-black"
          onClick={() => paginate(1)}
        >
          {"‣"}
        </div>
      </div>
      <div className="flex flex-row justify-center mt-10 relative top-[90px] xs:top-[140px] lg:top-[260px]">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full bg-accent mx-2 cursor-pointer",
              i === imageIndex && "bg-white"
            )}
            onClick={() => {
              setPage([i, i > imageIndex ? 1 : -1]);
            }}
          />
        ))}
      </div>
    </div>
  );
};
