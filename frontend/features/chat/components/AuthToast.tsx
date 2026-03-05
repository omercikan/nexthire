import CustomButton from "@/shared/components/ui/CustomButton";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeChatStatus } from "../slice/chat-action.slices";
import toast from "react-hot-toast";

const AuthToast = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRedirect = (href: string) => {
    router.push(href);
    dispatch(changeChatStatus("close"));
    toast.remove("AIChatNoAuth");
  };

  return (
    <div className="w-90 bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col gap-2 fade-slide-in">
      <div className="flex items-start gap-2">
        <div className="bg-blue-100 text-blue-500 p-2 rounded-lg shrink-0">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0A9 9 0 1112 3a9 9 0 019 9z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800">Giriş Gerekli</h4>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Mesajlaşma özelliğine erişmek için lütfen NextHire hesabınızla giriş
            yapın.
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <CustomButton
          text="Aday Girişi"
          handleClick={() => handleRedirect("/aday-giris")}
          className="text-sm px-4 py-2 font-medium bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
        />
        <CustomButton
          text="İşveren Girişi"
          handleClick={() => handleRedirect("/isveren-giris")}
          className="text-sm px-4 py-2 font-medium bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
        />
      </div>
    </div>
  );
};

export default AuthToast;
