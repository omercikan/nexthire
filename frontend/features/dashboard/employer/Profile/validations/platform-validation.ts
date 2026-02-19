import toast from "react-hot-toast";

type Platforms = { id: number; platform: string; url: string }[];

export const platformValidator = (platforms: Platforms) => {
  const allPlatforms = platforms.map(({ platform }) => platform);
  const uniquePlatforms = new Set(allPlatforms);
  const isAnyEmpty = platforms.some(({ url }) => url === "");

  if (uniquePlatforms.size !== allPlatforms.length) {
    return toast.error("Aynı platformdan birden fazla eklenemez", {
      id: "EmployerProfileSocialPlatform",
    });
  }

  if (isAnyEmpty) return;

  const socialPlatforms = platforms.map(({ platform, url }) => ({
    platform,
    url,
  }));

  return socialPlatforms;
};
