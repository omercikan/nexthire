export const fixFileName = (name: string): string => {
  return Buffer.from(name, "latin1").toString("utf8");
};
