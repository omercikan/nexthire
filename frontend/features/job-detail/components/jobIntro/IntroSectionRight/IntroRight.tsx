import JobApplication from "../JobApplication";
import IntroDeadline from "./IntroDeadline";
import FavoriteItem from "@/features/jobs/postings/components/Favorite/FavoriteItem";

const IntroRight = () => {
  return (
    <div>
      <IntroDeadline />
      <div className="flex gap-5">
        <JobApplication />
        <FavoriteItem isFavorite={false} />
      </div>
    </div>
  );
};

export default IntroRight;
