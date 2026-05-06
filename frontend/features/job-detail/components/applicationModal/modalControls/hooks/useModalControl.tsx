import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { updateStep } from "../../slices/modalControlSlice";
import { useJob } from "@/features/jobs/context/JobContext";
import {
  getResumeName,
  useResume,
} from "../../modalBody/resume/uploadResume/resumeContext";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";
import { useParams, useRouter } from "next/navigation";
import { useSendApplicationMutation } from "../services/jobApplicationApi";
import toast from "react-hot-toast";
import { setApplicationStatus } from "@/shared/redux/slices/applicationModal/modalData";
import { setApplicationModal } from "@/shared/redux/slices/touch";
import useMultipleDispatch from "@/shared/hooks/useMultipleDispatch";
import { Candidate } from "@/shared/types/models/candidate";

const useModalControl = (isValid: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    modalControlSlice: { step },
    applicationModalData: { applicationData, selectedResume: selectedResumeId },
  } = useSelector((state: RootState) => state);
  const { job } = useJob();
  const hasScreeningQuestions = job.screeningQuestions?.length ? true : false;
  const { user } = useContext(AuthContext) as { user: Candidate };
  const { resumes, removedResumeNames } = useResume();
  const params = useParams() as { slug: string[] };
  const [sendApplicationApi, { isLoading }] = useSendApplicationMutation();
  const multipleDispatch = useMultipleDispatch();
  const router = useRouter();

  const nextStep = () => {
    if (!isValid) return;

    if (step === 4) return;

    if (!hasScreeningQuestions && step === 2) return dispatch(updateStep(4));

    dispatch(updateStep(step + 1));
  };

  const prevStep = () => {
    if (step === 1) return;

    if (!hasScreeningQuestions && step === 4) return dispatch(updateStep(2));

    dispatch(updateStep(step - 1));
  };

  const sendApplication = async () => {
    const formData = new FormData();
    const jobId = params.slug[0];

    try {
      resumes.forEach((resume) =>
        formData.append("resumeFiles", resume as File),
      );

      const selectedResume = resumes.find(
        (resume) => resume._id === selectedResumeId,
      );

      const payload = {
        selectedResumeName: getResumeName(selectedResume!),
        applicationData: {
          ...applicationData,
          fullname: user?.fullname,
          title: user.title,
          profilePhoto: user.profilePhoto,
          city: user.city,
          lastWorkPlace: user.lastWorkPlace,
          experienceTime: user.experienceTime,
        },
        userId: user?._id,
        employerId: job.employer?._id,
        removedResumeNames,
        jobId,
      };

      formData.append("data", JSON.stringify(payload));

      if (payload) {
        await sendApplicationApi({ jobId, formData }).unwrap();
        multipleDispatch([
          setApplicationStatus({
            companyName: job.employer?.companyName ?? "",
            status: "applied",
          }),
          setApplicationModal(false),
          updateStep(1),
        ]);
        router.refresh();
      }
    } catch {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return {
    step,
    applicationData,
    hasScreeningQuestions,
    nextStep,
    prevStep,
    sendApplication,
    isLoading,
  };
};

export default useModalControl;
