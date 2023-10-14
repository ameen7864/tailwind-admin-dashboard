import React from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { toast } from "react-toastify";

const Excel = ({ tableRef }) => {
  const handleDownload = () => {
    toast("Download successful!");
  };
  return (
    <div>
      {" "}
      <DownloadTableExcel
        filename="Requeue Portal - Admin"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <div>
          {" "}
          <button
            // disabled={Loading}
            onClick={handleDownload}
            type="button"
            className="text-white capitalize bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            excel
          </button>
        </div>
      </DownloadTableExcel>
    </div>
  );
};

export default Excel;
