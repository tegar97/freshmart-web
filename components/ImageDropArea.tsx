import ReactModal from "react-modal";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";

function ImageDropArea() {
      const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
const [message, setMessage] = useState("Drop an image here");
    const [isFileDropped, setIsFileDropped] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function setModalIsClose() {
    setModalIsOpen(false);
  }
const onDrop = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append("file", acceptedFiles[0]);
  try {
    setIsFileDropped(true);
    console.log(acceptedFiles);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/SearchByImage`,
      formData
    );
    setMessage(response.data.message);
    setUploadedFile(acceptedFiles[0]);
    setResponseData(response.data);
 
    setModalIsClose();
    console.log(response.data.data)
    router.push({
      pathname: "/search/picture",
      query: {
        file: URL.createObjectURL(acceptedFiles[0]),
        response: JSON.stringify(response.data.data),
        score: JSON.stringify(response.data.score),
      },
    });
         setIsFileDropped(false);
  } catch (error) {
             setIsFileDropped(false);

setError(true)
    console.error(error);
  }
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <svg
        onClick={openModal}
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-camera text-[#FEFEFE]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
        <path d="M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      </svg>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsClose()}
        className="modal-address max-w-xl  mx-auto   h-full overflow-y-auto  bg-white shadow-lg absolute border-none "
        overlayClassName="overlay"
      >
        {/* <h1 className="mb-4 text-2xl font-bold">Choose Quantity</h1> */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <div></div>
            <h1 className="text-xl">
              Find product inspiration with Image Search
            </h1>
            <div onClick={setModalIsClose} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          <div
            {...getRootProps()}
            className="text-center cursor-pointer px-2 bg-gray-100 h-72 border-4 border-dotted flex items-center justify-center"
          >
            <input {...getInputProps()} />
            {isFileDropped ? (
              <p>
                {" "}
                Our system is working hard to find a match. Please hold on just
                a bit longer.{" "}
              </p>
            ) : isDragActive ? (
              <p>
                Almost there! Keep dragging the image into this area to upload
                it
              </p>
            ) : error ? (
              <p>
                Oops, looks like we need to give it another try! Click here to
                upload again.
              </p>
            ) : (
              <p>
                Skip the search bar and find products faster! Simply upload an
                image and we`ll do the rest
              </p>
            )}
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default ImageDropArea;
