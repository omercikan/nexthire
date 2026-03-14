import { useContext } from "react";
import CandidateForm from "./ProfileForm/CandidateForm";
import ProfileImage from "./ProfileForm/ProfileImage";
import { AuthContext } from "@/features/auth/authContext";
import Loading from "@/shared/components/ui/Loading";

const CandidateProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white py-9.25 px-7.5 rounded-[25px]">
      <main className="flex gap-6.25 max-[992px]:flex-col">
        {user ? (
          <>
            <ProfileImage />
            <CandidateForm />
          </>
        ) : (
          <div className="h-[432.4px] mx-auto">
            <Loading />
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateProfile;
