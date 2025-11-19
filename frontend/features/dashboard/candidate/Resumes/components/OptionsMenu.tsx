import CustomButton from "@/shared/components/ui/CustomButton";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedResumes, selectAllResumes } from "../resumeSlice";
import { CVDataFields } from "@/shared/types/resume";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteResumesMutation } from "@/features/dashboard/services/candidateResumeApi";
import MenuList from "./MenuList";

const OptionsMenu = ({ resumes }: { resumes: CVDataFields[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedResumes } = useSelector(
    (state: RootState) => state.resumeSlice
  );
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [deleteResumes, { isLoading }] = useDeleteResumesMutation();

  const handleDeleteResumes = async () => {
    await deleteResumes({
      resumeIDs: selectedResumes.map((resume) => resume._id),
      publicId: selectedResumes.map((resume) => resume.fileName),
    });
    dispatch(clearSelectedResumes());
  };

  return (
    <div className="bg-[#fff] mb-5 rounded-[14px] pe-5 ps-2 py-1.5 flex justify-between items-center">
      <div className="flex items-center">
        <Tooltip title="Tüm Seçimleri Kaldır">
          <span>
            <CustomButton
              className="px-2 !py-2 !bg-transparent hover:!bg-gray-100 !rounded-sm"
              handleClick={() => dispatch(clearSelectedResumes())}
            >
              <FaRegSquareCheck color="000" />
            </CustomButton>
          </span>
        </Tooltip>

        <div className="relative">
          <Tooltip title="Daha Fazla">
            <span className="relative">
              <CustomButton
                className="px-2 !py-2 ms-1.5 me-4 !bg-transparent hover:!bg-gray-100 !rounded-sm"
                handleClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                <IoMdArrowDropdown color="000" />
              </CustomButton>
            </span>
          </Tooltip>

          {showMoreMenu && (
            <MenuList
              listClass="shadow-xl w-[250px]"
              list={[
                {
                  buttonClass: "resume-menu-item flex items-center gap-1.5",
                  buttonContent: "Tüm Özgeçmişleri Seç",
                  handleClick: () => dispatch(selectAllResumes(resumes)),
                },

                {
                  buttonClass: "resume-menu-item flex items-center gap-1.5",
                  buttonContent: "Tüm Seçimleri Kaldır",
                  handleClick: () => dispatch(clearSelectedResumes()),
                },
              ]}
            />
          )}
        </div>

        <p>
          {selectedResumes.length === 1 ? (
            <>
              &apos;
              <span>{selectedResumes[0].originalName.substring(0, 50)}...</span>
              &apos; seçildi
            </>
          ) : (
            `${selectedResumes.length} özgeçmiş seçildi`
          )}
        </p>
      </div>

      <div className="flex gap-3">
        <Tooltip
          title={isLoading ? "" : `${selectedResumes.length} Özgeçmişi Sil`}
        >
          <span>
            <CustomButton
              className="px-2 !py-2 !bg-transparent hover:!bg-gray-100 !rounded-sm"
              handleClick={handleDeleteResumes}
              isSubmitting={isLoading}
              circularColor="#1814f3"
            >
              <IoTrashOutline color="000" />
            </CustomButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default OptionsMenu;
