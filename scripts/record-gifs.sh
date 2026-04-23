#!/usr/bin/env bash
# Regenerate the README GIFs. Requires `vhs` (brew install vhs).
# Uses a local `whip-claude` shim on PATH so tapes stay terse.
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAPES_DIR="$PROJECT_ROOT/scripts/tapes"
MEDIA_DIR="$PROJECT_ROOT/media"
SHIM_DIR="$(mktemp -d /tmp/whip-shim.XXXXXX)"

cleanup() { rm -rf "$SHIM_DIR"; }
trap cleanup EXIT

# Build a whip-claude shim that points at the local dist build.
cat > "$SHIM_DIR/whip-claude" <<EOF
#!/usr/bin/env bash
exec node "$PROJECT_ROOT/dist/cli.js" "\$@"
EOF
chmod +x "$SHIM_DIR/whip-claude"

export PATH="$SHIM_DIR:$PATH"

mkdir -p "$MEDIA_DIR"
cd "$PROJECT_ROOT"

# Ensure the build is fresh so the GIFs reflect the current code.
npm run build >/dev/null

# Hero GIF (list + cosmic demo).
echo ">> recording media/hero.gif"
vhs "$TAPES_DIR/hero.tape"

# Per-whip GIFs from template.
for name in noodle leather bullwhip flail lightning dragon cosmic; do
  tape="$SHIM_DIR/${name}.tape"
  sed "s/{{NAME}}/${name}/g" "$TAPES_DIR/whip.tape.tmpl" > "$tape"
  echo ">> recording media/${name}.gif"
  vhs "$tape"
done

echo
echo "done — GIFs written to $MEDIA_DIR"
ls -la "$MEDIA_DIR"
