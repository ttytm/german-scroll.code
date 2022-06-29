# german-scroll

<div align="center" style="margin-bottom: 2em;">
     <img src="assets/german-scroll-logo.png" width="200" style="margin-bottom: 1em;"/>

> Scrolling that behaves.

</div>

This plugins offers Vim-like scroll commands whilst aiming to fix some of the current keyboard scrolling bummers:

-  Preserve folds
-  Don't get stuck at folds
-  Respect scrollOff
-  Keep the cursor moving when the document boundary is reached

## How To Use

You get three scrolling motions.

| **Scroller** | **Default Keymaps**        |
| ------------ | -------------------------- |
| Armin        | ️️⬆ <kbd>Ctrl+Down</kbd>️  |
|              | ⬇ <kbd>Ctrl+Up</kbd>       |
| Berthold     | ⬆ <kbd>Ctrl+PageUp</kbd>   |
|              | ⬇ <kbd>Ctrl+PageDown</kbd> |
| Christa      | ⬆ <kbd>PageUp</kbd>        |
|              | ⬇ <kbd>PageDown</kbd>      |

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

## Additional Info:

Since it's fresh out of the oven and not many eyes have been on it yet, there may be scenarios where the scrolling behaves unexpectedly. If you experience any of these, please feel free to open an issue or submit a PR.

If you feel like tinkering with it yourself, the repo holds a `dev` branch containing a bunch of console logs that may be useful for debugging.

Also, showing some love and leaving a star on the repo or rating the extension always helps ❤️.

### Known Issues:

-  Having vscode's smooth scrolling setting enabled and executing a persistent scroll with the key held down can result in minor inconsistencies during that scrolling process. The reason is that it's not possible to properly implement an async await functionality for many of the commands that are accessible via vscode's API.
-  When the cursor is placed between folded sections and a scroll command with a number value is used there are potential scrolling inconsistencies.
-  Selection becomes invisible when scrolling out of the current visible range (the selection reappears when moving the cursor after scrolling).
-  There probably should be additional settings that allow users to disable behaviors like the continuation of cursor movement when the document boundary is reached.

### Credits & Sources of Inspiration

-  [Scroll Viewport](https://github.com/bmalehorn/vscode-scroll-viewport)
-  [Neoscroll](https://github.com/karb94/neoscroll.nvim)
