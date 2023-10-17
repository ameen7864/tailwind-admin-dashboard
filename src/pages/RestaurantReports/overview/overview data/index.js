import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment/moment";
import { Link, useLocation } from "react-router-dom";
import { Table } from "antd";
import { Input } from "@mui/material";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import clipboardCopy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";

const Task = () => {
  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultValue = new Date(date).toISOString().split("T")[0];
  const [Edate, setEdate] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [resturants, setResturants] = useState([]);
  const [search, setsearch] = useState("");
  const [count, setcount] = useState(0);
  const leng = resturants?.length;

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searched = useLocation().search;
  const type = new URLSearchParams(searched).get("type");
  const sdate = new URLSearchParams(searched).get("sdate");
  const edate = new URLSearchParams(searched).get("edate");
  const rest = new URLSearchParams(searched).get("rest");
  const tableRef = useRef();

  // /WebAdmin/RTotal?startDate=2021-01-01 00:00:00&EndDate=2021-02-01 00:00:00&type=11
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(
  //       // `/WebAdmin/RTotal?startDate=${sdate}&type=${type}&EndDate=${edate}&page=${tableParams.pagination.current}&pagelimit=${tableParams.pagination.pageSize}`,
  //       `WebAdmin/RTotal?endDate=${Edate}%2023:59&type=${type}&restId=${rest}&startDate=${sdate}%2000:00&page=${tableParams.pagination.current}&pagelimit=${tableParams.pagination.pageSize}`,

  //       {
  //         headers: {
  //           authorization: JSON.parse(localStorage.getItem("AccessToken")),
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       type == 0
  //                   ?  if (type == 5) {
  //                     setResturants(response.data.totalWaitingCount.totalWaitingCount);
  //                     setcount(response.data.totalCount.total);
  //                     setIsLoading(false);
  //                     setTableParams({
  //                       ...tableParams,
  //                       pagination: {
  //                         ...tableParams.pagination,
  //                         total: response.data.totalWaitingCount.total,
  //                       },
  //                     });
  //                   }
  //                   : type == 1
  //                   ? if (type == 5) {
  //                     setResturants(response.data.totalWaitingCount.totalWaitingCount);
  //                     setcount(response.data.totalCount.total);
  //                     setIsLoading(false);
  //                     setTableParams({
  //                       ...tableParams,
  //                       pagination: {
  //                         ...tableParams.pagination,
  //                         total: response.data.totalWaitingCount.total,
  //                       },
  //                     });
  //                   }
  //                   : type == 2
  //                   ?  if (type == 5) {
  //                     setResturants(response.data.totalWaitingCount.totalWaitingCount);
  //                     setcount(response.data.totalCount.total);
  //                     setIsLoading(false);
  //                     setTableParams({
  //                       ...tableParams,
  //                       pagination: {
  //                         ...tableParams.pagination,
  //                         total: response.data.totalWaitingCount.total,
  //                       },
  //                     });
  //                   }
  //                   : type == 3
  //                   ?  if (type == 5) {
  //                     setResturants(response.data.totalWaitingCount.totalWaitingCount);
  //                     setcount(response.data.totalCount.total);
  //                     setIsLoading(false);
  //                     setTableParams({
  //                       ...tableParams,
  //                       pagination: {
  //                         ...tableParams.pagination,
  //                         total: response.data.totalWaitingCount.total,
  //                       },
  //                     });
  //                   }
  //                   : type == 4
  //                   ? "(Seated Guest)"

  //                   : type == 17
  //                   ? "(App Cancel Guest)"
  //                   : ""
  //       if (type == 5) {
  //         setResturants(response.data.totalWaitingCount.totalWaitingCount);
  //         setcount(response.data.totalCount.total);
  //         setIsLoading(false);
  //         setTableParams({
  //           ...tableParams,
  //           pagination: {
  //             ...tableParams.pagination,
  //             total: response.data.totalWaitingCount.total,
  //           },
  //         });
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [JSON.stringify(tableParams), sdate, edate, type]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `WebAdmin/RTotal?endDate=${Edate}%2023:59&type=${type}&restId=${rest}&startDate=${sdate}%2000:00&page=${tableParams.pagination.current}&pagelimit=${tableParams.pagination.pageSize}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("AccessToken")),
          },
        }
      )
      .then(function (response) {
        if (type == 0) {
          setResturants(response.data.totalCount.totalCount);
          setcount(response.data.totalCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalCount.total,
            },
          });
        } else if (type == 1) {
          setResturants(response.data.totalInside.totalInside);
          setcount(response.data.totalInside.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalInside.total,
            },
          });
        } else if (type == 2) {
          setResturants(response.data.totalOutside.totalOutside);
          setcount(response.data.totalOutside.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalOutside.total,
            },
          });
        } else if (type == 3) {
          setResturants(response.data.totalAny.totalAny);
          setcount(response.data.totalAny.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalAny.total,
            },
          });
        } else if (type == 4) {
          setResturants(response.data.totalSeatedCount.totalSeatedCount);
          setcount(response.data.totalSeatedCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalSeatedCount.total,
            },
          });
        } else if (type == 5) {
          setResturants(response.data.totalWaitingCount.totalWaitingCount);
          setcount(response.data.totalWaitingCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalWaitingCount.total,
            },
          });
        } else if (type == 6) {
          setResturants(response.data.totalCancelCount.totalCancelCount);
          setcount(response.data.totalCancelCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalCancelCount.total,
            },
          });
        } else if (type == 7) {
          setResturants(response.data.totalAppCount.totalAppCount);
          setcount(response.data.totalAppCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalAppCount.total,
            },
          });
        } else if (type == 8) {
          setResturants(response.data.totalCountMale.totalCountMale);
          setcount(response.data.totalCountMale.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalCountMale.total,
            },
          });
        } else if (type == 9) {
          setResturants(response.data.totalCountFemale.totalCountFemale);
          setcount(response.data.totalCountFemale.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalCountFemale.total,
            },
          });
        } else if (type == 10) {
          setResturants(response.data.totalCountNewRegister.totalCountNewRegister);
          setcount(response.data.totalCountNewRegister.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalCountNewRegister.total,
            },
          });
        } else if (type == 11) {
          setResturants(response.data.totalKioskCount.totalKioskCount);
          setcount(response.data.totalKioskCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalKioskCount.total,
            },
          });
        } else if (type == 12) {
          setResturants(response.data.totalHostCount.totalHostCount);
          setcount(response.data.totalHostCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalHostCount.total,
            },
          });
        } else if (type == 13) {
          setResturants(response.data.totalPremiumCount.totalPremiumCount);
          setcount(response.data.totalPremiumCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalPremiumCount.total,
            },
          });
        } else if (type == 14) {
          setResturants(response.data.totalPremiumSeatedCount.totalPremiumSeatedCount);
          setcount(response.data.totalPremiumSeatedCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalPremiumSeatedCount.total,
            },
          });
        } else if (type == 15) {
          setResturants(response.data.totalAppSeatedCount.totalAppSeatedCount);
          setcount(response.data.totalAppSeatedCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalAppSeatedCount.total,
            },
          });
        } else if (type == 16) {
          setResturants(response.data.totalAppWaitingCount.totalAppWaitingCount);
          setcount(response.data.totalAppWaitingCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalAppWaitingCount.total,
            },
          });
        } else {
          setResturants(response.data.totalWaitingCount.totalWaitingCount);
          setcount(response.data.totalCount.total);
          setIsLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.totalWaitingCount.total,
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [JSON.stringify(tableParams), sdate, edate, type]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Restauranttable.pdf");
  };
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
  
      table {
        border-collapse: collapse;
        width: 100%;
      }
  
      th, td {
        text-align: left;
        padding: 8px;
        border-right: 1px solid #ddd;
      }
  
      th:last-child, td:last-child {
        border-right: none;
      }
  
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
  
      tr:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }
    `,
    documentTitle: "empty",
  });

  const copyTableData = () => {
    const headers = [
      "#",
      "Client Id ",
      "Name",
      "Phone",
      " First Queue No ",
      "Date ",
      "Seat Number ",
      " Seated Time ",
      "Status ",
      "Area ",
      "Tags ",
      "Note ",
      "Guests ",
      "Tables ",
      " LeavingTime ",
      "Restaurant ",
    ];
    const dataRows = resturants.map((item, index) => {
      return [
        index + 1,
        item.client_id,
        item.client_name,
        item.client_phone,
        item.queueNumber,
        moment(item.created_date).format("dddd LL"),
        item.selectedqNumber,
        moment(item.createdDate).format("dddd LL"),
        item.status,
        item.position,
        "",
        item.note,
        "",
        "",
        moment(item.checkoutDate).format("dddd LL"),
        item.name_en,
      ];
    });

    try {
      const textToCopy = [headers.join("\t")]
        .concat(dataRows.map((row) => row.join("\t")))
        .join("\n");
      clipboardCopy(textToCopy);
      toast("Table data copied to clipboard successfully");
    } catch (error) {
      console.error("Unable to copy table data:", error);
      alert("Failed to copy table data.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <div className="button-group mb-2" style={{ margin: "16px 0 -31px 10px" }}>
        <button className="button " disabled={isLoading} onClick={copyTableData}>
          Copy
        </button>

        <DownloadTableExcel
          filename="Requeue Portal - Admin"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="button " disabled={isLoading}>
            Excel
          </button>
        </DownloadTableExcel>
        <button className="button " disabled={isLoading} onClick={handleExportToPDF}>
          Pdf
        </button>
        <button className="button " disabled={isLoading} onClick={handlePrint}>
          Print
        </button>

        <div className="right-button">
          <button className="button1 yes addbtn" style={{ display: "none" }}></button>
        </div>
      </div>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
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
                    : ""}
                  ({count ? count : 0})
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                style={{
                  height: leng === 0 ? "auto" : "calc(100vh - 220px)",
                  overflowY: "scroll",
                  borderRadius: "20px",
                }}
              >
                <>
                  <Input
                    className="sbtn"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <Table
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
                      },
                      {
                        title: "First Queue No",
                        dataIndex: "queueNumber",
                      },
                      {
                        title: "Date",
                        dataIndex: "created_date",
                        render: (created_date) => moment(created_date).format("L"),
                      },
                      {
                        title: "Seat Number",
                        dataIndex: "selectedqNumber",
                      },
                      {
                        title: "Seated Time",
                        dataIndex: "createdDate",
                        render: (createdDate) => moment(createdDate).format("L"),
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                      },
                      {
                        title: "Area",
                        dataIndex: "position",
                      },

                      {
                        title: "Tags",
                        dataIndex: "",
                      },

                      {
                        title: "Note",
                        dataIndex: "note",
                      },
                      {
                        title: "Customer Note",
                        dataIndex: "clientNote",
                      },
                      {
                        title: "Guests",
                        dataIndex: "",
                      },
                      {
                        title: "Tables",
                        dataIndex: "",
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
                    // rowKey={(record) => record.login.uuid}
                    dataSource={resturants}
                    pagination={tableParams.pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                    // ref={tableRef}
                  />
                  <div style={{ display: "none" }}>
                    <table ref={tableRef} id="myTable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Client Id </th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>First Queue No </th>
                          <th> Date </th>
                          <th>Seat Number </th>
                          <th>Seated Time </th>
                          <th>Status </th>
                          <th>Area </th>
                          <th>Tags </th>
                          <th>Note </th>
                          <th>Guests </th>
                          <th>Tables </th>
                          <th>Leaving Time </th>
                          <th>Restaurant </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resturants?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.client_id}</td>
                            <td>{item.client_name}</td>
                            <td>{item.client_phone}</td>
                            <td>{item.queueNumber}</td>
                            <td>{moment(item.created_date).format("dddd LL")}</td>
                            <td>{item.selectedqNumber}</td>
                            <td>{moment(item.createdDate).format("dddd LL")}</td>
                            <td>{item.status}</td>
                            <td>{item.position}</td>
                            <td>{""}</td>
                            <td>{item.note}</td>
                            <td>{""}</td>
                            <td>{""}</td>
                            <td>{moment(item.checkoutDate).format("dddd LL")}</td>
                            <td>{item.name_en}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Task;
