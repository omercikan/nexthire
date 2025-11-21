import React, { useContext } from "react";
import CardList from "../../Card/CardList";
import { CARD_ICONS } from "../../Card/card-icon";
import { AuthContext } from "@/features/auth/authContext";
import Success from "@/shared/components/ui/Success";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { useGetResumesQuery } from "../../../../services/candidateResumeApi";
import UploadResumeButton from "./UploadResumeButton";
import Loading from "@/shared/components/ui/Loading";
import OptionsMenu from "../OptionsMenu";
import ResumeList from "./ResumeList";
import { useMediaQuery } from "@mui/material";
import RenameResume from "../RenameResume/RenameResume";
import { CVDataFields } from "@/shared/types/resume";

const CandidateResume = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetResumesQuery(String(user?._id));
  const { selectedResumes, renameResumeID } = useSelector(
    (state: RootState) => state.resumeSlice
  );
  const isMobile = useMediaQuery("(max-width:640px)");

  if (!data) {
    return (
      <div className="bg-white h-[500px] rounded-[25px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full">
      <CardList
        cards={[
          {
            icon: CARD_ICONS.upload,
            title: "Yüklenen Özgeçmiş",
            text: data?.length.toString() ?? "0",
          },

          {
            icon: CARD_ICONS.time,
            title: "Son Yüklenen",
            text: data.length
              ? String(data?.at(length - 1)?.originalName)
              : "Henüz yok",
          },

          {
            icon: CARD_ICONS.memory,
            title: "Yükleme Boyutu",
            text: "3 MB",
          },
        ]}
      />

      <h2 className="text-[#343C6A] font-semibold text-[22px] my-[28px]">
        Yüklenen Özgeçmişler
      </h2>

      {selectedResumes.length && data.length
        ? !isMobile && <OptionsMenu resumes={data} />
        : null}

      {data?.length ? (
        <>
          <ResumeList resumes={data ?? []} />

          <UploadResumeButton
            className="float-end my-4"
            userId={String(user?._id)}
            resumeLength={data.length}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center text-center gap-y-4">
          <Success
            title="Henüz bir özgeçmiş yüklemediniz."
            subtitle="Kariyer yolculuğunuza başlamak için şimdi bir özgeçmiş ekleyin."
          />

          <UploadResumeButton userId={String(user?._id)} className="mb-4" />
        </div>
      )}

      {renameResumeID && (
        <RenameResume
          file={
            data.find((resume) => resume._id === renameResumeID) as CVDataFields
          }
        />
      )}
    </div>
  );
};

export default CandidateResume;
