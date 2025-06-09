/**
 * Signals an intentional interruption (abort) of a typing/deletion operation.
 */
class Interrupt { }

/**
 * Represents the internal state of a `Typewriter`.
 */
export enum TypewriterState {
    /** No typing or deleting is in progress. */
    Idle,

    /** The typewriter is currently appending new characters. */
    Typing,

    /** The typewriter is currently removing characters. */
    Deleting,
}

/**
 * A reactive utility class for animating typing and deletion of text.
 *
 * Supports interruption of ongoing animations, smart deletion and typing (it only deletes and types
 * the necessary characters), and configurable speeds.
 */
export class Typewriter {
    #typeSpeed: number;
    #deleteSpeed: number;

    #current: string = $state("");
    #state: TypewriterState = $state(TypewriterState.Idle);
    #aborter: AbortController | null = null;

    /**
     * Creates a new `Typewriter` instance.
     *
     * @param initialText - Optional initial text value. Defaults to an empty string.
     * @param typeSpeed - Delay (in milliseconds) between each typed character. Defaults to 120ms.
     * @param deleteSpeed - Delay (in milliseconds) between each deleted character. Defaults to 80ms.
     */
    constructor(initialText: string = "", typeSpeed: number = 120, deleteSpeed: number = 80) {
        this.#current = initialText;
        this.#typeSpeed = typeSpeed;
        this.#deleteSpeed = deleteSpeed;
    }

    /**
     * The currently visible string.
     *
     * This property is reactive via `$state`.
     */
    get current(): string {
        return this.#current;
    }
    /**
     * The current state of the typewriter (idle, typing or deleting).
     *
     * This property is reactive via `$state`.
     */
    get state(): TypewriterState {
        return this.#state;
    }

    /**
     * Replaces the current text with the given `text`, animating deletion and typing.
     *
     * If an existing animation is in progress, it is aborted cleanly.
     * Only the differing suffix is deleted and retyped for performance and visual continuity.
     *
     * @param text - The new text to display.
     * @returns A Promise that resolves when the animation completes.
     */
    async type(text: string) {
        if (this.#aborter) {
            this.#aborter.abort();
        }
        this.#aborter = new AbortController();

        try {
            // If there is a common prefix, we only need to delete up to the end
            // of the common prefix.
            const commonPrefix = Typewriter.commonPrefix(text, this.#current);
            await this.#delete(this.#current.length - commonPrefix.length, this.#aborter.signal);

            // We only need to type the characters after the common prefix.
            await this.#type(text.slice(commonPrefix.length), this.#aborter.signal);
        } catch (ex) {
            if (ex instanceof Interrupt) {
                // We don't want to set the state to idle because
                // that can overwrite the state set by the next invocation
                // of `type()` to its async nature.
                return;
            }
            throw ex;
        }

        this.#state = TypewriterState.Idle;
    }
    /**
     * Appends characters to `#current` one at a time with animation.
     *
     * @param text - Text to type (appended to the current text).
     * @param signal - An AbortSignal used to cancel typing.
     */
    async #type(text: string, signal: AbortSignal) {
        // Nothing to type.
        if (!text) {
            return;
        }

        this.#state = TypewriterState.Typing;
        for (let idx = 0; idx < text.length; idx++) {
            this.#current += text[idx];
            await Typewriter.#wait(this.#typeSpeed, signal);
        }
    }

    /**
     * Deletes characters from the end of `#current` with animation.
     *
     * @param nChars - Number of characters to delete.
     * @param signal - An AbortSignal used to cancel deletion.
     */
    async #delete(nChars: number, signal: AbortSignal) {
        // Clamp the number of characters to delete to
        // the length of the current text.
        nChars = Math.min(nChars, this.#current.length);

        // Nothing to delete.
        if (nChars <= 0) {
            return;
        }

        this.#state = TypewriterState.Deleting;

        for (let count = 0; count < nChars; count++) {
            this.#current = this.#current.slice(0, -1);
            await Typewriter.#wait(this.#deleteSpeed, signal);
        }
    }

    /**
     * Waits for a specified duration unless aborted.
     *
     * @param duration - Delay in milliseconds.
     * @param signal - Abort signal to cancel the wait.
     */
    static async #wait(duration: number, signal: AbortSignal) {
        await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(resolve, duration);
            signal.addEventListener("abort", () => {
                clearTimeout(timeout);
                reject(new Interrupt());
            });
        });
    }

    /**
     * Computes the longest shared prefix between two strings.
     *
     * Used to avoid unnecessary deletion/typing operations when only part of the text has changed.
     *
     * @param text1 - First string.
     * @param text2 - Second string.
     * @returns The longest common prefix.
     */
    static commonPrefix(text1: string, text2: string) {
        let idx = 0;
        while (text1[idx] && text1[idx] === text2[idx]) {
            idx++;
        }
        return text1.slice(0, idx);
    }
}
