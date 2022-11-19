export type ScrollDirection = "up" | "down";

export type ScrollDistance = number | "halfPage" | "page";

export const SCROLLERS = ["armin", "berthold", "christa"] as const;
export type Scroller = typeof SCROLLERS[number];
