/**
 * Lets lines break after a slash between words ("ERP/TMS/WMS"), as the design's text
 * engine does; browsers keep slash-joined words together and wrap a line earlier.
 * The break is a zero-width space, so nothing changes visually or for screen readers.
 */
export function breakAfterSlashes(text: string): string {
  return text.replace(/(?<=\w)\/(?=\w)/g, "/\u200B");
}
