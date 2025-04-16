export function FormatText(text: string) {
  return `${text.charAt(0).toLocaleUpperCase("tr")}${text
    .slice(1, text.length)
    .toLocaleLowerCase("tr")}`;
}
