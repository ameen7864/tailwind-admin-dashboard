import { Input, Select, TextFeild } from "@/widgets/Button/Button";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const AddRestaurant = () => {
  return (
    <div>
      {" "}
      <div className="mt-10 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Add Reasturant
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 h-[calc(100vh_-_120px)]">
            <div className="m-3">
              <form className="m-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Select
                      label="country"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </div>
                  <div className="col-span-1">
                    <Select
                      label="area"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </div>
                  <div className="col-span-1">
                    <Select
                      label="Account"
                      opto="country"
                      data={["ameen", "ahmed"]}
                      //   onChange={handleSelectChange}
                      //   value={selectedValue}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 my-3">
                    <Input lbs={"name"} />
                  </div>
                  <div className="col-span-1 my-3">
                    <Input lbs={"name"} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="col-span-1 my-3">
                    <Input lbs={"name"} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 my-3">
                    <TextFeild tflbs={"name"} />
                  </div>
                  <div className="col-span-1 my-3">
                    <TextFeild tflbs={"name"} />
                  </div>
                </div>

                <div className="m-3">
                  <label>Cuisines</label>
                  <div className="scroll">
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
                  </div>
                </div>

                {/* ... other form fields ... */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label>Logo (1*1)</label>
                    <input
                      type="file"
                      required
                      multiple
                      accept="image/*"
                      name="media_file"
                      className="w-full p-2 border rounded"
                    />
                    <div id="imagePreview" className="mt-2">
                      {/* <img
                        src={omg ? omg : ""}
                        alt="logo"
                        style={{ maxHeight: "150px" }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label>Cover Images (Max. 5)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="col-span-1">
                    <label>Kioske background</label>
                    <input
                      type="file"
                      multiple
                      // accept="image/*"
                      // onChange={(e) => onInputChange(e.target.files[0], e.target.name)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <hr className="my-4" />
                <div className="text-center">
                  <button className="btn-primary my-3 px-6 py-2" type="submit">
                    Submit form
                  </button>
                  <button
                    className="btn-primary my-3 mx-2 px-6 py-2"

                    // onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddRestaurant;
