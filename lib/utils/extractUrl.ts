export const exractUrl = (url: string) => {
  const splittedUrl = url.split(".");

  let platformName;
  let customUrl;

  if (url.includes("@")) {
    platformName = url.split("@").at(-1)?.split(".com")[0];
    customUrl = `mailto:${url}`;
  }

  if (url.includes("wa")) {
    customUrl = url;
  }

  if (splittedUrl.length === 2 && splittedUrl[0].includes("https://")) {
    platformName = splittedUrl[0].split("//")[1];
  } else if (splittedUrl.length === 2 && !splittedUrl[0].includes("https://")) {
    platformName = splittedUrl[0];
  } else {
    platformName = splittedUrl[1];
  }

  return { platformName, customUrl };
};

export const mailUrl = (url: string) => url.split("@").at(-1)?.split(".com")[0];
