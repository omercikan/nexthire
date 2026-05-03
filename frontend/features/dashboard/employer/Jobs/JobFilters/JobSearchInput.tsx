import CustomInput from "@/shared/components/ui/CustomInput";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./jobListFiltersSlice";

const JobSearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm } = useSelector(
    (state: RootState) => state.jobListFilters.filters,
  );

  return (
    <CustomInput
      icon={<LuSearch />}
      className="pe-3! ps-10! py-2.5! rounded-lg! candidate-question-input text-sm! ring-[#0073d5]/50! shadow-xs bg-transparent!"
      placeholder="Pozisyon, departman veya lokasyon ara..."
      wrapperClass="flex-1"
      onChange={(e) => dispatch(setFilters({ searchTerm: e.target.value }))}
      value={searchTerm}
    />
  );
};

export default JobSearchInput;
