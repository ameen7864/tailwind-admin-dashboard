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
import { useGetTasksByNameQuery } from "../Redux/ReportsApi";

const Tasks = () => {
  const [searching, setsearcheding] = useState("");
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

  const { data: tasks, isFetching } = useGetTasksByNameQuery({
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (tasks?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: tasks.count,
        },
      }));
    }
  }, [tasks]);
  const restdata = tasks?.ListOfData;

  const headers = [
    "#",
    "ID",
    "Type",
    "Message",
    "Device Type",
    " Language ",
    " Created Date  ",
    " Started Date  ",
    "Status ",
    " Total",
  ];
  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.id,
    item.type,
    item.Message,
    item.deviceType,
    item.language,
    moment(item.createdDate).format("dddd LL"),
    moment(item.startDate).format("dddd LL"),
    moment(item.completedDate).format("dddd LL"),
    item.status ? "Completed" : "",
    item.Total,
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
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
              Task List
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
                />
              </div>{" "}
            </div>
            <Tables
              data={restdata}
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "ID",
                  dataIndex: "id",
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.id - b.id,
                  filteredValue: [searching],
                  onFilter: (value, record) => {
                    return (
                      String(record.id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.type)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.Message)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.Total)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.language)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.createdDate)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.startDate)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.completedDate)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Type",
                  dataIndex: "type",
                  sorter: (a, b) => a.type - b.type,
                },
                {
                  title: "Message",
                  dataIndex: "Message",
                  sorter: (a, b) => a.Message.localeCompare(b.Message),
                  render: (Message) =>
                    Message === " " ? (
                      <div>No Message</div>
                    ) : (
                      <div>{Message}</div>
                    ),
                },
                {
                  title: "Device Type",
                  dataIndex: "deviceType",
                  sorter: (a, b) => a.deviceType - b.deviceType,
                  render: (deviceType) =>
                    deviceType === 0 ? <div>I-Phone</div> : <div>Andriod</div>,
                },
                {
                  title: "Language",
                  dataIndex: "language",
                  sorter: (a, b) => a.language - b.language,
                  render: (language) =>
                    language === 0 ? <div>Arabic</div> : <div>English</div>,
                },

                {
                  title: "Created Date ",
                  dataIndex: "createdDate",
                  sorter: (a, b) =>
                    new Date(a.createdDate) - new Date(b.createdDate),
                  render: (createdDate) => moment(createdDate).format("L"),
                },

                {
                  title: "Started Date",
                  dataIndex: "startDate",
                  sorter: (a, b) =>
                    new Date(a.startDate) - new Date(b.startDate),
                  render: (startDate) => moment(startDate).format("L"),
                },

                {
                  title: "Completed Date",
                  dataIndex: "completedDate",
                  sorter: (a, b) =>
                    new Date(a.completedDate) - new Date(b.completedDate),
                  render: (completedDate) => moment(completedDate).format("L"),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (status) => <div>{status ? "Completed" : ""}</div>,
                },
                {
                  title: "Total",
                  dataIndex: "Total",
                  sorter: (a, b) => a.Total - b.Total,
                  render: (Total) => <div>{Total}Device</div>,
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

export default Tasks;
