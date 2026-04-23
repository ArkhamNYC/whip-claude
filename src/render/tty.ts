import { closeSync, openSync, writeSync } from "node:fs";

export interface RenderTarget {
  write(chunk: string): void;
  close(): void;
  isTTY: boolean;
  source: "dev-tty" | "stderr" | "stdout";
}

export function openRenderTarget(preferDevTty = true): RenderTarget {
  if (preferDevTty) {
    let fd: number | null = null;
    try {
      fd = openSync("/dev/tty", "w");
    } catch {
      fd = null;
    }
    if (fd !== null) {
      const currentFd = fd;
      let closed = false;
      return {
        write: (c) => {
          if (closed) return;
          try {
            writeSync(currentFd, c);
          } catch {
            /* swallow — tty may have vanished */
          }
        },
        close: () => {
          if (closed) return;
          closed = true;
          try {
            closeSync(currentFd);
          } catch {
            /* noop */
          }
        },
        isTTY: true,
        source: "dev-tty",
      };
    }
  }

  return {
    write: (c) => {
      process.stderr.write(c);
    },
    close: () => {},
    isTTY: Boolean(process.stderr.isTTY),
    source: "stderr",
  };
}
