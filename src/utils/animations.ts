export type BaseAnimationOptions = {
  idx?: number;
  duration?: number;
  delayStep?: number;
  baseDelay?: number;
};

function fillDefaults(o?: BaseAnimationOptions) {
  return {
    idx: o?.idx || 0,
    duration: o?.duration === undefined ? 0.5 : o.duration,
    delayStep: o?.delayStep === undefined ? 0.25 : o.delayStep,
    baseDelay: o?.baseDelay === undefined ? 0 : o.baseDelay,
  };
}

export type SlideInOptions = {
  direction: "left" | "right" | "up" | "down";
} & BaseAnimationOptions;

export function slideInProps(options?: SlideInOptions) {
  const { idx, duration, delayStep, baseDelay } = fillDefaults(options);
  const direction = options?.direction || "left";
  return {
    initial: {
      x: direction === "left" ? "25rem" : direction === "right" ? "-25rem" : 0,
      y: direction === "up" ? "8rem" : direction === "down" ? "-8rem" : 0,
      opacity: 0,
    },
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { delay: baseDelay + delayStep * idx, duration, ease: "easeInOut" as const },
  };
}

export type FadeOptions = BaseAnimationOptions;

export function fadeProps(options?: FadeOptions) {
  const { idx, duration, delayStep, baseDelay } = fillDefaults(options);
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { delay: baseDelay + delayStep * idx, duration, ease: "easeInOut" as const },
  };
}

export function splashProps() {
  return {
    exit: { opacity: 0, filter: "blur(1rem)" },
    transition: { duration: 1.5, ease: "easeInOut" as const },
  };
}
