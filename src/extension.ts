import * as vscode from "vscode";
import { moveViewport, moveCursor, calcVisibleLines } from "./utils";
import { ScrollDirection, ScrollDistance, Scroller, SCROLLERS } from "./types";

let scrollOff = vscode.workspace.getConfiguration("editor").get("cursorSurroundingLines") as number;

const scroll = (scroller: Scroller, direction: ScrollDirection, distance: ScrollDistance) => {
	const editorState = vscode.window.activeTextEditor!;
	const ranges = editorState.visibleRanges; // including potential folds
	const visibleLines = calcVisibleLines(ranges);
	const scrollDistance =
		distance === "halfPage" ? Math.floor(visibleLines / 2) : distance === "page" ? visibleLines : distance;
	const lastLine = editorState.document.lineCount - 1;
	const cursorPos = editorState.selection.active.line;

	switch (true) {
		// Scroll from top boundary
		case ranges[0].start.line === 0 && direction === "down":
			moveViewport(direction, scrollDistance + scrollOff);
			moveCursor(direction, scrollDistance);
			break;
		// Keep cursor moving when top boundary is reached
		case ranges[0].start.line === 0 && direction === "up":
			moveViewport(direction, scrollDistance);
			moveCursor(direction, scrollDistance);
			break;
		// Move cursor to the last line if the scroll distance would exceed the last line
		case direction === "down" && cursorPos + scrollDistance >= lastLine:
			moveCursor(direction, lastLine - cursorPos);
			break;
		// Simulating Neovims behavior, <C-d> / <C-u> favors moving the cursor in sync
		case scroller === "berthold":
			moveViewport(direction, scrollDistance);
			moveCursor(direction, scrollDistance);
			break;
		// While <C-e> / <C-y> & <C-f> / <C-b> favor scrolling the viewport solely until touching the scroll offset
		default:
			moveViewport(direction, scrollDistance, "revealCursor");
			break;
	}

	// Check for fresh state after scrolling is finished
	setTimeout(() => {
		const editorStateNew = vscode.window.activeTextEditor!;
		const rangesNew = editorStateNew.visibleRanges;
		const cursorPos = editorState.selection.active.line;

		const touchesScrollOff =
			(direction === "down" && scrollOff >= cursorPos - rangesNew[0].start.line - 1) ||
			(direction === "up" && scrollOff >= rangesNew[rangesNew.length - 1].end.line - cursorPos);
		if (touchesScrollOff) {
			moveCursor(direction, scrollOff < scrollDistance ? scrollOff : scrollDistance);
		}
	}, 150);
};

const getConfig = (scroller: string) =>
	vscode.workspace.getConfiguration("germanScroll").get(scroller) as ScrollDistance;

export function activate(context: vscode.ExtensionContext) {
	SCROLLERS.forEach((scroller: Scroller) => {
		let config = getConfig(scroller);

		vscode.workspace.onDidChangeConfiguration(async (event) => {
			if (event.affectsConfiguration("germanScroll")) config = getConfig(scroller);
			if (event.affectsConfiguration("editor.cursorSurroundingLines")) {
				scrollOff = vscode.workspace.getConfiguration("editor").get("cursorSurroundingLines") as number;
			}
		});

		context.subscriptions.push(
			vscode.commands.registerCommand(`germanScroll.${scroller}Down`, () => scroll(scroller, "down", config)),
			vscode.commands.registerCommand(`germanScroll.${scroller}Up`, () => scroll(scroller, "up", config))
		);
	});
}

export function deactivate() {}
