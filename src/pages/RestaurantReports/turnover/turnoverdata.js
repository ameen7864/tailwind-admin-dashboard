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
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegestered] = useState([]);
  const leng = registered.length;
  const searched = useLocation().search;
  const branch = new URLSearchParams(searched).get("parentId");
  const rest = new URLSearchParams(searched).get("restId");
  const fromto = new URLSearchParams(searched).get("f");
  const lastto = new URLSearchParams(searched).get("t");
  const sdate = new URLSearchParams(searched).get("sdate");
  const edate = new URLSearchParams(searched).get("edate");
  const t = new URLSearchParams(searched).get("t");
  const E = new URLSearchParams(searched).get("E");
  const position = new URLSearchParams(searched).get("position");
  const formattedDate = moment(sdate).format("YYYY-MM-DD");
  const startDates = t == 1 ? "00:00" : t == 3 ? "12:00" : t == 5 ? "18:00" : " ";
  const endDates = E == 2 ? "11:59" : E == 4 ? "17:59" : E == 6 ? "23:59" : " ";
  console.log(E);

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes);
  }
  useEffect(() => {
    axios
      .get(
        `/WebAdmin/turnOverDetails?position=${position}&restId=49&startDate=${formattedDate}%20${startDates}&EndDate=${formattedDate}%20${endDates}&status=2`,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("AccessToken")),
          },
        }
      )
      .then(function (response) {
        setRegestered(response.data.data);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
                  Turnover Time {position == 0 ? "Outside" : "Inside"}
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
                          title: "Joined Time",
                          dataIndex: "joinTime",
                          render: (joinTime) => moment(joinTime).format("hh:mm"),
                        },
                        {
                          title: "Expected Time",
                          dataIndex: "expectedDate",
                          render: (expectedDate) => moment(expectedDate).format("hh:mm"),
                        },
                        {
                          title: "Checkin Time",
                          dataIndex: "checkoutDate",
                          render: (checkoutDate) => moment(checkoutDate).format("hh:mm"),
                        },
                        {
                          title: "Waiting Time",
                          dataIndex: "wait",
                          render: (wait) => toHoursAndMinutes(wait),
                        },

                        {
                          title: "Seat Area",
                          dataIndex: "position",
                          render: (position) => (
                            <div>{position === 0 ? "Outside" : position === 1 ? "Inside" : ""}</div>
                          ),
                        },
                        {
                          title: "Number In Queue",
                          dataIndex: "queueNumber",
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
                                  `?client=${client_name.client_id}&sdate=${
                                    client_name.createdDate
                                  }&edate=${""}`
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
