import CustomInput from "@/shared/components/ui/CustomInput";
import { AppDispatch } from "@/shared/redux/store";
import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setFilters } from "./jobListFiltersSlice";

const JobSearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <CustomInput
      icon={<LuSearch />}
      className="pe-3! ps-10! py-2.5! rounded-lg! candidate-question-input text-sm! ring-[#0073d5]/50! shadow-xs bg-transparent!"
      placeholder="Pozisyon, departman veya lokasyon ara..."
      wrapperClass="flex-1"
      onChange={(e) => dispatch(setFilters({ searchTerm: e.target.value }))}
    />
  );
};

export default JobSearchInput;
