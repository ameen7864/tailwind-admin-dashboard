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
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useDeleteOfferMutation,
  useGetOfferByNameQuery,
} from "../Redux/ReduxApi";
import { IconButton } from "@mui/material";

const Offers = () => {
  const [search, setsearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const tableRef = useRef(null);
  const pages = tableParams.pagination.current;
  const pageSize = tableParams.pagination.pageSize;
  const { data: offer, isFetching } = useGetOfferByNameQuery({
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  const [deleteItem] = useDeleteOfferMutation();
  const handleDeleteItem = async (id) => {
    try {
      const result = await deleteItem(id);
      if (result.data) {
        alert(result.data.Message);
      } else {
        alert("Unknown success message");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  useEffect(() => {
    if (offer?.totalcount) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: offer.totalcount,
        },
      }));
    }
  }, [offer]);
  const restdata = offer?.data;

  const headers = ["#", "name", "Status", "Created Date", "Duration"];

  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.name,
    item.isActive ? "active" : "unactive",
    moment(item.creadteDate).format("L"),
    moment(item.creadteDate).format("L") - moment(item.expiredDate).format("L"),
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
      {" "}
      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Link to={"/dashboard/addoffer"}>
          <Button name={"Add offer"} />
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
              Offers Table
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex">
              <div className="mx-4 ml-auto mb-3">
                <Input.Search
                  className="w-48"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setsearch(e.target.value)}
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
                  render: (text, record, index) =>  (pages - 1) * pageSize + index + 1,
                  sorter: (a, b) => a.i - b.i,
                },
                {
                  title: "Name",
                  dataIndex: "name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return (
                      String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.creadteDate)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Image En",
                  dataIndex: "ImageEn",
                  render: (ImageEn) => (
                    <Image
                      width={80}
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/media/" +
                        ImageEn
                      }
                    />
                  ),
                },
                {
                  title: "Image Ar",
                  dataIndex: "ImageAR",
                  render: (ImageAR) => (
                    <Image
                      width={80}
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/media/" +
                        ImageAR
                      }
                    />
                  ),
                },

                {
                  title: "Status",
                  dataIndex: "Status",
                  sorter: (a, b) => a.Status - b.Status,
                  render: (Status) =>
                    Status === true ? (
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
                  title: "Created Date",
                  dataIndex: "createdDate",
                  sorter: (a, b) =>
                    new Date(a.createdDate) - new Date(b.createdDate),
                  render: (createdDate) => moment(createdDate).format("L"),
                },
                {
                  title: "Duration",
                  dataIndex: "expiredDate ,createdDate ",
                  render: (expiredDate, createdDate) => {
                    return (
                      <span>
                        {moment(createdDate.createdDate).format("L")} -{" "}
                        {moment(createdDate.expiredDate).format("L")}
                      </span>
                    );
                  },
                },
                {
                  title: "Delete",
                  dataIndex: "id",
                  render: (id) => (
                    <IconButton>
                      <MdDelete
                        fontSize="meduim"
                        color="inherit"
                        style={{ cursor: "pointer", color: "#dd4b39" }}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure to delete this record?"
                            )
                          ) {
                            handleDeleteItem(id);
                          }
                        }}
                      />
                    </IconButton>
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

export default Offers;
