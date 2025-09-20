// auth context
import { AuthContext } from "@/context/authContext";
import { RootState } from "@/lib/redux/store";

// types
import { Candidate } from "@/types/auth/models/candidate";
import { Employer } from "@/types/auth/models/employer";

// nextjs & react
import Image from "next/image";
import React, { useContext } from "react";

// react icons
import { FaPencilAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileImage = () => {
  const { user } = useContext(AuthContext);
  const isCandidate = user?.role === "candidate";
  const currentUser = user as Candidate & Employer;
  const profileImage = useSelector(
    (state: RootState) => state.userDashboard.profileImage
  );

  return (
    <div className="w-max h-max rounded-full flex-[15%] max-[992px]:self-center">
      <label
        htmlFor="image"
        className="cursor-pointer relative block w-[132px] h-[130px]"
      >
        {currentUser?.photo ||
        currentUser?.companyInformations?.companyLogo ||
        profileImage ? (
          <Image
            src={
              profileImage
                ? profileImage
                : isCandidate
                ? currentUser?.photo
                : currentUser?.companyInformations?.companyLogo
            }
            width={132}
            height={130}
            alt={
              isCandidate
                ? user?.name || user?.displayName
                : currentUser?.companyInformations?.companyName
            }
            className="rounded-full w-full h-full object-cover border border-[#d4d4d4] p-0.5"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-100 grid place-content-center">
            <FaRegUser size={40} color="555" />
          </div>
        )}

        <div className="bg-[#1814F3] w-[30px] h-[30px] grid place-content-center rounded-full p-4 absolute bottom-2 right-1">
          <FaPencilAlt size={15} color="fff" />
        </div>
      </label>
    </div>
  );
};

export default ProfileImage;
