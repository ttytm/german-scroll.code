# german-scroll

<div align="center">
     <img src="assets/german-scroll-logo.png" width="200" />

> Scrolling that behaves.

</div>
This plugins offers Vim-like scroll commands whilst aiming to fix some of the current keyboard scrolling bummers:

-  Preserve folds
-  Don't get stuck at folds
-  Respect scrollOff
-  Keep cursor moving when document boundary is reached

## How To Use

You get three scrolling motions.

| **Scroller** | **Default Keymaps**       |
| ------------ | ------------------------- |
| Armin        | ️️⬆<kbd>Ctrl+Down</kbd>️  |
|              | ⬇<kbd>Ctrl+Up</kbd>       |
| Berthold     | ⬆<kbd>Ctrl+PageUp</kbd>   |
|              | ⬇<kbd>Ctrl+PageDown</kbd> |
| Christa      | ⬆<kbd>PageUp</kbd>        |
|              | ⬇<kbd>PageDown</kbd>      |

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
   "when": "editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.arminDown",
   "key": "ctrl+e",
   "mac": "cmd+e",
   "when": "editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.bertholdUp",
   "key": "ctrl+u",
   "mac": "cmd+u",
   "when": "editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.bertholdDown",
   "key": "ctrl+d",
   "mac": "cmd+d",
   "when": "editorTextFocus && vim.mode != 'Insert'"
},
{
   "command": "germanScroll.christaUp",
   "key": "ctrl+b",
   "mac": "cmd+b",
   "when": "editorTextFocus && vim.mode != 'Insert'"
}
{
   "command": "germanScroll.christaDown",
   "key": "ctrl+f",
   "mac": "cmd+f",
   "when": "editorTextFocus && vim.mode != 'Insert'"
},
```

## Additional Info:

TODO: Coming fresh out the oven not having had many eyes on it using custom scroll values may behave unexpected
Leave a start open an issue submit a PR

The repo holds is a `dev` branch containing a bunch of console logs that may be useful for debugging.<br>
If you experience a problem and want to give it a shot you can check it out.

### Known issues:

-  Having vscode's smooth scrolling setting enabled and scrolling with key held down can result in minor inconsistencies during that scrolling process. The reason is that it's not possible to properly implement an async await functionality for many of the commands that are accessible via vscode's api.
-  When the cursor is placed between folded sections and a scroll command with a number value is used there are potential scrolling inconsistencies.
-  Selection become invisible when scrolling out of current visible range (the selection reappears when moving the cursor after scrolling).
-  There probably should be additional settings that allow users to disable behaviors like continuation of cursor movement when the document boundary is reached.

### Credits & Sources that served as inspiration

-  Viewport scroll
