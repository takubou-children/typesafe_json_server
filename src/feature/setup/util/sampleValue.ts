import { ValueType } from "../types/field";

export const generateSampleValue = (type: ValueType): string => {
  switch (type) {
    case "string":
      return "text";
    case "number":
      return "42";
    case "boolean":
      return "true";
    case "date":
      return "2024-12-24";
    case "time":
      return "14:30:00";
    case "datetime":
      return "2024-12-24T14:30:00";
    default:
      return "";
  }
};
