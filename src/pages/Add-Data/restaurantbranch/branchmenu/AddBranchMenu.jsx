import { useAddBranchMenuMutation } from "@/pages/Redux/ReduxApi";
import {
  CancelButton,
  Checkbox,
  Input,
  SubmitButton,
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

const AddBranchMenu = () => {
  const searched = useLocation().search;
  const restid = new URLSearchParams(searched).get("restid");
  const [NameEnglish, setNameEnglish] = useState("");
  const [isActive, setisActive] = useState(false);

  let data = { name: NameEnglish, status: isActive, restid: restid };
  const navigate = useNavigate();
  const [addMenu, { data: isSuccess, error }] = useAddBranchMenuMutation();
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addMenu(data);
      if (result.data) {
        toast(result.data.message);
        navigate(-1);
      } else {
        toast("Failed to add queue. Please try again");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
              Add Branch Menu
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Name English"}
                      onChange={(e) => setNameEnglish(e.target.value)}
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

export default AddBranchMenu;
