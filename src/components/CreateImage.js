import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
// import placeholder from "../images/placer.png";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import createSvg from "../images/create.svg";
import uploadSvg from "../images/upload.svg";

const CreateImage = ({
  isUploading,
  isCreating,
  isMinting,
  formParams,
  fileURL,
  message,
  OnUploadFile,
  setIsChecked,
  hashLink,
  metaData,
}) => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  function revokeObjectURL(fileURL) {
    return window.URL
      ? window.URL.revokeObjectURL(fileURL)
      : window.webkitURL.revokeObjectURL(fileURL);
  }

  return (
    <div className="mainimage">
      {/* // Create */}
      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
          <div className="image border-[#6c63ff] border rounded ">
            {/* Stable Creating*/}
            {!isCreating && !isMinting && fileURL ? (
              <>
                <div className="overlay">
                  <img
                    src={fileURL}
                    alt="AI thumbnail"
                    className="rounded min-w-[22rem] max-h-[22rem] "
                  />
                  {hashLink && formParams.seal === "Yes" && (
                    <Link
                      to={hashLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
              <div className="spinner">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700 absolute"></div>
                {fileURL ? (
                  <img
                    src={fileURL}
                    alt="AI thumbnail"
                    className="overlay loading"
                  />
                ) : (
                  <img
                    src={createSvg}
                    alt="AI thumbnail"
                    className="overlay loading"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
              </div>
            ) : (
              // No Image Created
              <div className="flex items-center justify-center w-full md:h-[22rem]">
                <label
                  htmlFor=""
                  className="flex flex-col items-center justify-center w-full h-full border cursor-help
                   rounded-lg cursor-pointer bg-opacity-60 bg-[#4F4B4B] border-[#4F4B4B]"
                >
                  <div className="flex flex-col items-center justify-center py-24 px-10">
                    <img
                      src={createSvg}
                      alt="create-svg"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p className="mb-2 text-sm text-[#D1D5DB] pt-3">
                      Fill in fields and click the{" "}
                      <span className="font-semibold">CREATE</span> button
                    </p>
                    <p className="text-xs text-[#D1D5DB] ">
                      TITLE & DESCRIPTION (MIN. REQUIRED)
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
        </TETabsPane>

        {/* //Upload */}
        <TETabsPane show={basicActive === "tab2"}>
          <div className="image rounded border-dashed border-[#6c63ff] border">
            {/* Stable Uploading*/}
            {!isUploading && !isMinting && fileURL ? (
              <div className="overlay ">
                <img
                  src={fileURL}
                  alt="upload"
                  className="rounded min-w-[22rem] max-h-[22rem]  "
                />
                {hashLink && formParams.seal === "Yes" && (
                  <>
                    <Link
                      to={hashLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 rounded-full border flex justify-center items-center absolute top-2 left-2 eth-card seal group ">
                        <span className="absolute  bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
                          Authenticty&nbsp;Seal:&nbsp;Click&nbsp;to&nbsp;verify&nbsp;NFT
                        </span>
                        <SiEthereum fontSize={21} color="#fff" />
                      </div>
                    </Link>

                    {/* <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-2 left-2 eth-card">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <div className="absolute top-2 right-2 ">
                  <BsInfoCircle fontSize={20} color="#fff" />
                </div> */}
                  </>
                )}
              </div>
            ) : isUploading || isMinting ? (
              // In Progress Uploading
              <div className="spinner">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700 absolute"></div>
                <img
                  src={fileURL ? fileURL : uploadSvg}
                  alt="upload"
                  className="overlay loading"
                />
              </div>
            ) : (
              //No Image Uploaded
              <div className="flex items-center justify-center w-full md:h-[22rem]">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full
                 border cursor-move border-dashed rounded-lg cursor-pointer bg-opacity-80 
                 bg-[#273057] hover:bg-opacity-100 border-[#6c63ff]"
                >
                  <div className="flex flex-col items-center justify-center py-24 px-10">
                    <img
                      src={uploadSvg}
                      alt="upload-svg"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p className="mb-2 text-sm text-[#D1D5DB] pt-3">
                      Drag n drop or click to{" "}
                      <span className="font-semibold">UPLOAD</span>&nbsp;an
                      image
                    </p>
                    <p className="text-xs text-[#D1D5DB] ">
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
        </TETabsPane>
      </TETabsContent>
      { message &&
      <div className="message group">
        {message}&nbsp;&nbsp;
        {metaData && (
          <Link to={metaData} target="_blank" rel="noopener noreferrer">
            <span className="absolute bottom-32 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              View Data
            </span>
            <BsInfoCircle fontSize={20} color="#fff" />
          </Link>
        )}
      </div>
}

      {/* Toggle */}
      <TETabs className="pl-4">
        <TETabsItem
          className="hover:bg-transparent "
          onClick={() => (handleBasicClick("tab1"), setIsChecked(() => false))}
          active={basicActive === "tab1"}
        >
          Create
        </TETabsItem>

        <TETabsItem
          className="hover:bg-transparent "
          onClick={() => (handleBasicClick("tab2"), setIsChecked(() => true))}
          active={basicActive === "tab2"}
        >
          Upload
        </TETabsItem>
      </TETabs>
    </div>
  );
};

export default CreateImage;
