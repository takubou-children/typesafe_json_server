import { DeleteIcon } from "@yamada-ui/lucide";
import {
  VStack,
  HStack,
  Input,
  NativeSelect,
  IconButton,
} from "@yamada-ui/react";
import React from "react";
import { useField } from "../hooks/useField";

export const JsonField = () => {
  const { fields, updateField, removeField } = useField();
  return (
    <>
      <VStack spacing={4}>
        {fields.map((field, index) => (
          <HStack key={index} w='full'>
            <Input
              placeholder='キー'
              value={field.key}
              onChange={(e: { target: { value: string } }) =>
                updateField(index, "key", e.target.value)
              }
              isReadOnly={index === 0}
            />
            <NativeSelect
              value={field.type}
              onChange={(e: { target: { value: string } }) =>
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
    </>
  );
};