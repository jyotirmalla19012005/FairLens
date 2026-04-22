// frontend/src/lib/animations.ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const glassHover: Variants = {
  initial: {
    scale: 1,
    backgroundColor: "rgba(10, 10, 10, 0.4)",
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(10, 10, 10, 0.55)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const staggerChildren: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const pulseSkeleton: Variants = {
  initial: {
    opacity: 0.3,
  },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
};
