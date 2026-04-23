import { defineConfig } from "tsup";

export default defineConfig({
  entry: { cli: "src/cli.ts" },
  format: ["esm"],
  target: "node20",
  clean: true,
  sourcemap: false,
  minify: false,
  shims: false,
  dts: false,
  banner: { js: "#!/usr/bin/env node" },
});
