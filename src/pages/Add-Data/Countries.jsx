import {
  CancelButton,
  Checkbox,
  Input,
  SubmitButton
} from "@/widgets/Button/Button";
import { UploadOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Button, Upload } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCountryMutation } from "../Redux/ReduxApi";
import { toast } from "react-toastify";

const AddCountries = () => {
  const searched = useLocation().search;
  const vendor = new URLSearchParams(searched).get("vendor");
  const [NameEnglish, setNameEnglish] = useState("");
  const [NameArabic, setNameArabic] = useState("");
  const [Code, setCode] = useState("");
  const [ShortCode, setShortCode] = useState("");
  const [Currency, setCurrency] = useState("");
  const [NSNlength, setNSNlength] = useState("");
  const [Prefix, setPrefix] = useState("");

  const [Active, setActive] = useState(false);

  const [RestaurantsAvailable, setRestaurantsAvailable] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImages, setUploadedImages] = useState("");
  const [loading, setloading] = useState(false);


  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const props = {
  name: "media_file",
  action: "https://webadminapi.requeue.com/WebAdmin/flag",
  headers: {
    authorization: JSON.parse(localStorage.getItem("AccessToken")),
  },
  onChange: async (info) => {
    setloading(true);
    if (info.file.status !== "uploading") {
      if (info.file.status === "done") {
        const imagePath =
          info?.file?.response?.path?.key?.split("media/flags/")[1];
        setPreviewImage(imagePath);
        if (!info.file.url && !info.file.preview) {
          info.file.preview = await getBase64(info.file.originFileObj);
        }
        setPreviewImage(info.file.url || info.file.preview);
        setUploadedImages(imagePath);
        setloading(false);
      }
    }
  },
};



  const navigate = useNavigate();
  const [addCountry, { data: isSuccess, error }] = useAddCountryMutation();

  let data = {
    NameEnglish,
    NameArabic,
    Code,
    ShortCode,
    Currency,
    NSNlength,
    Prefix,
    flag: uploadedImages,
    Active: Active ? 1 : 0,
    RestaurantsAvailable: RestaurantsAvailable ? 1 : 0,
  };
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addCountry(data);
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
              Add Country
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1">
                    <Input
                      lbs={"Name English"}
                      onChange={(e) => setNameEnglish(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Input
                      lbs={"Name Arabic"}
                      onChange={(e) => setNameArabic(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Code eg:965"}
                      type={"number"}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Currency eg:KWD"}
           
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Short Code ex:kw,us,bh"}
                      onChange={(e) => setShortCode(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"NSN Length"}
                      onChange={(e) => setNSNlength(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Prefix eg:9,6,5,4"}
                      onChange={(e) => setPrefix(e.target.value)}
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"active"}
                      onChange={(e) => setActive(e.target.checked)}
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"reastaurant available"}
                      onChange={(e) =>
                        setRestaurantsAvailable(e.target.checked)
                      }
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Typography className="col-span-1 mt-3">
                    <Upload {...props} maxCount={1}>
                      <Button
                        className=" border border-purple-700"
                        icon={<UploadOutlined />}
                      >
                        Click to Upload EN
                      </Button>
                    </Upload>
                    <Typography id="imagePreview" className="mt-2">
                      <img
                        src={previewImage ? previewImage : ""}
                        alt="logo"
                        style={{ maxHeight: "150px" }}
                      />
                    </Typography>
                  </Typography>
                </Typography>

                <hr className="my-4" />
                <Typography className="text-center">
                  <SubmitButton loading={loading} />
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

export default AddCountries;
