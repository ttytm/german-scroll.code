import * as vscode from "vscode";
import { ScrollDirection, ScrollDistance } from "./types";

const calcVisibleLines = (ranges: readonly vscode.Range[]): number => {
	if (ranges.length <= 1) return ranges[ranges.length - 1].end.line - ranges[0].start.line;

	const visibleLines = ranges.reduce((acc, range) => {
		return acc + range.end.line - range.start.line + 1;
	}, 0);

	return visibleLines - 1;
};

const moveViewport = (direction: ScrollDirection, distance: ScrollDistance, revealCursor?: "revealCursor") => {
	vscode.commands.executeCommand("editorScroll", {
		to: direction,
		by: "wrappedLine",
		value: distance,
		// `revealCursor` stabilizes armin around folds when touching scrolloff.
		// Though, brings especially christa out of sync .
		//
		// Sizes of folded sections, smooth scrolling, configured scrollDistance, play into this.
		// The perfect recipy is yet to be made.
		revealCursor: revealCursor ? true : false,
	});
};

const moveCursor = (direction: ScrollDirection, distance: ScrollDistance) => {
	vscode.commands.executeCommand("cursorMove", {
		to: direction,
		by: "wrappedLine",
		value: distance,
	});
};

const alignViewport = (direction?: ScrollDirection) => {
	if (direction) {
		vscode.commands.executeCommand("cursorMove", { to: direction, by: "wrappedLine" });
		return;
	}
	vscode.commands.executeCommand("cursorMove", { to: "up", by: "wrappedLine" });
	vscode.commands.executeCommand("cursorMove", { to: "down", by: "wrappedLine" });
};

export { calcVisibleLines, moveViewport, moveCursor, alignViewport };
