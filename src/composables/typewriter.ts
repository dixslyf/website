import { ref, readonly, toRef } from "vue";

/**
 * Signals an intentional interruption (abort) of a typing/deletion operation.
 */
class Interrupt {}

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

export type TypewriterOptions = {
  /** Initial text value. Defaults to an empty string. */
  initialText?: string;
  /** Delay (in milliseconds) between each typed character. Defaults to 120ms. */
  typeSpeed?: number;
  /** Delay (in milliseconds) between each deleted character. Defaults to 80ms. */
  deleteSpeed?: number;
};

/**
 * Computes the longest shared prefix between two strings.
 */
function commonPrefix(text1: string, text2: string) {
  let idx = 0;
  while (text1[idx] && text1[idx] === text2[idx]) {
    idx++;
  }
  return text1.slice(0, idx);
}

/**
 * A utility for animating typing and deletion of text.
 *
 * Supports interruption of ongoing animations, smart deletion and typing
 * and configurable speeds.
 *
 * @param options - Configuration for the typewriter.
 */
export function useTypewriter(options: TypewriterOptions = {}) {
  const { initialText = "", typeSpeed = 120, deleteSpeed = 80 } = options;

  const attrs = ref({
    text: initialText,
    state: TypewriterState.Idle,
  });

  let aborter: AbortController | null = null;

  /**
   * Waits for a specified duration unless aborted.
   */
  async function wait(duration: number, signal: AbortSignal) {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(resolve, duration);

      signal.addEventListener("abort", () => {
        clearTimeout(timeout);
        reject(new Interrupt());
      });
    });
  }

  /**
   * Appends characters to `state.current` one at a time.
   */
  async function append(text: string, signal: AbortSignal) {
    if (!text) return;

    attrs.value.state = TypewriterState.Typing;
    for (let idx = 0; idx < text.length; idx++) {
      attrs.value.text += text[idx];
      await wait(typeSpeed, signal);
    }
  }

  /**
   * Deletes characters from the end of `state.current`.
   */
  async function remove(nChars: number, signal: AbortSignal) {
    nChars = Math.min(nChars, attrs.value.text.length);
    if (nChars <= 0) return;

    attrs.value.state = TypewriterState.Deleting;
    for (let count = 0; count < nChars; count++) {
      attrs.value.text = attrs.value.text.slice(0, -1);
      await wait(deleteSpeed, signal);
    }
  }

  /**
   * Replaces the current text with the given `text`, animating deletion and typing.
   *
   * If an existing animation is in progress, it is aborted.
   *
   * @param text - The new text to display.
   * @returns A Promise that resolves when the animation completes.
   */
  async function type(text: string) {
    if (aborter) {
      aborter.abort();
    }
    aborter = new AbortController();

    try {
      const prefix = commonPrefix(text, attrs.value.text);
      await remove(attrs.value.text.length - prefix.length, aborter.signal);
      await append(text.slice(prefix.length), aborter.signal);
    } catch (ex) {
      if (ex instanceof Interrupt) {
        // Interrupted by another `type()` call, so return.
        return;
      }
      throw ex; // Re-throw unexpected errors.
    }

    attrs.value.state = TypewriterState.Idle;
  }

  const textRef = toRef(() => attrs.value.text);
  const stateRef = toRef(() => attrs.value.state);
  return { text: readonly(textRef), state: readonly(stateRef), type };
}
