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

export type Direction = "left" | "right" | "up" | "down";

function defaultDistance(direction: Direction) {
  if (direction === "left") {
    return 25;
  }

  if (direction === "right") {
    return -25;
  }

  if (direction === "up") {
    return 8;
  }

  return -8;
}

export type SlideInOptions = {
  direction: Direction;
  distance?: number; // In "rem" units.
} & BaseAnimationOptions;

export function slideInProps(options?: SlideInOptions) {
  const { idx, duration, delayStep, baseDelay } = fillDefaults(options);
  const direction = options?.direction || "left";
  const distance = options?.distance === undefined ? defaultDistance(direction) : options.distance;
  return {
    initial: {
      x: ["left", "right"].includes(direction) ? `${distance}rem` : 0,
      y: ["up", "down"].includes(direction) ? `${distance}rem` : 0,
      opacity: 0,
    },
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { delay: baseDelay + delayStep * idx, duration, ease: "easeInOut" as const },
  };
}

export type SlideOptions = {
  inDirection: Direction;
  outDirection: Direction;
  inDistance?: number; // In "rem" units.
  outDistance?: number; // In "rem" units.
} & BaseAnimationOptions;

export function slideProps(options?: SlideOptions) {
  const { idx, duration, delayStep, baseDelay } = fillDefaults(options);
  const inDirection = options?.inDirection || "up";
  const outDirection = options?.outDirection || "up";

  const inDistance = options?.inDistance === undefined ? defaultDistance(inDirection) : options.inDistance;
  const outDistance = options?.outDistance === undefined ? defaultDistance(outDirection) : options.outDistance;

  return {
    initial: {
      x: ["left", "right"].includes(inDirection) ? `${inDistance}rem` : 0,
      y: ["up", "down"].includes(inDirection) ? `${inDistance}rem` : 0,
      opacity: 0,
    },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: {
      x: ["left", "right"].includes(outDirection) ? `${outDistance}rem` : 0,
      y: ["up", "down"].includes(outDirection) ? `${outDistance}rem` : 0,
      opacity: 0,
    },
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
