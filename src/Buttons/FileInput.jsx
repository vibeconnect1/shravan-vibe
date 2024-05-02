import React from "react";

const FileInput = ({handleFileChange, multiple, ...props}) => {
  return (
    <div>
      <input
        type="file"
        multiple= {multiple}
        onChange={handleFileChange}
        className="file:bg-black file:text-white file:rounded-full file:p-2 file:px-4 file:font-semibold bg-gray-300 p-2 rounded-full"
     {...props}
     />
    </div>
  );
};

export default FileInput;
