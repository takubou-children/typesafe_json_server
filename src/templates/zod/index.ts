import fs from "fs";
import path from "path";
import { generateZodSchemas } from "./generateZodSchema";

export const gen_zod = (generatedJson: string) => {
  const outputFilePath = path.resolve(__dirname, "../output/zodSchema.ts");
  try {
    const data = JSON.parse(generatedJson);
    if (typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Input JSON must be an object.");
    }
    //eslint-disable-next-line
    const schema = generateZodSchemas(data as Record<string, any>);
    fs.writeFileSync(
      outputFilePath,
      `import { z } from "zod";\n\n ${schema};\n`
    );
    console.log("Zod schema has been generated successfully!");
  } catch (error) {
    console.error("Error generating Zod schema:", error);
  }
};
