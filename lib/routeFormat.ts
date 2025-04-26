export function routeFormatter(text: string): string {
  return text
    .toLocaleLowerCase("tr") //! Convert Turkish to lower case !//
    .normalize("NFD") //! Split Unicode characters !//
    .replace(/[\u0300-\u036f]/g, "") //! Clear accented characters !//
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/\s+/g, "-") //! Make spaces dashes !//
    .replace(/[^\w-]+/g, "") //! Clear non-alphanumeric and non-tier characters !//
    .replace(/--+/g, "-") //! Reduce multiple dashes to single !//
    .replace(/^-+|-+$/g, ""); //! Remove leading and trailing hyphens !//
}
