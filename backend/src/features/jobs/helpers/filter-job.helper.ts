import { BodyFields, PerPage, RegexFilter } from "../types";

export class FilterJobHelpers {
  getPagination(perPage: PerPage, page: number) {
    const limit = perPage === "all" ? 0 : Number(perPage);
    const skip = limit > 0 ? limit * (Number(page) - 1) : 0;

    return { limit, skip };
  }

  createFilters(fields: BodyFields) {
    const filters: RegexFilter = { $text: { $search: "" } };
    const textTerms: string[] = [];

    for (const [k, v] of Object.entries(fields)) {
      if (typeof v === "string" && v.trim()) {
        if (["jobTitle", "location", "category"].includes(k)) {
          textTerms.push(v.trim());
        } else if (["workType", "careerLevel", "experience"].includes(k)) {
          filters[k] = { $regex: `^${v.trim()}$`, $options: "i" };
        }
      }
    }

    if (textTerms.length) {
      filters.$text = { $search: textTerms.join(" ") };
    } else {
      delete filters.$text;
    }

    return filters;
  }

  getShort(sort: number, filters: RegexFilter) {
    return filters.$text
      ? { score: { $meta: "textScore" } }
      : { createdAt: sort };
  }
}
