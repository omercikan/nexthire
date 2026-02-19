import CustomButton from "@/shared/components/ui/CustomButton";
import CustomInput from "@/shared/components/ui/CustomInput";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SocialPlatformItem from "./SocialPlatformItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import {
  removePlatform,
  setActiveSocialPlatformId,
  updatePlatformUrl,
} from "./social-slice";
import { useEffect, useState } from "react";
import { SOCIAL_PLATFORMS } from "@/features/dashboard/constants/social.constants";

const SocialList = ({ index }: { index: number }) => {
  const { selectedPlatform, activeSocialPlatformId } = useSelector(
    (state: RootState) => state.socialSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const findPlatform = selectedPlatform.find(({ id }) => id === index);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchPlatform, setSearchPlatform] = useState("");
  const filtersPlatform = SOCIAL_PLATFORMS.filter((item) =>
    item.toLowerCase().includes(searchPlatform.toLowerCase()),
  );

  useEffect(() => {
    const close = () => dispatch(setActiveSocialPlatformId(0));
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [dispatch]);

  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  return (
    <ul className="mb-5">
      <li
        className="flex items-center justify-between bg-[#f0f5f7] py-5 px-3 rounded-lg text-sm w-full cursor-pointer font-medium"
        onClick={handleToggleMenu}
      >
        <div className="flex items-center gap-x-1.5">
          <CustomButton
            className="!p-0 !bg-transparent !text-[#a00] hover:!text-[#e44343]"
            handleClick={() => dispatch(removePlatform(index))}
          >
            <IoClose />
          </CustomButton>

          <span>Bağlantı {index}</span>
        </div>

        <button>
          <FiChevronDown
            className={`transform ${!toggleMenu ? "rotate-180" : "rotate-0"} `}
          />
        </button>
      </li>

      {!toggleMenu && (
        <div className="flex flex-col">
          <ul className="mt-[15px] flex flex-col gap-y-[15px]">
            <li className="flex items-center justify-between">
              <span className="text-[#202124] text-[15px] font-semibold flex-[15%]">
                Bağlantı
              </span>

              <div className="flex-[85%] relative select-none">
                <div
                  className="bg-[#f0f5f7] py-5 ps-5 pe-3 rounded-lg text-sm text-[#696969] flex items-center justify-between cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setActiveSocialPlatformId(index));
                  }}
                >
                  {findPlatform?.platform}
                  <FiChevronDown
                    className={`transform ${activeSocialPlatformId === index ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                {activeSocialPlatformId === index && (
                  <div
                    className="absolute top-full w-full bg-white py-5 border border-[#ECEDF2] rounded-lg flex flex-col gap-y-1.5 text-slate-600 text-sm z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CustomInput
                      className="!rounded-lg !px-5 !py-[8px] text-[15px] mb-3 mx-[25px] !w-[95%]"
                      onChange={(e) => setSearchPlatform(e.target.value)}
                      value={searchPlatform}
                    />

                    <ul className="max-h-[200px] visible-scrollbar flex flex-col gap-y-1.5">
                      {!searchPlatform.length && !filtersPlatform.length &&
                        SOCIAL_PLATFORMS.map((platform) => (
                          <SocialPlatformItem
                            key={platform}
                            defaultPlatform={
                              findPlatform?.platform ?? "Facebook"
                            }
                            platform={platform}
                            index={index}
                            setSearchPlatform={setSearchPlatform}
                          />
                        ))}

                      {filtersPlatform.length ? (
                        filtersPlatform.map((platform) => (
                          <SocialPlatformItem
                            key={platform}
                            defaultPlatform={
                              findPlatform?.platform ?? "Facebook"
                            }
                            platform={platform}
                            index={index}
                            setSearchPlatform={setSearchPlatform}
                          />
                        ))
                      ) : (
                        <span className="px-[25px] inline-block">
                          Sonuç Bulunamadı.
                        </span>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-[#202124] text-[15px] font-semibold flex-[15%]">
                URL
              </span>

              <div className="flex-[85%]">
                <CustomInput
                  className="!rounded-lg !py-[19px] !px-5 text-slate-600 placeholder:text-slate-400"
                  placeholder="Profil bağlantısını girin"
                  onChange={(e) => {
                    dispatch(
                      updatePlatformUrl({
                        updateId: index,
                        url: e.target.value,
                      }),
                    );
                  }}
                  value={findPlatform?.url}
                  error={
                    findPlatform?.url === "" ? "Geçerli bir URL giriniz" : ""
                  }
                />
              </div>
            </li>
          </ul>

          <CustomButton
            text="Ağı Kaldır"
            className="!bg-[#EFF4FC] hover:!bg-[#DDE8F8] !text-[#1967d2] self-end text-[15px] !rounded-lg !py-2.5 !px-5 mt-[25px]"
            handleClick={() => dispatch(removePlatform(index))}
          />
        </div>
      )}
    </ul>
  );
};

export default SocialList;
