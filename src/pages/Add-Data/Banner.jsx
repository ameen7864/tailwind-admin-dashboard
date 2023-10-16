import {
  CancelButton,
  Checkbox,
  Input,
  Select,
  SubmitButton,
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddBannerMutation,
  useGetCountryByNameQuery,
} from "../Redux/ReduxApi";

const AddBanner = () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({});
  const [country, setcountry] = useState(1);

  const [previewImage, setPreviewImage] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [uploadedImages, setUploadedImages] = useState("");
  const [uploadedImages1, setUploadedImages1] = useState("");
  const { data: Countries } = useGetCountryByNameQuery({
    searchText: "",
    pages: 1,
    pageSize: 10000,
  });
  const Countriesdata = Countries?.data;
  const contryselect = Countriesdata?.map((item) => (
    <option key={item.id} value={item.country_id}>
      {item.country_name}
    </option>
  ));


  const typeselect = [
    {
      id: 0,
      name: "Restaurant",
    },
  ]?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  //image uploud
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const props = {
    name: "media_file",
    action: "https://webadminapi.requeue.com/WebAdmin/banner",
    headers: {
      authorization: JSON.parse(localStorage.getItem("AccessToken")),
    },
    onChange: async (info) => {
      setloading(true);
      if (info.file.status !== "uploading") {
        if (info.file.status === "done") {
          const imagePath =
            info?.file?.response?.path[0]?.key?.split("media/banners/")[1];
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
  const props1 = {
    name: "media_file",
    action: "https://webadminapi.requeue.com/WebAdmin/banner",
    headers: {
      authorization: JSON.parse(localStorage.getItem("AccessToken")),
    },
    onChange: async (info) => {
      setloading(true);
      if (info.file.status !== "uploading") {
        if (info.file.status === "done") {
          const imagePath =
          info?.file?.response?.path[0]?.key?.split("media/banners/")[1];
          setPreviewImage1(imagePath);
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage1(info.file.url || info.file.preview);
          setUploadedImages1(imagePath);
          setloading(false);
        }
      }
    },
  };
  //onchange
  const onInputChange = (val, name) => {
    setFormData({ ...formData, [name]: val });
  };

  let bannerdata = {
    ClickType: formData.ClickType?Number(formData.ClickType):0,
    Status: formData.Status?1:0,
    EndDate: formData.EndDate
      ? formData.EndDate
      : new Date()?.toLocaleDateString(),
    startdate: formData.startdate
      ? formData.startdate
      : new Date()?.toLocaleDateString(),
    countryid: country?country:1,
    ImageEn: uploadedImages,
    ImageAr: uploadedImages1,
  };
  const navigate = useNavigate();
  const [addOffer, { data: isSuccess, error }] = useAddBannerMutation();
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addOffer(bannerdata);
      if (result.data) {
        toast(result.data.message);
        navigate(-1);
      } else {
        toast("Failed to add banner. Please try again");
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
              Add Banner
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1">
                    <Select
                      label="country"
                      opto="country"
                      data={contryselect}
                      onChange={(e) => setcountry(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="Type"
                      opto="Type"
                      data={typeselect}
                      name="ClickType"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"start Date"}
                      type="date"
                      name="startdate"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"end Date"}
                      type="date"
                      name="EndDate"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"active"}
                      name="Status"
                      onChange={(e) =>
                        onInputChange(e.target.checked, e.target.name)
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
                  <Typography className="col-span-1">
                    <Typography className="col-span-1 mt-3">
                      <Upload {...props1} maxCount={1}>
                        <Button
                          className=" border border-purple-700"
                          icon={<UploadOutlined />}
                        >
                          Click to Upload AR
                        </Button>
                      </Upload>
                      <Typography id="imagePreview" className="mt-2">
                        <img
                          src={previewImage1 ? previewImage1 : ""}
                          alt="logo"
                          style={{ maxHeight: "150px" }}
                        />
                      </Typography>
                    </Typography>
                  </Typography>
                </Typography>

                <hr className="my-4" />
                <Typography className="text-center">
                  <SubmitButton loading={loading}/>
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

export default AddBanner;
