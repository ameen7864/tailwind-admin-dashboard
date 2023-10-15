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
  useGetPurchaseByNameQuery,
} from "../Redux/ReduxApi";
import { IconButton } from "@mui/material";

const NotConfirmed = () => {
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

  const { data: purchase, isFetching } = useGetPurchaseByNameQuery({
    st: 0,
    country: "",
    startdate: "01-01-2021",
    Enddate: "01-10-2023",
    restaurant: -1,
    paymentMethod: "",
    channel: "",
    search: "",
    discount: "",
    branchID: "",
    pages,
    pageSize,
  });

  console.log(isFetching);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (purchase?.total) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: purchase.total,
        },
      }));
    }
  }, [purchase]);
  const restdata = purchase?.Data;

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
              Purchase Tickets
            </Typography>
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
                  title: "Order#",
                  dataIndex: "client_id",
                },
                {
                  title: "Customer",
                  dataIndex: "data, client_name",
                  render: (data, client_name) => (
                    <>
                      {/* <Link
                        to={
                          "/editclient" +
                          `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${edate}`
                        } 
                      >*/}
                        <div>{client_name.client_name}</div>
                        <div>{client_name.client_phone}</div>
                      {/* </Link> */}
                    </>
                  ),
                  // filteredValue: [searched],
                  onFilter: (value, record) => {
                    return (
                      String(record.client_id).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.client_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.client_phone)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.totalQueue).toLowerCase().includes(value.toLowerCase()) ||
                      String(record.Amount).toLowerCase().includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Country",
                  dataIndex: "data, country_name",
                  render: (data, country_name) => (
                    <>
                      <img
                        src={"https://cdn.requeue.net/media/flags/" + country_name.flag}
                        alt="flag"
                        style={{ maxWidth: "40px", marginLeft: "40px" }}
                      />
                      <div style={{ marginLeft: "23px" }}>{country_name.country_name}</div>
                    </>
                  ),
                },
                {
                  title: "Amount",
                  dataIndex: "Amount",
                  render: (Amount) => <div>{Amount ? Amount : 0}kwd</div>,
                },
                {
                  title: "Total Queue",
                  dataIndex: "totalQueue",
                },
                {
                  title: "Date ",

                  dataIndex: "createdDate",
                  render: (createdDate) => moment(createdDate).format("dddd LL"),
                },
                {
                  title: "Logo",
                  dataIndex: " , paymentStatus",
                  render: (data, paymentStatus) => (
                    <div className="flex">
                      <img
                        src={paymentStatus.paymentStatus == 1 ? "tick" : "fail"}
                        alt="status"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={paymentStatus.paymentStatus == 2 ? "paid" : "not"}
                        alt="paymentStatus"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={paymentStatus.paymentMethod === 1 ? "Knet" : "card"}
                        alt="paymentMethod"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={paymentStatus.channel === 2 ? "Ios" : "Android"}
                        alt="channel"
                        style={{ width: "30px" }}
                      />
                    </div>
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

export default NotConfirmed;
