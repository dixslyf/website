export function typewriter(node, { letter_duration = 200, delay = 0 }) {
    const text = node.textContent;
    const duration = text.length * letter_duration;
    return {
        delay,
        duration,
        tick: (t) => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        },
    };
}
