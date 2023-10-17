import { useGetCancellationByNameQuery } from "@/pages/Redux/ReportsApi";
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

const Cancellation = () => {
  const [search, setsearch] = useState("");
  const today = new Date().toISOString().split("T")[0];
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

  const {
    data: cancel,
    isFetching,
    isLoading,
  } = useGetCancellationByNameQuery({
    phone: "",
    branchid: -1,
    startDate: "01-01-2023",
    EndDate: "01-10-2023",
    restId: -1,
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (cancel?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: cancel.count,
        },
      }));
    }
  }, [cancel]);
  const canceldata = cancel?.Details;


  const headers = ["#", "name", "Status", "Created Date", "Duration"];

  const tableData = canceldata?.map((item, index) => [
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
      <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Date From:
          </label>
          <input
            type="date"
            id="first_name"
            defaultValue={today}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            To:
          </label>
          <input
            type="date"
            defaultValue={today}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Restaurant:
          </label>
          <select
            id="countries"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option selected>Choose a country</option>
          </select>
        </div>
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Branch
          </label>
          <select
            id="countries"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option selected>Choose a country</option>
          </select>
        </div>
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <input
            placeholder="phone number"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div className="mt-7">
          <Button name={"search"} />
        </div>
      </Typography>

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
              Cancellation Data
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
              data={canceldata}
              loading={isLoading}
              columns={[
                {
                  title: "#",
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "Name",
                  dataIndex: "data, client_name",
                  render: (data, client_name) => (
                    // <Link
                    //   to={
                    //     "/editclient" +
                    //     `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${Edate}`
                    //   }
                    // >
                    <div>{client_name.client_name}</div>
                    // </Link>
                  ),
                },
                {
                  title: "Phone",
                  dataIndex: "client_phone",
                },
                {
                  title: "Init Number",
                  dataIndex: "InitTurn",
                  render: (InitTurn) => (
                    <div>{InitTurn == null ? "--" : InitTurn}</div>
                  ),
                },
                {
                  title: "Seat Number",
                  dataIndex: "SeatedTurn",
                  render: (SeatedTurn) => (
                    <div>{SeatedTurn == null ? "--" : SeatedTurn}</div>
                  ),
                },

                {
                  title: "Area",
                  dataIndex: "position",
                  render: (position) => (
                    <div>{position == 0 ? "Inside" : "Outside"}</div>
                  ),
                },
                {
                  title: "Restaurant",
                  dataIndex: "name_en",
                },
                {
                  title: "Date & Time",
                  dataIndex: "createdDate",
                  render: (createdDate) =>
                    moment(createdDate).format("dddd LL"),
                },
                {
                  title: "Cancelled Time",
                  dataIndex: "checkedInDate",
                  render: (checkedInDate) =>
                    moment(checkedInDate).format("dddd LL"),
                },
                {
                  title: "Cancelled By",
                  dataIndex: "status",
                  render: (status) => (
                    <div>{status === 4 ? "Customer" : "Restaurant"}</div>
                  ),
                },
                {
                  title: "Reason",
                  dataIndex: "cancelationReason",
                  render: (cancelationReason) => (
                    <>
                      <div>
                        {cancelationReason == 0
                          ? "None"
                          : cancelationReason == 1
                          ? "No show"
                          : cancelationReason == 2
                          ? "No Answer"
                          : cancelationReason == "null"
                          ? "None"
                          : cancelationReason == 4
                          ? "Went To Other Restaurant"
                          : cancelationReason == 5
                          ? "Restaurant Closed"
                          : cancelationReason == 6
                          ? "Waiting For Long Time"
                          : cancelationReason == 7
                          ? "Weather"
                          : cancelationReason == 8
                          ? "Other"
                          : cancelationReason == 9
                          ? "Auto Cancel"
                          : cancelationReason == 10
                          ? "I Am Too Fare"
                          : cancelationReason == 11
                          ? "My Host Asked Me To Cancel"
                          : cancelationReason == 12
                          ? "changed My Mind"
                          : ""}
                      </div>
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

export default Cancellation;
