import { FavoriteJob } from "../../../shared/models/FavoriteJob";
import { JobService } from "../job.service";
import { FavoriteRequests } from "../types";

export class FavoriteJobHelpers {
  async controlJob(data: FavoriteRequests, ids: string[]) {
    if (!ids.includes(data.jobId)) {
      const favoriteJob = new FavoriteJob(data);
      await favoriteJob.save();
      return { response: favoriteJob, status: 201 };
    } else {
      return {
        response: { message: "This job is already in favorites." },
        status: 400,
      };
    }
  }
}
