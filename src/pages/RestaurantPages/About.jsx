import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { Input } from "@/widgets/Button/Button";
import "jspdf-autotable";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetPagesByNameQuery } from "../Redux/ReduxApi";

const Termsandcondition = () => {
  const { data: terms, isFetching } = useGetPagesByNameQuery({ id: 9 });
  const termsandcondition = terms?.data[0];
  const [value, setValue] = useState(termsandcondition?.cms_desc);
  const [value1, setValue1] = useState(termsandcondition?.cms_desc_ar);
  const [en, seten] = useState("");
  const [ar, setar] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };

  let formdata = {
    TitleEN: en ? en : termsandcondition?.title,
    TitleAR: ar ? ar : termsandcondition?.title_ar,
    isActive: true,
    PageKey: "Terms And Condition",
    DescriptionEN: value ? value : termsandcondition?.cms_desc,
    DescriptionAR: value1 ? value1 : termsandcondition?.cms_desc_ar,
  };

  return (
    <div>
      <div className="mt-10 mb-8 flex flex-col gap-12 ">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              About Us
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <Typography className="mx-4 mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                lbs={"Title EN"}
                value={termsandcondition?.title}
                onChange={(e) => seten(e.target.value)}
              />
              <Input
                lbs={"Title AR"}
                value={termsandcondition?.title_ar}
                onChange={(e) => setar(e.target.value)}
              />
            </Typography>
            <Typography className="mx-4 mb-3 grid grid-cols-1 gap-4 md:grid-cols-1">
              <Input
                lbs={"Page Key"}
                value={termsandcondition?.title}
                disabled
              />
            </Typography>
            <label className="mx-4 mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Description EN
            </label>
            <div className="mx-5">
              <ReactQuill theme="snow" value={value} onChange={handleChange} />
            </div>
            <hr className="my-6" />
            <label className="mx-4 my-5 mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Description AR
            </label>
            <div className="mx-5">
              <ReactQuill
                theme="snow"
                value={value1}
                onChange={handleChange1}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Termsandcondition;
