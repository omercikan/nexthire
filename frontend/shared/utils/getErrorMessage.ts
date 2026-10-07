import { HttpStatusCode } from "axios";
import { Result } from "../types/api/apiResponse";

export const getErrorMessage = <T>(err: unknown): string => {
  const error = err as {
    status: HttpStatusCode;
    data: Result<T>;
  };

  if (error === null || error === undefined) {
    return "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
  }

  if (typeof error.data !== "object" || error.data === null) {
    return "İşleminiz şu anda gerçekleştirilemiyor. Lütfen daha sonra tekrar deneyiniz.";
  }

  if ("message" in error.data && error.data.message) {
    return error.data.message;
  }

  return "Sunucu kaynaklı bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.";
};
