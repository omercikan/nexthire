import { Request, Response, NextFunction } from "express";
import { User } from "../../../../shared/models/User";
import { v2 as cloud } from "cloudinary";
import config from "../../../../config";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

export class CandidateProfile {
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    const photo = req.file;
    const { _id, oldProfilePhotoId } = req.body;

    try {
      if (oldProfilePhotoId) {
        await cloud.uploader.destroy(oldProfilePhotoId);
      }

      const updateFields = Object.fromEntries(
        Object.entries({
          ...req.body,
          profilePhoto: photo?.path,
          profilePhotoId: photo?.filename,
        }).filter(
          ([k, v]) =>
            v && v !== "undefined" && v !== "Invalid Date" && k !== "_id"
        )
      );

      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
      }).select(["-password", "-_id", "-role"]);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
