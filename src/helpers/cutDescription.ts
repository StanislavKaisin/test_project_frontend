export function cutDescription(text: string, length: number): string {
  if (typeof text !== "string" || typeof length !== "number") return "";
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length).concat("...");
}
