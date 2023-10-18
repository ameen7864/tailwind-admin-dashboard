import {
  useGetOverviewByNameQuery,
  useGetOverviewDataByNameQuery,
  useGetRestrationByNameQuery,
} from "@/pages/Redux/ReportsApi";
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
import { Input } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const RegisteredData = () => {
  const searched = useLocation().search;
  const type = new URLSearchParams(searched).get("type");
  //   const sdate = new URLSearchParams(searched).get("sdate");
  const edate = new URLSearchParams(searched).get("edate");
  const rest = new URLSearchParams(searched).get("rest");
  const [search, setsearch] = useState("");
  const [Resturants, setResturants] = useState([]);
  const [count, setcount] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const [sdate, setSdate] = useState(today);
  const [Edate, setEdate] = useState(today);
  const [startDate, setstartdate] = useState(today);
  const [EndDate, setEndDate] = useState(today);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const tableRef = useRef(null);
  const page = tableParams.pagination.current;
  const pagelimit = tableParams.pagination.pageSize;

  const { data: overview, isFetching } = useGetOverviewDataByNameQuery({
    type,
    restId: -1,
    page,
    pagelimit,
    branchid: -1,
    startDate: "01/06/2023",
    EndDate,
  });

  useEffect(() => {
    if (overview) {
      if (type == 0) {
        setResturants(overview.totalCount.totalCount);
        setcount(overview.totalCount.total);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalCount.total,
          },
        }));
      } else if (type == 1) {
        setResturants(overview.totalInside.totalInside);
        setcount(overview.totalInside.total);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalInside.total,
          },
        }));
      } else if (type == 2) {
        setResturants(overview.totalOutside.totalOutside);
        setcount(overview.totalOutside.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalOutside.total,
          },
        }));
      } else if (type == 3) {
        setResturants(overview.totalAny.totalAny);
        setcount(overview.totalAny.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalAny.total,
          },
        }));
      } else if (type == 4) {
        setResturants(overview.totalSeatedCount.totalSeatedCount);
        setcount(overview.totalSeatedCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalSeatedCount.total,
          },
        }));
      } else if (type == 5) {
        setResturants(overview.totalWaitingCount.totalWaitingCount);
        setcount(overview.totalWaitingCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalWaitingCount.total,
          },
        }));
      } else if (type == 6) {
        setResturants(overview.totalCancelCount.totalCancelCount);
        setcount(overview.totalCancelCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalCancelCount.total,
          },
        }));
      } else if (type == 7) {
        setResturants(overview.totalAppCount.totalAppCount);
        setcount(overview.totalAppCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalAppCount.total,
          },
        }));
      } else if (type == 8) {
        setResturants(overview.totalCountMale.totalCountMale);
        setcount(overview.totalCountMale.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalCountMale.total,
          },
        }));
      } else if (type == 9) {
        setResturants(overview.totalCountFemale.totalCountFemale);
        setcount(overview.totalCountFemale.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalCountFemale.total,
          },
        }));
      } else if (type == 10) {
        setResturants(overview.totalCountNewRegister.totalCountNewRegister);
        setcount(overview.totalCountNewRegister.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalCountNewRegister.total,
          },
        }));
      } else if (type == 11) {
        setResturants(overview.totalKioskCount.totalKioskCount);
        setcount(overview.totalKioskCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalKioskCount.total,
          },
        }));
      } else if (type == 12) {
        setResturants(overview.totalHostCount.totalHostCount);
        setcount(overview.totalHostCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalHostCount.total,
          },
        }));
      } else if (type == 13) {
        setResturants(overview.totalPremiumCount.totalPremiumCount);
        setcount(overview.totalPremiumCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalPremiumCount.total,
          },
        }));
      } else if (type == 14) {
        setResturants(overview.totalPremiumSeatedCount.totalPremiumSeatedCount);
        setcount(overview.totalPremiumSeatedCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalPremiumSeatedCount.total,
          },
        }));
      } else if (type == 15) {
        setResturants(overview.totalAppSeatedCount.totalAppSeatedCount);
        setcount(overview.totalAppSeatedCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalAppSeatedCount.total,
          },
        }));
      } else if (type == 16) {
        setResturants(overview.totalAppWaitingCount.totalAppWaitingCount);
        setcount(overview.totalAppWaitingCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalAppWaitingCount.total,
          },
        }));
      } else {
        setResturants(overview.totalWaitingCount.totalWaitingCount);
        setcount(overview.totalCount.total);

        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: overview.totalWaitingCount.total,
          },
        }));
      }
    }
  }, [overview]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const headers = ["#", "name", "Status", "Created Date", "Duration"];

  const tableData = Resturants?.map((item, index) => [
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
              Guests Report{" "}
              {type == 0
                ? "(Total Guest)"
                : type == 1
                ? "(Inside Guest)"
                : type == 2
                ? "(Outside Guest)"
                : type == 3
                ? "(Position Any)"
                : type == 4
                ? "(Seated Guest)"
                : type == 5
                ? "(Waiting Guest)"
                : type == 6
                ? "(Canceled Guest)"
                : type == 7
                ? "(App Guest)"
                : type == 8
                ? "(Male  Guest)"
                : type == 9
                ? "(Female Guest)"
                : type == 10
                ? "(New Guest)"
                : type == 11
                ? "(Kiosk Guest)"
                : type == 12
                ? "(Host Guest)"
                : type == 13
                ? "(Premium Guest)"
                : type == 14
                ? "(Premium Seated Guest)"
                : type == 15
                ? "(App Seated Guest)"
                : type == 16
                ? "(App Waited Guest)"
                : type == 17
                ? "(App Cancel Guest)"
                : ""}{" "}
              ({count ? count : 0})
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_10vh)] overflow-x-scroll px-0 pt-0 pb-2">
            <Tables
              data={Resturants}
              loading={isFetching}
              columns={[
                {
                  title: "Client Id #",
                  dataIndex: "client_id",
                },
                {
                  title: "Name",
                  dataIndex: "data, client_name",
                  render: (data, client_name) => (
                    <Link
                      to={
                        "/editclient" +
                        `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${Edate}`
                      }
                    >
                      <div>{client_name.client_name}</div>
                    </Link>
                  ),
                },
                {
                  title: "Phone ",
                  dataIndex: "client_phone",
                  render: (client_phone) =>
                    client_phone ? client_phone : "--",
                },
                {
                  title: "First Queue No",
                  dataIndex: "queueNumber",
                  render: (queueNumber) => (queueNumber ? queueNumber : "--"),
                },
                {
                  title: "Date",
                  dataIndex: "created_date",
                  render: (created_date) => moment(created_date).format("L"),
                },
                {
                  title: "Seat Number",
                  dataIndex: "selectedqNumber",
                  render: (selectedqNumber) =>
                    selectedqNumber ? selectedqNumber : "--",
                },
                {
                  title: "Seated Time",
                  dataIndex: "createdDate",
                  render: (createdDate) => moment(createdDate).format("L"),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (status) => (status ? status : "--"),
                },
                {
                  title: "Area",
                  dataIndex: "position",
                  render: (position) => (position ? position : "--"),
                },

                {
                  title: "Tags",
                  dataIndex: "--",
                },

                {
                  title: "Note",
                  dataIndex: "note",
                  render: (note) => (note ? note : "--"),
                },
                {
                  title: "Customer Note",
                  dataIndex: "clientNote",
                  render: (clientNote) => (clientNote ? clientNote : "--"),
                },
                {
                  title: "Guests",
                  dataIndex: "--",
                },
                {
                  title: "Tables",
                  dataIndex: "--",
                },
                {
                  title: "Leaving Time",
                  dataIndex: "checkoutDate",
                  render: (checkoutDate) => moment(checkoutDate).format("L"),
                },
                {
                  title: "Restaurant",
                  dataIndex: "name_en",
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

export default RegisteredData;
