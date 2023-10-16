import {
  CancelButton,
  Checkbox,
  Input,
  Select,
  SubmitButton,
  TextFeild
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
import { useAddOfferMutation } from "../Redux/ReduxApi";

const AddOffers = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [uploadedImages, setUploadedImages] = useState("");
  const [uploadedImages1, setUploadedImages1] = useState("");
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({});
  const typeselect = [
    {
      id: 0,
      name: "Normal",
    },
    {
      id: 1,
      name: "Subscription One Month",
    },
    {
      id: 2,
      name: "Subscription One Year",
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
    action: "https://webadminapi.requeue.com/WebAdmin/offer",
    headers: {
      authorization: JSON.parse(localStorage.getItem("AccessToken")),
    },
    onChange: async (info) => {
      setloading(true);
      if (info.file.status !== "uploading") {
        if (info.file.status === "done") {
          const imagePath =
            info?.file?.response?.path?.key?.split("/media/")[1];
          setPreviewImage(imagePath);
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage(info.file.url || info.file.preview);
          setUploadedImages(imagePath);
          // setUploadedImages((prevImages) => [...prevImages, imagePath]);
          setloading(false);
        }
      }
    },
  };
  const props1 = {
    name: "media_file",
    action: "https://webadminapi.requeue.com/WebAdmin/offer",
    headers: {
      authorization: JSON.parse(localStorage.getItem("AccessToken")),
    },
    onChange: async (info) => {
      setloading(true);
      if (info.file.status !== "uploading") {
        if (info.file.status === "done") {
          const imagePath =
            info?.file?.response?.path?.key?.split("/media/")[1];
          setPreviewImage1(imagePath);
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage1(info.file.url || info.file.preview);
          setUploadedImages1(imagePath);
          // setUploadedImages((prevImages) => [...prevImages, imagePath]);
          setloading(false);
        }
      }
    },
  };
  //onchange
  const onInputChange = (val, name) => {
    setFormData({ ...formData, [name]: val });
  };

  let offerdata = {
    Name_English: formData.Name_English ? formData.Name_English : "",
    Name_Arabic: formData.Name_Arabic ? formData.Name_Arabic : "",
    Description_English: formData.Description_English
      ? formData.Description_English
      : "",
    Description_Arabic: formData.Description_Arabic
      ? formData.Description_Arabic
      : "",
    Point_Cost: formData.Point_Cost ? Number(formData.Point_Cost) : 0,
    Active: formData.Active ? 1 : 0,
    End_date: formData.End_date
      ? formData.End_date
      : new Date()?.toLocaleDateString(),
    mediaAr: uploadedImages,
    mediaEn: uploadedImages1,
    type: formData.type ? formData.type : 0,
  };
  const navigate = useNavigate();
  const [addOffer, { data: isSuccess, error }] = useAddOfferMutation();
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const result = await addOffer(offerdata);
      if (result.data) {
        toast(result.data.Message);
        navigate(-1);
      } else {
        toast("Failed to add offer. Please try again");
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
              Add Offer
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 overflow-x-scroll px-0 pt-0 pb-2 ">
            <Typography className="m-3">
              <form className="m-2" onSubmit={handleAddItem}>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  <Typography className="col-span-1">
                    <Select
                      label="Type"
                      opto="Type"
                      name="type"
                      data={typeselect}
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Name English"}
                      name="Name_English"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Name Arabic"}
                      name="Name_Arabic"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>

                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <TextFeild
                      tflbs={"Description  English"}
                      name="Description_English"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <TextFeild
                      tflbs={"Description  Arabic"}
                      name="Description_Arabic"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-1">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Points Cost"}
                      type="number"
                      name="Point_Cost"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Typography className="col-span-1 my-3">
                    <Input lbs={"start date"} type="date" disabled />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"end Date"}
                      type="date"
                      name="End_date"
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
                      name="Active"
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
                        Click to Upload logo
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

export default AddOffers;
