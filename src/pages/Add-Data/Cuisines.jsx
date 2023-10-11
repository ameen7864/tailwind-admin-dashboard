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
import { useLocation } from "react-router-dom";

const AddCuisines = () => {
  const searched = useLocation().search;
  const vendor = new URLSearchParams(searched).get("vendor");

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
              Add {vendor}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 ">
            <Typography className="m-3">
              <form className="m-2">
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1">
                    <Input lbs={"Name English"} />
                  </Typography>
                  <Typography>
                    <Input lbs={"Name English"} />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Order Id"} type={"number"} />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Checkbox cbox={"active"} />
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

export default AddCuisines;
