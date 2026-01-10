import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FavoriteItemProps } from "./favorite.types";
import useFavoriteJob from "./useFavoriteJob";
import CustomButton from "@/shared/components/ui/CustomButton";

const FavoriteItem = (props: FavoriteItemProps) => {
  const handleFavoriteJob = useFavoriteJob(props);
  const isFavorite = props.isFavorite;

  return (
    <CustomButton
      className="favorite-icon-wrapper"
      handleClick={handleFavoriteJob}
      aria-label={isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle"}
    >
      {isFavorite ? (
        <GoBookmarkFill
          className="favorite-icon"
          data-testid="GoBookmarkFill"
        />
      ) : (
        <GoBookmark className="favorite-icon" data-testid="GoBookmark" />
      )}
    </CustomButton>
  );
};

export default FavoriteItem;
