import { Button } from "@yamada-ui/react";
import { JsonType } from "../types/field";
type PropsType = {
  arrayName: string;
  generatedJson: string;
};

const download = (jsonObject: JsonType, arrayName: string) => {
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
};

const DownloadJson = (props: PropsType) => {
  const { arrayName, generatedJson } = props;

  const handleDownload = () => {
    try {
      const jsonObject = JSON.parse(generatedJson);
      download(jsonObject, arrayName);
    } catch (error) {
      console.error("Invalid JSON:", error);
      alert("無効なJSON形式です。");
    }
  };
  return (
    <>
      <Button onClick={handleDownload} colorScheme='teal' flex={1}>
        JSONをダウンロード
      </Button>
    </>
  );
};

export { DownloadJson };
