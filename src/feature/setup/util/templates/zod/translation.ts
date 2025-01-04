import { JSONObject, JSONValue } from "../../../types/json";

const parseValue = (value: JSONValue): string => {
  if (value === null) return "z.null()";
  if (typeof value === "string") {
    if (isISODate(value)) return "z.string().datetime()"; // ISO8601形式の日付チェック
    return "z.string()";
  }
  if (typeof value === "number") return "z.number()";
  if (typeof value === "boolean") return "z.boolean()";
  if (Array.isArray(value)) {
    return "z.array(z.any())";
  }
  if (typeof value === "object") {
    return parseObject(value);
  }
  return "z.any()";
};

const parseObject = (obj: JSONObject): string => {
  const entries = Object.entries(obj)
    .map(([key, value]) => `${key}: ${parseValue(value)}`)
    .join(", ");
  return `z.object({ ${entries} })`;
};

const isISODate = (value: string): boolean => {
  return !isNaN(Date.parse(value));
};
export { parseValue, parseObject, isISODate };
