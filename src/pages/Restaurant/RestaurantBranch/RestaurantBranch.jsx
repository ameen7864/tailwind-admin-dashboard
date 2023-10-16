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
  MdOutlineInfo,
  MdOutlineModeEditOutline,
  MdOutlineSupervisedUserCircle,
} from "react-icons/md";
import Button, { CancelButton, Input } from "@/widgets/Button/Button";
import { Link } from "react-router-dom";
import {
  useGetCuisineByNameQuery,
  useGetRestaurantBranchByNameQuery,
  useGetRestaurantIdByNameQuery,
  useGetRestaurantUsersByNameQuery,
} from "@/pages/Redux/ReduxApi";
import moment from "moment";
import { Image } from "antd";
import Tables from "@/widgets/Tableandexport/Table";

const RestaurantBranch = () => {
  const { data: cuisines } = useGetCuisineByNameQuery({
    pages: 1,
    pageSize: 10000,
  });
  const cuisinedata = cuisines?.data;

  const { data: restaurantdata } = useGetRestaurantIdByNameQuery(1);
  const { data: restaurantusers } = useGetRestaurantUsersByNameQuery(1);
  const { data: restaurantbranch, isFetching } =
    useGetRestaurantBranchByNameQuery(1);
  const restdata = restaurantdata?.data[0];
  const restbranchdata = restaurantbranch?.data;
  const restusersdata = restaurantusers?.data;
  console.log(restusersdata);

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
              Restaurant Branch
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
                  <Tab value={"Branches"}>
                    <IoIosGitBranch className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Branches
                  </Tab>
                  <Tab value={"user"}>
                    <MdOutlineSupervisedUserCircle className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Users
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
                    <div className="mt-16">
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Area"}
                            disabled
                            value={restdata?.areaId}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Restaurant ID"}
                            disabled
                            value={restdata?.id}
                          />
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Title English"}
                            disabled
                            value={restdata?.name_en}
                          />
                        </Typography>
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"Title Arabic"}
                            disabled
                            value={restdata?.name_ar}
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
                                // onChange={handleCheckboxChange}
                              />
                              {value.name_en}
                            </label>
                          ))}
                        </Typography>
                      </Typography>
                      <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Typography className="col-span-1 my-3">
                          <Input
                            lbs={"QR Code"}
                            disabled
                            value={restdata?.qrCode}
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
                      <hr />
                      <div className=" mt-4 flex justify-center text-center">
                        <Link to={"/erestaurant/" + "id"}>
                          <Button name={"Edit"}>Edit</Button>
                        </Link>
                        <CancelButton />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={"Branches"}>
                    <Card className="mt-10">
                      <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-8 p-6"
                        style={{
                          background:
                            " linear-gradient(195deg, #7537be, #31206d)",
                        }}
                      >
                        <Typography variant="h6" color="white">
                          Branches List
                        </Typography>
                      </CardHeader>
                      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
                        <div className="flex flex-wrap">
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                          <Button name={"Pdf"} />
                        </div>
                        <Link to={"/dashboard/addbranch"}>
                          <Button name={"Add Branch"} />
                        </Link>
                      </div>
                      <Tables
                        data={restbranchdata}
                        loading={isFetching}
                        columns={[
                          {
                            title: "#",
                            render: (text, record, index) => index + 1,
                          },
                          {
                            title: "Name",
                            dataIndex: "data, name_en",
                            render: (data, name_en) => (
                              <Link to={"/dashboard/branchesdetails?restid=" + name_en.id}>
                                <div
                                  style={{
                                    color: "#3c8dbc",
                                    cursor: "pointer",
                                  }}
                                >
                                  {name_en.name_en}
                                </div>
                              </Link>
                            ),
                          },
                          {
                            title: "Created Date",
                            dataIndex: "creadteDate",
                            render: (creadteDate) =>
                              moment(creadteDate).format("dddd LL"),
                          },
                          {
                            title: "Expired Date",
                            dataIndex: "expiredDate",
                            render: (expiredDate) =>
                              moment(expiredDate).format("dddd LL"),
                          },

                          {
                            title: "Status",
                            dataIndex: "status",
                            render: (status) =>
                              status === 1 ? (
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
                            title: "Is Active",
                            dataIndex: "isActive",
                            render: (isActive) =>
                              isActive === true ? (
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
                        ]}
                      />
                    </Card>
                  </TabPanel>
                  <TabPanel value={"user"}>
                    {" "}
                    <Card className="mt-10">
                      <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-8 p-6"
                        style={{
                          background:
                            " linear-gradient(195deg, #7537be, #31206d)",
                        }}
                      >
                        <Typography variant="h6" color="white">
                          Users List
                        </Typography>
                      </CardHeader>
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

export default RestaurantBranch;
