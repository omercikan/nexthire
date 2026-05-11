import CustomInput from "@/shared/components/ui/CustomInput";
import useDebounce from "@/shared/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const DrawerSearch = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const params = useSearchParams();
  const [searchValue, setSearchValue] = useState(params.get("search") ?? "");
  const debounceSearch = useDebounce(searchValue.trim());
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debounceSearch) params.set("search", debounceSearch);
    else params.delete("search");

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debounceSearch, router]);

  return (
    <CustomInput
      placeholder="İsim veya pozisyon ara..."
      icon={<LuSearch />}
      iconSpanClass="text-muted-foreground!"
      className="candidate-question-input ring-blue-500/50! pe-3! pl-9! py-[7.2px]! text-sm text-foreground!"
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
        setPage(1);
      }}
    />
  );
};

export default DrawerSearch;
