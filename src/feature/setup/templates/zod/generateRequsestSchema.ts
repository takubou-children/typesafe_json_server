import { JSONObject, JSONValue } from "@/app/types/json";

export function generateZodSchemas(json: JSONObject): string {
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

  const schemas: string[] = [];

  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      // 配列の場合、その中のオブジェクトをスキーマに
      if (
        value.length > 0 &&
        typeof value[0] === "object" &&
        !Array.isArray(value[0])
      ) {
        schemas.push(
          `export const ${key}Schema = ${parseObject(value[0] as JSONObject)};`
        );
      } else {
        throw new Error("Array must contain an object.");
      }
      // 単一のオブジェクトの場合
    } else if (typeof value === "object" && value !== null) {
      throw new Error("Object must not be an array.");
    }
  }

  return schemas.join("\n\n");
}
