import Label from "../Label";
const NumberInput = () => {
  return (
    <>
      <Label htmlFor="preview" label="Öz İzleme" />
      <div className="candidate-question-input opacity-50 pointer-events-none w-max pe-6!">
        Aday bir sayı girer
      </div>
    </>
  );
};

export default NumberInput;
