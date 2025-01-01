import React from "react";

export const useArrayName = () => {
  const [arrayName, setArrayName] = React.useState("items");
  const handleArrayNameChange = (value: string) => {
    setArrayName(value);
  };

  return { arrayName, handleArrayNameChange };
};
