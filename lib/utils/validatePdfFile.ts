const validatePdfFile = async (file: File) => {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc =
      window.location.origin + "/pdf.worker.min.mjs";
    const arrayBuffer = await file.arrayBuffer();
    await pdfjs.getDocument({ data: arrayBuffer }).promise;
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export default validatePdfFile;
