import * as vscode from 'vscode';
import { ScrollDirection, ScrollDistance } from "./types";

export const moveViewport = (direction: ScrollDirection, distance: ScrollDistance) => {
   vscode.commands.executeCommand('editorScroll', { to: direction, by: 'wrappedLine', value: distance, revealCursor: true });
};

export const moveCursor = (direction: ScrollDirection, distance: ScrollDistance) => {
   vscode.commands.executeCommand('cursorMove', { to: direction, by: 'wrappedLine', value: distance });
};

export const alignViewport = (direction?: ScrollDirection) => {
   if (direction) {
      vscode.commands.executeCommand('cursorMove', { to: direction, by: 'wrappedLine' });
      return;
   }
   vscode.commands.executeCommand('cursorMove', { to: 'up', by: 'wrappedLine' });
   vscode.commands.executeCommand('cursorMove', { to: 'down', by: 'wrappedLine' });
};

// Credits to @bmalehorn for this calcs
export const calculateRanges = (direction: ScrollDirection): { start: number; end: number } => {
   const editor = vscode.window.activeTextEditor!;
   const { visibleRanges } = editor;

   if (direction === "down") {
      const end = Math.min(visibleRanges[visibleRanges.length - 1].end.line, editor.document.lineCount);

      let start = visibleRanges[0].start.line;
      let linesRemaining = end - visibleRanges[visibleRanges.length - 1].end.line;
      let i = 0;

      while (linesRemaining > 0 && i < visibleRanges.length) {
         const range = visibleRanges[i];
         const toBurn = Math.min(range.end.line - start, linesRemaining);
         linesRemaining -= toBurn;
         start += toBurn;
         i++;
         // burn 1 line to reach next visible range
         if (linesRemaining > 0 && i < visibleRanges.length) {
            linesRemaining--;
            start = visibleRanges[i].start.line;
         }
      }
      start += linesRemaining;

      return { start, end };
   } else if (direction === "up") {
      // 1. top <=> bottom
      // 2. 0 ... visibleRanges.length <=> visibleRanges.length ... 0
      // 3. + <=> -
      // 4. start <=> end
      // it's probably possible to use the same code for up & down,
      // but I'd rather have it inlined, out in the open
      const start = Math.max(visibleRanges[0].start.line);

      let end = visibleRanges[visibleRanges.length - 1].end.line;
      let linesRemaining = visibleRanges[0].start.line - start;
      let i = visibleRanges.length - 1;

      while (linesRemaining > 0 && i >= 0) {
         const range = visibleRanges[i];
         const toBurn = Math.min(end - range.start.line, linesRemaining);
         linesRemaining -= toBurn;
         end -= toBurn;
         i--;
         // burn 1 line to reach next visible range
         if (linesRemaining > 0 && i >= 0) {
            linesRemaining--;
            end = visibleRanges[i].end.line;
         }
      }
      end -= linesRemaining;

      return { start, end };
   }

   return { start: 0, end: 0 };
};
