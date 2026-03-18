import Label from "../Label";

const SelectInput = () => {
  const previewInputs = Array.from({ length: 2 }, (_, k) => k);

  return (
    <div>
      <Label htmlFor="preview" label="Ön İzleme" />

      <div className="flex items-center gap-4">
        {previewInputs.map((val) => {
          const isValEqualZero = val === 0;
          const labelValue = isValEqualZero ? "Evet" : "Hayır";
          const htmlForValue = isValEqualZero ? "yes" : "no";

          return (
            <div className="flex items-center gap-2" key={val}>
              <button className="w-4 h-4 border border-[#dee2e4] rounded-full cursor-not-allowed!" />
              <Label
                htmlFor={htmlForValue}
                label={labelValue}
                className="mb-0! font-normal!"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectInput;
