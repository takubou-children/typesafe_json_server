"use client";
import { useState } from "react";
import { ValueType } from "../types/field";

export const useGeneratedJson = () => {
  const [generatedJson, setGeneratedJson] = useState("");

  return {
    generateRandomString,
    generateSampleValue,
    generatedJson,
    setGeneratedJson,
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
