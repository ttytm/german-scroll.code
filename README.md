# ️german-scroll\*

<div align="center" style="margin-bottom: 2em;">
   <img src="assets/german-scroll-logo.png" width="200" style="margin-bottom: 1em;"/>

> Scrolling that behaves.

</div>

**This plugins offers Vim-like scroll commands whilst fixing some of the current keyboard scrolling bummers:**

-  Preserves folds
-  Won't get stuck at folds
-  Respects scrollOff
-  Keeps the cursor moving when the document boundary is reached

_Basically, it aims to make scrolling behave just like it's expected from it._

## ⌨️ How To Use

You get three scrolling motions.

| **Scroller** | **Default Keymaps**        |
| ------------ | -------------------------- |
| Armin        | ️️⬆ <kbd>Ctrl+Down</kbd>️  |
|              | ⬇ <kbd>Ctrl+Up</kbd>       |
| Berthold     | ⬆ <kbd>Ctrl+PageUp</kbd>   |
|              | ⬇ <kbd>Ctrl+PageDown</kbd> |
| Christa      | ⬆ <kbd>PageUp</kbd>        |
|              | ⬇ <kbd>PageDown</kbd>      |

## Preview

Link to a quick and dirty video example using german-scroll with with VSCodeVim.

<div align="center" style="margin-bottom: 2em;">
   <a href="https://youtu.be/jkEXTHASJGw" target="_blank">
      <img src="https://github.com/tobealive/storage/blob/main/assets/german-scroll-preview.gif?raw=true" width="800"/>
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

Using this extension for quiet while and being satisfied with it's behavior it should make it's way to the public.
Since it's still pretty fresh out of the oven and not many eyes have been on it yet, there may be scenarios where the scrolling behaves unexpectedly.
If you experience any of these, please feel free to open an issue or submit a PR.

If you feel like tinkering with it yourself, the repo holds a `dev` branch containing a bunch of console logs that may be useful to analyze scrolling.

And of course showing some love and leaving a star on the repo or rating the extension always helps ❤️.

_\*Especially in today's times it's hard to always be politically correct. Additionally the high interconnectedness of people with different cultural backgrounds makes it impossible to prevent misunderstandings sometimes. Therefore I want to add the info that the plugins name and theme is taking the mickey out of our(being from germany myself) german correctness and not a nationalistic discrimination of others._

### Known Issues:

Nothing that would break something but some small things could be observed:

-  When vscode's smooth scrolling setting is enabled and executing a persistent scroll (with the key held down) it can result in minor inconsistencies during that scrolling process. The reason is that it's not possible to properly implement an async await functionality for many of the commands that are accessible via vscode's API.
-  When the cursor is placed between folded sections and a scroll command with a number value is used there might happen a occasional scrolling inconsistency.
-  Scrolling in VisualMode beyond of the current visible range a selection becomes invisible (the selection reappears when moving the cursor after scrolling).
-  There probably should be additional settings that allow a user to disable behaviors like the continuation of cursor movement when the document boundary is reached.

### Credits & Sources of Inspiration

-  [Scroll Viewport](https://github.com/bmalehorn/vscode-scroll-viewport)
-  [Neoscroll](https://github.com/karb94/neoscroll.nvim)
