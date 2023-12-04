// import xlsx, { IJsonSheet } from "json-as-xlsx";
// import { people } from "@/people";

// export function downloadToExcel() {
//   let columns: IJsonSheet[] = [
//     {
//       sheet: "Persons",
//       columns: [
//         { label: "Person ID", value: "id" },
//         { label: "First Name", value: "first_name" },
//         { label: "Last Name", value: "last_name" },
//         { label: "Email", value: "email" },
//         { label: "Gender", value: "gender" },
//         {
//           label: "Date of Birth",
//           value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
//         },
//       ],
//       content: people,
//     },
//   ];

//   let settings = {
//     fileName: "People Excel",
//   };

//   xlsx(columns, settings);
// }

import xlsx, { IJsonSheet } from "json-as-xlsx";

interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IContent {
  [key: string]: string | number; // Define the expected keys and their types here
}
export function downloadToExcel<TData extends Person>(
  data: TData[], 
  fileName: string, 
  sheetName: string
) {
  const content: IContent[] = data.map((person) => ({
    id: person.id,
    name: person.name,
    email: person.email,
    role: person.role,
  }));

  let columns: IJsonSheet[] = [
    {
      sheet: sheetName,
      columns: [
        { label: "Person ID", value: "id" },
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role" },
      ],
      content: content,
    },
  ];

  let settings = {
    fileName: fileName,
  };

  xlsx(columns, settings);
}
