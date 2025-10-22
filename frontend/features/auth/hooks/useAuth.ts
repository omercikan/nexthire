import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useAuth = () => {
  const router = useRouter();

  const manageAuthApi = useCallback(
    async <T>(
      apiFn: () => Promise<T>,
      reset: () => void,
      cases: { case: string; message: string },
      isRedirect: boolean = true,
      redirectRoute: string = "/"
    ) => {
      try {
        const res = await apiFn();

        if (res && isRedirect) {
          router.replace(redirectRoute);
          reset();
        }

        return res;
      } catch (err) {
        const error = err as { data: { message: string } } & { data: string };

        switch (error?.data?.message) {
          case cases.case:
            toast.error(cases.message, {
              id: "authToast",
            });
            break;
          default:
            toast.error(error.data || "Beklenmedik hata, tekrar deneyin", {
              id: "authToast",
            });
        }
      }
    },
    [router]
  );

  return { manageAuthApi };
};

export default useAuth;
