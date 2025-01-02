import { JSONObject } from "@/app/types/json";

export function generateTableComponent(
  json: JSONObject
  //   outputFileName: string
): void {
  if (
    !json.schedules ||
    !Array.isArray(json.schedules) ||
    json.schedules.length === 0
  ) {
    throw new Error("Invalid JSON: 'schedules' array is required.");
  }

  const exampleData = json.schedules[0] as JSONObject;
  const columns = Object.keys(exampleData)
    .map(
      (key) =>
        `{ header: "${
          key[0].toUpperCase() + key.slice(1)
        }", accessorKey: "${key}" }`
    )
    .join(",\n    ");

  const componentTemplate = `
import { Button } from "@yamada-ui/react";
import { Table } from "@yamada-ui/table";
import { useNavigate } from "react-router-dom";
import { Center } from "@yamada-ui/react";

export const MovieTable = () => {
  const { movies } = useMovies();

  const router = useNavigate();
  const columns = [
    ${columns},
    {
      header: "Edit",
      accessorKey: "edit",
      cell: (info: any) => (
        <Button
          onClick={() => {
            router(\`/movies/\${info.row.original.id}\`);
          }}
        >
          詳細/編集
        </Button>
      ),
    },
    {
      header: "Delete",
      accessorKey: "delete",
      cell: (info: any) => (
        <Button
          style={{
            width: "50%",
            height: "30px",
            borderRadius: "3px",
            backgroundColor: "#ffa9a9",
          }}
          onClick={() => {
            // deleteMovie(info.row.original.id);
            window.location.reload();
          }}
        >
          削除
        </Button>
      ),
    },
  ];

  return (
    <>
      <Center
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          padding: "0 50px",
          boxSizing: "border-box",
        }}
      >
        <Table columns={columns} data={movies} />
      </Center>
    </>
  );
};
`;
  console.log(componentTemplate.trim());
  //   fs.writeFileSync(outputFileName, componentTemplate.trim());
}
