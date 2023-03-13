import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function DropzoneArea() {
  const [message, setMessage] = useState("Drop an image here");
  const [isFileDropped, setIsFileDropped] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    try {
      const response = await axios.post("/api/upload", formData);
      setMessage(response.data.message);
      setIsFileDropped(true);
    } catch (error) {
      console.error(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isFileDropped,
    noClick: isFileDropped,
  });

  return (
    <div
      {...getRootProps()}
      className={`absolute w-full h-full flex items-center left-0 right-0 top-0 bottom-0 text-2xl font-semibold ${
        isDragActive && !isFileDropped
          ? "border-2 border-dashed z-40 border-black bg-gray-200"
          : "border-2 border-gray-200 z-0 hidden"
      }`}
      style={{ display: isFileDropped ? "none" : "block" }}
    >

      
      {isDragActive && !isFileDropped && "Drop it!"}
      <input {...getInputProps()} />
    </div>
  );
}

export default DropzoneArea;
