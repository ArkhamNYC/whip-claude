import chalk from "chalk";
import { Box, Static, Text, useApp, useInput, useStdin } from "ink";
import { useEffect, useMemo, useState } from "react";
import { loadConfig, saveConfig, type WhipConfig } from "../config/store.js";
import { strengthBar } from "../render/ui.js";
import { listWhips } from "../whips/registry.js";
import type { Whip } from "../whips/types.js";
import { Preview } from "./Preview.js";

export type Exit = { kind: "quit" } | { kind: "demo"; whip: string } | { kind: "customize" };

export interface AppProps {
  onExit(e: Exit): void;
}

// Fixed line budget for preview frame area — every frame renders to this many
// lines, so layout doesn't shift between frames and Ink can redraw in place
// without pushing content off-screen.
const PREVIEW_LINES = 10;

export function App({ onExit }: AppProps) {
  const { exit } = useApp();
  const { isRawModeSupported } = useStdin();
  const whips = useMemo(() => listWhips(), []);
  const [config, setConfig] = useState<WhipConfig>(() => loadConfig());
  const [selected, setSelected] = useState(() => {
    const idx = whips.findIndex((w) => w.name === loadConfig().defaultWhip);
    return idx < 0 ? 0 : idx;
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  useInput(
    (input, key) => {
      if (!isRawModeSupported) return;
      if (input === "q" || key.escape) {
        exit();
        onExit({ kind: "quit" });
        return;
      }
      if (key.upArrow || input === "k") {
        setSelected((i) => (i - 1 + whips.length) % whips.length);
        return;
      }
      if (key.downArrow || input === "j") {
        setSelected((i) => (i + 1) % whips.length);
        return;
      }
      if (key.return) {
        const next = { ...config, defaultWhip: whips[selected]!.name };
        setConfig(next);
        saveConfig(next);
        setToast(`saved default → ${whips[selected]!.displayName}`);
        return;
      }
      if (input === "s") {
        exit();
        onExit({ kind: "demo", whip: whips[selected]!.name });
        return;
      }
      if (input === "c") {
        exit();
        onExit({ kind: "customize" });
        return;
      }
    },
    { isActive: isRawModeSupported }
  );

  const active: Whip = whips[selected] ?? whips[0]!;

  // Short, gradient-ish one-line title — figlet banners were causing Ink to
  // stack on viewport overflow. This fits in one row.
  const title = chalk.bold(
    chalk.hex("#ff6b6b")("▰") +
      chalk.hex("#ffd93d")("▰") +
      chalk.hex("#6bff6b")("▰") +
      " " +
      chalk.hex("#c56bff")("whip") +
      chalk.dim("-") +
      chalk.hex("#6bd1ff")("claude") +
      " " +
      chalk.hex("#6bff6b")("▰") +
      chalk.hex("#ffd93d")("▰") +
      chalk.hex("#ff6b6b")("▰")
  );

  return (
    <Box flexDirection="column">
      {/* Header renders exactly once — never re-renders with frame updates. */}
      <Static items={[{ id: "header" }]}>
        {() => (
          <Box key="header" flexDirection="column" paddingX={1}>
            <Text>{title}</Text>
            <Text dimColor>  pick a whip · enter saves as default · s plays demo</Text>
            <Text> </Text>
          </Box>
        )}
      </Static>

      <Box>
        {/* left — whip list */}
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor="gray"
          paddingX={1}
          width={24}
        >
          <Text bold>  whips</Text>
          <Text> </Text>
          {whips.map((w, i) => {
            const isSelected = i === selected;
            const isDefault = w.name === config.defaultWhip;
            const cursor = isSelected ? chalk.cyan("❯") : " ";
            const star = isDefault ? chalk.yellow("★") : " ";
            const name = isSelected
              ? w.titleColor(w.displayName)
              : chalk.dim(w.displayName);
            return (
              <Text key={w.name}>
                {` ${cursor} ${star} ${name}`}
              </Text>
            );
          })}
        </Box>

        {/* right — preview */}
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor="gray"
          paddingX={2}
          flexGrow={1}
          marginLeft={1}
        >
          <Text>{active.titleColor(active.displayName.toUpperCase())}</Text>
          <Text>
            {chalk.dim("strength  ")}
            {strengthBar(active.strength)}
            {chalk.dim(`  ${active.strength}/10`)}
          </Text>
          <Text dimColor italic>{active.tagline}</Text>
          <Preview whip={active} speed={config.animationSpeed} lineBudget={PREVIEW_LINES} />
        </Box>
      </Box>

      <Box paddingX={1} marginTop={1}>
        <Text>
          {chalk.dim("↑/↓ ")}
          {chalk.bold("browse")}
          {chalk.dim("   ⏎ ")}
          {chalk.bold("set default")}
          {chalk.dim("   s ")}
          {chalk.bold("demo")}
          {chalk.dim("   c ")}
          {chalk.bold("customize")}
          {chalk.dim("   q ")}
          {chalk.bold("quit")}
          {toast ? chalk.green(`     ✓ ${toast}`) : ""}
        </Text>
      </Box>
    </Box>
  );
}
