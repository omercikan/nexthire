import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/tr";

const IntroDeadline = ({
  applicationDeadlineDate,
}: {
  applicationDeadlineDate: Dayjs;
}) => {
  return (
    <>
      <div className="mb-3.75 max-lg:mt-3.75">
        <p className="max-lg:text-center">
          <span>Son başvuru tarihi:</span>{" "}
          <time className="text-[#d32f2f] text-[15px] font-medium">
            {dayjs(applicationDeadlineDate).locale("tr").format("DD MMMM YYYY")}
          </time>
        </p>
      </div>
    </>
  );
};

export default IntroDeadline;
