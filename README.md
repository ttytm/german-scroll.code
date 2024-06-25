# ️german-scroll\*

<div align="center" style="margin-bottom: 2em;">
   <img src="assets/german-scroll-logo.png" width="200" style="margin-bottom: 1em;"/>

> Scrolling that behaves.

</div>

**This plugins offers Vim-like scroll commands whilst fixing some of the current keyboard scrolling bummers:**

- Preserves folds
- Won't get stuck at folds
- Respects scrollOff
- Keeps the cursor moving when the document boundary is reached

_Basically, it aims to make scrolling behave just like it's expected from it._

## ⌨️ How To Use

You get three scrolling motions.

| **Scroller** | **Default Keymaps**        |
| ------------ | -------------------------- |
| Armin        | ️️⬆ <kbd>Ctrl+Down</kbd>️     |
|              | ⬇ <kbd>Ctrl+Up</kbd>       |
| Berthold     | ⬆ <kbd>Ctrl+PageUp</kbd>   |
|              | ⬇ <kbd>Ctrl+PageDown</kbd> |
| Christa      | ⬆ <kbd>PageUp</kbd>        |
|              | ⬇ <kbd>PageDown</kbd>      |

## Preview

Links to a quick and dirty video example using german-scroll in VSCodium in combination with VSCodeVim.

<div align="center" style="margin-bottom: 2em;">
   <a href="https://github.com/tobealive/german-scroll.code/discussions/3" target="_blank">
      <img src="https://github.com/ttytm/german-scroll.code/assets/34311583/208f2163-daca-49f8-9883-3c98d3526f3f" width="800"/>
   </a>
</div>

### ⚙️ Settings

Configure the scrolling distance in your settings.json.<br>
Possible values are `<number> | "halfPage" | "page"`.<br>
_Default settings:_

```json
"germanScroll.armin": 5
"germanScroll.berthold": "halfPage"
"germanScroll.christa": "page"
```

### 🍝 Copypasta for a VSCodeVim config

```json
{
   "command": "germanScroll.arminUp",
   "key": "ctrl+y",
   "mac": "cmd+y",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.arminDown",
   "key": "ctrl+e",
   "mac": "cmd+e",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.bertholdUp",
   "key": "ctrl+u",
   "mac": "cmd+u",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.bertholdDown",
   "key": "ctrl+d",
   "mac": "cmd+d",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.christaUp",
   "key": "ctrl+b",
   "mac": "cmd+b",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.christaDown",
   "key": "ctrl+f",
   "mac": "cmd+f",
   "when": "vim.active && editorTextFocus && vim.mode != 'Insert'"
},
```

## 🗒️ Additional Info:

After using this extension for a while and being happy with its behavior, it should make its way into the public domain.
Since it's still pretty fresh out of the oven and not many eyes have been on it yet, there may be scenarios where the scrolling behaves unexpectedly.

If you notice any of these issues, feel free to open an issue or submit a PR.

And of course showing some love and leaving a star on the repo or rating the extension always helps ❤️.

_\*Especially in today's times it's hard to always be politically correct. Additionally the high interconnectedness of people with different cultural backgrounds makes it impossible to prevent misunderstandings sometimes. Therefore I want to add the info that the plugins name and theme is taking the mickey out of our(being from germany myself) german correctness and not a nationalistic discrimination of others._

### Known Issues:

Nothing that would break something but some small things could be observed:

- Scrolling inconsistencies may occur:
  - During fast scrolling (e.g., pressing and holding the key) with the "smooth scrolling" setting enabled.
  - During scrolling actions between folded sections.
- Selection becomes invisible when scrolling in VisualMode beyond the currently visible range (it reappears when moving the cursor after scrolling).
- There should probably be additional settings that allow the user to disable behaviors such as continuing cursor movement when the document boundary is reached.

### Credits & Sources of Inspiration

- [Scroll Viewport](https://github.com/bmalehorn/vscode-scroll-viewport)
- [Neoscroll](https://github.com/karb94/neoscroll.nvim)
