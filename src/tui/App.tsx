import chalk from "chalk";
import figlet from "figlet";
import { Box, Text, useApp, useInput, useStdin } from "ink";
import Gradient from "ink-gradient";
import React, { useEffect, useMemo, useState } from "react";
import { loadConfig, saveConfig, type WhipConfig } from "../config/store.js";
import { strengthBar } from "../render/ui.js";
import { listWhips } from "../whips/registry.js";
import type { Whip } from "../whips/types.js";
import { Preview } from "./Preview.js";

export type Exit = { kind: "quit" } | { kind: "demo"; whip: string } | { kind: "customize" };

export interface AppProps {
  onExit(e: Exit): void;
}

function makeBanner(): string {
  try {
    return figlet.textSync("whip-claude", { font: "Small" });
  } catch {
    return "whip-claude";
  }
}

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

  const bannerText = useMemo(() => makeBanner(), []);

  useInput((input, key) => {
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
  }, { isActive: isRawModeSupported });

  const active: Whip = whips[selected] ?? whips[0]!;

  return (
    <Box flexDirection="column">
      <Gradient name="pastel">
        <Text>{bannerText}</Text>
      </Gradient>
      <Text dimColor>  pick a whip. press enter to save it as your default.</Text>
      <Text> </Text>

      <Box>
        {/* left — whip list */}
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor="gray"
          paddingX={1}
          width={28}
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
          <Text> </Text>
          <Preview whip={active} speed={config.animationSpeed} />
        </Box>
      </Box>

      <Text> </Text>
      <Text>
        {chalk.dim("  ↑/↓ ")}
        {chalk.bold("browse")}
        {chalk.dim("   ⏎ ")}
        {chalk.bold("set default")}
        {chalk.dim("   s ")}
        {chalk.bold("demo")}
        {chalk.dim("   c ")}
        {chalk.bold("customize")}
        {chalk.dim("   q ")}
        {chalk.bold("quit")}
      </Text>
      {toast && (
        <Text>{chalk.green("  ✓ ")}{chalk.bold(toast)}</Text>
      )}
    </Box>
  );
}
