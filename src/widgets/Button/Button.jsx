import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button
        type="button"
        className="text-white capitalize bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
        className="block mb-2 text-sm font-medium text-black-900 dark:text-white capitalize"
      >
        Select {label}:
      </label>
      <select
        id="selection"
        className="bg-grey-50 border border-purple-300 text-grey-900 text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        {...props}
      >
        <option defaultValue>Choose a {opto}</option>
        {data?.map((item) => (
          <option key={item.id} value={item.id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Input = ({ lbs }) => {
  return (
    <>
      <div>
        <label
          for="small-input"
          className="block mb-2 text-sm font-medium text-black-900 dark:text-white capitalize"
        >
          {lbs}:
        </label>
        <input
          type="text"
          id="small-input"
          class="block w-full p-2 text-gray-900 capitalize border border-purple-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-purple-500 dark:bg-gray-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder={lbs}
        />
      </div>
    </>
  );
};

export const TextFeild = ({ tflbs }) => {
  return (
    <>
      <div>
        <label
          for="message"
          className="block mb-2 text-sm font-medium text-black-900 dark:text-white capitalize"
        >
          {tflbs}
        </label>
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder={tflbs}
        ></textarea>
      </div>
    </>
  );
};
