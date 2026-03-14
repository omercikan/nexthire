import { Employer } from "@/shared/types/models/employer";
import { useForm } from "react-hook-form";
import {
  employerProfileSchema,
  EmployerProfileType,
} from "./profileValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "./api";
import { platformValidator } from "./validations/platform-validation";
import { hasUpdates } from "./validations/updateChecker";
import appendFormData from "@/shared/utils/appendFormData";
import { useRouter } from "next/navigation";

interface ProfileFormHookProps {
  user: Employer;
  refetch: () => unknown;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const useProfileForm = ({
  user,
  imageFile,
  setImageFile,
}: ProfileFormHookProps) => {
  const {
    socialSlice: { selectedPlatform },
    categorySlice: { categories },
  } = useSelector((state: RootState) => state);
  const [updateProfile] = useUpdateProfileMutation();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      companyName: user.companyName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      website: user.website ?? "",
      foundedDate: user.foundedDate ?? "",
      companySize: user.companySize ?? "",
      IntroductionVideoURL: user.IntroductionVideoURL ?? "",
      companyAbout: user.companyAbout ?? "",
    },
    resolver: zodResolver(employerProfileSchema),
  });

  const { formState } = methods;

  const onSubmit = async (values: EmployerProfileType) => {
    const socialPlatforms = platformValidator(selectedPlatform);

    if (!Array.isArray(socialPlatforms)) return;

    const sanitizedData = Object.fromEntries(
      Object.entries({ ...values, categories, socialPlatforms }).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => Boolean(v),
      ),
    );

    const isUpdate = hasUpdates(sanitizedData, imageFile, user);

    const formData = appendFormData(
      Object.entries({
        ...sanitizedData,
        photo: imageFile,
        profilePhotoId: user.profilePhotoId,
        categories: JSON.stringify(categories),
        socialPlatforms: JSON.stringify(socialPlatforms),
      }).map(([k, v]) => ({
        name: k,
        value: v,
      })) as { name: string; value: string | File }[],
    );

    try {
      if (isUpdate) {
        await updateProfile(formData).unwrap();

        toast.success("Profil bilgileriniz başarıyla güncellendi.", {
          id: "EmployerProfileSuccessMessage",
        });

        setImageFile(undefined);
        router.refresh();
      }
    } catch {
      toast.error(
        "Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz",
        { id: "EmployerProfileErrorMessage" },
      );
    }
  };

  return {
    onSubmit,
    ...methods,
    methods,
    formState,
  };
};

export default useProfileForm;
