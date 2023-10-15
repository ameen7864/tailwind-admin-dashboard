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
import { MdDelete, MdOutlineModeEditOutline, MdPrint } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useGetInvoiceByNameQuery,
  useGetOfferByNameQuery,
  useGetVocherByNameQuery,
} from "../Redux/ReduxApi";
import { IconButton } from "@mui/material";

const Voucher = () => {
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

  const { data: vocher, isFetching } = useGetVocherByNameQuery();

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (vocher?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: vocher.count,
        },
      }));
    }
  }, [vocher]);
  const restdata = vocher?.data;

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
            <div className="flex justify-between">
              <Typography variant="h6" color="white">
                Sales
              </Typography>
          
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 h-[calc(100vh_-_120px)]">
            <div className="flex">
              <div className="ml-auto mx-4 mb-3">
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
                  dataIndex: "i",
                  sorter: (a, b) => a.i - b.i,
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Code",
                  dataIndex: "code",
                  sorter: (a, b) => a.code.localeCompare(b.code),
                },
                {
                  title: "Created Date",
                  dataIndex: "createdDate",
                  sorter: (a, b) =>
                    new Date(a.createdDate) - new Date(b.createdDate),
                  render: (createdDate) =>
                    moment(createdDate).format("dddd LL"),
                },

                {
                  title: "Max Usage",
                  dataIndex: "maximumUse",
                  sorter: (a, b) => a.maximumUse - b.maximumUse,
                },

                {
                  title: "Start Date",
                  dataIndex: "startDate",
                  sorter: (a, b) =>
                    new Date(a.startDate) - new Date(b.startDate),
                  render: (startDate) =>
                    moment(startDate).format("dddd LL"),
                },
                {
                  title: "Expired Date",
                  dataIndex: "expiredDate",
                  sorter: (a, b) =>
                    new Date(a.expiredDate) - new Date(b.expiredDate),
                  render: (expiredDate) =>
                    moment(expiredDate).format("dddd LL"),
                },  {
                  title: "Total Used",
                  dataIndex: "totalUsed",
                  sorter: (a, b) => a.totalUsed - b.totalUsed,
                },
                {
                  title: "Comment",
                  dataIndex: "comment",
                  sorter: (a, b) => a.comment - b.comment,
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

export default Voucher;
