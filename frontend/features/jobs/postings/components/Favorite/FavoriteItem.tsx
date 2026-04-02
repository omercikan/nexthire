import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import useFavoriteJob from "./useFavoriteJob";
import CustomButton from "@/shared/components/ui/CustomButton";
import { useJob } from "@/features/jobs/context/JobContext";

const FavoriteItem = ({ isFavorite }: { isFavorite: boolean }) => {
  const {
    job: { _id, jobTitle, category, jobLocation, employer },
  } = useJob();
  const handleFavoriteJob = useFavoriteJob({
    jobLocation: jobLocation ?? "",
    companyLogo: employer?.profilePhoto ?? "",
    isFavorite,
    jobCategory: category ?? "",
    jobId: _id ?? "",
    jobTitle: jobTitle ?? "",
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
