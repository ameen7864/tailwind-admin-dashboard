import {
  useGetCancelQueByNameQuery,
  useGetLongestWaitingByNameQuery,
  useGetMaxSeatByNameQuery,
  useGetNoSeatReqByNameQuery,
  useGetRestLogFullByNameQuery,
  useGetRestLogInsFullByNameQuery,
  useGetRestLogInsideByNameQuery,
  useGetRestLogOffByNameQuery,
  useGetRestLogOutByNameQuery,
  useGetRestLogOutFullByNameQuery,
  useGetRestrationByNameQuery,
  useGetTotalQueByNameQuery,
} from "@/pages/Redux/ReportsApi";
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
import { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const RegisteredData = () => {
  const [search, setsearch] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [restId, setrestId] = useState(-1);
  const [parentId, setparentId] = useState(-1);
  const [sdate, setSdate] = useState("20-01-2023");
  const [Edate, setEdate] = useState(today);
  const [startDate, setstartdate] = useState("2023-01-20");
  const [EndDate, setEndDate] = useState(today);
  const tableRef = useRef(null);

  const {
    data: longest,
    refetch,
    isFetching,
    isLoading,
  } = useGetLongestWaitingByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
  });

  const { data: Requested, refetch: Requestedfetch } =
    useGetNoSeatReqByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });

  const { data: Max, refetch: Maxfetch } = useGetLongestWaitingByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
  });
  const { data: Canceled, refetch: Canceledfetch } = useGetCancelQueByNameQuery(
    {
      restId,
      parentId,
      startDate,
      EndDate,
    }
  );
  const { data: Total, refetch: Totalfetch } = useGetTotalQueByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
  });
  const { data: Full, refetch: Fullfetch } = useGetRestLogFullByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
  });
  const { data: Offline, refetch: Offlinefetch } = useGetRestLogOffByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
  });
  const { data: InsideClose, refetch: InsideClosefetch } =
    useGetRestLogInsideByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });
  const { data: OutsideClose, refetch: OutsideClosefetch } =
    useGetRestLogOutByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });

  const { data: InsideFull, refetch: InsideFullfetch } =
    useGetRestLogInsFullByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });

  const { data: OutsideFull, refetch: OutsideFullfetch } =
    useGetRestLogOutFullByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });

  const handlesearch = () => {
    setstartdate(sdate);
    setEndDate(Edate);
    refetch({ startDate, EndDate });
  };
  const LongestData = longest?.maxTimes;
  const cancelledData = Canceled?.data;
  const Totaldata = Total?.data;
  const FullData = Full?.data;
  const OfflineData = Offline?.data;
  const InsideCloseData = InsideClose?.data;

  const OutsideCloseData = OutsideClose?.data;
  const InsideFullData = InsideFull?.data;
  const OutsideFullData = OutsideFull?.data;

  const MaxData = Max?.data;
  const registerdata = longest?.ListOfData;

  const headers = ["#", "name", "Status", "Created Date", "Duration"];

  const tableData = registerdata?.map((item, index) => [
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

  const LongestOption = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: LongestData?.map((data) =>
        moment(data.maxCreatedDate).format("L")
      ),
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false, // Hide the download button
    },

    colors: ["#7537BE"],
  };

  const LongestSeries = [
    {
      name: "series-1",
      data: LongestData?.map((data) => data.maxTime),
    },
  ];

  const MaxOption = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: LongestData?.map((data) =>
        moment(data.maxCreatedDate).format("L")
      ),
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false, // Hide the download button
    },

    colors: ["#7537BE"],
  };

  const MaxSeries = [
    {
      name: "series-1",
      data: LongestData?.map((data) => data.maxTime),
    },
  ];

  const CancelOption = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: cancelledData?.map((data) =>
        moment(data.createdDate).format("L")
      ),
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false, // Hide the download button
    },

    colors: ["#7537BE"],
  };

  const CancelSeries = [
    {
      name: "series-1",
      data: cancelledData?.map((data) => data.count),
    },
  ];

  const TotalOption = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: Totaldata?.map((data) =>
        moment(data.createdDate).format("L")
      ),
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false, // Hide the download button
    },

    colors: ["#7537BE"],
  };

  const TotalSeries = [
    {
      name: "series-1",
      data: Totaldata?.map((data) => data.count),
    },
  ];

  function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return formattedMinutes + ":" + formattedSeconds;
  }

  return (
    <div>
      <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Date From:
          </label>
          <input
            type="date"
            id="first_name"
            defaultValue={today}
            onChange={(e) => setSdate(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            To:
          </label>
          <input
            type="date"
            defaultValue={today}
            onChange={(e) => setEdate(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>

        <div className="mt-8">
          <Button name={"search"} onClick={handlesearch} />
        </div>
      </Typography>
      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Longest Waiting Time Data
          </Typography>
        </CardHeader>
        <div className="my-5">
          <CardHeader variant="gradient">
            <Chart
              options={LongestOption}
              series={LongestSeries}
              type="area"
              height={350}
            />
          </CardHeader>
        </div>
      </Card>

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
              Longest Waiting Time
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={LongestData}
              loading={isFetching}
              columns={[
                {
                  title: "Date",
                  dataIndex: "maxCreatedDate",
                  render: (maxCreatedDate) => (
                    <>
                      <Link
                        to={
                          "/analyticdata" +
                          `?status=${2}&sdate=${sdate}&edate=${Edate}&restid=${restId}`
                        }
                      >
                        <div>{moment(maxCreatedDate).format("L")}</div>
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Waiting Time",
                  dataIndex: "maxTime",
                  render: (maxTime) => convertSecondsToMinutes(maxTime),
                },
                {
                  title: "EST",
                  dataIndex: "est",
                  render: (est) => <div>{est == "null" ? "--" : est}</div>,
                },
                {
                  title: "Seat Area",
                  dataIndex: "position",
                  render: (position) => (
                    <div>{position == 0 ? "Inside" : "Outside"}</div>
                  ),
                },
                {
                  title: "Number",
                  dataIndex: "queueNumber",
                },
                {
                  title: "Joined Time",
                  dataIndex: "checkedInDate",
                  render: (checkedInDate) =>
                    moment(checkedInDate).format("hh:mm"),
                },
                {
                  title: "Expected Time",
                  dataIndex: "expectedDate",
                  render: (expectedDate) =>
                    moment(expectedDate).format("hh:mm"),
                },
                {
                  title: "Checkout Time",
                  dataIndex: "checkoutDate",
                  render: (checkoutDate) =>
                    moment(checkoutDate).format("hh:mm"),
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
                  dataIndex: "client_name",
                  render: (data, client_name) => (
                    <Link
                      to={
                        "/editclient" +
                        `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${Edate}`
                      }
                    >
                      <div>{client_name.client_name}</div>
                      <div>{client_name.client_phone}</div>
                    </Link>
                  ),
                },

                {
                  title: "Host",
                  dataIndex: "name_en",
                },
              ]}
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

      {/* Number Of Seat Requested */}
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
              Number Of Seat Requested
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
            {/* <Tables
              data={registerdata}
              loading={isLoading}
              columns={[
                    {
                      title: "Date",
                      dataIndex: "crDate",
                      render: (crDate) => moment(crDate).format("L"),
                    },
                    {
                      title: "1-2 Seat",
                      dataIndex: "group1",
                      render: (group1) => (
                        <Link
                          to={
                            "/seatdata" +
                            `?parentId=${branchid}&restId=${restId}&f=1&t=2&sdate=${
                              sdate + "%2000:00"
                            }&edate=${sdate + "%2023:59"}`
                          }
                        >
                          <div>{group1}</div>
                        </Link>
                      ),
                    },

                    {
                      title: "3-4 Seat",
                      dataIndex: "group2",
                      render: (group2) => (
                        <Link
                          to={
                            "/seatdata" +
                            `?parentId=${branchid}&restId=${restId}&f=3&t=4&sdate=${
                              sdate + "%2000:00"
                            }&edate=${sdate + "%2023:59"}`
                          }
                        >
                          <div>{group2}</div>
                        </Link>
                      ),
                    },
                    {
                      title: "5-6 Seat",
                      dataIndex: "group3",
                      render: (group3) => (
                        <Link
                          to={
                            "/seatdata" +
                            `?parentId=${branchid}&restId=${restId}&f=5&t=6&sdate=${
                              sdate + "%2000:00"
                            }&edate=${sdate + "%2023:59"}`
                          }
                        >
                          <div>{group3}</div>
                        </Link>
                      ),
                    },
                    {
                      title: "6+ Seat",
                      dataIndex: "group4",
                      render: (group4) => (
                        <Link
                          to={
                            "/seatdata" +
                            `?parentId=${branchid}&restId=${restId}&f=6&t=8&sdate=${
                              sdate + "%2000:00"
                            }&edate=${sdate + "%2023:59"}`
                          }
                        >
                          <div>{group4}</div>
                        </Link>
                      ),
                    },
                  ]}
           
            /> */}
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

      {/* Max Seat (Guests) */}

      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Max Seat (Guests)
          </Typography>
        </CardHeader>
        <div className="my-5">
          <CardHeader variant="gradient">
            <Chart
              options={LongestOption}
              series={LongestSeries}
              type="area"
              height={350}
            />
          </CardHeader>
        </div>
      </Card>
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
              Max Seat (Guests)
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={registerdata}
              loading={isLoading}
              columns={[
                {
                  title: "Date",
                  dataIndex: "createddate",
                  render: (createddate) => (
                    <>
                      {/* <Link
                        to={
                          "/registereddata" +
                          `?&sdate=${createddate}&edate=${createddate}`
                        }
                      > */}
                      <div>{moment(createddate).format("L")}</div>
                      {/* </Link> */}
                    </>
                  ),
                },

                {
                  title: "Total",
                  dataIndex: "data,  count",
                  render: (data, count) => (
                    <>
                      {/* <Link
                        to={
                          "/registereddata" +
                          `?&sdate=${count.createddate}&edate=${count.createddate}`
                        }
                      >*/}
                      <div>{count.count}</div>
                      {/* </Link>  */}
                    </>
                  ),
                },
              ]}
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

      {/* Canceled Queue */}

      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Canceled Queue
          </Typography>
        </CardHeader>
        <div className="my-5">
          <CardHeader variant="gradient">
            <Chart
              options={CancelOption}
              series={CancelSeries}
              type="area"
              height={350}
            />
          </CardHeader>
        </div>
      </Card>
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
              Canceled Queue
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={cancelledData}
              loading={isLoading}
              columns={[
                {
                  title: "Date",
                  dataIndex: "createdDate",
                  render: (createdDate) => (
                    <>
                      <Link
                        to={
                          "/cancellation" +
                          `?&sdate=${sdate + "%2000:00"}&edate=${
                            sdate + "%2023:59"
                          }&restid=${restId}`
                        }
                      >
                        <div>{moment(createdDate).format("L")}</div>
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Total Queue",
                  dataIndex: "count",
                },
              ]}
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

      {/*Total Queued (Not Seat)  */}

      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Total Queued (Not Seat)
          </Typography>
        </CardHeader>
        <div className="my-5">
          <CardHeader variant="gradient">
            <Chart
              options={TotalOption}
              series={TotalSeries}
              type="area"
              height={350}
            />
          </CardHeader>
        </div>
      </Card>
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
              Total Queued (Not Seat)
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={Totaldata}
              loading={isLoading}
              columns={[
                {
                  title: "Date",
                  dataIndex: "createdDate",
                  render: (createdDate) => (
                    <Link
                      to={
                        "/guestdata" +
                        `?type=5&&sdate=${sdate + "%2000:00"}&edate=${
                          sdate + "%2023:59"
                        }`
                      }
                    >
                      <div> {moment(createdDate).format("L")}</div>
                    </Link>
                  ),
                },
                {
                  title: "Total Queue",
                  dataIndex: "count",
                },
              ]}
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

      {/* Rest Log - Full */}
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
              Rest Log - Full
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={FullData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

      {/* Rest Log - Offline */}

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
              Rest Log - Offline
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={OfflineData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

      {/* Rest Log - InsideClose */}

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
              Rest Log - InsideClose
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={InsideCloseData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

      {/* Rest Log - OutsideClose */}
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
              Rest Log - OutsideClose
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={OutsideCloseData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

      {/* Rest Log - InsideFull */}
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
              Rest Log - InsideFull
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={InsideFullData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

      {/* Rest Log - OutsideFull */}
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
              Rest Log - OutsideFull
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_50vh)] overflow-x-scroll px-0 pt-0 pb-2">
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
              data={OutsideFullData}
              loading={isLoading}
              columns={[
                {
                  title: "Rest",
                  dataIndex: "data, name_en",
                  render: (data, name_en) => (
                    <Link to={"/rbranches/" + name_en.userID}>
                      <div>{name_en.name_en}</div>
                    </Link>
                  ),
                },
                {
                  title: " User",
                  dataIndex: "user_title",
                },

                {
                  title: "type",
                  dataIndex: "type",
                  render: (type) => (
                    <div>
                      {type === 0
                        ? "Close"
                        : type === 1
                        ? "Full"
                        : type === 2
                        ? "AreaFull"
                        : type === 3
                        ? "AreaClose"
                        : type === 4
                        ? "InsideFull"
                        : type === 5
                        ? "InsideClose"
                        : type === 6
                        ? "OutsideFull"
                        : type === 7
                        ? "OutsideClose"
                        : type === 8
                        ? "AnyFull"
                        : type === 9
                        ? "AnyClose"
                        : type === 10
                        ? "HoldActive"
                        : type === 11
                        ? "Offline"
                        : "--"}
                    </div>
                  ),
                },
                {
                  title: "Start",
                  dataIndex: "eventStart",
                  render: (eventStart) => moment(eventStart).format("LLL"),
                },
                {
                  title: "End",
                  dataIndex: "eventEnd",
                  render: (eventEnd) => moment(eventEnd).format("LLL"),
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  render: (duration) => convertSecondsToMinutes(duration),
                },
              ]}
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

export default RegisteredData;
