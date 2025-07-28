import { useMemo } from "react";
import * as Yup from "yup";

type ValidationItem = {
  control: boolean;
  validationData?: object[];
  validationMessage?: string;
  key: string;
  manualValidation?: Yup.StringSchema | undefined;
};

const useValidationSchema = ({ props }: { props: ValidationItem[] }) => {
  const validationSchema = useMemo(() => {
    const shape: Record<string, Yup.AnySchema> = {};

    props.forEach(
      ({
        control,
        validationData,
        validationMessage,
        manualValidation,
        key,
      }) => {
        if (control) {
          if (validationData?.length) {
            validationData?.forEach((_, j) => {
              shape[`${key}_${j}`] = Yup.string()
                .required(validationMessage)
                .label(`${key}_${j} alanı`);
            });
          } else {
            if (manualValidation) shape[key] = manualValidation;
          }
        }
      }
    );

    return Yup.object().shape(shape);
  }, [props]);

  return validationSchema;
};

export default useValidationSchema;
