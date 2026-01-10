import { ApiError } from "@/shared/types/error.types";
import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { useHandleFavoriteMutation } from "./favoritesApi";
import { AuthContext } from "@/features/auth/authContext";
import { FavoriteItemProps } from "./favorite.types";
import { FAVORITE_ERRORS } from "./error-messages";

const useFavoriteJob = (props: FavoriteItemProps) => {
  const [handleFavorite] = useHandleFavoriteMutation();
  const { user } = useContext(AuthContext);

  const handleFavoriteJob = useCallback(async () => {
    try {
      await handleFavorite({
        ...props,
        userId: user?._id,
      }).unwrap();
    } catch (err) {
      const error = err as ApiError;
      const message =
        FAVORITE_ERRORS[error.status] ?? FAVORITE_ERRORS.defaultMessage;

      toast.error(message, {
        id:
          error.status === 401
            ? "favoriteUnauthorizedToast"
            : "favoriteDefaultToast",
        duration: 2500,
      });
    }
  }, [handleFavorite, props, user?._id]);

  return handleFavoriteJob;
};

export default useFavoriteJob;
