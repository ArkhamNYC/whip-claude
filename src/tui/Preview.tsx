import { Box, Text } from "ink";
import { useEffect, useState } from "react";
import type { Whip } from "../whips/types.js";

interface Props {
  whip: Whip;
  speed: number;
}

export function Preview({ whip, speed }: Props) {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    setFrameIdx(0);
  }, [whip.name]);

  useEffect(() => {
    const current = whip.frames[frameIdx];
    if (!current) return;
    const delay = Math.max(40, Math.round(current.delayMs / Math.max(0.25, speed)));
    const t = setTimeout(() => {
      setFrameIdx((i) => (i + 1) % whip.frames.length);
    }, delay);
    return () => clearTimeout(t);
  }, [frameIdx, whip, speed]);

  const frame = whip.frames[frameIdx] ?? whip.frames[0];
  const lines = (frame?.text ?? "").split("\n");

  return (
    <Box flexDirection="column">
      {lines.map((line, i) => (
        <Text key={i} wrap="truncate-end">
          {line.length === 0 ? " " : line}
        </Text>
      ))}
    </Box>
  );
}
