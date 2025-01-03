import { useState } from "react";
import { JsonType } from "../types/field";
import { useField } from "./useField";
import { useArrayName } from "./useArrayName";

export const useGeneratedJson = () => {
  const [jsonData, setJsonData] = useState("");
  const { fields } = useField();
  const { arrayName } = useArrayName();

  const generateJson = () => {
    const TranceJsonServerObject: JsonType = {
      [arrayName]: [
        fields.reduce((acc, field) => {
          if (field.key) {
            if (field.type === "number") {
              acc[field.key] = Number(field.value);
            } else if (field.type === "boolean") {
              acc[field.key] = field.value === "true";
            } else {
              acc[field.key] = field.value;
            }
          }
          return acc;
          // eslint-disable-next-line
        }, {} as Record<string, any>),
      ],
    };
    setJsonData(JSON.stringify(TranceJsonServerObject, null, 2));
  };
  return {
    generateJson,
    jsonData,
  };
};
