import { useState } from "react";
import { Field, ValueType } from "../types/field";
import { generateRandomString, generateSampleValue } from "./useGeneratedJson";

export const useField = () => {
  const [fields, setFields] = useState<Field[]>([
    { key: "id", type: "string", value: generateRandomString(8) },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      { key: "", type: "string", value: generateSampleValue("string") },
    ]);
  };

  const removeField = (index: number) => {
    if (index === 0) return; // Prevent removing the 'id' field
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const updateField = (index: number, field: "key" | "type", value: string) => {
    const newFields = [...fields];
    if (field === "type") {
      newFields[index].type = value as ValueType;
      newFields[index].value = generateSampleValue(value as ValueType);
    } else {
      newFields[index][field] = value;
    }
    setFields(newFields);
  };

  return {
    addField,
    removeField,
    updateField,
    fields,
  };
};
