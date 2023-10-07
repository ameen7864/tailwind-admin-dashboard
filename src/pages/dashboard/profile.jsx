import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "age", headerName: "Age", type: "number" },
];

const rows = [
  { id: 1, name: "ameen", email: "randomEmail", age: 25 },
  { id: 2, name: "ameen", email: "randomEmail", age: 36 },
  { id: 3, name: "ameen", email: "randomEmail", age: 19 },
  { id: 4, name: "ameen", email: "randomEmail", age: 28 },
  { id: 5, name: "ameen", email: "randomEmail", age: 23 },
  { id: 6, name: "ameen", email: "randomEmail", age: 27 },
  { id: 7, name: "ameen", email: "randomEmail", age: 18 },
  { id: 8, name: "ameen", email: "randomEmail", age: 31 },
  { id: 9, name: "ameen", email: "randomEmail", age: 24 },
  { id: 10, name: "ameen", email: "randomEmail", age: 35 },
];

export function Profile() {
  const [filterModel, setFilterModel] = React.useState({
    items: [],
  });

  

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ height: 400 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          disableColumnFilter
          disableExport
          disableColumnSelector
          disableDensitySelector
          disableReorder
          slots={{ toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>
    </Box>
  );
}
export default Profile;
