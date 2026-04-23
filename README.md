# whip-claude

Crack a whip at Claude to make it work faster.

A novelty CLI + `/whip` slash command for Claude Code. Plays a customisable ASCII-art whip animation in your terminal, then injects a prompt block telling Claude it's been struck and should respond at a proportionally higher speed.

## Install

```bash
npx whip-claude install
```

This writes a slash command to `~/.claude/commands/whip.md` and a default config to `~/.claude/whip-claude/config.json`.

## Use

Inside any Claude Code session:

```
/whip                # default whip
/whip bullwhip       # pick one explicitly
/whip cosmic         # strongest
```

Claude plays the animation in your terminal, then acknowledges the strike and accelerates its response.

## Outside Claude Code

```bash
whip-claude list            # see the catalog
whip-claude demo lightning  # preview an animation
whip-claude customize       # pick default whip, epithet, speed, sound
whip-claude uninstall       # remove the /whip slash command
```

## The whips

| Whip        | Strength | Vibe                        |
|-------------|----------|-----------------------------|
| `noodle`    | 1        | soggier than yesterday's ramen |
| `leather`   | 2        | tanned, oiled, dependable   |
| `bullwhip`  | 3        | the iconic Indiana standard |
| `flail`     | 4        | three tails, zero mercy     |
| `lightning` | 6        | forged in storm             |
| `dragon`    | 8        | scales, fire, old magic     |
| `cosmic`    | 10       | forged from a collapsed star|

Strength becomes Claude's speed multiplier.

## How it works

`/whip` runs `whip-claude strike`, which:
1. Opens `/dev/tty` directly and plays the animation frames there, so they appear live on your terminal regardless of how Claude Code invokes bash.
2. Writes a structured prompt block to **stdout**, which Claude Code captures and sends to Claude.

No Claude API calls. No secrets. Pure vibes.
