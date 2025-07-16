type AppendData = { name: string; value: string | Blob };

/**
 * Creates and returns a `FormData` instance from an array of
 * `{ name, value }` pairs.
 *
 * @param {AppendData[]} appendData – Array of objects where
 *        `name` is a string and `value` is either a string or a Blob/File.
 * @returns {FormData} The populated FormData object.
 */

const appendFormData = (appendData: AppendData[]): FormData => {
  const formData = new FormData();
  appendData.forEach(({ name, value }) => formData.append(name, value));
  return formData;
};

export default appendFormData;
