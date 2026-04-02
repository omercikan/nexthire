export const JOB_QUERY_OPTIONS = {
  populatePath: "employer",
  populateFields: "profilePhoto companyName -_id",
  selectFields: "jobTitle jobLocation category workType careerLevel employerId",
} as const;

export const FILTER_JOB_PIPELINE = {
  $lookup: {
    from: "users",
    localField: "employerId",
    foreignField: "_id",
    as: "employer",
  },

  $project: {
    jobTitle: 1,
    location: 1,
    careerLevel: 1,
    category: 1,
    workType: 1,
    createdAt: 1,
    _id: 1,
    employer: {
      companyLogo: 1,
      companyName: 1,
    },
  },
};
