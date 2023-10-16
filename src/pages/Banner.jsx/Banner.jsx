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
import { Image, Input } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useDeleteBannerMutation,
  useGetBannerByNameQuery,
} from "../Redux/ReduxApi";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

const Banner = () => {
  const [search, setsearch] = useState("");
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
  // get banner
  const { data: Banner, isLoading } = useGetBannerByNameQuery({
    pages,
    pageSize,
  });

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  //delete banner
  const [deleteItem] = useDeleteBannerMutation();
  const handleDeleteItem = async (id) => {
    try {
      const result = await deleteItem(id);
      if (result.data) {
        toast(result.data.message);
      } else {
        toast("Unknown success message");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast("Failed to delete item. Please try again.");
    }
  };

  useEffect(() => {
    if (Banner?.Data1) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: Banner.Data1,
        },
      }));
    }
  }, [Banner]);
  const restdata = Banner?.ListOfData;

  const headers = ["#", "Views", "Status", "Created Date", "Duration"];

  const tableData = restdata?.map((item, index) => [
    index + 1,
    item?.b_views,
    item?.isActive ? "active" : "unactive",
    moment(item?.creadteDate).format("L"),
    moment(item?.creadteDate).format("L") -
      moment(item?.expiredDate).format("L"),
  ]);

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#myTable" });
    doc.save("Requeue-portal.pdf");
  };

  return (
    <div>
      {" "}
      <hr className="mt-4" />
      <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          <Copy headers={headers} tableData={tableData} />
          <Excel tableRef={tableRef} />
          <Button name={"Pdf"} onClick={handleExportToPDF} />
          <Print tableRef={tableRef} />
        </div>
        <Link to={"/dashboard/addbanner"}>
          <Button name={"Add banner"} />
        </Link>
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
              Queue Table
            </Typography>
          </CardHeader>
          <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex">
              <div className="mx-4 ml-auto mb-3">
                <Input.Search
                  className="w-48"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setsearch(e.target.value)}
                  onSearch={(value) => setsearch(value)}
                />
              </div>{" "}
            </div>
            <Tables
              data={restdata}
              loading={isLoading}
              columns={[
                {
                  title: "#",
                  sorter: (a, b) => a.index - b.index,
                  render: (text, record, index) =>
                    (pages - 1) * pageSize + index + 1,
                },
                {
                  title: "Image En",
                  dataIndex: "b_img_en",
                  render: (b_img_en) => (
                    <Image
                      width={60}
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/banners/" +
                        b_img_en
                      }
                    />
                  ),
                },
                {
                  title: "Image Arabic",
                  dataIndex: "b_img_ar",
                  render: (b_img_ar) => (
                    <Image
                      width={60}
                      src={
                        "https://new-requeue.s3.eu-west-2.amazonaws.com/media/banners/" +
                        b_img_ar
                      }
                      alt={b_img_ar}
                    />
                  ),
                },
                {
                  title: "Views",
                  dataIndex: "b_views",
                  render: (b_views) => <div>{b_views ? b_views : 0}</div>,
                  sorter: (a, b) => a.b_views - b.b_views,
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return (
                      String(record.b_views)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      String(record.creadteDate)
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );
                  },
                },

                {
                  title: "Status",
                  dataIndex: "isActive",
                  sorter: (a, b) => a.isActive - b.isActive,
                  render: (isActive) => (
                    <div>
                      {isActive ? (
                        <div
                          style={{
                            backgroundColor: "rgb(36 110 49)",
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "10px",
                            color: "white",
                            borderRadius: "5px",
                            width: "50px",
                          }}
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#dd4b39",
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "10px",
                            color: "white",
                            borderRadius: "5px",
                            width: "50px",
                          }}
                        >
                          Expired
                        </div>
                      )}
                    </div>
                  ),
                },
                {
                  title: "Created Date",
                  dataIndex: "creadteDate",
                  render: (creadteDate) => moment(creadteDate).format("L"),
                },
                {
                  title: "Duration",
                  dataIndex: "expiredDate ,creadteDate ",
                  render: (expiredDate, creadteDate) => {
                    return (
                      <span>
                        {moment(creadteDate.creadteDate).format("L")} -{" "}
                        {moment(creadteDate.expiredDate).format("L")}
                      </span>
                    );
                  },
                },
                {
                  title: "Actions",
                  dataIndex: "b_id",
                  render: (b_id) => (
                    <>
                      {" "}
                      <IconButton>
                        <Link to={"/ebanner/" + b_id}>
                          <MdOutlineModeEditOutline
                            size={20}
                            className="text-purple-700 "
                          />
                        </Link>
                        &nbsp;&nbsp;
                      </IconButton>
                      <IconButton>
                        <MdDelete
                          style={{ cursor: "pointer", color: "#dd4b39" }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure to delete this record?"
                              )
                            ) {
                              handleDeleteItem(b_id);
                            }
                          }}
                        />
                      </IconButton>
                    </>
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

export default Banner;
