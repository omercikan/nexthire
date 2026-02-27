import { chatOptions } from "../options/chatOptions";

const OptionsMenu = () => {
  return (
    <ul className="absolute top-full bg-white z-1 px-5 border border-[#E3E3E3] rounded-[10px] drop-shadow-xl">
      {chatOptions.map(({ icon: Icon, name }) => (
        <li
          key={name}
          className="flex items-center gap-3.5 py-2 not-last:border-b border-[rgba(102,112,133,0.5)] text-[#667085] cursor-pointer text-[15px]"
        >
          <Icon size={18} />
          {name}
        </li>
      ))}
    </ul>
  );
};

export default OptionsMenu;
