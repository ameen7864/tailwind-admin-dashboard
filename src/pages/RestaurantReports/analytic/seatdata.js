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

const Task = () => {
  const today = new Date();
  const date = today.setDate(today.getDate());
  const defaultValue = new Date(date).toISOString().split("T")[0];
  const [Edate, setEdate] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegestered] = useState([]);
  const [count, setcount] = useState(0);
  const leng = registered.length;

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes);
  }

  const searched = useLocation().search;
  const branch = new URLSearchParams(searched).get("parentId");
  const rest = new URLSearchParams(searched).get("restId");
  const fromto = new URLSearchParams(searched).get("f");
  const lastto = new URLSearchParams(searched).get("t");
  const sdate = new URLSearchParams(searched).get("sdate");
  const edate = new URLSearchParams(searched).get("edate");

  useEffect(() => {
    axios
      .get(
        `/WebAdmin/requestedseatDetails?parentId=${branch}&restId=${rest}&startDate=${sdate}&EndDate=${edate}&status=2&f=${fromto}&t=${lastto}`,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("AccessToken")),
          },
        }
      )
      .then(function (response) {
        setRegestered(response.data.data);
        setcount(response.data.count);
        setIsLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.count,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRegestered([]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

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
                  Number Of Seat Requested ({fromto}- {lastto} seat)
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
                {isLoading === true ? (
                  <div
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      height: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={40} thickness={4} color="info" />
                  </div>
                ) : (
                  <>
                    <Table
                      columns={[
                        {
                          title: "EST",
                          dataIndex: "est",
                          render: (est) => toHoursAndMinutes(est),
                        },
                        {
                          title: "Seat Area",
                          dataIndex: "AreaName",
                        },
                        {
                          title: "Number",
                          dataIndex: "queueNumber",
                        },
                        {
                          title: "Joined Time",
                          dataIndex: "createdDate",
                          render: (createdDate) => moment(createdDate).format("hh:mm"),
                        },
                        {
                          title: "Expected Time",
                          dataIndex: "expectedDate",
                          render: (expectedDate) => moment(expectedDate).format("hh:mm"),
                        },
                        {
                          title: "Checkout Time",
                          dataIndex: "checkoutDate",
                          render: (checkoutDate) => moment(checkoutDate).format("hh:mm"),
                        },
                        {
                          title: "Status",
                          dataIndex: "status",
                          render: (status) => (
                            <>
                              <div>
                                {status === 0
                                  ? "Queued"
                                  : status === 1
                                  ? "ReQueued"
                                  : status === 2
                                  ? "Seated"
                                  : status === 3
                                  ? "Closed"
                                  : status === 4
                                  ? "Canceled"
                                  : status === 5
                                  ? "Rest_Canceled"
                                  : status === 6
                                  ? "Rest_ReQueued"
                                  : status === 7
                                  ? "Rest_Queued"
                                  : status === 8
                                  ? "RestHold"
                                  : status === 9
                                  ? "Hold"
                                  : "--"}
                              </div>
                            </>
                          ),
                        },
                        {
                          title: "Customer",
                          dataIndex: "data, client_name ",
                          render: (data, client_name) => (
                            <>
                              <Link
                                to={
                                  "/editclient" +
                                  `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${Edate}`
                                }
                              >
                                <div>{client_name.client_name}</div>
                                <div>{client_name.client_phone}</div>
                              </Link>
                            </>
                          ),
                        },
                        {
                          title: "Host",
                          dataIndex: "name_en",
                        },
                      ]}
                      // rowKey={(record) => record.login.uuid}
                      dataSource={registered}
                      pagination={tableParams.pagination}
                      onChange={handleTableChange}
                      loading={isLoading}
                    />
                  </>
                )}
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
