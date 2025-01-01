"use client";
import { useState } from "react";
import { JsonType, ValueType } from "../types/field";
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
    generateRandomString,
    generateSampleValue,
    generateJson,
    jsonData,
  };
};

const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const generateSampleValue = (type: ValueType): string => {
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

export { generateRandomString, generateSampleValue };
