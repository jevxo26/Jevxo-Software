/**
 * Premium Framer Motion Animation Presets & Variants
 * Optimized for GPU acceleration, 60fps, and sleek modern SaaS visuals.
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const springDefault = { type: "spring", stiffness: 100, damping: 15 };

// Standard viewport config
export const viewportSettings = { once: true, amount: 0.15 };

// General transition preset
export const transitionDefault = (delay = 0, duration = 0.8) => ({
  duration,
  delay,
  ease: easeOutExpo,
});

// Animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: transitionDefault(delay),
  }),
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: transitionDefault(delay),
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: transitionDefault(delay),
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: transitionDefault(delay),
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: transitionDefault(delay, 0.7),
  }),
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: transitionDefault(delay, 0.9),
  }),
};

// Word-by-word reveal container
export const revealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Word-by-word reveal item
export const revealItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

// Infinite floating motion
export const floatingMotion = (duration = 6, yOffset = 10) => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

// Hover transitions
export const hoverLift = {
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
};

export const hoverScale = {
  hover: {
    scale: 1.04,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
};
