# opencode-tab-reorder

An [OpenCode](https://opencode.ai) TUI plugin that lets you reorder session tabs from the keyboard.

OpenCode has no built-in way to move a tab left or right. This plugin adds two commands, "Move tab left" and "Move tab right", and keeps you in a short-lived move mode so you can nudge a tab several places without pressing the leader key each time.

- Moves the active tab one position per keypress. At either end it stays put.
- Move mode ends with `Esc` or `Enter`.
- Uses the TUI plugin API's `ui.tabs.move`, so it only works when session tabs are enabled.

## Install

Clone into OpenCode's global plugin directory. OpenCode discovers it automatically.

```sh
git clone https://github.com/kabeero/opencode-tab-reorder ~/.config/opencode/plugins/tab-reorder
```

If you set `$XDG_CONFIG_HOME`, use `$XDG_CONFIG_HOME/opencode/plugins/tab-reorder` instead.

Then run `/reload` in OpenCode, or restart it. Confirm it loaded with `opencode plugin list`.

To update, `git pull` inside that folder and `/reload`. To remove, delete the folder.

## Usage

Press your leader key, then `<` or `>`. The active tab moves one place and OpenCode shows a toast: "Move tab: < > to move, esc or enter to finish".

While move mode is on, the leader key is not needed:

| Key | Action |
| --- | --- |
| `<`, `,`, `h`, `Left` | Move the tab left |
| `>`, `.`, `l`, `Right` | Move the tab right |
| `Esc`, `Enter` | Finish |

You can also run "Move tab left" or "Move tab right" from the command palette (`Ctrl+P`). Either one starts move mode.

Move mode replaces the normal prompt keybinds until you leave it, so other keys do not reach the prompt. Press `Esc` or `Enter` to get back. It lasts only while the TUI is running.

## Configure

The leader binds are:

| Command ID | Bind |
| --- | --- |
| `local.tabs.move.left` | `<leader>shift+comma,<leader><` |
| `local.tabs.move.right` | `<leader>shift+period,<leader>>` |

OpenCode keybinds spell Shift out (`shift+comma`) rather than using the shifted character. Both spellings are bound because a literal `<` or `>` after `<leader>` may not parse on every setup. If one form is invalid, the other still works.

To change a key, edit the `bind` strings in `tui.ts`. The keys used inside move mode and the exit keys are in the second `keymap.layer` call.

## Requirements

- OpenCode V2 (TUI plugin API, `@opencode/plugin/tui`). Developed and tested on macOS with OpenCode v2.2.7.
- Session tabs enabled (`tabs.mode` is `auto` or `on` in `cli.json`).

## License

[MIT](LICENSE)
