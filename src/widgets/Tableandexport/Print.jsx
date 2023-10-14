import React from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const Print = ({ Loading , tableRef}) => {
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    pageStyle: `
          @page {
            size: A4;
            margin: 1cm;
          }
      
          table {
            border-collapse: collapse;
            width: 100%;
          }
      
          th, td {
            text-align: left;
            padding: 8px;
            border-right: 1px solid #ddd;
          }
      
          th:last-child, td:last-child {
            border-right: none;
          }
      
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
      
          tr:not(:last-child) {
            border-bottom: 1px solid #ddd;
          }
        `,
    documentTitle: "empty",
    onAfterPrint: () => toast("Successfully Printed"),
  });
  return (
    <div>
      {" "}
      <button
        // disabled={Loading}
        type="button"
        onClick={handlePrint}
        className="text-white capitalize bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        print
      </button>
    </div>
  );
};

export default Print;
