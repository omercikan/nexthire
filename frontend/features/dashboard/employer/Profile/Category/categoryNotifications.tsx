import toast from "react-hot-toast";
import {
  HiOutlineDuplicate,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

export const ToastClass =
  "flex items-start gap-3 rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-md border-l-4 border-l-red-500";

const showCategoryToast = ({
  categories,
  value,
}: {
  categories: string[];
  value: string;
}) => {
  if (value.length < 2 || value.length > 20) {
    toast.error("Kategori adı 2–20 karakter arasında olmalıdır.", {
      id: "CategoryLengthToast",
      icon: <HiOutlineInformationCircle size={20} />,
      className: ToastClass,
    });
    return true;
  }

  if (categories.length >= 3) {
    toast.error("En fazla 3 adet kategori eklenebilir.", {
      id: "CategoryMaxToast",
      icon: <HiOutlineExclamationCircle size={20} />,
      className: ToastClass,
    });
    return true;
  }

  if (categories.find((cat) => cat === value)) {
    toast.error("Aynı kategori birden fazla kez eklenemez.", {
      id: "CategoryNameToast",
      icon: <HiOutlineDuplicate size={20} />,
      className: ToastClass,
    });
    return true;
  }

  return false;
};

export default showCategoryToast;
