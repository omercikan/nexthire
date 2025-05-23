//! Route format func !//
export function routeFormatter(text: string): string {
  const slashPlaceholder = "_";

  return text
    .toLocaleLowerCase("tr")
    .replace(/\//g, slashPlaceholder)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(new RegExp(slashPlaceholder, "g"), slashPlaceholder)
    .replace(/^-+|-+$/g, "");
}

//! Route parser func !//
export function routeParser(routeParam: string): string {
  const slashPlaceholder = "_";

  const textWithSlash = routeParam.replace(
    new RegExp(slashPlaceholder, "g"),
    "/"
  );

  const textWithSpaces = textWithSlash.replace(/-/g, " ");

  const words = textWithSpaces.split(" ").map((word) => {
    if (word.length === 0) return word;
    if (word === "/") return "/";
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return words.join(" ").replace(/ \/ /g, "/");
}

//! Normalize to Turkish format !//
export const normalize = (str: string) =>
  str
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
