import {
  useGetAllRestBranchByNameQuery,
  useGetAllRestByNameQuery
} from "@/pages/Redux/ReduxApi";
import {
  useGetNotifyAverageByNameQuery,
  useGetNotifyMaxiumByNameQuery
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
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TurnOver = () => {
  const today = new Date().toISOString().split("T")[0];
  const [search, setsearch] = useState("");
  const [resto, setresto] = useState(-1);
  const [restId, setrestID] = useState(-1);
  const [branchid, setbranchid] = useState(-1);
  const [parentId, setparentId] = useState(-1);
  const [sdate, setSdate] = useState(today);
  const [Edate, setEdate] = useState(today);
  const [startDate, setstartdate] = useState(today);
  const [EndDate, setEndDate] = useState(today);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const page = tableParams.pagination.current;
  const pagelimit = tableParams.pagination.pageSize;

  const tableRef = useRef(null);
  const tableRef1 = useRef(null);

  const {
    data: averageTime,
    isFetching,
    refetch: insdefetch,
  } = useGetNotifyAverageByNameQuery({
    restId,
    parentId,
    startDate,
    EndDate,
    page,
    pagelimit,
  });

  const averageTimeData = averageTime?.data;

  const { data: MaximumTime, refetch: outsidefetch } =
    useGetNotifyMaxiumByNameQuery({
      restId,
      parentId,
      startDate,
      EndDate,
    });

  const { data: restaurant } = useGetAllRestByNameQuery();
  const { data: branch, refetch } = useGetAllRestBranchByNameQuery({
    id: resto,
  });

  const MaximumTimeData = MaximumTime?.data;
  const restaurantdata = restaurant?.data;
  const restaurantbranchdata = branch?.data;

  useEffect(() => {
    refetch({ id: resto });
  }, [resto]);

  const handlesearch = () => {
    setrestID(resto);
    setparentId(branchid);
    setstartdate(sdate);
    setEndDate(Edate);
    insdefetch({ restId, parentId, startDate, EndDate });
    outsidefetch({ restId, parentId, startDate, EndDate });
  };

  const headers = ["#", "Date", "Breakfast", "Lunch", "Dinner"];

  const tableData = averageTimeData?.map((item, index) => [
    index + 1,
    moment(item.Date).format("L"),
    // `${item.roundTime1.hours}:${item.roundTime1.minutes}`,
    // `${item.roundTime2.hours}:${item.roundTime2.minutes}`,
    // `${item.roundTime3.hours}:${item.roundTime3.minutes}`,
  ]);

  const headers1 = ["#", "Date", "Breakfast", "Lunch", "Dinner"];

  const tableData1 = averageTimeData?.map((item, index) => [
    index + 1,
    // moment(item.crDate).format("L"),
    // `${item.roundTime1.hours}:${item.roundTime1.minutes}`,
    // `${item.roundTime2.hours}:${item.roundTime2.minutes}`,
    // `${item.roundTime3.hours}:${item.roundTime3.minutes}`,
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  const handleExportToPDF1 = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable1" });
    doc.save("Requeue-portal.pdf");
  };

  function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return formattedMinutes + ":" + formattedSeconds;
  }

  return (
    <div>
      <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Date From:
          </label>
          <input
            type="date"
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
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Restaurant:
          </label>
          <select
            id="countries"
            onChange={(e) => setresto(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option value={"-1"}>Choose a Restaurant</option>
            {restaurantdata?.map((item, i) => (
              <option key={i} value={item.id}>
                {item.ResturantName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Branch
          </label>

          <select
            id="countries"
            onChange={(e) => setbranchid(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option value={"-1"}>Choose a Branch</option>
            {restaurantbranchdata?.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name_en}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-7">
          <Button name={"search"} onClick={handlesearch} />
        </div>
      </Typography>

      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} Loading={isFetching} />
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
              Average Notify Time
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
              data={averageTimeData}
              loading={isFetching}
              columns={[
                {
                  title: "Date",
                  dataIndex: "Date",
                  render: (Date) => moment(Date).format("L"),
                },
                {
                  title: "Breakfast",
                  dataIndex: "Breakfast",
                  render: (Breakfast) => (
                    <div>
                      {convertSecondsToMinutes(Breakfast ? Breakfast : 0)}
                    </div>
                  ),
                },

                {
                  title: "Lunch",
                  dataIndex: "Lunch",

                  render: (Lunch) => (
                    <div>{convertSecondsToMinutes(Lunch ? Lunch : 0)}</div>
                  ),
                },
                {
                  title: "Dinner",
                  dataIndex: "Dinner",

                  render: (Dinner) => (
                    <div>{convertSecondsToMinutes(Dinner ? Dinner : 0)}</div>
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

      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy
            headers={headers1}
            tableData={tableData1}
            Loading={isFetching}
          />
          <Excel tableRef={tableRef1} />
          <Button name={"Pdf"} onClick={handleExportToPDF1} />
          <Print tableRef={tableRef1} />
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
              Maximum Notify Time
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
              data={MaximumTimeData}
              loading={isFetching}
              columns={[
                {
                  title: "Date",
                  dataIndex: "createdDate",
                  render: (createdDate) => (
                    <Link
                      to={
                        "/max-data" +
                        `?&sdate=${createdDate}&edate=${createdDate}&notify=2`
                      }
                    >
                      {moment(createdDate).format("L")}
                    </Link>
                  ),
                },
                {
                  title: "Joined Time",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <div>
                      {moment(queuedata?.queuedata?.createdDate).format(
                        "hh:mm"
                      )}
                    </div>
                  ),
                },
                {
                  title: "Call Time",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <div>
                      {moment(queuedata?.queuedata?.callDate).format("hh:mm")}
                    </div>
                  ),
                },
                {
                  title: "Checkin Time",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <div>
                      {moment(
                        queuedata?.queuedata?.checkedInDate
                          ? queuedata?.queuedata?.checkedInDate
                          : new Date()
                      ).format("hh:mm")}
                    </div>
                  ),
                },
                {
                  title: "Time Taken",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) =>
                    convertSecondsToMinutes(queuedata.maxTime),
                },
                {
                  title: "Seat Area",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <div>
                      {queuedata?.queuedata?.position === 0
                        ? "Outside"
                        : "Inside"}
                    </div>
                  ),
                },
                {
                  title: "Number In Queue",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <div>{queuedata?.queuedata?.queueNumber}</div>
                  ),
                },
                {
                  title: "Status",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <>
                      <div>
                        {console.log(queuedata)}
                        {queuedata?.queuedata?.status === 0
                          ? "Queued"
                          : queuedata?.queuedata?.status === 1
                          ? "ReQueued"
                          : queuedata?.queuedata?.status === 2
                          ? "Seated"
                          : queuedata?.queuedata?.status === 3
                          ? "Closed"
                          : queuedata?.queuedata?.status === 4
                          ? "Canceled"
                          : queuedata?.queuedata?.status === 5
                          ? "Rest_Canceled"
                          : queuedata?.queuedata?.status === 6
                          ? "Rest_ReQueued"
                          : queuedata?.queuedata?.status === 7
                          ? "Rest_Queued"
                          : queuedata?.queuedata?.status === 8
                          ? "RestHold"
                          : queuedata?.queuedata?.status === 9
                          ? "Hold"
                          : "--"}
                      </div>
                    </>
                  ),
                },
                {
                  title: "Customer",
                  dataIndex: "data, queuedata",
                  render: (data, queuedata) => (
                    <>
                      <Link
                        to={
                          "/editclient" +
                          `?client=${queuedata?.queuedata?.client_id}&sdate=${
                            queuedata?.queuedata?.createdDate
                          }&edate=${""}`
                        }
                      >
                        <div>{queuedata?.queuedata?.client_name}</div>
                        <div>{queuedata?.queuedata?.client_phone}</div>
                      </Link>
                    </>
                  ),
                },
                {
                  title: "Host",
                  dataIndex: "data, queuedata ",
                  render: (data, queuedata) => (
                    <div>{queuedata?.queuedata?.name_en}</div>
                  ),
                },
              ]}
            />
          </CardBody>
        </Card>
        <div style={{ display: "none" }}>
          <table ref={tableRef1} id="myTable1">
            <thead>
              <tr>
                {headers1?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData1?.map((row, index) => (
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

export default TurnOver;
