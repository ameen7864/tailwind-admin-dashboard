import ReusableDataGrid from "@/widgets/Tableandexport/Table";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import MuiPagination from "@mui/material/Pagination";
import { GridPagination } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
export function Restaurant() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${paginationModel.page}&_limit=${paginationModel.pageSize}`
      );
      const data = await response.json();
      setRows(data);
      const totalCount = Number(response.headers.get("X-Total-Count"));
      setRowCount(totalCount || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel.page, paginationModel.pageSize]);

  function Pagination({ page, onPageChange, className }) {
    const pageCount = Math.ceil(rowCount / paginationModel?.pageSize);

    return (
      <MuiPagination
        color="secondary"
        className={className}
        count={pageCount}
        page={page + 1}
        Loading
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "completed",
      headerName: "Status",
      
      renderCell: (params) => (
        
        <Chip
          variant="gradient"
          color={params.value ? "green" : "blue-gray"}
          value={ "online"}
          className="py-0.5 px-2 text-[11px] font-medium"
        />
      ),
    },

  ];

  

  return (
    // <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">x`

    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 h-[calc(100vh_-_120px)]">
          <ReusableDataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            isLoading={isLoading}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            slotsdata={CustomPagination}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Restaurant;
