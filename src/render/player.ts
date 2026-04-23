import type { Frame } from "../whips/types.js";
import {
  BELL,
  CLEAR_DOWN,
  CURSOR_HIDE,
  CURSOR_SHOW,
  countLines,
  moveUp,
  sleep,
} from "./ansi.js";
import type { RenderTarget } from "./tty.js";

export interface PlayOptions {
  target: RenderTarget;
  speed: number;
  bellOnStrike?: boolean;
  strikeFrameIndex?: number;
}

export async function playFrames(frames: Frame[], opts: PlayOptions): Promise<void> {
  const { target, speed, bellOnStrike, strikeFrameIndex } = opts;
  const scale = speed > 0 ? 1 / speed : 1;

  if (target.isTTY) target.write(CURSOR_HIDE);

  let prevLines = 0;

  const cleanup = () => {
    if (target.isTTY) target.write(CURSOR_SHOW);
  };
  const onSigint = () => {
    cleanup();
    process.exit(130);
  };
  process.once("SIGINT", onSigint);

  try {
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i]!;

      if (target.isTTY && prevLines > 0) {
        target.write(moveUp(prevLines));
        target.write("\r");
        target.write(CLEAR_DOWN);
      }

      if (bellOnStrike && i === strikeFrameIndex) target.write(BELL);

      target.write(frame.text);
      prevLines = countLines(frame.text);

      const delay = Math.max(16, Math.round(frame.delayMs * scale));
      await sleep(delay);
    }
  } finally {
    process.off("SIGINT", onSigint);
    cleanup();
  }
}
