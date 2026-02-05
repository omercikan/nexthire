import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";
import Loading from "@/shared/components/ui/Loading";
import ProfileImage from "../candidate/Profile/ProfileForm/ProfileImage";

const Profile = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-white py-[37px] px-[30px] rounded-[25px]">
      <div className="flex gap-[25px] max-[992px]:flex-col">
        {user ? (
          <>
            <ProfileImage />
            <section className="w-full flex-[85%]">{children}</section>
          </>
        ) : (
          <div className="h-[432.4px] mx-auto">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
