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
import React from "react";
import { useLocation } from "react-router-dom";

const AddRestaurant = () => {
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
                <Typography className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Typography className="col-span-1">
                    <Select
                      label="country"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="area"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="Account"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Title English"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Title Arabic"} />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"Order Id"} />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <TextFeild tflbs={"Condition English"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <TextFeild tflbs={"Condition Arabic"} />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"created Date"} type="date"/>
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"expired Date"} type="date"/>
                  </Typography>
                </Typography>
                <Typography className="m-3">
                  <label className="block mb-2 text-sm font-medium text-black-900 dark:text-white capitalize">
                    Cuisines
                  </label>
                  <Typography className="scroll">
                    {/* {cuisines.map((value, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          className="mx-2"
                          type="checkbox"
                          value={value.id}
                          onChange={handleCheckboxChange}
                        />
                        {value.name_en}
                      </label>
                    ))} */}
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Checkbox cbox={"active"} />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Checkbox cbox={"active"} />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Typography className="col-span-1">
                    <InputImage imlbl={"Logo (1*1)"} />
                    <Typography id="imagePreview" className="mt-2">
                      {/* <img
                        src={omg ? omg : ""}
                        alt="logo"
                        style={{ maxHeight: "150px" }}
                      /> */}
                    </Typography>
                  </Typography>
                  <Typography className="col-span-1">
                    <InputImage imlbl={"Cover Images (Max. 5)"} />
                  </Typography>
                  <Typography className="col-span-1">
                    <InputImage imlbl={"Kioske background"} />
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

export default AddRestaurant;
