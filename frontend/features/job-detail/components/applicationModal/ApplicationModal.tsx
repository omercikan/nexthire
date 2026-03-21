import ModalHeader from "./modalUI/ModalHeader";
import ModalProgressBar from "./modalControls/ModalProgressBar";
import ModalBody from "./modalBody/ModalBody";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { setExitModalState } from "@/shared/redux/slices/touch";

const ApplicationModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { step } = useSelector((state: RootState) => state.modalControlSlice);

  const handleCloseModal = () => dispatch(setExitModalState(true));

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-1002 bg-black/25"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white fixed left-1/2 sm:top-8 -translate-x-1/2 sm:rounded-lg w-186 max-md:w-[95%] max-sm:w-full max-sm:h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader />
        <ModalProgressBar />

        <div
          className={`${step === 1 ? "h-max" : ""} ${
            step === 4 ? "h-125 overflow-auto" : ""
          } h-full`}
        >
          <ModalBody />
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
