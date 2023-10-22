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
import {
  useGetCountryAreaByNameQuery,
  useGetCountryByNameQuery,
  useGetUsersByNameQuery,
} from "../Redux/ReduxApi";
import { MdMenu, MdOutlineModeEditOutline } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

const Areas = () => {
  const searched = useLocation().search;
  const countryid = new URLSearchParams(searched).get("countryId");
  const [search, setsearch] = useState("");
  const [searchText, setsearched] = useState("");
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
  const {
    data: Areas,
    isFetching,
    refetch,
  } = useGetCountryAreaByNameQuery({
    countryid,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (Areas?.count) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: Areas.count,
        },
      }));
    }
  }, [Areas]);
  const handleSearch = () => {
    refetch({ searchText, pages, pageSize });
    setsearched(search);
  };
  const restdata = Areas?.data;

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
  
      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Link to={"/dashboard/addcountry"}>
          <Button name={"Add Areas"} />
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
              Areas Table
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
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Name EN",
                  dataIndex: "NameEnglish",
                },
                {
                  title: "Name AR",
                  dataIndex: "NameArabic",
                },

                {
                  title: "Status",
                  dataIndex: "Status",
                  render: (Status) =>
                    Status ? (
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
                  title: "Action",
                  dataIndex: "id",
                  render: (id) => (
                    <Link to={"/editarea" + `?id=${id}`}>
                      <MdOutlineModeEditOutline
                        size={20}
                        className="text-purple-700 "
                      />
                    </Link>
                  ),
                },
              ]}
              // rowKey={(record) => record.login.uuid}
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

export default Areas;
