"use client";

import { useState, useCallback, SetStateAction } from "react";
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
import { useField } from "./hooks/useField";
import { useGeneratedJson } from "./hooks/useGeneratedJson";
import type { JsonType } from "@/app/types/field";
export default function FlexibleJsonGenerator() {
  const [arrayName, setArrayName] = useState("items");
  const { fields, addField, removeField, updateField } = useField();
  const { generatedJson, setGeneratedJson } = useGeneratedJson();
  const generateJson = () => {
    //eslint-disable-next-line
    const jsonObject: JsonType = {
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

  const downloadJson = useCallback(
    (jsonObject: JsonType) => {
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
    },
    [arrayName, fields]
  );

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
