import { User } from "../../../../shared/models/User";
import { EmployerProfileType } from "../validations/update-profile.validation";

export class EmployerProfileService {
  async UpdateUser(data: EmployerProfileType, userId: string) {
    const payloads = Object.fromEntries(
      Object.entries({ ...data }).filter(
        ([k, v]) =>
          Boolean(v) &&
          k !== "socialPlatforms" &&
          k !== "categories" &&
          k !== "profilePhotoId" &&
          k !== "email",
      ),
    );

    const updatedPayloads = { ...payloads };

    if (data.socialPlatforms) {
      updatedPayloads["socialPlatforms"] =
        typeof data.socialPlatforms === "string"
          ? JSON.parse(data.socialPlatforms)
          : data.socialPlatforms;
    }

    if (data.categories) {
      updatedPayloads["categories"] =
        typeof data.categories === "string"
          ? JSON.parse(data.categories)
          : data.categories;
    }

    const user = await User.updateOne({ _id: userId }, updatedPayloads);

    return user;
  }
}
