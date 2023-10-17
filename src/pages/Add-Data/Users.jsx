import {
  CancelButton,
  Checkbox,
  Input,
  InputImage,
  Select,
  SubmitButton,
  TextFeild,
} from "@/widgets/Button/Button";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddUserMutation, useGetGroupByNameQuery } from "../Redux/ReduxApi";
import { toast } from "react-toastify";

const AddUser = () => {
  const searched = useLocation().search;
  const restid = new URLSearchParams(searched).get("restid");
  const { data: groups } = useGetGroupByNameQuery();
  const groupsdata = groups?.data;
  const groupsdataselect = groupsdata?.map((item) => (
    <option key={item.id} value={item.g_id}>
      {item.g_name}
    </option>
  ));
  const [UserTitle, setUserTitle] = useState("");
  const [AccessName, setAccess] = useState("");
  const [Password, setPassword] = useState("");
  const [UserGroup, setUserGroup] = useState("1");
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();

  const usersdata = {
    UserTitle,
    AccessName,
    Password,
    UserGroup,
    isActive,
    rest_id: restid ? restid : "",
    branch_id: restid ? restid : "",
  };


  const [addUser, { data: isSuccess, error }] = useAddUserMutation();
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addUser(usersdata);
      if (result.data) {
        toast("User Succesfully Added");
        navigate(-1);
      } else {
        toast("Failed to add offer. Please try again");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //
  return (
    <Typography>
      {" "}
      <Typography className="mt-10 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white" className="capitalize">
              Add Users
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"User Title"}
                      onChange={(e) => {
                        setUserTitle(e.target.value);
                      }}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Access Name"}
                      onChange={(e) => {
                        setAccess(e.target.value);
                      }}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1">
                    <Select
                      label="User Group"
                      opto="Group"
                      data={groupsdataselect}
                      onChange={(e) => {
                        setUserGroup(e.target.value);
                      }}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-0">
                    <Input
                      lbs={"Password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"Is Active?"}
                      onChange={(e) => {
                        setisActive(e.target.checked);
                      }}
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Created Date"} type="date" disabled/>
                  </Typography>
                </Typography>

                <hr className="my-4" />
                <Typography className="text-center">
                  <SubmitButton />
                  <CancelButton />
                </Typography>
              </form>
            </Typography>
          </CardBody>
        </Card>
      </Typography>
    </Typography>
  );
};

export default AddUser;
