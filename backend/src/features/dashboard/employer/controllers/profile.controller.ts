import { Request, Response, NextFunction } from "express";
import { v2 as cloud } from "cloudinary";
import config from "../../../../config";
import { publisher } from "../../../../queues/publisher";
import { EmployerProfileService } from "../services/employer-profile.service";
import { employerProfileSchema } from "../validations/update-profile.validation";
import z from "zod";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

const { UpdateUser } = new EmployerProfileService();

export class Profile {
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    const photo = req.file;
    const userId = req.user?.id;
    const body = req.body;

    console.log(body);

    try {
      employerProfileSchema.parse(body);

      const user = await UpdateUser(body, userId as string);

      if (photo && body.profilePhotoId) {
        await publisher("deletePhoto", {
          userID: userId,
          oldPhotoID: body.profilePhotoId,
          newPhotoID: photo?.filename,
          profilePhoto: photo?.path,
        });
      }

      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json(
          error.issues.map(({ message, path }) => {
            return { message, path: path[0] };
          }),
        );
      }

      next(error);
    }
  }
}
