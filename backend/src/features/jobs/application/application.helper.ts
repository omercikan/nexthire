export const replaceFileName = (
  fileName: string,
  defaultName: string,
  replacedName: string,
): string => {
  return fileName.replace(defaultName, replacedName);
};
