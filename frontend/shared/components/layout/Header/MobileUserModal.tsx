import React from "react";
import UserModal from "./UserModal";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const MobileUserModal = () => {
  const { modal } = useSelector((state: RootState) => state.userModal);
 
  return (
    <> 
      {modal && (
        <div className="z-[51] fixed top-0 left-0 w-full h-screen placeholder-bg min-[992px]:hidden">
          <div className="z-[51] absolute left-[50%] top-[50%] -translate-[50%]">
            <UserModal />
          </div>
        </div>
      )}
    </> 
  );
};

export default MobileUserModal;
