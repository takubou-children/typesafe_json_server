"use client";

import { SetStateAction } from "react";
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
import { useField } from "@/hooks/useField";
import { useGeneratedJson } from "@/useGeneratedJson";
import { DownloadJson } from "@/DownloadJson";
import { JsonField } from "@/components/JsonField";
import { useArrayName } from "@/hooks/useArrayName";
export default function Setup() {
  const { arrayName, handleArrayNameChange } = useArrayName();
  const { fields, addField, updateField, removeField } = useField();
  const { generateJson, jsonData } = useGeneratedJson();

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
                  handleArrayNameChange(e.target.value as string)
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
            <Button onClick={generateJson} colorScheme='purple' flex={1}>
              JSONを生成
            </Button>
            <DownloadJson generatedJson={jsonData} arrayName={arrayName} />
          </HStack>
          <Textarea
            value={jsonData}
            readOnly
            placeholder='生成されたJSONがここに表示されます'
            minH='300px'
          />
        </CardFooter>
      </Card>
    </Box>
  );
}
