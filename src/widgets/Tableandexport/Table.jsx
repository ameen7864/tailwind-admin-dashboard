//   const CustomLoadingOverlay = () => (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//       }}
//     >
//    <div class="loader"></div>
//     </div>
//   );

//   const CustomNoRowsOverlay = () => (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//       }}
//     >
//       <h3>No Data...</h3>
//     </div>
//   );

//   // const [filterModel, setFilterModel] = useState({
//   //   items: [],
//   // });

//   // const getRowId = () => rows.id;
// console.log(rowCount);
//   return (
//     <div >
//       <DataGrid
//         sx={{ border: 0 }}
//         rows={rows}
//         columns={columns}
//         rowCount={rowCount}
//         loading={isLoading}
//         pagination
//         // getRowId={getRowId}
//         pageSizeOptions={[5, 10, 25]}
//         paginationMode="server"
//         paginationModel={paginationModel}
//         onPaginationModelChange={setPaginationModel}
//         slots={{
//           pagination: slotsdata,
//           toolbar: GridToolbar,
//           loadingOverlay: CustomLoadingOverlay,
//           noRowsOverlay: CustomNoRowsOverlay,
//         }}
//         slotProps={{
//           toolbar: {
//             showQuickFilter: true,
//           },
//         }}
//         disableColumnFilter
//         disableExport // Disable export button
//         disableColumnSelector
//         disableDensitySelector
//         autoHeight
//         autoWidth
//         // filterModel={filterModel}
//         // onFilterModelChange={(newModel) => setFilterModel(newModel)}
//       />
//     </div>
//   );
// };

// export default ReusableDataGrid;
import { Empty, Spin, Table } from "antd";
import { Loader } from "../Button/Button";
import  nodata  from "./nodata.gif";

const Tables = ({ data, loading, columns, pagination, onChange }) => {
  const customEmptyText = (
    <Empty
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
      }}

      image={<img src={nodata} alt="Custom Loader"   style={{height:"300px"}}    className="h-[300px] object-cover w-fit;" />}
     
    />
  );

  const customLoader = (
    <Spin indicator={<Loader />} size="large">
      {loading && <div style={{ minHeight: 200 }}></div>}
    </Spin>
  );

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={false}
        onChange={onChange}
        locale={{
          // emptyText: customEmptyText,
          filterConfirm: customLoader,
          filterReset: customLoader,
          emptyText: loading ? customLoader : customEmptyText,
        }}
      />
    </div>
  );
};

export default Tables;
