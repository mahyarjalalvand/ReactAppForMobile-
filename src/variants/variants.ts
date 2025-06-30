import type { Variants } from "framer-motion";

export const modalVariants:Variants = {
  closed: {
    opacity: 0,
    y: "100vw",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};
