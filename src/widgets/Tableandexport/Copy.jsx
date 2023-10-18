import React from 'react'
import clipboardCopy from "clipboard-copy";
import { toast } from 'react-toastify';



const Copy = ({headers, tableData, Loading}) => {
    const copyTableData = () => {
        try {
          const textToCopy = [headers.join('\t')]
            .concat(tableData.map(row => row.join('\t')))
            .join('\n');
          clipboardCopy(textToCopy);
          toast('Table data copied to clipboard successfully');
        } catch (error) {
          console.error('Unable to copy table data:', error);
          toast('Failed to copy table data.');
        }
      };

  return (
    <div> <button
    disabled={Loading}
    type="button"
    onClick={copyTableData}
    className="text-white capitalize bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  >
copy
  </button></div>
  )
}

export default Copy