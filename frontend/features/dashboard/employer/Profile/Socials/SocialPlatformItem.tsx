import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSocialPlatformId, setPlatform } from "./social-slice";

const SocialPlatformItem = ({
  defaultPlatform,
  platform,
  index,
  setSearchPlatform,
}: {
  defaultPlatform: string;
  platform: string;
  index: number;
  setSearchPlatform: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { selectedPlatform } = useSelector(
    (state: RootState) => state.socialSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const isIncludePlatform = selectedPlatform.some(
    (item) => item.id === index && item.platform === platform,
  );

  const handleSelectPlatform = () => {
    dispatch(setPlatform({ id: index, url: "", platform }));
    dispatch(setActiveSocialPlatformId(0));
    setSearchPlatform("");
  };

  return (
    <li
      className={`
        py-1.5 px-[25px] cursor-pointer hover:text-[#1967D2]  
        ${isIncludePlatform ? "text-[#1967D2]" : ""} 
        ${defaultPlatform === "Facebook" && platform === "Facebook" ? "text-[#1967D2]" : ""}
      `}
      onClick={handleSelectPlatform}
    >
      {platform}
    </li>
  );
};

export default SocialPlatformItem;
