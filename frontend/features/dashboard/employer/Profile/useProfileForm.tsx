import { Employer } from "@/shared/types/models/employer";
import { useForm } from "react-hook-form";
import { employerProfileSchema } from "./profileValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const useProfileForm = ({ user }: { user: Employer }) => {
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

  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const onSubmit = () => {};

  return {
    onSubmit,
    register,
    setValue,
    watch,
    handleSubmit,
    methods,
    errors,
    isSubmitting,
    isSubmitted,
  };
};

export default useProfileForm;
