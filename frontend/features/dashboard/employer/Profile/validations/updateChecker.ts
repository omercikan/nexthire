import { Employer } from "@/shared/types/models/employer";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";

type hasUpdatesData = {
  [k: string]:
    | string
    | never[]
    | {
        platform: string;
        url: string;
      }[];
};

export const hasUpdates = (
  data: hasUpdatesData,
  imageFile: File | undefined,
  user: Employer,
): boolean => {
  if (imageFile) return true;

  return Object.keys(data).some((item) => {
    const key = item as keyof typeof user;

    if (key !== "socialPlatforms") {
      const oldValue = user[key];
      const newValue = data[key];

      if (!isEqual(oldValue, newValue)) return true;
    }

    if (key === "socialPlatforms") {
      const dbSocialPlatforms = user[key].map((platform) =>
        omit(platform, ["_id"]),
      );
      const updatedSocialPlatforms = data[key];

      if (!isEqual(dbSocialPlatforms, updatedSocialPlatforms)) return true;
    }
  });
};
