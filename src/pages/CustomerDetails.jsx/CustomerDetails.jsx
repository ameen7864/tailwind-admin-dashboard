import Button, {
  CancelButton,
  Input,
  SubmitButton,
} from "@/widgets/Button/Button";
import Copy from "@/widgets/Tableandexport/Copy";
import Excel from "@/widgets/Tableandexport/Excel";
import Print from "@/widgets/Tableandexport/Print";
import Tables from "@/widgets/Tableandexport/Table";
import { StatisticsCards1 } from "@/widgets/cards";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Typography,
} from "@material-tailwind/react";
import { Grid } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { BiBlock, BiMap } from "react-icons/bi";
import { FaMale } from "react-icons/fa";
import {
  MdAppBlocking,
  MdExitToApp,
  MdFullscreenExit,
  MdNotificationsActive,
  MdOutlineAirlineSeatReclineExtra,
  MdOutlineAppsOutage,
  MdOutlineAssignmentReturn,
  MdOutlineEventSeat,
  MdOutlineModeEditOutline,
  MdOutlineTimelapse,
  MdOutlineWorkspacePremium,
  MdStoreMallDirectory,
} from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useGetQueueByNameQuery } from "../Redux/ReduxApi";
import { useRef } from "react";

const CustomerDetails = () => {
  const today = new Date().toISOString().split("T")[0];
  const tableRef = useRef(null);

  const { data: Queue, isFetching } = useGetQueueByNameQuery({});

  const restdata = Queue?.data;
  const headers = ["#", "Name English", "Name Arabic", "Status"];

  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.NameEnglish,
    item.NameArbic,
    item.isActive ? "active" : "unactive",
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
      <Card className="mt-10 ">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Client Deatils
          </Typography>
        </CardHeader>
        <CardBody className="mx-4 h-auto overflow-x-scroll px-0 pt-0 pb-2">
          <div className="mx-6 flex flex-wrap gap-6">
            <div className=" w-38 h-15 flex cursor-pointer flex-col items-center rounded-lg py-2 px-2 font-medium shadow-[2px_4px_9px_-4px_rgba(0,0,0,1)] ">
              <MdNotificationsActive className="flex justify-center  text-2xl" />
              <div>Send Notifications</div>
            </div>
            <div className="h-15 flex w-36 cursor-pointer flex-col items-center rounded-lg py-2 px-2 font-medium shadow-[2px_4px_9px_-4px_rgba(0,0,0,1)] ">
              <BiMap className="flex justify-center  text-2xl" />
              <div>map </div>
            </div>
            <div className="h-15 flex w-36 cursor-pointer flex-col items-center rounded-lg py-2 px-2 font-medium shadow-[2px_4px_9px_-4px_rgba(0,0,0,1)] ">
              <BiBlock className="flex justify-center  text-2xl" />
              <div>Block</div>
            </div>
            <div className="h-15 flex w-36 cursor-pointer flex-col items-center rounded-lg py-2 px-2 font-medium shadow-[2px_4px_9px_-4px_rgba(0,0,0,1)] ">
              <TiTick className="flex justify-center  text-2xl" />
              <div>Requeue</div>
            </div>
          </div>

          <div className="mx-4 my-6">
            <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title English"} name="Title_English" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
            </Typography>
            <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title English"} name="Title_English" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
            </Typography>
            <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title English"} name="Title_English" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
              <Typography className="col-span-1 my-3">
                <Input lbs={"Title Arabic"} name="Title_Arabic" />
              </Typography>
            </Typography>
            <Typography className="mx-4  grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-1 font-medium  capitalize">
                <label>Gender</label>
                <div>
                  <label>
                    <input type="radio" value="0" name="client_gender" />
                    male
                  </label>
                </div>
                <label>
                  <input type="radio" value="1" name="client_gender" />
                  female
                </label>
              </div>
              <div className="col-span-1  my-3 font-medium">
                <div>
                  <input type="checkbox" id="active" name="client_status" />
                  <label for="active"> &nbsp;Active</label>
                  {/* {user?.client_status ? (
                  ""
                ) : (
                  <span style={{ color: "red" }}>
                    <label for="active"> &nbsp;Blocked</label>
                  </span>
                )} */}
                </div>
              </div>
            </Typography>
            <Typography className="mb-10 mt-5  grid grid-cols-1 gap-4 md:grid-cols-3">
              <Typography className="col-span-1 my-3">
                <Input lbs={"Created Date"} type="date" />
              </Typography>
            </Typography>
            <hr className="my-4" />
            <Typography className="text-center">
              <SubmitButton />
              <CancelButton />
            </Typography>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-16 ">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Client Filter
          </Typography>
        </CardHeader>
        <CardBody className="mx-4 h-auto overflow-x-scroll px-0 pt-0 pb-2">
          <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label
                for="first_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Restaurant:
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
              >
                <option selected>Choose a country</option>
              </select>
            </div>
            <div>
              <label
                for="first_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Branch
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
              >
                <option selected>Choose a country</option>
              </select>
            </div>

            <div className="mt-7">
              <Button name={"search"} />
            </div>
          </Typography>
          <Grid container spacing={4} mt={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{0}</div>
                <div className="text-xl font-semibold">Total</div>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background: "linear-gradient(to right, #093028, #237a57)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{0}</div>
                <div className="text-lg">Seated</div>
                <div className="mt-2">
                  <Progress
                    value={0}
                    variant="gradient"
                    // color={perseated === 100 ? "green" : "blue"}
                    className="h-1"
                  />
                  <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                    {0}% of {0}
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background:
                    "linear-gradient(to right,rgb(254, 140, 0), rgb(221 148 58)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{0}</div>
                <div className="text-lg">Waiting(Not Seat)</div>
                <div className="mt-2">
                  <Progress
                    value={0}
                    variant="gradient"
                    // color={perwaited === 100 ? "green" : "blue"}
                    className="h-1"
                  />
                  <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                    {0}% of {0}
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background: "linear-gradient(to right,#f85032, #e73827)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{0}</div>
                <div className="text-lg">Cancelled</div>
                <div className="mt-2">
                  <Progress
                    value={0}
                    variant="gradient"
                    // color={percancel === 100 ? "green" : "blue"}
                    className="h-1"
                  />
                  <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                    {0}% of {0}
                  </div>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background: "linear-gradient(to right,#141e30, #243b55)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{}</div>
                <div className="text-lg">Kiosk</div>
                <div className="mt-2">
                  <Progress
                    value={0}
                    variant="gradient"
                    // color={perkiosk === 100 ? "green" : "blue"}
                    className="h-1"
                  />
                  <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                    {0}% of {0}
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  width: "100%",
                  minHeight: 130,
                  borderRadius: "8px",
                  background: "linear-gradient(to right, #4ecdc4, #556270)",
                  color: "white",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <div className="text-2xl">{0}</div>
                <div className="text-lg">Host</div>
                <div className="mt-2">
                  <Progress
                    value={0}
                    variant="gradient"
                    // color={pershost === 100 ? "green" : "blue"}
                    className="h-1"
                  />
                  <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                    {0}% of {0}
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
          <hr className="mt-6" />

          <div className="mb-6 mt-4  grid grid-cols-1 gap-y-12 gap-x-6 capitalize  md:grid-cols-3 xl:grid-cols-4">
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"white"}
              title="App"
              icon={<MdOutlineAppsOutage className="h-8 w-8 text-black" />}
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"light-green"}
              title="App Seated"
              icon={
                <MdOutlineAirlineSeatReclineExtra className="h-6 w-6 text-white" />
              }
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"deep-purple"}
              title="App Waiting (No Action)"
              icon={<MdOutlineTimelapse className="h-6 w-6 text-white" />}
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"red"}
              title="App Canceled"
              icon={<MdAppBlocking className="h-6 w-6 text-white" />}
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"brown"}
              title="Premium (Paid)"
              icon={
                <MdOutlineWorkspacePremium className="h-6 w-6 text-white" />
              }
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"indigo"}
              title="Premium Seated"
              icon={<MdOutlineEventSeat className="h-6 w-6 text-white" />}
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"gray"}
              title={"total purchase"}
              icon={<MdStoreMallDirectory className="h-6 w-6 text-white" />}
              completion={20}
            />
          </div>

          <div className="mb-6 mt-4  grid grid-cols-1 gap-y-12 gap-x-6 capitalize  md:grid-cols-3 xl:grid-cols-3">
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"orange"}
              title="Inside"
              icon={
                <MdOutlineAssignmentReturn className="h-6 w-6 text-white" />
              }
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"deep-orange"}
              title="Outside "
              icon={<MdExitToApp className="h-6 w-6 text-white" />}
              completion={20}
            />
            <StatisticsCards1
              key={"No Tickets"}
              value={100}
              color={"cyan"}
              title="Any "
              icon={<MdFullscreenExit className="h-6 w-6 text-white" />}
              completion={20}
            />
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 mb-8 flex flex-col gap-12">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Visited Restaurants
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-auto overflow-x-scroll px-0 pt-0 pb-2">
            <Tables
              data={restdata}
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  dataIndex: "index",
                  sorter: (a, b) => a.index - b.index,
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Name English",
                  dataIndex: "NameEnglish",
                  sorter: (a, b) => a.NameEnglish.localeCompare(b.NameEnglish),
                },
                {
                  title: "Name Arbic",
                  dataIndex: "NameArbic",
                  sorter: (a, b) => a.NameArbic.localeCompare(b.NameArbic),
                },
                {
                  title: "Status",
                  dataIndex: "Active",
                  sorter: (a, b) => a.Active - b.Active,
                  render: (Active) =>
                    Active === true ? (
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
                  title: "Edit",
                  dataIndex: "id",
                  render: (id) => (
                    <Link to={"/equeues/" + id}>
                      <MdOutlineModeEditOutline
                        size={20}
                        className="text-purple-700 "
                      />
                    </Link>
                  ),
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 mb-8 flex flex-col gap-12">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Tasks List (Notification)
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-auto overflow-x-scroll px-0 pt-0 pb-2">
            <Tables
              data={restdata}
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  dataIndex: "index",
                  sorter: (a, b) => a.index - b.index,
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Name English",
                  dataIndex: "NameEnglish",
                  sorter: (a, b) => a.NameEnglish.localeCompare(b.NameEnglish),
                },
                {
                  title: "Name Arbic",
                  dataIndex: "NameArbic",
                  sorter: (a, b) => a.NameArbic.localeCompare(b.NameArbic),
                },
                {
                  title: "Status",
                  dataIndex: "Active",
                  sorter: (a, b) => a.Active - b.Active,
                  render: (Active) =>
                    Active === true ? (
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
                  title: "Edit",
                  dataIndex: "id",
                  render: (id) => (
                    <Link to={"/equeues/" + id}>
                      <MdOutlineModeEditOutline
                        size={20}
                        className="text-purple-700 "
                      />
                    </Link>
                  ),
                },
              ]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetails;
