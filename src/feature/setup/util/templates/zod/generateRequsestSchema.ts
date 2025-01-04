import { JSONObject, JSONValue } from "../../../types/json";
import { parseObject } from "./translation";

export function generateRequsestSchema(json: JSONObject) {
  const schemas: string[] = [];

  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      // 配列の場合、その中のオブジェクトをスキーマに
      if (
        value.length > 0 &&
        typeof value[0] === "object" &&
        !Array.isArray(value[0])
      ) {
        //最初のobj idを取り除いた型を生成
        const req = schemas.push(
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
