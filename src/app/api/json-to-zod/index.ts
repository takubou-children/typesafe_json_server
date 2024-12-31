import fs from "fs";
import path from "path";
import { generateZodSchemas } from "./generateZodSchema";
const json = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../input.json"), "utf8")
);

const outputFilePath = path.resolve(__dirname, "../output.ts");

try {
  if (typeof json !== "object" || Array.isArray(json)) {
    throw new Error("Input JSON must be an object.");
  }
  //eslint-disable-next-line
  const schema = generateZodSchemas(json as Record<string, any>);

  fs.writeFileSync(outputFilePath, `import { z } from "zod";\n\n ${schema};\n`);
  console.log("Zod schema has been generated successfully!");
} catch (error) {
  console.error("Error generating Zod schema:", error);
}
