import Button from "@/widgets/Button/Button";
import Copy from "@/widgets/Tableandexport/Copy";
import Excel from "@/widgets/Tableandexport/Excel";
import Print from "@/widgets/Tableandexport/Print";
import Tables from "@/widgets/Tableandexport/Table";
import {
  Avatar,
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
import { Link } from "react-router-dom";
import {
  useGetCustomersByNameQuery,
  useGetMostByNameQuery,
} from "../Redux/ReduxApi";

const MostActive = () => {
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
  const pages = tableParams.pagination.current;
  const pageSize = tableParams.pagination.pageSize;
  const { data: customer, isFetching } = useGetMostByNameQuery({
    search,
    pages,
    pageSize,
  });
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (customer?.total) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: customer.total,
        },
      }));
    }
  }, [customer]);
  const restdata = customer?.details;

  const headers = ["#", "Title", "Access Name", "Status", "Created Date"];
  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.user_title,
    item.userName,
    item.is_active ? "Active" : "Unactive",
    moment(item.created_date).format("dddd LL"),
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
          className="font-sm text-md w-64 rounded-lg border-2 border-purple-800  capitalize placeholder:mx-4  placeholder:text-black"
          placeholder="customer name"
          onChange={(e) => setsearch(e.target.value)}
        />

        <button
          className="font-sm mx-3 rounded-md bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 py-1.5 px-4 text-white decoration-white "
          // onClick={handleSearch}
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
              Most Active Table
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
                  render: (text, record, index) =>                   (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "#",
                  dataIndex: "avatar",
                  render: (avatar) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <Avatar
                          src={
                            "https://new-requeue.s3.eu-west-2.amazonaws.com/media/avatars/" +
                            avatar
                          }
                        />
                      </div>
                    </>
                  ),
                },
                {
                  title: "Name",
                  dataIndex: "client_name",
                  filteredValue: [searching],
                  onFilter: (value, record) => {
                    return (
                      String(record.Name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.Phone)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.client_gender)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Phone",
                  dataIndex: "client_phone",
                },

                {
                  title: "Gender",
                  dataIndex: "client_gender",
                  render: (client_gender) =>
                    client_gender === 0 ? (
                      <div>Male</div>
                    ) : client_gender === 1 ? (
                      <div>Female</div>
                    ) : (
                      <div>None</div>
                    ),
                },

                {
                  title: "Creadte Date",
                  dataIndex: "created_date",
                  render: (created_date) =>
                    moment(created_date).format("dddd LL"),
                },

                {
                  title: "Created Method",
                  dataIndex: "createdMethod",
                  render: (createdMethod) =>
                    createdMethod === 0 ? (
                      <div>Host</div>
                    ) : createdMethod === 1 ? (
                      <div>IOS</div>
                    ) : createdMethod === 2 ? (
                      <div>Android</div>
                    ) : (
                      <div>Kiosk</div>
                    ),
                },
                {
                  title: "Last Seen",
                  dataIndex: "lastSeen",
                  render: (lastSeen) =>
                    lastSeen === null
                      ? "--"
                      : moment(lastSeen).format("dddd LL"),
                },

                {
                  title: "Status",
                  dataIndex: "client_status",
                  render: (client_status) =>
                    client_status === true ? (
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

export default MostActive;
