import ActionButton from "./ActionButton";
import { actionButtonsMap } from "./quickActionsData";

const QuickActions = () => {
  return (
    <div className="bg-white h-max p-6 shadow-lg rounded-2xl border border-[#e2e5e8] flex flex-col gap-6">
      <div>
        <h2 className="text-[#0f171f] font-semibold">Hızlı İşlemler</h2>
        <p className="text-[#5b646f] text-sm">
          Sık kullanılan görevler ve kısayollar
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {actionButtonsMap.map(({ title, description, icon, route }) => (
          <ActionButton
            key={route}
            title={title}
            description={description}
            icon={icon}
            route={route}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
