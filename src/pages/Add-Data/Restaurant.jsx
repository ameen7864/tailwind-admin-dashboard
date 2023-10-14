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
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetCountryAreaByNameQuery,
  useGetCountryByNameQuery,
  useGetCuisineByNameQuery,
} from "../Redux/ReduxApi";

const AddRestaurant = () => {
  const [country, setcountry] = useState("");
  const [areas, setareas] = useState("");
  const [account, setaccount] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [loading, setloading] = useState(true);
  const [formData, setFormData] = useState({});
  const searched = useLocation().search;
  const vendor = new URLSearchParams(searched).get("vendor");
  const vendors = vendor == "restaurant" ? 1 : 2;
  const { data: cuisines, isFetching } = useGetCuisineByNameQuery({
    pages: 1,
    pageSize: 10000,
  });

  const { data: Countries } = useGetCountryByNameQuery({
    searchText: "",
    pages: 1,
    pageSize: 10000,
  });

  const { data: area, refetch } = useGetCountryAreaByNameQuery({
    countryid: country,
  });

  const cuisinedata = cuisines?.data;
  const Countriesdata = Countries?.data;
  const Areadata = area?.data;
  const contryselect = Countriesdata?.map((item) => (
    <option key={item.id} value={item.country_id}>
      {item.country_name}
    </option>
  ));
  const areaselect = Areadata?.map((item) => (
    <option key={item.id} value={item.country_id}>
      {item.NameEnglish}
    </option>
  ));
  const accountselect = [
    {
      id: 0,
      name: "Production",
    },
    {
      id: 1,
      name: "Demo",
    },
  ]?.map((item) => (
    <option key={item.id} value={item.country_id}>
      {item.name}
    </option>
  ));

  const onInputChange = (val, name) => {
    setFormData({ ...formData, [name]: val });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };


  useEffect(() => {
    refetch({ countryid: country });
  }, [country]);

  let restaurantdata = {
    countryID: country,
    areaId: areas,
    AccountType: account ? account : 0,
    Title_English: formData.Title_English ? formData.Title_English : "",
    Title_Arabic: formData.Title_Arabic ? formData.Title_Arabic : "",
    OrderID: Number(formData.OrderID)?Number(formData.OrderID):0,
    ConditionAR: formData.ConditionAR?formData.ConditionAR:"",
    ConditionEN: formData.ConditionEN?formData.ConditionEN:"",
    expiredDate: formData.expiredDate?formData.expiredDate:new Date()?.toLocaleDateString(),
    preOrder: formData.preOrder ? 1 : 0,
    isActive: formData.isActive ? 1 : 0,
    cousines: checkedValues,
    VendorCategory: Number(vendors),

    themeImages: ["img", "png", "mkv"],
    // logo: img,
    Kioske: "Kioskeimg",
  };

  console.log(restaurantdata);
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
                      data={contryselect}
                      onChange={(e) => setcountry(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="area"
                      opto="country"
                      data={areaselect}
                      onChange={(e) => setareas(e.target.value)}
                    />
                  </Typography>
                  <Typography className="col-span-1">
                    <Select
                      label="Account"
                      opto="country"
                      data={accountselect}
                      onChange={(e) => setaccount(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Title English"}
                      name="Title_English"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Title Arabic"}
                      name="Title_Arabic"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"Order Id"}
                      name="OrderID"
                      type="number"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <TextFeild
                      tflbs={"Condition English"}
                      name="ConditionEN"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <TextFeild
                      tflbs={"Condition Arabic"}
                      name="ConditionAR"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"created Date"}
                      type="date"
                      name="creadate"
                      disabled
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Input
                      lbs={"expired Date"}
                      type="date"
                      name="expiredDate"
                      onChange={(e) =>
                        onInputChange(e.target.value, e.target.name)
                      }
                    />
                  </Typography>
                </Typography>
                <Typography className="m-3">
                  <label className="block mb-2 text-sm font-medium text-black-900 dark:text-white capitalize">
                    Cuisines
                  </label>
                  <Typography className="h-36 overflow-y-scroll">
                    {cuisinedata?.map((value, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          className="mx-2"
                          type="checkbox"
                          value={value.id}
                          onChange={handleCheckboxChange}
                        />
                        {value.name_en}
                      </label>
                    ))}
                  </Typography>
                </Typography>
                <Typography className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"active"}
                      name="isActive"
                      onChange={(e) =>
                        onInputChange(e.target.checked, e.target.name)
                      }
                    />
                  </Typography>
                  <Typography className="col-span-1 my-3">
                    <Checkbox
                      cbox={"Pre-Order"}
                      name="preOrder"
                      onChange={(e) =>
                        onInputChange(e.target.checked, e.target.name)
                      }
                    />
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

export default AddRestaurant;
