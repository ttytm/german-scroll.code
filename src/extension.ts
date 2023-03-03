import * as vscode from "vscode";
import { moveViewport, moveCursor, alignViewport, calcVisibleLines } from "./utils";
import { ScrollDirection, ScrollDistance, Scroller, SCROLLERS } from "./types";

let scrollOff = vscode.workspace.getConfiguration("editor").get("cursorSurroundingLines") as number;

const scroll = (scroller: Scroller, direction: ScrollDirection, distance: ScrollDistance) => {
	const editor = vscode.window.activeTextEditor!;
	const ranges = editor.visibleRanges; // including potential folds
	const visibleLines = calcVisibleLines(ranges);
	let scrollDistance = distance === "halfPage" ? visibleLines / 2 : distance === "page" ? visibleLines : distance;

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
		// Simulating Neovims behavior, ctrl+e / ctrl+y favors scrolling the viewport solely, instead of moving the cursor simultaneously
		case scroller === "armin":
			moveViewport(direction, scrollDistance, "revealCursor");
			const cursorPosition = editor.selection.active.line;
			const hasScrollOffContact =
				(direction === "down" && scrollOff >= cursorPosition - ranges[0].start.line - 1) ||
				(direction === "up" && scrollOff >= ranges[ranges.length - 1].end.line - cursorPosition);
			const hasFoldAbove = ranges[0].end.line - cursorPosition <= scrollOff,
				hasFoldBelow = cursorPosition - ranges[ranges.length - 1].start.line <= scrollOff;
			if (hasScrollOffContact) {
				moveCursor(direction, scrollOff < scrollDistance ? scrollOff : scrollDistance);
				return;
			}
			if ((direction === "down" && hasFoldBelow) || (direction === "up" && hasFoldAbove)) {
				return;
			}
			alignViewport();
			break;
		default:
			moveViewport(direction, scrollDistance);
			moveCursor(direction, scrollDistance);
			break;
	}
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
