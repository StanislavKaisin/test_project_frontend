export function cutDescription(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).concat("...");
}
