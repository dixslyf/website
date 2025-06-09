import { linear } from "svelte/easing";

/**
 * A triangle wave generator with period 1, amplitude 0.5 and range [0, 1].
 *
 * @param x - The value along the x-axis.
 * @returns The corresponding y-value (range [0, 1]).
 */
function triangleWave(x) {
    const transformedX = x * 2 * Math.PI; // Make the period 1.
    const y = Math.asin(Math.cos(transformedX));
    const transformedY = y / Math.PI + 0.5; // Make the amplitude 0.5 and the lowest point 0.
    return transformedY;
}
/**
 * A Svelte transition that creates a blinking opacity effect.
 *
 * This is ideal for caret animations.
 *
 * @param node - The HTML element to apply the transition to.
 * @param options - Configuration object with the following properties:
 *   - cycles: Number of full up-down-up cycles over the duration. Default is `3.5`.
 *   - duration: Total duration of the animation in milliseconds. Default is `4000`.
 *   - delay: Delay before the animation starts. Default is `0`.
 *   - easing: Easing function. Default is `linear`.
 *
 * @returns A Svelte transition config object.
 */
export function blink(node, { cycles = 3.5, duration = 4000, delay = 0, easing = linear }) {
    const opacity = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: (_t, u) => `opacity: ${triangleWave(u * cycles) * opacity}`,
    };
}
