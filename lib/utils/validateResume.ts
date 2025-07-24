import validatePdfFile from "./validatePdfFile";

/**
 * Validates a resume file before uploading.
 *
 * Checks include:
 * - File type must be PDF
 * - File must not be corrupted or invalid
 * - File name must not already exist in uploaded files
 * - File size must be under 3MB
 *
 * @param {File} file - The file to be validated.
 * @param {string[]} uploadedFileNames - List of previously uploaded file names.
 * @returns {Promise<string | null>} - Returns an error message if invalid, otherwise null.
 */

export const validateResume = async (
  file: File,
  uploadedFileNames: string[]
): Promise<string | null> => {
  const { size, type, name } = file;

  if (type !== "application/pdf") {
    return "Yalnızca PDF formatı yükleyebilirsiniz";
  }

  const isValidFile = await validatePdfFile(file);
  if (!isValidFile) {
    return "PDF dosyası geçersiz ya da bozuk lütfen başka bir dosya yükleyin";
  }

  if (uploadedFileNames.includes(name)) {
    return "Bu dosyayı zaten yüklediniz";
  }

  if (size >= 3 * 1024 * 1024) {
    return "En fazla 3 MB boyutunda dosya yükleyebilirsiniz";
  }

  return null;
};
