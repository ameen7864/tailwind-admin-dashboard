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
  const defaultValues = new Date(date).toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegestered] = useState([]);
  const [count, setcount] = useState(0);

  const [Edate, setEdate] = useState(defaultValues);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const searched = useLocation().search;
  const notify = new URLSearchParams(searched).get("notify");
  const sdate = new URLSearchParams(searched).get("sdate");
  const edate = new URLSearchParams(searched).get("edate");
  const defaultValue = new Date(sdate).toISOString().split("T")[0];
  const queryChange=notify==2?"MaxNotifyDetails":"MaxCalltimeDetails"
  console.log(queryChange);

  useEffect(() => {
    setIsLoading(true);
    axios

      .get(
        `/WebAdmin/${queryChange}?page=${tableParams.pagination.current}&pagelimit=${tableParams.pagination.pageSize}&startDate=${defaultValue}%2000:00&EndDate=${defaultValue}%2023:59&status=2`,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("AccessToken")),
          },
        }
      )
      .then(function (response) {
        for (let i = 0; i < response.data.data.length; i++) {
          response.data.data[i]["i"] =
            i +
            1 +
            (tableParams.pagination.current * tableParams.pagination.pageSize -
              tableParams.pagination.pageSize);
        }
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
                  Maxiumum Registered List Report ({registered?.length})
                </MDTypography>
              </MDBox>
              <MDBox
                pt={3}
                style={{
                  height: registered.length === 0 ? "auto" : "calc(100vh - 220px)",
                  overflowY: "scroll",
                  borderRadius: "20px",
                }}
              >
                <>
                  <Table
                    columns={[
                      {
                        title: " #",
                        dataIndex: "i",
                      },
                      {
                        title: "Joined Time",
                        dataIndex: "joinTime",
                        render: (joinTime) => <div>{moment(joinTime).format("hh:mm")}</div>,
                      },
                      {
                        title: "Call Time",
                        dataIndex: "callDate",
                        render: (callDate) => <div>{moment(callDate).format("hh:mm")}</div>,
                      },
                      {
                        title: "Checkin Time",
                        dataIndex: "checkedInDate",
                        render: (checkedInDate) => (
                          <div>{moment(checkedInDate).format("hh:mm")}</div>
                        ),
                      },
                      {
                        title: "Time Taken",
                        dataIndex: "maxTime",
                        render: (maxTime) => <div>{moment(maxTime).format("hh:mm")}</div>,
                      },
                      {
                        title: "Seat Area",
                        dataIndex: "position",

                        render: (position) => <div>{position == 0 ? "Inside" : "Outside"}</div>,
                      },
                      {
                        title: "Number In Queue",
                        dataIndex: "queueNumber",
                        render: (joinTime) => <div>{moment(joinTime).format("hh:mm")}</div>,
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
