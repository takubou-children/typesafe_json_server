"use client";

import { useState, SetStateAction } from "react";
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
  Text,
} from "@yamada-ui/react";
import { PlusIcon } from "@yamada-ui/lucide";
import { useField } from "./hooks/useField";
import { useGeneratedJson } from "./hooks/useGeneratedJson";
import type { JsonType } from "@/app/types/field";
import { DownloadJson } from "./components/DownloadJson";
import { JsonField } from "./components/JsonField";
export default function FlexibleJsonGenerator() {
  const [arrayName, setArrayName] = useState("items");
  const { fields, addField, updateField, removeField } = useField();
  const { generatedJson, setGeneratedJson } = useGeneratedJson();
  const generateJson = () => {
    const TranceJsonServerObject: JsonType = {
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
          // eslint-disable-next-line
        }, {} as Record<string, any>),
      ],
    };
    setGeneratedJson(JSON.stringify(TranceJsonServerObject, null, 2));
  };

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
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setArrayName(e.target.value)
                }
                placeholder='配列名を入力'
              />
            </HStack>
            <Card w='full'>
              <CardHeader>
                <Heading size='md'>フィールド</Heading>
              </CardHeader>
              <CardBody>
                <JsonField
                  fields={fields}
                  updateField={updateField}
                  removeField={removeField}
                />
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
            <Button
              onClick={generateJson}
              disabled={
                arrayName.length === 0 || fields.some((field) => !field.key)
              }
              colorScheme='purple'
              flex={1}
            >
              JSONを生成
            </Button>
            <DownloadJson generatedJson={generatedJson} arrayName={arrayName} />
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
