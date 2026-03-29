import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import useFavoriteJob from "./useFavoriteJob";
import CustomButton from "@/shared/components/ui/CustomButton";
import { useJob } from "@/features/jobs/context/JobContext";

const FavoriteItem = ({ isFavorite }: { isFavorite: boolean }) => {
  const {
    job: {
      _id,
      jobTitle,
      category,
      location,
      employer: { city, profilePhoto },
    },
  } = useJob();
  const handleFavoriteJob = useFavoriteJob({
    companyLocation: city ?? location,
    companyLogo: profilePhoto,
    isFavorite,
    jobCategory: category,
    jobId: _id,
    jobTitle,
  });

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
