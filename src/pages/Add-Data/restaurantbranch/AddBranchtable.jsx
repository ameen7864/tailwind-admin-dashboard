import {
  CancelButton,
  Checkbox,
  Input,
  Select,
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

const AddBranchtable = () => {
  const searched = useLocation().search;
  const vendor = new URLSearchParams(searched).get("vendor");
  const [NameEnglish, setNameEnglish] = useState("");
  const [NameArbic, setNameArbic] = useState("");
  const [Active, setActive] = useState(false);
  let data = { NameEnglish, NameArbic, Active };
  const navigate = useNavigate();


  const areaselect = [
    {
      id: 0,
      name: "Inside",
    },
    {
      id: 1,
      name: "Outside",
    },
  ]?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const chairsselect = Array.from({ length: 15 }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));



    // const [addOffer, { data: isSuccess, error }] = useAddQueueMutation();
    const handleAddItem = async (e) => {
      // e.preventDefault();
      // try {
      //   const result = await addOffer(data);
      //   if (result.data) {
      //     toast(result.data.message);
      //     navigate(-1);
      //   } else {
      //     toast("Failed to add queue. Please try again");
      //   }
      // } catch (error) {
      //   console.error(error.message);
      // }
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
              Add Branch Table
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Table Name"}
                      onChange={(e) => setNameEnglish(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Select
                      label="Chares"
                      opto=" Chares"
                      data={chairsselect}
                      onChange={(e) => setaccount(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Select
                      label="Area"
                      opto="Area"
                      data={areaselect}
                      onChange={(e) => setaccount(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"Is Active?"}
                      onChange={(e) => setActive(e.target.checked)}
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

export default AddBranchtable;
