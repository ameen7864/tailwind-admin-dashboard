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
import { CheckBox } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const Addvoucher = () => {
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
              Add Vocher
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 ">
            <Typography className="m-3">
              <form className="m-2">
                <Typography className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Typography className="col-span-1">
                    <Input lbs={"Voucher Code"} />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="Ticket Type"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Input lbs={"Total Usage"} type="number" />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Order Id"} type={"number"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Start Date"} type={"date"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"expired Date"} type={"date"} />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <TextFeild tflbs={"Reason (comment)"} />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Checkbox cbox={"active"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
   
                    <Checkbox cbox={"expired"} />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"expired Date"} type={"date"} />
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

export default Addvoucher;
