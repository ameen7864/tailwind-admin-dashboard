import {
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { IoIosGitBranch } from "react-icons/io";
import "jspdf-autotable";
import { useState } from "react";
import {
  MdChairAlt,
  MdDelete,
  MdMenuBook,
  MdOutlineInfo,
  MdOutlineModeEditOutline,
  MdOutlineSupervisedUserCircle,
  MdQueue,
} from "react-icons/md";
import Button, {
  CancelButton,
  Checkbox,
  Input,
  TextFeild,
} from "@/widgets/Button/Button";
import { Link } from "react-router-dom";
import {
  useGetCuisineByNameQuery,
  useGetRestaurantBranchByNameQuery,
  useGetRestaurantIdByNameQuery,
  useGetRestaurantMenuByNameQuery,
  useGetRestaurantTablesByNameQuery,
  useGetRestaurantUsersByNameQuery,
} from "@/pages/Redux/ReduxApi";
import moment from "moment";
import { Image, QRCode } from "antd";
import Tables from "@/widgets/Tableandexport/Table";
import { IconButton } from "@mui/material";

const BranchDetails = () => {
  const { data: cuisines } = useGetCuisineByNameQuery({
    pages: 1,
    pageSize: 10000,
  });
  const cuisinedata = cuisines?.data;

  const { data: restaurantdata, isFetching } = useGetRestaurantIdByNameQuery(2);
  const { data: restaurantusers } = useGetRestaurantUsersByNameQuery(2);
  const { data: restauranttables } = useGetRestaurantTablesByNameQuery(2);
  const { data: restaurantmenu } = useGetRestaurantMenuByNameQuery(2);
  const restdata = restaurantdata?.data[0];

  const restusersdata = restaurantusers?.data;
  const resttablesdata = restauranttables?.data;
  const restmenudata = restaurantmenu?.data;

  console.log(restdata);

  return (
    <div>
      <hr className="mt-4" />

      <div className="mt-6 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Branch Details
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <div className="w-full">
              <Tabs id="custom-animation" value="Info">
                <TabsHeader>
                  <Tab value={"Info"}>
                    <MdOutlineInfo className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Info
                  </Tab>
                  <Tab value={"users"}>
                    <MdOutlineSupervisedUserCircle className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Users
                  </Tab>
                  <Tab value={"tables"}>
                    <MdChairAlt className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Tables
                  </Tab>
                  <Tab value={"queue"}>
                    <MdQueue className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Queue Tags
                  </Tab>
                  <Tab value={"menu"}>
                    <MdMenuBook className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Menu
                  </Tab>
                </TabsHeader>
                <TabsBody
                  animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                  }}
                >
                  <TabPanel value={"Info"}>
                    <div className="mt-10">
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Typography className="col-span-1 my-3 mt-4">
                          <QRCode
                            value={
                              restdata?.qrCode ? restdata?.qrCode : "requeue"
                            }
                          />
                          <Input
                            lbs={"QR Code"}
                            disabled
                            value={restdata?.qrCode}
                          />
                        </Typography>
                        <Typography className="col-span-1 mt-44">
                          <Input
                            lbs={"Status"}
                            disabled
                            value={restdata?.status}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Restaurant ID"}
                            disabled
                            value={restdata?.parentID}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Branch ID"}
                            disabled
                            value={restdata?.id}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Area"}
                            disabled
                            value={restdata?.areaId}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Title English"}
                            disabled
                            value={restdata?.name_ar}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Title Arabic"}
                            disabled
                            value={restdata?.name_en}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Max.number of queue"}
                            disabled
                            value={restdata?.maxQueue}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Max. Chairs"}
                            disabled
                            value={restdata?.maxGroup}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Order ID"}
                            disabled
                            value={restdata?.orderId}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Longitude"}
                            disabled
                            value={restdata?.longitude}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Latitude"}
                            disabled
                            value={restdata?.latitude}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Created Date"}
                            disabled
                            value={moment(restdata?.creadteDate).format(
                              "DD/MM/YYYY"
                            )}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Typography className="col-span-1 my-3">
                          <TextFeild
                            tflbs={"Address"}
                            disabled
                            value={restdata?.address}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Open Time"}
                            disabled
                            value={moment(restdata?.openHour).format("LT")}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Close Time"}
                            disabled
                            value={moment(restdata?.closeHour).format("LT")}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="md:grid-cols- grid grid-cols-4 gap-4">
                        <Typography className="col-span-1 my-3">
                          <Checkbox
                            cbox={"IsActive?"}
                            checked={restdata?.isActive === true}
                            disabled
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Checkbox
                            cbox={"Tables Active?"}
                            checked={restdata?.tablesOptions === true}
                            disabled
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Checkbox
                            cbox={"Inside Area"}
                            checked={restdata?.insideActive === true}
                            disabled
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Checkbox
                            cbox={"Outside Area"}
                            checked={restdata?.outsideActive === true}
                            disabled
                          />
                        </Typography>
                      </Typography>
                      <Typography className="m-3">
                        <label className="text-black-900 mb-2 block text-sm font-medium capitalize dark:text-white">
                          Cuisines
                        </label>
                        <Typography className="h-60  overflow-y-scroll">
                          {cuisinedata?.map((value, index) => (
                            <label
                              key={index}
                              className="my-2 flex items-center text-sm font-medium"
                            >
                              <input
                                className="mx-2 "
                                type="checkbox"
                                value={value.id}
                                disabled
                                // onChange={handleCheckboxChange}
                              />
                              {value.name_en}
                            </label>
                          ))}
                        </Typography>
                      </Typography>
                      <hr />
                      <div className=" mt-4 flex justify-center text-center">
                        <Link to={"/erestaurant/" + "id"}>
                          <Button name={"Edit"}>Edit</Button>
                        </Link>
                        <CancelButton />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={"users"}>
                    <Card className="mt-5">
                      <Typography variant="h6" color="white">
                        Users List
                      </Typography>

                      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
                        <div className="flex flex-wrap">
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                        </div>
                        <Link to={"/dashboard/adduser?restid=1"}>
                          <Button name={"Add user"} />
                        </Link>
                      </div>
                      <Tables
                        data={restusersdata}
                        loading={isFetching}
                        columns={[
                          {
                            title: "#",
                            render: (text, record, index) => index + 1,
                          },
                          {
                            title: "Title",
                            dataIndex: "user_title",
                          },
                          {
                            title: "Access Name",
                            dataIndex: "userName",
                          },

                          {
                            title: "Status",
                            dataIndex: "is_active",
                            render: (is_active) =>
                              is_active === true ? (
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
                            title: "Created Date",
                            dataIndex: "created_date",
                            render: (created_date) =>
                              moment(created_date).format("dddd LL"),
                          },

                          {
                            title: "Action",
                            dataIndex: "user_id",
                            render: (user_id) => (
                              <Link to={"/edituser/" + user_id}>
                                <MdOutlineModeEditOutline
                                  size={20}
                                  className="text-purple-700 "
                                />
                              </Link>
                            ),
                          },
                        ]}
                      />
                    </Card>
                  </TabPanel>
                  <TabPanel value={"tables"}>
                    {" "}
                    <Card className="mt-5">
                      <Typography variant="h6" color="white">
                        Tables List
                      </Typography>

                      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
                        <div className="flex flex-wrap">
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                        </div>
                        <Link to={"/dashboard/branchestables?restid=1"}>
                          <Button name={"Add Tables"} />
                        </Link>
                      </div>
                      <Tables
                        data={resttablesdata}
                        loading={isFetching}
                        columns={[
                          {
                            title: "#",
                            render: (text, record, index) => index + 1,
                          },
                          {
                            title: "Name",
                            dataIndex: "name",
                          },
                          {
                            title: "Chares Number",
                            dataIndex: "charesNumber",
                          },
                          {
                            title: "Area",
                            dataIndex: "position",
                            render: (position) =>
                              position === 0 ? (
                                <div>Inside</div>
                              ) : position === 1 ? (
                                <div>Outside</div>
                              ) : (
                                <div>any</div>
                              ),
                          },

                          {
                            title: "Status",
                            dataIndex: "status",
                            render: (status) =>
                              status === true ? (
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
                              <>
                                {" "}
                                <>
                                  {" "}
                                  <IconButton>
                                    {/* <Link to={"/ebanner/" + b_id}> */}
                                    <MdOutlineModeEditOutline
                                      size={20}
                                      className="text-purple-700 "
                                    />
                                    {/* </Link> */}
                                    &nbsp;&nbsp;
                                  </IconButton>
                                  <IconButton>
                                    <MdDelete
                                      style={{
                                        cursor: "pointer",
                                        color: "#dd4b39",
                                      }}
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure to delete this record?"
                                          )
                                        ) {
                                          handleDeleteItem(b_id);
                                        }
                                      }}
                                    />
                                  </IconButton>
                                </>
                                <Link to={"/edittables" + `?data=${id}`}>
                                  {/* <Icon
                                                fontSize="small"
                                                color="inherit"
                                                style={{ cursor: "pointer", color: "skyblue" }}
                                              >
                                                edit
                                              </Icon> */}
                                </Link>
                                {/* <Icon
                                  className="mx-4"
                                  fontSize="small"
                                  color="inherit"
                                  style={{ cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure to delete this record?"
                                      )
                                    ) {
                                      handledeletetable(id);
                                    }
                                  }}
                                >
                                  delete
                                </Icon> */}
                              </>
                            ),
                          },
                        ]}
                      />
                    </Card>
                  </TabPanel>
                  <TabPanel value={"queue"}>
                    {" "}
                    <Card className="mt-5">
                      <Typography variant="h6" color="white">
                        Queue List
                      </Typography>

                      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
                        <div className="flex flex-wrap">
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                        </div>
                        <Link to={"/dashboard/adduser?restid=1"}>
                          <Button name={"Add Queue"} />
                        </Link>
                      </div>
                      <Tables
                        data={restusersdata}
                        loading={isFetching}
                        columns={[
                          {
                            title: "#",
                            render: (text, record, index) => index + 1,
                          },
                          {
                            title: "Title",
                            dataIndex: "user_title",
                          },
                          {
                            title: "Access Name",
                            dataIndex: "userName",
                          },

                          {
                            title: "Status",
                            dataIndex: "is_active",
                            render: (is_active) =>
                              is_active === true ? (
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
                            title: "Created Date",
                            dataIndex: "created_date",
                            render: (created_date) =>
                              moment(created_date).format("dddd LL"),
                          },

                          {
                            title: "Action",
                            dataIndex: "user_id",
                            render: (user_id) => (
                              <Link to={"/edituser/" + user_id}>
                                {/* <Icon
                                                fontSize="small"
                                                color="inherit"
                                                style={{ cursor: "pointer", color: "skyblue" }}
                                              >
                                                edit
                                              </Icon> */}
                              </Link>
                            ),
                          },
                        ]}
                      />
                    </Card>
                  </TabPanel>
                  <TabPanel value={"menu"}>
                    {" "}
                    <Card className="mt-5">
                      <Typography variant="h6" color="white">
                        Menu List
                      </Typography>

                      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
                        <div className="flex flex-wrap">
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                        </div>
                        <Link to={"/dashboard/branchesmenu?restid=1"}>
                          <Button name={"Add Menu"} />
                        </Link>
                      </div>
                      <Tables
                        data={restmenudata}
                        loading={isFetching}
                        columns={[
                          {
                            title: "#",
                            render: (text, record, index) => index + 1,
                          },
                          {
                            title: "Name",
                            dataIndex: "id, name",

                            render: (na, name) => (
                              //   <Link to={"/menudata" + `?id=${name.id}&rest=${id}`}>

                              <div>{name.name}</div>
                              //   </Link>
                            ),
                          },

                          {
                            title: "Status",
                            dataIndex: "status",
                            render: (status) =>
                              status === true ? (
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
                            dataIndex: "id, data",
                            render: (da, data) => (
                              <>
                                <Link
                                  to={"/emenu" + `?id=${data.id}&rest=${id}`}
                                >
                                  <Icon
                                    fontSize="small"
                                    color="inherit"
                                    style={{
                                      cursor: "pointer",
                                      color: "skyblue",
                                    }}
                                  >
                                    edit
                                  </Icon>
                                </Link>
                              </>
                            ),
                          },
                        ]}
                      />
                    </Card>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </div>
          </CardBody>
        </Card>
        {/* <div style={{ display: "none" }}>
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
          </div> */}
      </div>
    </div>
  );
};

export default BranchDetails;
