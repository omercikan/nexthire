import { IoMegaphoneOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { LuUserSearch, LuFileText, LuTag } from "react-icons/lu";

function Suggestion({
  icon: Icon,
  description,
}: {
  icon: IconType;
  description: string;
}) {
  return (
    <div className="flex gap-2">
      <div className="bg-[#eaeef2] border border-[#c4c6d2] p-1.5 grid place-content-center rounded-lg self-start">
        <Icon color="5c5f60" />
      </div>

      <p className="text-[#444650] text-xs">{description}</p>
    </div>
  );
}

const EmptyApplicants = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="bg-[#e5e9ed] border border-[#c4c6d2] rounded-full grid place-content-center w-16 h-16 mb-4">
        <LuUserSearch size={32} color="747781" />
      </div>

      <div className="text-center">
        <h3 className="text-[#171c1f] text-[15px] font-semibold mb-1">
          Henüz başvuru yok
        </h3>

        <p className="text-[#5c5f60] text-xs w-68.75">
          Bu iş ilanına henüz hiç başvuru gelmedi. İlanınızın daha fazla adaya
          ulaşması için aşağıdaki önerileri inceleyebilirsiniz.
        </p>
      </div>

      <div className="bg-[#F6FAFE] border border-[#c4c6d2] mt-8 py-4 px-5 rounded-[10px]">
        <h2 className="text-[#444650] mb-2.5 uppercase font-semibold">
          Öneriler
        </h2>

        <div className="flex flex-col gap-4">
          <Suggestion
            icon={IoMegaphoneOutline}
            description="İlanınızı sosyal medya ve iş ağlarında paylaşarak görünürlüğü
            artırın."
          />

          <Suggestion
            icon={LuFileText}
            description="İlan açıklamasını detaylandırın; görev tanımı ve beklentiler net olsun."
          />

          <Suggestion
            icon={LuTag}
            description="Anahtar kelimeleri ve kategoriyi güncelleyerek arama sonuçlarında üst sıralara çıkın."
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyApplicants;
