import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./jobListFiltersSlice";
import { AnimatePresence, motion } from "framer-motion";

function FilterMenuWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative", className)}
      {...props}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

type FilterKey = "status" | "sort";
type MenuKey = "status" | "sort";

function FilterMenu({
  options,
  activeOption,
  className,
  menuKey,
  openMenuKey,
  setOpenMenuKey,
}: {
  options: { label: string; value: string }[];
  activeOption: string;
  className: string;
  menuKey: FilterKey;
  openMenuKey: string;
  setOpenMenuKey: React.Dispatch<React.SetStateAction<MenuKey | "">>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItem = options.find((option) => option.value === activeOption);

  const handleActiveOption = (value: string) => {
    setOpenMenuKey("");
    dispatch(setFilters({ [menuKey]: value }));
  };

  return (
    <FilterMenuWrapper className={className}>
      <DisplayActiveOption
        activeOption={selectedItem?.label as string}
        isOpen={openMenuKey === menuKey}
        menuKey={menuKey}
        setOpenMenuKey={setOpenMenuKey}
      />

      {menuKey === openMenuKey && (
        <AnimatePresence mode="wait">
          <motion.ul
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute bg-white border border-border py-1 px-1 rounded-lg shadow-sm text-sm mt-1 text-foreground cursor-default group select-none",
              menuKey === "status" ? "w-[calc(100%+10px)]" : "w-full",
            )}
          >
            {options.map(({ label, value }) => (
              <li
                key={`${menuKey}-${value}`}
                className={cn(
                  "py-1.5 px-2 hover:bg-[#EDF2F8] rounded-md flex items-center justify-between whitespace-nowrap",
                  value === activeOption ? "not-group-hover:bg-[#EDF2F8]" : "",
                )}
                onClick={() => handleActiveOption(value)}
              >
                {label}

                {value === activeOption && <LuCheck />}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </FilterMenuWrapper>
  );
}

function DisplayActiveOption({
  activeOption,
  menuKey,
  setOpenMenuKey,
  isOpen,
}: {
  activeOption: string;
  menuKey: MenuKey;
  setOpenMenuKey: React.Dispatch<React.SetStateAction<MenuKey | "">>;
  isOpen: boolean;
}) {
  return (
    <CustomButton
      className="py-2! px-3! rounded-lg! bg-transparent! text-foreground! text-sm flex items-center justify-between gap-2 border border-border shadow-xs w-full select-none"
      handleClick={() => setOpenMenuKey(isOpen ? "" : menuKey)}
    >
      <span className="whitespace-nowrap overflow-hidden">{activeOption}</span>
      <LuChevronDown className="text-muted-foreground" size={16} />
    </CustomButton>
  );
}

const JobFilterSelect = () => {
  const [openMenuKey, setOpenMenuKey] = useState<MenuKey | "">("");
  const { status, sort } = useSelector(
    (state: RootState) => state.jobListFilters.filters,
  );

  useEffect(() => {
    const closeMenu = () => setOpenMenuKey("");

    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="flex gap-2">
      <FilterMenu
        className="w-32.5"
        options={[
          { label: "Tüm Durumlar", value: "all" },
          { label: "Aktif", value: "active" },
          { label: "Pasif", value: "passive" },
          { label: "Taslak", value: "draft" },
        ]}
        menuKey="status"
        activeOption={status}
        openMenuKey={openMenuKey}
        setOpenMenuKey={setOpenMenuKey}
      />

      <FilterMenu
        className="w-37.5"
        options={[
          { label: "En Yeni", value: "newest" },
          { label: "En Eski", value: "oldest" },
          { label: "Başvuru Sayısı", value: "most_applied" },
        ]}
        menuKey="sort"
        activeOption={sort}
        openMenuKey={openMenuKey}
        setOpenMenuKey={setOpenMenuKey}
      />
    </div>
  );
};

export default JobFilterSelect;
