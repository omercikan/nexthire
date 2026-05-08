import CustomButton from "@/shared/components/ui/CustomButton";
import { IoCloseOutline } from "react-icons/io5";
import { useEmployerJobsData } from "../hooks/useEmployerJobsData";

const DrawerHeader = ({
  handleCloseDrawer,
  jobId,
}: {
  handleCloseDrawer: () => void;
  jobId: string;
}) => {
  const { jobs } = useEmployerJobsData();
  const currentJob = jobs.find((job) => job._id === jobId);

  return (
    <div className="px-5 py-4 border-b border-b-border">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-semibold">
          {currentJob?.jobTitle}
        </h2>
        <CustomButton
          className="bg-transparent! p-0! text-foreground!"
          handleClick={handleCloseDrawer}
        >
          <IoCloseOutline size={18} />
        </CustomButton>
      </div>

      <p className="text-muted-foreground text-sm mt-1.5">
        {currentJob?.applicants} Başvuru
      </p>
    </div>
  );
};

export default DrawerHeader;
