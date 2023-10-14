// import * as React from "react";
// import Box from "@mui/material/Box";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// // import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";

// const columns = [
//   { field: "id", headerName: "ID", width: 80 },
//   { field: "name", headerName: "Name", width: 150 },
//   { field: "email", headerName: "Email", width: 150 },
//   { field: "age", headerName: "Age", type: "number" },
// ];

// const rows = [
//   { id: 1, name: "ameen", email: "randomEmail", age: 25 },
//   { id: 2, name: "ameen", email: "randomEmail", age: 36 },
//   { id: 3, name: "ameen", email: "randomEmail", age: 19 },
//   { id: 4, name: "ameen", email: "randomEmail", age: 28 },
//   { id: 5, name: "ameen", email: "randomEmail", age: 23 },
//   { id: 6, name: "ameen", email: "randomEmail", age: 27 },
//   { id: 7, name: "ameen", email: "randomEmail", age: 18 },
//   { id: 8, name: "ameen", email: "randomEmail", age: 31 },
//   { id: 9, name: "ameen", email: "randomEmail", age: 24 },
//   { id: 10, name: "ameen", email: "randomEmail", age: 35 },
// ];

// export function Profile() {
//   const [filterModel, setFilterModel] = React.useState({
//     items: [],
//   });

  

//   return (
//     <Box sx={{ width: 1 }}>
//       <Box sx={{ height: 400 }}>
//         <DataGrid
//           columns={columns}
//           rows={rows}
//           disableColumnFilter
//           disableExport
//           disableColumnSelector
//           disableDensitySelector
//           disableReorder
//           slots={{ toolbar: GridToolbar }}
//           filterModel={filterModel}
//           onFilterModelChange={(newModel) => setFilterModel(newModel)}
//           slotProps={{ toolbar: { showQuickFilter: true } }}
//         />
//       </Box>
//     </Box>
//   );
// }
// export default Profile;



// mport CustomTable from "@/Table/Anttable";
// import { Empty, Spin, Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { LoadingOutlined } from "@ant-design/icons";
// const Restaurant = () => {
//   const [data, setData] = useState([]);
//   const [loading, setloading] = useState(true);
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/todos/")
//       .then((response) => response.json())
//       .then((apiData) => {
//         setData(apiData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   const columns = [
//     {
//       title: "#",
//       dataIndex: "i",
//     },
//     {
//       title: "Rest Id",
//       dataIndex: "id",
//     },
//   ];
//   const customEmptyText = (
//     <Empty
//       style={{
//         display: "flex",
//         height: "70vh",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//       image={
//         <img
//           src={
//             "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
//           }
//           alt="Custom Loader"
//         />
//       }
//       description={
//         <div>
//           <div>{"Custom Loader Text"}</div>
//         </div>
//       }
//     />
//   );
//   const antIcon = (
//     <LoadingOutlined
//       style={{
//         fontSize: 24,
//       }}
//       spin
//     />
//   );
//   <Spin indicator={antIcon} />;
//   // Define a custom loading spinner component
//   const customLoader = (
//     // <Spin indicator={antIcon} />;
//     <Spin indicator={antIcon} tip="Loading..." size="large">
//       {loading && <div style={{ minHeight: 200 }}></div>}
//     </Spin>
//   );
//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={data}
//         // pagination={pagination}
//         loading={false} // Remove the default loading from Antd Table
//         // onChange={onChange}
//         locale={{
//           emptyText: customEmptyText,
//           // Add the custom loader to the locale configuration
//           filterConfirm: customLoader,
//           filterReset: customLoader,
//           emptyText: customLoader,
//         }}
//       />
//       {/* <CustomTable columns={columns} dataSource={data} /> */}
//     </div>
//   );
// };
// export default Restaurant;


import React from 'react'

export function Profile()  {
  return (
    <div>profile</div>
  )
}

export default Profile
