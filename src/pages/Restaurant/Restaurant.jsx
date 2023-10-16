import Button from "@/widgets/Button/Button";
import Copy from "@/widgets/Tableandexport/Copy";
import Excel from "@/widgets/Tableandexport/Excel";
import Print from "@/widgets/Tableandexport/Print";
import Tables from "@/widgets/Tableandexport/Table";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Image, Input } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetRestaurantByNameQuery } from "../Redux/ReduxApi";

const Restaurant = () => {
  const [search, setsearch] = useState("");
  const [searched, setsearched] = useState("");
  const [searching, setsearcheding] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const tableRef = useRef(null);
  const id = 1;
  const pages = tableParams.pagination.current;
  const pageSize = tableParams.pagination.pageSize;

  const { data: restaurant, isFetching, refetch } = useGetRestaurantByNameQuery({
    id,
    searched,
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (restaurant?.totaldata) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: restaurant.totaldata,
        },
      }));
    }
  }, [restaurant]);

  const handleSearch = () => {
    refetch({ id, searched, pages, pageSize });
    setsearched(search);
  };
  const restdata = restaurant?.data;

  const headers = [
    "#",
    "Rest Id",
    "Name",
    "Created Date",
    "Expired Date",
    "Status",
    "Is Active",
  ];

  const tableData = restdata?.map((row, index) => [
    index + 1,
    row.RestID,
    row.Name,
    moment(row.CreadteDate).format("dddd LL"),
    moment(row.ExpiredDate).format("dddd LL"),
    row.Status === 1 ? "Active" : "Inactive",
    row.isActive ? "Active" : "Inactive",
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
      <div className="mx-6 mt-5 flex">
        <input
          label="Restaurant Name"
          className="font-sm text-md w-64 rounded-lg border-2 border-purple-800  capitalize placeholder:text-black "
          placeholder=" restaurant name"
          onChange={(e) => setsearch(e.target.value)}
        />

        <button
          className="font-sm mx-3 rounded-md bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 py-1.5 px-4 text-white decoration-white "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Link to={"/dashboard/add" + "?vendor=restaurant"}>
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
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex">
              <div className="mx-4 ml-auto mb-3">
                <Input.Search
                  className="w-48"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setsearcheding(e.target.value)}
                  onSearch={(value) => setsearch(value)}
                />
              </div>{" "}
            </div>
            <Tables
              data={restdata}
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  dataIndex: "i",
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "Rest Id",
                  dataIndex: "RestID",
                },
                {
                  title: "Logo",
                  dataIndex: ", Logo",
                  render: (data, Logo) => (
                    <Image
                      width={100}
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/logos/" +
                        Logo.Logo
                      }
                      alt={Logo}
                      style={{ maxWidth: "100px", cursor: "pointer" }}
                    />
                  ),
                },

                {
                  title: "Name",
                  dataIndex: ", Name",
                  render: (data, Name) => (
                    <>
                      {" "}
                      <Link to={`/dashboard/branches?restid=${Name.RestID}`}>
                        <div style={{ color: "#3c8dbc", cursor: "pointer" }}>
                          {Name.Name}
                        </div>
                      </Link>
                    </>
                  ),
                  filteredValue: [searching],
                  onFilter: (value, record) => {
                    return (
                      String(record.Name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.RestID)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.CreadteDate)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Created Date",
                  dataIndex: "CreadteDate",
                  render: (CreadteDate) =>
                    moment(CreadteDate).format("dddd LL"),
                },
                {
                  title: "Expired Date",
                  dataIndex: "ExpiredDate",
                  render: (ExpiredDate) =>
                    moment(ExpiredDate).format("dddd LL"),
                },
                {
                  title: "Status",
                  dataIndex: "Status",
                  render: (Status) =>
                    Status === 1 ? (
                      <div
                        style={{
                          backgroundColor: "rgb(36 110 49)",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "10px",
                          color: "white",
                          borderRadius: "5px",
                          width: "50px",
                        }}
                      >
                        Active
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#dd4b39",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "10px",
                          color: "white",
                          borderRadius: "5px",
                          width: "50px",
                        }}
                      >
                        Expired
                      </div>
                    ),
                },
                {
                  title: "Is Active",
                  dataIndex: "isActive",
                  render: (isActive) =>
                    isActive === true ? (
                      <div
                        style={{
                          backgroundColor: "rgb(36 110 49)",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "10px",
                          color: "white",
                          borderRadius: "5px",
                          width: "50px",
                        }}
                      >
                        Active
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#dd4b39",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "10px",
                          color: "white",
                          borderRadius: "5px",
                          width: "50px",
                        }}
                      >
                        Expired
                      </div>
                    ),
                },

                {
                  title: "Action",
                  dataIndex: "RestID",
                  render: (RestID) => (
                    <>
                      <Link to={`/erestaurant/${RestID}`}>
                        <MdOutlineModeEditOutline
                          size={20}
                          className="text-purple-700 "
                        />
                      </Link>
                    </>
                  ),
                },
              ]}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
            />
          </CardBody>
        </Card>
        <div style={{ display: "none" }}>
          <table ref={tableRef} id="myTable">
            <thead>
              <tr>
                {headers?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
