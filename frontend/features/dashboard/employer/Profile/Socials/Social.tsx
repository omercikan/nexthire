import CustomButton from "@/shared/components/ui/CustomButton";
import SocialList from "./SocialList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setPlatform, updatePlatform } from "./social-slice";
import { useEffect } from "react";
import { Employer } from "@/shared/types/models/employer";

const Social = ({ user }: { user: Employer }) => {
  const { selectedPlatform } = useSelector(
    (state: RootState) => state.socialSlice,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updatePlatform(user?.socialPlatforms ?? []));
  }, [dispatch, user?.socialPlatforms]);

  return (
    <div className="mt-5 bg-white py-[37px] px-[30px] rounded-[25px]">
      <h2 className="mb-[25px] text-[#202124] font-medium text-lg">
        Sosyal Ağlar
      </h2>

      {selectedPlatform.length ? (
        selectedPlatform.map((val, index) => (
          <SocialList key={index} index={val.id} />
        ))
      ) : (
        <div className="text-center">
          <p className="mb-[25px] text-slate-600">
            🔗 Profilini güçlendirmek için sosyal medya bağlantılarını
            ekleyebilirsin.
          </p>

          <CustomButton
            type="button"
            text="Bağlantı ekle"
            className="!bg-[#EFF4FC] hover:!bg-[#DDE8F8] !text-[#1967d2] text-[15px] !rounded-lg !py-[15px] !px-[30px] mt-[5px]"
            handleClick={() =>
              dispatch(
                setPlatform({
                  id: selectedPlatform.length + 1,
                  url: "",
                  platform: "Facebook",
                }),
              )
            }
          />
        </div>
      )}

      {selectedPlatform.length ? (
        <CustomButton
          type="button"
          text="Başka Bir Ağ Ekle"
          className="!bg-[#EFF4FC] hover:!bg-[#DDE8F8] !text-[#1967d2] text-[15px] !rounded-lg !py-[15px] !px-[30px] mt-[5px]"
          handleClick={() =>
            dispatch(
              setPlatform({
                id: selectedPlatform.length + 1,
                url: "",
                platform: "Facebook",
              }),
            )
          }
        />
      ) : null}
    </div>
  );
};

export default Social;
