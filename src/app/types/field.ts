type ValueType = "string" | "number" | "boolean" | "date" | "time" | "datetime";

interface Field {
  key: string;
  type: ValueType;
  value: string;
}

type JsonType = {
  //eslint-disable-next-line
  [key: string]: any[];
};

export type { Field, ValueType, JsonType };
