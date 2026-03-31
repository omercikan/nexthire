import CustomButton from "@/shared/components/ui/CustomButton";
import { clearAllFilters } from "@/shared/redux/slices/filtersValues";
import React from "react";
import { TbFilterX } from "react-icons/tb";
import { IoBagAddOutline } from "react-icons/io5";
import useMultipleDispatch from "@/shared/hooks/useMultipleDispatch";
import { clearFilters } from "@/shared/redux/slices/filtersData";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";

interface JobResultContentProps {
  isFilterDataFetching: boolean;
  hasAnyJobs: boolean;
}

interface ContentProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Content = ({
  icon: Icon,
  title,
  description,
  children = null,
}: ContentProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-20 max-sm:py-5 max-sm:px-0">
      <div className="border border-gray-300 w-max p-4 rounded-full">
        <Icon color="555555" className="text-[26px]" />
      </div>

      <h3 className="text-[#333333] mt-5 mb-1.5 text-xl font-medium max-[430px]:text-[16px]">
        {title}
      </h3>

      <p className="text-[#666666] font-medium text-[15px] w-125 max-sm:w-full max-[430px]:text-[14px]">
        {description}
      </p>

      {children}
    </div>
  );
};

const JobResultContent: React.FC<JobResultContentProps> = ({
  isFilterDataFetching,
  hasAnyJobs,
}) => {
  const multipleDispatch = useMultipleDispatch();
  const { handleFilter } = useJobFilter();

  if (isFilterDataFetching) {
    const handleClearFilters = () => {
      multipleDispatch([clearAllFilters(), clearFilters()]);
      handleFilter();
    };

    return (
      <>
        <Content
          icon={TbFilterX}
          title="Aramanızla eşleşen ilan bulunamadı"
          description="Seçtiğiniz filtreler için aktif iş ilanı mevcut değildir. Farklı
          kriterler deneyebilir veya tüm ilanları görüntüleyebilirsiniz."
        >
          <div className="mt-5 flex flex-wrap justify-center items-center gap-4">
            <CustomButton
              text="Filtreleri Temizle"
              className="bg-[#000000]! px-5 py-2! text-sm rounded-md! whitespace-nowrap"
              handleClick={handleClearFilters}
            />

            <CustomButton
              text="Tüm İlanları Gör"
              className="bg-transparent! border border-[#000000] text-[#000000]! px-5 py-2! text-sm rounded-md! whitespace-nowrap"
              handleClick={handleClearFilters}
            />
          </div>
        </Content>
      </>
    );
  }

  if (!hasAnyJobs) {
    return (
      <Content
        icon={IoBagAddOutline}
        title="Şu anda açık pozisyon bulunmamaktadır"
        description="Sistemde şu anda aktif bir ilan bulunmamaktadır. Yeni fırsatlar
          yayınlandığında buradan takip edebilirsiniz."
      />
    );
  }
};

export default JobResultContent;
