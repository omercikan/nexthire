import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { changeModalState } from "@/shared/redux/slices/user-modal/userModalSlice";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AuthContext } from "@/features/auth/authContext";
import { handleLogout } from "@/shared/utils/logout";

const UserModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);

  return (
    <div className="not-logged-modal">
      <div className="min-[992px]:hidden p-4 border-b border-[#dee2e6] flex justify-between items-center">
        <Image
          src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
          alt="NextHire"
          width={111}
          height={53}
        />

        <IoClose
          size={26}
          cursor="pointer"
          onClick={() => {
            dispatch(changeModalState());
            document.body.style.overflow = "visible";
          }}
        />
      </div>

      <ul className="text-sm">
        <li className="border-b border-[#e4e4e4] px-6 pt-6">
          {!user ? (
            <div>
              <h1>Yeni bir başlangıç mı arıyorsun?</h1>
              <p className="text-[#878787] mt-2">
                NextHire&apos;da seni bekleyen fırsatlar var.
              </p>
            </div>
          ) : (
            <div className="flex items-center pb-6">
              <HiOutlineUserCircle size={32} />
              <div className="ms-2.5">
                <strong className="block text-[16px] text-[#212529] font-medium">
                  {user.fullname}
                </strong>
                <Link
                  href="/hesabim"
                  className="text-[#4045ef] hover:underline"
                >
                  Hesabıma Git
                </Link>
              </div>
            </div>
          )}

          {!user && (
            <div className="my-6 flex gap-4">
              <Link href="/aday-giris" className="w-full">
                <button className="header-candidate-login-btn custom__button w-full !px-[20px]">
                  Aday Girişi
                </button>
              </Link>

              <Link href="/aday-uye-ol" className="w-full">
                <button className="custom__button w-full !rounded-[5px] px-[24px] !py-2 font-medium">
                  Üye Ol
                </button>
              </Link>
            </div>
          )}
        </li>

        <li className={`${user ? "p-6 pt-0" : "p-6"}`}>
          {!user && (
            <>
              <h1>İşveren (İlan mı Vereceksiniz?)</h1>
              <p className="text-[#878787] mt-2">
                NextHire ile en uygun adaya hızla ulaşın.
              </p>
            </>
          )}

          <ul className="mt-6 flex flex-col gap-4">
            <li className="header-user-modal-links">
              <Link href={user ? "/ayarlar" : "/isveren-giris"}>
                {user ? "Ayarlar" : "İşveren Girişi"}
              </Link>
            </li>

            <li className="header-user-modal-links">
              <Link href={user ? "/yardim" : "/isveren-kayit"}>
                {user ? "Yardım" : "Ücretsiz Hesap Oluştur!"}
              </Link>
            </li>

            <li className="header-user-modal-links">
              {user ? (
                <button onClick={() => handleLogout(user._id)}>
                  Çıkış Yap
                </button>
              ) : (
                <Link href="mailto:nexthire00@gmail.com">Bize Ulaşın</Link>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default UserModal;
