"use client";

import { useState, useCallback } from "react";
import {
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  NativeSelect,
  Text,
} from "@yamada-ui/react";
import { PlusIcon, DeleteIcon } from "@yamada-ui/lucide";

type ValueType = "string" | "number" | "boolean" | "date" | "time" | "datetime";

interface Field {
  key: string;
  type: ValueType;
  value: string;
}

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
const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
export default function FlexibleJsonGenerator() {
  const [arrayName, setArrayName] = useState("items");
  const [fields, setFields] = useState<Field[]>([
    { key: "id", type: "string", value: generateRandomString(8) },
  ]);
  const [generatedJson, setGeneratedJson] = useState("");

  const addField = () => {
    setFields([
      ...fields,
      { key: "", type: "string", value: generateSampleValue("string") },
    ]);
  };

  const removeField = (index: number) => {
    if (index === 0) return; // Prevent removing the 'id' field
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const updateField = (index: number, field: "key" | "type", value: string) => {
    const newFields = [...fields];
    if (field === "type") {
      newFields[index].type = value as ValueType;
      newFields[index].value = generateSampleValue(value as ValueType);
    } else {
      newFields[index][field] = value;
    }
    setFields(newFields);
  };

  const generateJson = () => {
    const jsonObject: { [key: string]: any[] } = {
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
        }, {} as Record<string, any>),
      ],
    };
    setGeneratedJson(JSON.stringify(jsonObject, null, 2));
  };

  const downloadJson = useCallback(() => {
    const jsonObject = {
      [arrayName]: [
        fields.reduce((acc, field) => {
          if (field.key) {
            acc[field.key] = field.value;
          }
          return acc;
        }, {} as Record<string, any>),
      ],
    };
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${arrayName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [arrayName, fields]);

  return (
    <Box maxW='container.xl' mx='auto' py={8}>
      <Card>
        <CardHeader>
          <Heading size='lg'>JSON_Serverジェネレーター</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={8}>
            <HStack w='full'>
              <Text>配列名：</Text>
              <Input
                value={arrayName}
                onChange={(e) => setArrayName(e.target.value)}
                placeholder='配列名を入力'
              />
            </HStack>
            <Card w='full'>
              <CardHeader>
                <Heading size='md'>フィールド</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {fields.map((field, index) => (
                    <HStack key={index} w='full'>
                      <Input
                        placeholder='キー'
                        value={field.key}
                        onChange={(e) =>
                          updateField(index, "key", e.target.value)
                        }
                        isReadOnly={index === 0}
                      />
                      <NativeSelect
                        value={field.type}
                        onChange={(e) =>
                          updateField(index, "type", e.target.value)
                        }
                        isDisabled={index === 0}
                      >
                        <option value='string'>文字列</option>
                        <option value='number'>数値</option>
                        <option value='boolean'>真偽値</option>
                        <option value='date'>日付</option>
                        <option value='time'>時間</option>
                        <option value='datetime'>日時</option>
                      </NativeSelect>
                      <Input value={field.value} isReadOnly />
                      {index !== 0 && (
                        <IconButton
                          aria-label='フィールドを削除'
                          icon={<DeleteIcon />}
                          colorScheme='red'
                          variant='ghost'
                          onClick={() => removeField(index)}
                        />
                      )}
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
            <Button
              leftIcon={<PlusIcon />}
              onClick={addField}
              colorScheme='green'
            >
              フィールドを追加
            </Button>
          </VStack>
        </CardBody>
        <CardFooter flexDirection='column' alignItems='stretch'>
          <HStack mb={4}>
            <Button onClick={generateJson} colorScheme='purple' flex={1}>
              JSONを生成
            </Button>
            <Button onClick={downloadJson} colorScheme='teal' flex={1}>
              JSONをダウンロード
            </Button>
          </HStack>
          <Textarea
            value={generatedJson}
            readOnly
            placeholder='生成されたJSONがここに表示されます'
            minH='300px'
          />
        </CardFooter>
      </Card>
    </Box>
  );
}
