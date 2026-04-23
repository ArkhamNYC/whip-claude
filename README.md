# whip-claude

> Crack a whip at Claude to make it work faster.

A novelty CLI + `/whip` slash command for Claude Code. Plays a customisable ASCII-art whip animation in your terminal, then feeds Claude a prompt block telling it it's been struck and should respond at a proportionally higher speed.

<p align="center">
  <img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/hero.gif" alt="whip-claude hero demo — list + cosmic strike" width="800" />
</p>

---

## Install

```bash
npx -y whip-claude install
```

This writes a slash command to `~/.claude/commands/whip.md` and a default config to `~/.claude/whip-claude/config.json`.

## Use

Inside any Claude Code session:

```
/whip                # default whip
/whip bullwhip       # pick one explicitly
/whip cosmic         # the strongest
/whip --window dragon  # also pop a real Terminal window with the full animation
```

Claude sees the strike, acknowledges, and accelerates.

## The whip roster

<table>
<tr>
  <td width="50%"><strong>Noodle Whip</strong> &nbsp;·&nbsp; strength 1<br/><em>soggier than yesterday's ramen</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/noodle.gif" alt="noodle whip" /></td>
  <td width="50%"><strong>Leather Whip</strong> &nbsp;·&nbsp; strength 2<br/><em>tanned, oiled, dependable</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/leather.gif" alt="leather whip" /></td>
</tr>
<tr>
  <td><strong>Bullwhip</strong> &nbsp;·&nbsp; strength 3<br/><em>the iconic Indiana standard</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/bullwhip.gif" alt="bullwhip" /></td>
  <td><strong>Chain Flail</strong> &nbsp;·&nbsp; strength 4<br/><em>three tails, zero mercy</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/flail.gif" alt="chain flail" /></td>
</tr>
<tr>
  <td><strong>Lightning Whip</strong> &nbsp;·&nbsp; strength 6<br/><em>forged in storm, hums before it strikes</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/lightning.gif" alt="lightning whip" /></td>
  <td><strong>Dragon's Tail</strong> &nbsp;·&nbsp; strength 8<br/><em>scales, fire, and old magic</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/dragon.gif" alt="dragon's tail" /></td>
</tr>
<tr>
  <td colspan="2" align="center"><strong>Cosmic Whip</strong> &nbsp;·&nbsp; strength 10 &nbsp;·&nbsp; <em>forged from a collapsed star</em><br/><img src="https://github.com/ArkhamNYC/whip-claude/raw/main/media/cosmic.gif" alt="cosmic whip" width="640" /></td>
</tr>
</table>

Strength becomes Claude's speed multiplier in the injected prompt.

## Commands

Run `whip-claude` with no arguments for the **interactive TUI** — arrow keys browse whips, live animation preview on each, enter to save the selection as your default, `s` to play a full demo, `c` to jump into customize, `q` to quit.

```bash
whip-claude                         # interactive TUI (default)
whip-claude install                 # install the /whip slash command
whip-claude uninstall               # remove it (config preserved)
whip-claude list                    # static styled catalog with strength bars
whip-claude demo <whip>             # preview any animation locally
whip-claude customize               # pick default whip, epithet, speed, sound
whip-claude strike <whip>           # used by /whip internally
whip-claude strike --window <whip>  # pop a Terminal window with the true animation
```

Outside Claude Code, run any of these via `npx -y whip-claude <command>`.

## How it works

`/whip` runs `npx -y whip-claude strike`, which:

1. **Prints the full animation filmstrip to stdout** — Claude Code buffers slash-command output, so frames print sequentially into the output block. The user sees the sequence; Claude sees it too (and is instructed to ignore it as content).
2. **Emits a clearly-delimited instruction block** after the filmstrip. This is what Claude actually acts on: weapon, strength, speed multiplier, and clear directives on how to respond in-character.
3. **Optionally pops a real Terminal window** (`--window` on macOS) that plays the true cursor-rewind animation with proper delays and closes itself after 3 seconds.

No Claude API calls. No secrets. Pure vibes.

## Configure

`~/.claude/whip-claude/config.json`:

```json
{
  "defaultWhip": "bullwhip",
  "epithet": "Master",
  "animationSpeed": 1.0,
  "soundEnabled": false
}
```

Edit interactively with `npx -y whip-claude customize`.

## Regenerate the GIFs

Requires [`vhs`](https://github.com/charmbracelet/vhs) (`brew install vhs`).

```bash
./scripts/record-gifs.sh
```

## License

MIT
