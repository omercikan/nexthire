import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { BsThreeDots } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  LuUserSearch,
  LuPencil,
  LuEye,
  LuEyeOff,
  LuTrash2,
} from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setMenuId, setMenuPosition } from "./JobListMenuSlice";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler, useRef } from "react";
import useClickOutside from "@/shared/hooks/useClickOutside";
import useJobActions from "./useJobActions";

function Divider() {
  return <div className="border border-border my-1 -mx-1" />;
}

function MenuButton({
  jobId,
  openMenuId,
}: {
  jobId: string;
  openMenuId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpenMenu = jobId === openMenuId;

  const handleMenuId = () => {
    if (isOpenMenu) {
      dispatch(setMenuId(""));
      document.body.style.overflow = "visible";
      return;
    }

    const button = menuButtonRef.current?.getBoundingClientRect();
    const bottomSpace = window.innerHeight - (button?.bottom ?? 0);
    const position = bottomSpace > 156.8 ? "bottom" : "top";

    dispatch(setMenuPosition(position));
    dispatch(setMenuId(jobId));
    document.body.style.overflow = "hidden";
  };

  return (
    <CustomButton
      className={cn(
        "p-0! bg-transparent! text-muted-foreground! w-8 h-8 grid place-content-center rounded-lg!",
        isOpenMenu ? "bg-transparent" : "hover:bg-[#edf2f8]!",
      )}
      handleClick={handleMenuId}
      ref={menuButtonRef}
    >
      <BsThreeDots />
    </CustomButton>
  );
}

function MenuItem({
  icon: Icon,
  text,
  className,
  onClick,
}: {
  icon: IconType;
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm text-foreground hover:bg-[#edf2f8] rounded-md whitespace-nowrap cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <Icon />
      {text}
    </li>
  );
}

const JobListItemMenu = ({
  jobStatus,
  jobId,
}: {
  jobStatus: string;
  jobId: string;
}) => {
  const { openMenuId, menuPostion } = useSelector(
    (state: RootState) => state.jobListMenu,
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { handleViewApplications } = useJobActions(jobId);

  useClickOutside(menuRef, () => {
    if (openMenuId !== jobId) return;
    dispatch(setMenuId(""));
    document.body.style.overflow = "visible";
  });

  return (
    <div
      className={cn(
        "invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all relative",
        openMenuId === jobId && "visible opacity-100",
      )}
      ref={menuRef}
    >
      <MenuButton jobId={jobId} openMenuId={openMenuId} />

      {openMenuId === jobId && (
        <AnimatePresence mode="wait">
          <motion.ul
            initial={{
              y: menuPostion === "top" ? 10 : -10,
              x: 5,
              opacity: 0,
            }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: menuPostion === "top" ? 10 : -10, x: 5, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "p-1 rounded-lg border border-border absolute right-0 shadow-md bg-white min-w-32 w-44",
              menuPostion === "top" ? "bottom-full mb-1" : "mt-1",
            )}
          >
            <MenuItem
              icon={LuUserSearch}
              text="Başvuruları Gör"
              onClick={handleViewApplications}
            />
            <Divider />

            <MenuItem icon={LuPencil} text="Düzenle" />
            <MenuItem
              icon={LuTrash2}
              text="Sil"
              className="text-[#e7000b] hover:bg-[#e7000b]/10"
            />

            <Divider />
            <MenuItem
              icon={jobStatus !== "published" ? LuEye : LuEyeOff}
              text={jobStatus !== "published" ? "Aktif Yap" : "Pasife Al"}
            />
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
};

export default JobListItemMenu;
