type ValueType = "string" | "number" | "boolean" | "date" | "time" | "datetime";

interface Field {
  key: string;
  type: ValueType;
  value: string;
}
export type { Field, ValueType };
