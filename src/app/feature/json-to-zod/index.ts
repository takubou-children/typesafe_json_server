import fs from "fs";
import path from "path";
import { generateZodSchemas } from "./generateZodSchema";

const inputFilePath = path.resolve(__dirname, "../input.json");
const outputFilePath = path.resolve(__dirname, "../output.ts");

try {
  const jsonContent = fs.readFileSync(inputFilePath, "utf-8");
  const parsedJson = JSON.parse(jsonContent);

  if (typeof parsedJson !== "object" || Array.isArray(parsedJson)) {
    throw new Error("Input JSON must be an object.");
  }
  //eslint-disable-next-line
  const schema = generateZodSchemas(parsedJson as Record<string, any>);

  fs.writeFileSync(outputFilePath, `import { z } from "zod";\n\n ${schema};\n`);
  console.log("Zod schema has been generated successfully!");
} catch (error) {
  console.error("Error generating Zod schema:", error);
}
