import Button from "@/widgets/Button/Button";
import Copy from "@/widgets/Tableandexport/Copy";
import Excel from "@/widgets/Tableandexport/Excel";
import Print from "@/widgets/Tableandexport/Print";
import Tables from "@/widgets/Tableandexport/Table";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Input } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  useGetAllRestBranchByNameQuery,
  useGetAllRestByNameQuery,
  useGetAllRestCountryByNameQuery,
  useGetCountryByNameQuery,
  useGetPurchaseByNameQuery,
} from "../Redux/ReduxApi";
import { useLocation } from "react-router-dom";

const Purchase = () => {
  const today = new Date().toISOString().split("T")[0];
  const searchedddd = useLocation().search;
  const name = new URLSearchParams(searchedddd).get("country");
  const [payment, setpayment] = useState("");
  const [discounton, setdiscounton] = useState("");
  const [channelon, setchannelon] = useState("");
  const [countryid, setcountryid] = useState("");
  const [restid, setrestid] = useState(-1);
  const [branchid, setbranchid] = useState(`""`);
  const [sdate, setsdate] = useState(today);
  const [edate, setedate] = useState(today);
  const [searcheson, setsearchedon] = useState("");
  const [search, setsearch] = useState("");

  const [startdate, setstartdate] = useState(today);
  const [Enddate, setEnddate] = useState(today);
  const [paymentMethod, setpaymentMethod] = useState("");
  const [discount, setdiscount] = useState("");
  const [channel, setchannel] = useState("");
  const [country, setcountry] = useState(name ? name : "");
  const [restaurant, setrestaurant] = useState("");
  const [branchID, setbranchID] = useState(`""`);

  const { data: Countries } = useGetCountryByNameQuery({
    searchText: "",
    pages: 1,
    pageSize: 10000,
  });

  const { data: countriessssRest, refetch: countryfetch } =
    useGetAllRestCountryByNameQuery({ id: countryid });
  const { data: branchrest, refetch: branchfetch } =
    useGetAllRestBranchByNameQuery({ id: restid });

  useEffect(() => {
    countryfetch({ id: countryid });
  }, [countryid]);

  useEffect(() => {
    branchfetch({ id: restid });
  }, [restid]);

  const Countriesdata = Countries?.data;
  const Resturantdata = countriessssRest?.data;
  const Resturantbranchdata = branchrest?.data;

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const tableRef = useRef(null);
  const pages = tableParams.pagination.current;
  const pageSize = tableParams.pagination.pageSize;

  const {
    data: purchase,
    isFetching,
    refetch,
  } = useGetPurchaseByNameQuery({
    st: 2,
    pages,
    pageSize,
    startdate,
    Enddate,
    paymentMethod,
    discount,
    channel,
    country,
    restaurant,
    branchID,
    search,
  });

  const handleSearch = async () => {
    await setstartdate(sdate);
    await setEnddate(edate);
    await setpaymentMethod(payment);
    await setdiscount(discounton);
    await setchannel(channelon);
    await setcountry(countryid);
    await setrestaurant(restid);
    await setbranchID(branchid);
    await setsearch(searcheson);
    await refetch({
      st: 2,
      startdate,
      Enddate,
      paymentMethod,
      discount,
      channel,
      country,
      restaurant,
      branchID,
      search,
      pages,
      pageSize,
    });
  };

  useEffect(() => {}, []);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    if (purchase?.total) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: purchase.total,
        },
      }));
    }
  }, [purchase]);

  const restdata = purchase?.Data;
  const headers = [
    "#",
    "Client ID",
    "Client Name",
    "Country Name",
    "Amount",
    "Total Queue",
    "Created Date",
  ];

  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.client_id,
    item.client_name,
    item.country_name,
    item.grandTotal,
    item.totalQueue,
    moment(item.created_date).format("dddd LL"),
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Filter
          </Typography>
        </CardHeader>
        <Typography className="mx-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label
              for="first_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Payment Method
            </label>
            <select
              id="countries"
              onChange={(e) => setpayment(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value={""}>Choose a Payment</option>
              <option value=" ">All</option>
              <option value="1">Knet</option>
              <option value="4">Credit Card</option>
              <option value="5">Vocher</option>
            </select>
          </div>
          <div>
            <label
              for="first_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Discount
            </label>
            <select
              onChange={(e) => setdiscounton(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value=" ">Choose a Discount</option>
              <option value=" ">Any</option>
              <option value="0">Without Discount</option>
              <option value="1">With Discount</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Channel
            </label>
            <select
              onChange={(e) => setchannelon(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value=" ">Choose a Channel</option>
              <option value=" ">Any</option>
              <option value="2">iOS</option>
              <option value="3">Android</option>
            </select>
          </div>
          <div>
            <label
              for="first_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <select
              id="countries"
              onChange={(e) => setcountryid(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value={-1}>Choose a country</option>
              {Countriesdata?.map((item) => (
                <option
                  key={item.id}
                  value={item.country_id}
                  selected={item.country_id == name}
                >
                  {item.country_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              for="first_name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Restaurant
            </label>
            <select
              onChange={(e) => setrestid(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value="">Choose a Restaurant</option>
              {Resturantdata?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              ))}
            </select>
          </div>
        </Typography>
        <Typography className="mx-5 my-4 mb-10 grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Branch
            </label>
            <select
              id="countries"
              onChange={(e) => setbranchid(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            >
              <option value={-1}>Choose a branch</option>
              {Resturantbranchdata?.map((rest) => (
                <option key={rest.id} value={rest.id}>
                  {rest.name_en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Date From:
            </label>
            <input
              type="date"
              onChange={(e) => setsdate(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              To
            </label>
            <input
              type="date"
              onChange={(e) => setedate(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Search
            </label>
            <input
              type="text"
              onChange={(e) => setsearchedon(e.target.value)}
              placeholder="Order #,phone,first name,last name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
            />
          </div>
          <div className="mx-1 mt-6 flex w-full justify-center gap-3">
            <Button name="search" onClick={handleSearch} />
            <Button name="export" />
          </div>
        </Typography>
      </Card>

      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
      </div>
      <div className="mt-6mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Purchase Tickets
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex">
              <div className="mx-4 ml-auto mb-3">
                <Input.Search
                  className="w-48"
                  type="text"
                  placeholder="Search"
                  // onChange={(e) => setsearch(e.target.value)}
                  // onSearch={(value) => setsearch(value)}
                />
              </div>{" "}
            </div>
            <Tables
              data={restdata}
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  dataIndex: "i",
                  sorter: (a, b) => a.i - b.i,
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "Order#",
                  dataIndex: "client_id",
                },
                {
                  title: "Customer",
                  dataIndex: "data, client_name",
                  render: (data, client_name) => (
                    <>
                      {/* <Link
                        to={
                          "/editclient" +
                          `?client=${client_name.client_id}&sdate=${client_name.createdDate}&edate=${edate}`
                        } 
                      >*/}
                      <div>{client_name.client_name}</div>
                      <div>{client_name.client_phone}</div>
                      {/* </Link> */}
                    </>
                  ),
                  // filteredValue: [searched],
                  onFilter: (value, record) => {
                    return (
                      String(record.client_id)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.client_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.client_phone)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.totalQueue)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.grandTotal)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },
                {
                  title: "Country",
                  dataIndex: "data, country_name",
                  render: (data, country_name) => (
                    <>
                      <img
                        src={
                          "https://cdn.requeue.net/media/flags/" +
                          country_name.flag
                        }
                        alt="flag"
                        style={{ maxWidth: "40px", marginLeft: "40px" }}
                      />
                      <div style={{ marginLeft: "23px" }}>
                        {country_name.country_name}
                      </div>
                    </>
                  ),
                },
                {
                  title: "Amount",
                  dataIndex: "grandTotal",
                  render: (grandTotal) => (
                    <div>{grandTotal ? grandTotal : 0}kwd</div>
                  ),
                },
                {
                  title: "Total Queue",
                  dataIndex: "totalQueue",
                },
                {
                  title: "Date ",

                  dataIndex: "createdDate",
                  render: (createdDate) =>
                    moment(createdDate).format("dddd LL"),
                },
                {
                  title: "Logo",
                  dataIndex: " , paymentStatus",
                  render: (data, paymentStatus) => (
                    <div className="flex">
                      <img
                        src={paymentStatus.paymentStatus == 1 ? "tick" : "fail"}
                        alt="status"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={paymentStatus.paymentStatus == 2 ? "paid" : "not"}
                        alt="paymentStatus"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={
                          paymentStatus.paymentMethod === 1 ? "Knet" : "card"
                        }
                        alt="paymentMethod"
                        style={{ width: "30px" }}
                      />
                      <img
                        src={paymentStatus.channel === 2 ? "Ios" : "Android"}
                        alt="channel"
                        style={{ width: "30px" }}
                      />
                    </div>
                  ),
                },
              ]}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
            />
          </CardBody>
        </Card>
        <div style={{ display: "none" }}>
          <table ref={tableRef} id="myTable">
            <thead>
              <tr>
                {headers?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
