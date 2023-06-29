import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import createSvg from "../images/create.svg";

const CreateImage = ({
  isUploading,
  isCreating,
  isMinting,
  formParams,
  fileURL,
  message,
  OnUploadFile,
  setChecked,
  transactionHash,
  setIsSaving
}) => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <div className="mainimage">
      {/* // Create */}
     
      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
          <div className="image">
            {/* Minted */}
            {!isCreating && !isMinting && fileURL ? (
              <>
             
                <div>
                  {formParams.points && (
                    <div className="overlay">
                      <img src={fileURL} alt="AI thumbnail" />
                     
                      {/* <span className="points z-50">
                             <a target="_blank" href={""}>
                               {formParams.points.toUpperCase()}
                            </a>
                            </span> */}

                      <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-2 left-2 eth-card">
                        <SiEthereum fontSize={21} color="#fff" />
                      </div>
                      <div className="absolute top-2 right-2 ">
                        <BsInfoCircle fontSize={20} color="#fff" />
                      </div>
                    </div>
                  )}
                  {transactionHash ? (
                    <div className="title">
                      {formParams.name}
                      <em>"{formParams.description}"&nbsp;</em>&nbsp;{" "}
                      <Link to="/Wallet">wallet</Link>
                    </div>
                  ) : (
                    <div className="title">
                      &nbsp;{formParams.name}
                      <em>"{formParams.description}"&nbsp;</em>
                    </div>
                  )}
                </div>
              </>
            ) : // In Progress
            isCreating || isMinting || (isUploading && !fileURL) ? (
              <div>
                <div className="spinner">
                  {/* <img
                       src={fileURL ? fileURL : ""}
                       alt="AI thumbnail"
                       className="overlay loading"
                     /> */}
                  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700"></div>
                </div>
                <div className="title">&nbsp;{message}</div>
              </div>
            ) : (
              // No Image

              <div className="flex items-center justify-center w-full md:h-[22rem] ">
                <label
                  for=""
                  className="flex flex-col items-center justify-center w-full  h-full border cursor-help rounded-lg cursor-pointer bg-opacity-60   bg-[#4F4B4B]  border-[#4F4B4B]"
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
          <div className="flex items-center justify-center w-full md:h-[22rem] ">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full  h-full border cursor-move border-dashed rounded-lg cursor-pointer bg-opacity-80  bg-[#273057] hover:bg-opacity-100 border-[#6c63ff]"
            >
              {!fileURL && !isUploading ? (
                // No Image Uploaded
                <div className="flex flex-col items-center justify-center py-24 px-12 ">
                     
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="#D1D5DB"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <>
                    <p className="mb-2 text-sm text-[#D1D5DB]">
                      Click to <span className="font-semibold">UPLOAD </span>{" "}
                      file or drag and drop
                    </p>
                    <p className="text-xs text-[#D1D5DB] ">
                      SVG, PNG, JPG or GIF (MAX. 800x800px)
                    </p>
                  </>
                </div>
              ) : isUploading || isMinting ? (
                // Uploading Image
                <div>
                  <div className="spinner">
                    {fileURL ? (
                      <img
                        src={fileURL}
                        alt="AI thumbnail"
                        className="overlay loading max-h-[22rem]"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 px-12 ">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="#D1D5DB"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <>
                       
                        </>
                      </div>
                    )}
                    <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700"></div>
                    <div className="message">{message}</div>
                  </div>
                </div>
              ) : (
                //Image Uploaded
                <>
                  <div className="image min-w-[20rem]">
               
                    <img
                      src={fileURL}
                      alt="AI generated art"
                      className="max-h-[22rem] "
                    />
                  </div>
                </>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden "
                // onChange={(e) => uploadLocally(e)}
                onClick={() => setChecked(true)}
                onChange={(e) => OnUploadFile(e)}
              />
            </label>
          </div>
        </TETabsPane>
      </TETabsContent>

      {/* Toggle */}
      <TETabs className="pl-4">
        <TETabsItem
          className="hover:bg-transparent "
          onClick={() => handleBasicClick("tab1")}
          active={basicActive === "tab1"}
        >
          Create
        </TETabsItem>
        <TETabsItem
          className="hover:bg-transparent "
          onClick={() => handleBasicClick("tab2")}
          active={basicActive === "tab2"}
        >
          Upload
        </TETabsItem>
      </TETabs>
    </div>
  );
};

export default CreateImage;
