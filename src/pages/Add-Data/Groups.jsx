import {
  CancelButton,
  Input,
  SubmitButton
} from "@/widgets/Button/Button";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddGroupMutation } from "../Redux/ReduxApi";

const AddGroups = () => {
  const searched = useLocation().search;
  const vendor = new URLSearchParams(searched).get("vendor");
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const [addGrops, { data: isSuccess, error }] = useAddGroupMutation();

  let data = { Name };
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addGrops(data);
      if (result.data) {
        toast(result.data.message);
        navigate(-1);
      } else {
        toast("Failed to add groups. Please try again");
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
              Add groups
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Typography className="col-span-1">
                    <Input lbs={"Group name"}      onChange={(e) => {
                              setName(e.target.value);
                            }}/>
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

export default AddGroups;
