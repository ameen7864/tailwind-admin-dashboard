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
import { MdPrint } from "react-icons/md";
import { useGetInvoiceByNameQuery } from "../Redux/ReduxApi";

const Invoice = () => {
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
    data: invoice,
    isFetching,
    isLoading,
  } = useGetInvoiceByNameQuery({
    parentId: -1,
    restId: -1,
    sdate: "01-01-2023",
    Edate: "01-07-2023",
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (invoice?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: invoice.count,
        },
      }));
    }
  }, [invoice]);
  const restdata = invoice?.data;
  const amounts = restdata?.map((item) => item.subtotal);
  const sum = amounts?.reduce((total, amount) => total + amount, 0);

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
      <Typography className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
        <div>
          <label
            for="first_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Date From:
          </label>
          <input
            type="date"
            id="first_name"
            defaultValue={today}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="first_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            To:
          </label>
          <input
            type="date"
            defaultValue={today}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="first_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Restaurant:
          </label>
          <select
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option selected>Choose a country</option>
          </select>
        </div>
        <div>
          <label
            for="first_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Branch
          </label>
          <select
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option selected>Choose a country</option>
          </select>
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
            <div className="flex justify-between">
              <Typography variant="h6" color="white">
                Sales
              </Typography>
              <Typography variant="h6" color="white">
                Total Amount:{sum?.toFixed(2)}Kwd
              </Typography>
            </div>
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
              loading={isLoading}
              columns={[
                {
                  title: "#",
                  dataIndex: "i",
                  sorter: (a, b) => a.i - b.i,
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "Restaurant",
                  dataIndex: "name_en",
                  sorter: (a, b) => a.name_en.localeCompare(b.name_en),
                },
                {
                  title: "OrderId",
                  dataIndex: "id",
                  sorter: (a, b) => a.id - b.id,
                },

                {
                  title: "Type",
                  dataIndex: "OrderType",
                  sorter: (a, b) => a.OrderType - b.OrderType,
                  render: (OrderType) => (
                    <div>{OrderType === 0 ? "Dine In" : "Pick Up"}</div>
                  ),
                },
                {
                  title: "Customer",
                  dataIndex: "data, User",
                  render: (data, User) => (
                    <>
                      <div>
                        <div>{User?.User[0]?.client_name}</div>
                        <div>{User?.User[0]?.client_phone}</div>
                      </div>
                      {/* <Link
                        to={
                          "/editclient" +
                          `?client=${User?.User[0]?.client_id}&sdate=${
                            User?.User[0]?.created_date
                          }&edate=${""}`
                        }
                      >
                       
                       
                       
                      </Link> */}
                    </>
                  ),
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return (
                      String(record.id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.name_en)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.User[0]?.client_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.User[0]?.client_phone)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.subtotal)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Date",
                  dataIndex: "createdDate",
                  sorter: (a, b) =>
                    new Date(a.createdDate) - new Date(b.createdDate),
                  render: (CreadteDate) =>
                    moment(CreadteDate).format("dddd LL"),
                },

                {
                  title: "Items",
                  dataIndex: "data, User",
                  render: (data, User) => <div>{User?.item?.length}</div>,
                },
                {
                  title: "Amount",
                  dataIndex: "subtotal",
                  sorter: (a, b) => a.subtotal - b.subtotal,
                  render: (subtotal) => <div>{Math.round(subtotal)}Kwd</div>,
                },

                {
                  title: "Print",
                  dataIndex: "data, User",
                  render: (data, User) => (
                    <>
                      <div
                      // onClick={() => {
                      //   setPrint([true, User]);
                      // }}
                      >
                        <MdPrint
                          size={20}
                          style={{ cursor: "pointer", color: "#7537be" }}
                        />
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

export default Invoice;
