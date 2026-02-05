import { AppDispatch } from "@/shared/redux/store";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../slices/userDashboardSlice";

const useProfileImage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    if (file) {
      setImageFile(file);
      const image = URL.createObjectURL(file);
      if (image) dispatch(setProfileImage(image));
    }
  };

  return { handleChangeImage, imageFile, setImageFile };
};

export default useProfileImage;
