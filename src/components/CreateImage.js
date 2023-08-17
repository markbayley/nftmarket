import React from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import createSvg from "../images/create.svg";
import uploadSvg from "../images/upload.svg";

const CreateImage = ({
  isCreating,
  isMinting,
  formParams,
  fileURL,
  message,
  OnUploadFile,
  hashLink,
  isChecked,
}) => {
  return (
    <div className="w-full  aspect-square mt-2">
      {/* // Create */}
      <div className="image border-[#6c63ff] border rounded-lg relative">
        {message && (
          <div className="flex w-full h-full justify-center items-center absolute text-md text-white z-50">
            <p className="border blue-glassmorphism p-3">{message}</p>
          </div>
        )}
        {/* Stable Creating*/}
        {!isCreating && !isMinting && fileURL ? (
          <>
            <div className="overlay">
              <img src={fileURL} alt="AI thumbnail" className="  rounded-lg " />
              {hashLink && formParams.seal === "Yes" && (
                <Link to={hashLink} target="_blank" rel="noopener noreferrer">
                  <div className="w-10 h-10 rounded-full border flex justify-center items-center absolute top-2 left-2 eth-card seal group ">
                    <span className="absolute  bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
                      Authenticty&nbsp;Seal:&nbsp;Click&nbsp;to&nbsp;verify&nbsp;NFT
                    </span>
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                </Link>
              )}
            </div>
          </>
        ) : // In Progress Creating
        isCreating || isMinting ? (
          <div className="flex items-center justify-center relative w-full aspect-square">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-600 absolute">
              {" "}
            </div>
            {/* <Loader /> */}

            {fileURL && isMinting ? (
              <img src={fileURL} alt="AI thumbnail" className="animate-pulse" />
            ) : (
              <img
                src={createSvg}
                alt="create-svg"
                style={{ width: "40px", height: "40px" }}
              />
            )}
          </div>
        ) : !isChecked ? (
          // No Image Created
          <div className="flex items-center justify-center  w-full  rounded-lg  border-teal-500  aspect-square  seal border-2 cursor-help fade-in ">
            <label htmlFor="" className=" ">
              <div className="flex flex-col items-center ">
                <img
                  src={createSvg}
                  alt="create-svg"
                  style={{ width: "40px", height: "40px", opacity: "0.7" }}
                />
                <p className="text-sm text-white py-2 uppercase">
                  {!formParams.collection || !formParams.name
                    ? "Enter a Collection name and a Title "
                    : !formParams.description
                    ? "Select AI inputs and complete description"
                    : "Click 'generate' to create an AI image"}
                </p>
              </div>
            </label>
          </div>
        ) : (
          //No Image Uploaded
          <div className="flex items-center justify-center  w-full rounded-lg  border-amber-500  aspect-square  seal border-2 cursor-help ">
            <label
              htmlFor="dropzone-file"
              className="flex  items-center justify-center w-full h-full
                  cursor-move   bg-opacity-10 
                  bg-[#273057] hover:bg-opacity-40  fade-in"
            >
              <div className="flex flex-col items-center justify-center ">
                <img
                  src={uploadSvg}
                  alt="upload-svg"
                  style={{ width: "40px", height: "40px" }}
                />
                <p className="mb-2 text-sm text-white pt-3 uppercase">
                  Drag and drop or tap to{" "}
                  <span className="font-semibold">UPLOAD</span>
                </p>
                <p className="text-xs text-white ">
                  SVG, PNG, JPG or GIF (MAX. 800x800px)
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  // onChange={(e) => uploadLocally(e)}
                  // onClick={() => setIsChecked(true)}
                  onChange={(e) => OnUploadFile(e)}
                />
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateImage;
