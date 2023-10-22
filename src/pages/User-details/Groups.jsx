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
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGetGroupByNameQuery } from "../Redux/ReduxApi";
import { MdMenu, MdOutlineModeEditOutline } from "react-icons/md";

const Groups = () => {
  const [search, setsearch] = useState("");
  const tableRef = useRef(null);
  const { data: Groups, isFetching } = useGetGroupByNameQuery({});

  const restdata = Groups?.data;

  const headers = ["#", "Group", "View Roulls"];
  const tableData = restdata?.map((item, index) => [
    index + 1,
    item.g_name,
    "",
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
        <Link to={"/dashboard/addgroup"}>
          <Button name={"Add group"} />
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
              Groups Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 h-[calc(100vh_-_120px)]">
            <div className="flex">
              <div className="ml-auto mx-4 mb-3">
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
              loading={isFetching}
              columns={[
                {
                  title: "#",
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Group",
                  dataIndex: "g_name",
                  filteredValue: [search],
                  onFilter: (value, record) => {
                    return String(record.g_name)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                },
                {
                  title: "View Roulls",
                  dataIndex: "id , gid",
                  render: (id, gid) => (
                    <Link to={"/dashboard/rolls"}>
                      <MdMenu  size={20} style={{ cursor: "pointer", color: "blue" }} />
                    </Link>
                  ),
                },

                {
                  title: "Edit",
                  dataIndex: "g_id",
                  render: (g_id) => (
                    <Link to={"/egroup/" + g_id}>
                      <MdOutlineModeEditOutline
                        size={20}
                        className="text-purple-700 "
                      />
                    </Link>
                  ),
                },
              ]}
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

export default Groups;
