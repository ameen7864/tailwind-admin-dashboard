import { useGetRestrationByNameQuery } from "@/pages/Redux/ReportsApi";
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

const RegisteredData = () => {
  const [search, setsearch] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [sdate, setSdate] = useState(today);
  const [Edate, setEdate] = useState(today);
  const [startDate, setstartdate] = useState(today);
  const [EndDate, setEndDate] = useState(today);
  const tableRef = useRef(null);

  const {
    data: register,
    refetch,
    isFetching,
    isLoading,
  } = useGetRestrationByNameQuery({
    startDate,
    EndDate,
  });

  const handlesearch = () => {
    setstartdate(sdate);
    setEndDate(Edate);
    refetch({ startDate, EndDate });
  };
  const registerdata = register?.ListOfData;

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

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: registerdata?.map((data) =>
        moment(data.createddate).format("L")
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

  const series = [
    {
      name: "series-1",
      data: registerdata?.map((data) => data.count),
    },
  ];
  return (
    <div>
      <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Date From:
          </label>
          <input
            type="date"
            id="first_name"
            defaultValue={today}
            onChange={(e) => setSdate(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            To:
          </label>
          <input
            type="date"
            defaultValue={today}
            onChange={(e) => setEdate(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
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
            <Chart options={options} series={series} type="area" height={350} />
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
            <Chart options={options} series={series} type="area" height={350} />
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
            <Chart options={options} series={series} type="area" height={350} />
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
            <Chart options={options} series={series} type="area" height={350} />
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
    </div>
  );
};

export default RegisteredData;
