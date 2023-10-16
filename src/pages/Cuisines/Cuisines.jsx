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
import { useEffect, useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetCuisineByNameQuery } from "../Redux/ReduxApi";

const Cuisines = () => {
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
  const { data: cuisines, isFetching } = useGetCuisineByNameQuery({
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (cuisines?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: cuisines.count,
        },
      }));
    }
  }, [cuisines]);
  const restdata = cuisines?.data;

  const headers = ["#", "Name", "Status", "Order Id"];

  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.name_en,
    item.name_ar,
    item.isActive ? "active" : "unactive",
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
        <Link to={"/dashboard/addcuisines"}>
          <Button name={"Add cuisines"} />
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
              Cuisines Table
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
                  render: (text, record, index) =>  (pages - 1) * pageSize + index + 1,
                  sorter: (a, b) => a.i - b.i,
                },
                {
                  title: "Name",
                  dataIndex: "name_en",
                  sorter: (a, b) => a.name_en.localeCompare(b.name_en),
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return (
                      String(record.name_en)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.orderId)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Status",
                  dataIndex: "isActive",
                  sorter: (a, b) => a.isActive - b.isActive,
                  render: (isActive) =>
                    isActive ? (
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
                  title: "Order ID",
                  dataIndex: "orderId",
                  sorter: (a, b) => a.orderId - b.orderId,
                },

                {
                  title: "Edit",
                  dataIndex: "id",
                  render: (id) => (
                    <Link to={"/ecuisine/" + id}>
                      <MdOutlineModeEditOutline
                        size={20}
                        className="text-purple-700 "
                      />
                    </Link>
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

export default Cuisines;
