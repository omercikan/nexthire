import { useContext } from "react";
import { SubmitHandler } from "react-hook-form";
import { CandidateForm } from "./types";
import { AuthContext } from "@/features/auth/authContext";
import { Candidate } from "@/shared/types/models/candidate";
import dayjs from "dayjs";
import appendFormData from "@/shared/utils/appendFormData";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "@/features/dashboard/services/candidateProfileApi";
import { FORMDATA_VALUES } from "./formdata.constants";

interface FormHandler {
  startDate: Date | null;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const FormHandler = ({ startDate, imageFile, setImageFile }: FormHandler) => {
  const { user, refetch } = useContext(AuthContext);
  const currentUser = user as Candidate;
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<CandidateForm> = async (values) => {
    try {
      if (user) {
        const { dateOfBirth, profilePhotoId } = currentUser;

        const isChange = ["fullname", "age", "phoneNumber", "title"].some(
          (val) => {
            const value = val as keyof typeof isChange;
            return values[value] && currentUser[value] !== values[value];
          }
        );

        const date = dayjs(startDate).format("MM/DD/YYYY");

        const { fullname, age, city, gender, phoneNumber, title } = values;

        const conditionals = {
          isChange: isChange,
          dateOfBirth: startDate !== null && String(dateOfBirth) !== date,
          gender: gender !== "Cinsiyet Seçin" && gender !== currentUser.gender,
          city: city !== "Şehir Seçin" && city !== currentUser.city,
          userPhoto: !!imageFile,
        };

        if (Object.values(conditionals).some((val) => val === true)) {
          const formData = appendFormData(
            FORMDATA_VALUES(
              imageFile,
              user._id,
              date,
              profilePhotoId,
              fullname,
              age,
              city,
              gender,
              phoneNumber,
              title
            )
          );

          const res = await updateProfile(formData).unwrap();

          if (res) {
            await refetch();
            setImageFile(undefined);
          }
        }
      }
    } catch {
      toast.error("Profiliniz güncellenemedi tekrar deneyin", {
        position: "bottom-right",
      });
    }
  };

  return onSubmit;
};

export default FormHandler;
