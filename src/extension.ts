import * as vscode from 'vscode';
import { moveViewport, moveCursor, alignViewport, calculateRanges } from "./utils";
import { ScrollDirection, ScrollDistance, Scroller, SCROLLERS } from "./types";

let scrollOff = vscode.workspace.getConfiguration('editor').get('cursorSurroundingLines') as number;

const scroll = (direction: ScrollDirection, distance: ScrollDistance) => {
   const editor = vscode.window.activeTextEditor!;
   if (!editor) return;

   const { visibleRanges } = editor,
      ranges = calculateRanges(direction),
      rangeValue = ranges.end - ranges.start,

      cursorPosition = editor.selection.active.line,
      firstSegmentDistanceStart = cursorPosition - ranges.start,
      firstSegmentDistanceEnd = visibleRanges[0].end.line - cursorPosition,
      lastSegmentDistanceStart = cursorPosition - visibleRanges[visibleRanges.length - 1].start.line,
      lastSegmentDistanceEnd = ranges.end - cursorPosition,

      hasNumberDistance = distance !== 'halfPage' && distance !== 'page',
      hasFolds = firstSegmentDistanceStart < 0 || firstSegmentDistanceEnd < 0 || (firstSegmentDistanceEnd <= scrollOff && ranges.end !== visibleRanges[0].end.line),
      hasScrollOffContact = (hasNumberDistance && (direction === 'down' && scrollOff >= firstSegmentDistanceStart))
         || (hasNumberDistance && (direction === 'up' && scrollOff + 1 >= lastSegmentDistanceEnd));

   let distanceValue = distance === 'halfPage' ? Math.floor(rangeValue / 2) : distance === 'page' ? rangeValue : distance;

   // Fix cursor moves to end of line when scrolling beyond last line
   if (hasNumberDistance && direction === 'down' && rangeValue <= scrollOff + distance) {
      moveViewport(direction, rangeValue - scrollOff);
      moveCursor(direction, rangeValue - scrollOff);
      // vscode.commands.executeCommand('cursorMove', { to: 'viewPortBottom', by: 'wrappedLine' });
   }
   // Keep cursor moving when top boundary is reached
   else if (visibleRanges[0].start.line === 0 && direction === 'up') {
      moveViewport(direction, distanceValue);
      moveCursor(direction, distanceValue);
   }
   // Scroll from top boundary 
   else if (hasNumberDistance && visibleRanges[0].start.line === 0 && direction === 'down') {
      moveViewport(direction, distance + scrollOff);
      alignViewport('up');
   }
   // Scroll when lines to top boundary remain
   else if (visibleRanges[0].start.line > 0 && visibleRanges[0].start.line <= scrollOff && direction === 'up') {
      moveViewport(direction, ranges.start);
      moveCursor(direction, ranges.start);
   }
   // Scroll when visibleRange is mutated through folds
   else if (hasNumberDistance && (hasFolds)) {
      const hasFoldBelow = lastSegmentDistanceStart <= scrollOff,
         hasFoldAbove = firstSegmentDistanceEnd <= scrollOff;

      distanceValue = direction === 'down' && hasFoldBelow
         ? distance + scrollOff + 1
         : direction === 'up' && hasFoldAbove
            ? distance + scrollOff + 1
            : distance;

      moveViewport(direction, distanceValue);
      alignViewport();
   }
   // Scroll when cursor is touching scrollOff
   else if (hasScrollOffContact) {
      moveViewport(direction, distance);
      moveCursor(direction, distance < scrollOff ? distance : scrollOff);
   }
   // Scroll when using string distance values
   else if (!hasNumberDistance) {
      vscode.commands.executeCommand('editorScroll', { to: direction, by: distance, revealCursor: true });
      alignViewport();
   }
   // Scroll default
   else {
      moveViewport(direction, distance);
   }
};

const getConfig = (scroller: string) => vscode.workspace.getConfiguration("germanScroll").get(scroller) as ScrollDistance;

export function activate(context: vscode.ExtensionContext) {
   SCROLLERS.forEach((scroller: Scroller) => {
      let config = getConfig(scroller);

      vscode.workspace.onDidChangeConfiguration(async event => {
         if (event.affectsConfiguration("germanScroll")) config = getConfig(scroller);
         if (event.affectsConfiguration("editor.cursorSurroundingLines")) scrollOff = vscode.workspace.getConfiguration('editor').get('cursorSurroundingLines') as number;
      });

      context.subscriptions.push(
         vscode.commands.registerCommand(`germanScroll.${scroller}Down`, () => scroll("down", config)),
         vscode.commands.registerCommand(`germanScroll.${scroller}Up`, () => scroll("up", config)),
      );
   });
}

export function deactivate() { }