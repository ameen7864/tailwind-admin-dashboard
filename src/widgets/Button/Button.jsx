import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ name, ...props }) => {
  return (
    <div>
      <button
        type="button"
        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 px-5 py-2.5 text-center text-sm font-medium capitalize text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
        {...props}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;

export const Select = ({ label, opto, data, ...props }) => {
  return (
    <div>
      <label
        htmlFor="selection"
        className="text-black-900 mb-2 block text-sm font-medium capitalize dark:text-white"
      >
        Select {label}:
      </label>
      <select
        id="selection"
        required
        className="bg-grey-50 text-grey-900 block w-full rounded-md border border-purple-700 p-2.5 text-sm focus:border-purple-500 focus:ring-purple-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
        {...props}
      >
        <option value={1}>Choose a {opto}</option>
        {data}
      </select>
    </div>
  );
};

export const Input = ({ lbs, type, ...props }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div>
        <label
          htmlFor="small-input"
          className="text-black-900 mb-2 block text-sm font-medium capitalize dark:text-white"
        >
          {lbs}:
        </label>
        <input
          {...props}
          type={type ? type : "text"}
          id="small-input"
          className={`block w-full rounded-md border border-purple-700 bg-gray-50 p-2 text-xl font-normal capitalize text-gray-900 placeholder:text-black focus:border-purple-500 focus:ring-blue-500 dark:border-purple-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-600 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm 
            
          `}
          required
          placeholder={lbs}
          defaultValue={type === "date" ? today : ""}
          min={type === "date" ? today : undefined}
        />
      </div>
    </>
  );
};

export const TextFeild = ({ tflbs, ...props }) => {
  return (
    <>
      <div>
        <label
          for="message"
          className="text-black-900 mb-2 block text-sm font-medium capitalize dark:text-white"
        >
          {tflbs}
        </label>
        <textarea
          id="message"
          rows="4"
          className="block w-full rounded-lg border border-purple-700 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
          placeholder={tflbs}
          {...props}
        ></textarea>
      </div>
    </>
  );
};

export const Checkbox = ({ cbox, ...props }) => {
  return (
    <>
      <div className="mr-4 flex items-center capitalize">
        <input
          id="purple-checkbox"
          type="checkbox"
          value=""
          className="h-4 w-4 rounded-md border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-purple-600"
          {...props}
        />
        <label
          for="purple-checkbox"
          className="text-black-900 ml-2 text-sm font-medium capitalize dark:text-white"
        >
          {cbox}
        </label>
      </div>
    </>
  );
};

export const InputImage = ({ imlbl }) => {
  return (
    <>
      <label
        for="file_input"
        className="text-black-900 mb-2 block text-sm font-medium capitalize dark:text-white"
      >
        {imlbl}
      </label>
      <input
        className="block w-full cursor-pointer rounded-r-lg border border-purple-700 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      ></input>
    </>
  );
};

export const SubmitButton = ({ loading }) => {
  return (
    <>
      <button
        type="submit"
        disabled={loading}
        // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="mr-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          ""
        )}
        Submit
      </button>
    </>
  );
};

export const CancelButton = ({}) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </>
  );
};

export const Loader = ({}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div className="loader"></div>
      </div>
    </>
  );
};
