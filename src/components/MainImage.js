import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import placeholder from "../placerdark.png";
import {
  Link,
} from "react-router-dom";

const MainImage = ({
  isCreating,
  isMinting,
  title,
  description,
  medium,
  image,
  url,
  message,
  metaData,
  transactionHash,
  powerPoints,
  fileURL,
  isUploading,
  setChecked,
  checked,
  setImage,
  setFile,
  OnChangeFile,
}) => {
  const [lgShow, setLgShow] = useState(false);

  const hashLink = `https://sepolia.etherscan.io/tx/${transactionHash}`;

  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }

  function revokeObjectURL(url) {
    return window.URL
      ? window.URL.revokeObjectURL(url)
      : window.webkitURL.revokeObjectURL(url);
  }

  function uploadLocally(e) {
    e.preventDefault();
    let file = e.target.files[0];
        setFile(file);
        var src = createObjectURL(file);
        var image = new Image();
        image.src = src;
        setImage(image.src);
        // Do whatever you want with your image, it's just like any other image
        // but it displays directly from the user machine, not the server!
        // console.log("file", file);
      //   console.log("src", src);
      // console.log("image", image);
      // console.log("image.src", image.src);
    
  }

  return (
    <>

      <div className="mainimage" >
        {!checked ? (
          <div className="image">
            {!isCreating && !isMinting && image ? (
              <>
                <div>
                  <img src={image} alt="AI thumbnail" />
                  <div className="overlay">
                    {powerPoints && (
                      <span className="points">
                        <a target="_blank" href={hashLink}>
                          {powerPoints.toUpperCase()}
                        </a>
                      </span>
                    )}
                  </div>
                {url ?
                  <div className="title">
                    View NFT&nbsp;{title}
                    <em>"{description}"&nbsp;</em> in your&nbsp;&nbsp; <Link to="/Wallet">wallet</Link  >
                 
                  </div>
                  :
                  <div className="title">
                  &nbsp;{title}
                    <em>"{description}"&nbsp;</em>
                 
                  </div>

            }
                </div>
              </>
            ) : isCreating || isMinting || (isUploading && !fileURL) ? (
              <div>
                <div className="spinner">
                  <img
                    src={image ? image : placeholder}
                    alt="AI thumbnail"
                    className="overlay loading"
                  />
                  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700"></div>
                </div>
                <div className="title">&nbsp;{message}</div>
              </div>
            ) : (
              <div >
                <div>
                  <img
                    src={fileURL ? fileURL : placeholder}
                    alt="AI generated art"
                    className=""
                  />
                </div>
                <div className="title pb-1">&nbsp;{message ? message : "Let's Create Something!"} </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-96 pb-8">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full sm:h-64 md:h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                {!fileURL ? (
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
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
                ) : (
                  <>
                  <img src={fileURL} alt="AI generated art" className="" />
                  {message}
                  </>
                )}

            { !fileURL  &&
            <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x800px)
                </p>
                </>
             }

              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden "
                // onChange={(e) => uploadLocally(e)}
                onChange={OnChangeFile}
              />
            </label>
          </div>
        )}
        <div className="flex items-center">
          <p className="inline text-left text-white font-light md:w-9/12 w-11/12 text-base my-3">
            Create&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <label className="relative inline-flex items-center cursor-pointer my-3">
            <input
              type="checkbox"
              value=""
              className="sr-only peer "
              onChange={() => setChecked(!checked)}
            ></input>

            <div className="w-14 h-7 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              <p className="inline text-left text-white font-light md:w-9/12 w-11/12 text-base">
                Upload?{" "}
              </p>
            </span>
          </label>
        </div>
        {message}
      </div>
   
      {/* {lgShow === true && (
  <div className="overlay"
    style={{
   
      border: "1px solid red",
    }}
  >
    <div style={{ position: "absolute" }}>
      <div>
        {image && title}&nbsp;<em>{image && '"' + description + '"'}</em>
      </div>
      <div>
        {metaData && url ? (
          <>
            <a target="_blank" href={metaData}>
              &nbsp;&nbsp; Data
            </a>

            <a target="_blank" href={url}>
              &nbsp;&nbsp;URL
            </a>
          </>
        ) : !image ? (
          "  No image created yet"
        ) : (
          ""
        )}

        <a target="_blank" href={hashLink}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {transactionHash &&
            transactionHash.slice(0, 4) +
              "..." +
              transactionHash.slice(62, 66)}
        </a>
      </div>
      <img 
      src={image ? image : placeholder}
      alt="AI thumbnail"
     
    />
    </div>
  </div>
)} */}
   
    </>
  );
};

export default MainImage;
