import type { ComputedRef } from "vue";

import { atom, type PreinitializedWritableAtom } from "nanostores";

import type { useMotionConfig } from "motion-v";

type extractMotionConfigState<MotionConfigState> =
  MotionConfigState extends ComputedRef<infer X> ? X : never;

export type MotionConfigState = extractMotionConfigState<ReturnType<typeof useMotionConfig>>;

export const motionConfig: PreinitializedWritableAtom<MotionConfigState> = atom({
  reducedMotion: "user",
});
