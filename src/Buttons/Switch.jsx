import React from "react";

const Switch = ({checked, onChange}) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input onChange={onChange} name="breakdown" type="checkbox" checked={checked} className="sr-only peer" />
        <div className="relative w-11  h-5 bg-red-500 rounded-full dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
    </div>
  );
};

export default Switch;
