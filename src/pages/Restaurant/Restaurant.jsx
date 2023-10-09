import Button from "@/widgets/Button/Button";
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
import { Link } from "react-router-dom";
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
        // `https://webadmin.requeue.com/WebAdmin/getallrestro?id=1&searchText=&page=${paginationModel.page}&pagelimit=${paginationModel.pageSize}`
      );
      const data = await response.json();
      console.log(data.data);
      setRows(data);
      const totalCount = data.totaldata;
      setRowCount(totalCount || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const rows = [
  //   { id: 1, name: 'John Doe', age: 30 },
  //   { id: 2, name: 'Jane Doe', age: 25 },
  //   // ... other rows with unique ids
  // ];
  // console.log(rows);
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
    { field: "RestID", headerName: "RestID" },
    {
      field: "Name",
      headerName: "Status",

      renderCell: (params) => (
        <Chip
          variant="gradient"
          color={params.value ? "green" : "blue-gray"}
          value={"online"}
          className="py-0.5 px-2 text-[11px] font-medium"
          Purple
        />
      ),
    },
  ];

  return (
    // <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">x`
    <>
      <hr className="mt-4"/>
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Button name={"print"} />
          <Button name={"print"} />
          <Button name={"print"} />
          <Button name={"print"} />
        </div>
        <Link to="/dashboard/add?restaurant">
        <Button name={"Add Restaurant"} />
        </Link>
      </div>
      <div className="mt-6mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Restaurant Table
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
    </>
  );
}

export default Restaurant;
