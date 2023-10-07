// import React from "react";
import React, { useEffect, useState } from "react";
import { DataGrid, GridPagination, GridToolbar } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

const ReusableDataGrid = ({
  rows,
  columns,
  rowCount,
  isLoading,
  paginationModel,
  setPaginationModel,
  slotsdata,
}) => {
  const CustomLoadingOverlay = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h3>Loading...</h3>
    </div>
  );

  const CustomNoRowsOverlay = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h3>No Data...</h3>
    </div>
  );

  const [filterModel, setFilterModel] = React.useState({
    items: [],
  });


  return (
    <div>
    
        <DataGrid sx={{border: 0} }
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={isLoading}
          pagination
          pageSizeOptions={[5, 10, 25]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            pagination: slotsdata,
            toolbar: GridToolbar,
            loadingOverlay: CustomLoadingOverlay,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter
          disableExport
          disableColumnSelector
          disableDensitySelector
          // disableReorder
          // slots={{ toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          // slotProps={{ toolbar: { showQuickFilter: true } }}
        />
    
    </div>
  );
};

export default ReusableDataGrid;
