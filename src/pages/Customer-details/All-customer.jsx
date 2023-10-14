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
import { useGetCustomersByNameQuery } from "../Redux/ReduxApi";

const Allcustomer = () => {
  const [search, setsearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const searchText = "";
  const tableRef = useRef(null);
  const pages = tableParams.pagination.current;
  const pageSize = tableParams.pagination.pageSize;
  const { data: customer, isFetching } = useGetCustomersByNameQuery({
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
  const restdata = customer?.data;

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
            Customer Table
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
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Avatar",
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
                  dataIndex: " data, name",
                  render: (data, name) => (
                    <Link
                      to={
                        "/editclient" +
                        `?client=${name.id}&sdate=${
                          name.createdDate
                        }&edate=${""}`
                      }
                    >
                      <div>{name.name}</div>
                    </Link>
                  ),
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return (
                      String(record.name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.phone)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.gender)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Phone",
                  render: (data, phone) => (
                    <Link
                      to={
                        "/editclient" +
                        `?client=${phone.id}&sdate=${
                          phone.createdDate
                        }&edate=${""}`
                      }
                    >
                      <div>{phone.phone}</div>
                    </Link>
                  ),
                },

                {
                  title: "Gender",
                  dataIndex: "gender",
                  render: (gender) =>
                    gender === 0 ? (
                      <div>Male</div>
                    ) : gender === 1 ? (
                      <div>Female</div>
                    ) : (
                      <div>None</div>
                    ),
                },

                {
                  title: "Creadte Date",
                  dataIndex: "createdDate",
                  render: (createdDate) =>
                    moment(createdDate).format("dddd LL"),
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
                  render: (lastSeen) => moment(lastSeen).format("dddd LL"),
                },

                {
                  title: "Status",
                  dataIndex: "Staus",
                  render: (Staus) =>
                    Staus === true ? (
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

export default Allcustomer;
