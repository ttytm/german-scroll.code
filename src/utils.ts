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
		// Using `revealCursor` only if specified, since combining `moveViewport` with `moveCursor` will distort the scrolling result.
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

export { calcVisibleLines, moveViewport, moveCursor };
