import React from "react";
import {
  artists,
  styles,
  mediums,
  category,
  textures,
  colours,
  themes,
  subcategory,
} from "../data/lists.js";

const CreateForm = ({
  isUploading,
  isCreating,
  isMinting,
  formParams,
  fileURL,
  OnCreateFile,
  OnUploadFile,
  file,
  activeKeywords,
  handleChecked,
  handleForm,
  updateFormParams,
  listNFT,
  setIsSaving,
  isSaving,
  isChecked,
  transactionHash,
  mint,
}) => {
  const styleWords = activeKeywords.filter((word) =>
    styles.some((style) => style.name === word)
  );

  const artistWords = activeKeywords.filter((word) =>
    artists.some((artist) => artist.name === word)
  );

  const textureWords = activeKeywords.filter((word) =>
    textures.some((texture) => texture.name === word)
  );

  const colourWords = activeKeywords.filter((word) =>
    colours.some((colour) => colour.name === word)
  );

  const themeWords = activeKeywords.filter((word) =>
    themes.some((theme) => theme.name === word)
  );

  const mediumWords = activeKeywords.filter((word) =>
    mediums.some((medium) => medium.name === word)
  );

  console.log("formParams", formParams);

  return (
    <form className="">
      <div className=" flex flex-col justify-start items-start   ">
        <>
          <div className="flex w-full mb-2  justify-between gap-x-2.5 ">
          <input
              className="w-full  xl:w-[48%] rounded-sm outline-none  text-white border-none white-glassmorphism"
              type="text"
              placeholder="NFT Collection..."
              id="collection"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  collection: e.target.value,
                })
              }
              value={formParams.collection}
            ></input>
            <input
              className="w-full  xl:w-[48%] rounded-sm  outline-none  text-white border-none white-glassmorphism"
              required
              type="text"
              placeholder="NFT Title..."
              id="name"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  name: e.target.value,
                })
              }
              value={formParams.name}
            ></input>
        
          </div>

          <textarea
            required
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                description: e.target.value,
              })
            }
            value={formParams.description}
            id="description"
            rows="4"
            className=" mt-1 mb-3 block py-1.5 px-2.5 w-full text-white rounded border border-[#6c63ff] focus:ring-blue-500 focus:border-blue-500 white-glassmorphism "
            placeholder="NFT Description..."
          ></textarea>

          <div className="check ">
            <select
              id="style"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none  w-half  rounded bg-[#273057] shadow-2xl border-none "
            >
              {styles.map((style, index) => (
                <option key={index} value={style.name}>
                  {style.name}
                </option>
              ))}
            </select>

          

            <select
              id="theme"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#273057] shadow-2xl border-none "
            >
              {themes.map((theme, index) => (
                <option key={index} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check">
            <div className="tabs">
              {styleWords.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={handleChecked}
                  value={item}
                  className={`fade-in button ${
                    activeKeywords.includes(item) ?  "text-sm text-[#6c63ff] border-[#6c63ff] bg-transparent hover:bg-transparent hover:text-gray-600 hover:border-gray-600 px-2 h-7 flex items-center rounded-full mt-1" : ""
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>

         

            <div className="tabs">
              {themeWords.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={handleChecked}
                  value={item}
                  // className={`fade-in button ${
                  //   activeKeywords.includes(item) ? "colourButton" : ""
                  // }`}
                   className={`fade-in button ${
                    activeKeywords.includes(item) ? "text-sm text-[#6c63ff] border-[#6c63ff] bg-transparent hover:bg-transparent hover:text-gray-600 hover:border-gray-600 px-2 h-7 flex items-center rounded-full mt-1" : ""
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>

          <div className="check mt-3">
            <select
              id="medium"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none blue-glassmorphism w-half rounded  bg-[#273057] shadow-2xl border-none"
            >
              {mediums.map((medium, index) => (
                <option key={index} value={medium.name}>
                  {medium.name}
                </option>
              ))}
            </select>
            <select
              id="texture"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#273057] shadow-2xl border-none"
            >
              {textures.map((texture, index) => (
                <option key={index} value={texture.name}>
                  {texture.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check">
            <div className=" tabs">
              {mediumWords.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={handleChecked}
                  value={item}
                  className={`fade-in button ${
                    activeKeywords.includes(item) ? "text-sm text-[#6c63ff] border-[#6c63ff] bg-transparent hover:bg-transparent hover:text-gray-600 hover:border-gray-600 px-2 h-7 flex items-center rounded-full  mt-1" : ""
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>
            <div className="tabs">
              {textureWords.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={handleChecked}
                  value={item}
                  className={`fade-in button ${
                    activeKeywords.includes(item) ?  "text-sm text-[#6c63ff] border-[#6c63ff] bg-transparent hover:bg-transparent hover:text-gray-600 hover:border-gray-600 px-2 h-7 flex items-center rounded-full mt-1" : ""
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>

          <div className="check mt-3 ">
            <select
              id="colour"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none blue-glassmorphism rounded  bg-[#273057] shadow-2xl border-none  "
            >
              {colours.map((colour, index) => (
                <option key={index} value={colour.name}>
                  {colour.name}
                </option>
              ))}
            </select>
            <select
              id="artist"
              onChange={(id) => handleForm(id)}
              value=""
              className="text-white outline-none blue-glassmorphism w-half  rounded bg-[#273057] shadow-2xl border-none"
            >
              {artists.map((artist, index) => (
                <option key={index} value={artist.name}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check">
            <div className=" tabs">
              {colourWords.slice(0, 5).map((item, index) => (
                <button
                  style={{ backgroundColor: item }}
                  className="text-sm text-white border-none backdrop-brightness-50 px-2 h-7 flex items-center hover:bg-[#868686] rounded-full  mt-1 fade-in"
                  key={index}
                  onClick={handleChecked}
                  value={item}
                >
                  #{item}
                </button>
              ))}
            </div>
            <div className=" tabs">
              {artistWords.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={handleChecked}
                  value={item}
                  className={`fade-in button ${
                    activeKeywords.includes(item) ?  "text-sm text-[#6c63ff] border-[#6c63ff] bg-transparent hover:bg-transparent hover:text-gray-600 hover:border-gray-600 px-2 h-7 flex items-center rounded-full  mt-1" : ""
                  }`}
                >
                  #{item}
                </button>
              ))}
            </div>
          </div>
        </>

        {/* Buttons */}
        <div className="flex w-full justify-end text-white gap-x-3 mt-5 relative">
          {!isChecked ? (
            <button
              type="button"
              onClick={OnCreateFile}
              value={isCreating ? "Creating..." : "Create"}
              className={
                isChecked
                  ? "disabledButton md:w-1/2 w-full group"
                  : isMinting
                  ? "inactiveButton md:w-1/2 w-full group"
                  : isCreating
                  ? "waitingButton md:w-1/2 w-full group"
                  : !formParams.name || !formParams.description
                  ? "inactiveButton  md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 "
                  : "activeButton md:w-1/2 w-full group "
              }
            >
              <span className="absolute -bottom-12  scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                {isChecked
                  ? "Upload is selected..?"
                  : !formParams.name || !formParams.description
                  ? "Enter title & description..."
                  : "Ready to create image..."}
              </span>
              Create
            </button>
          ) : (
            <input
              onChange={(e) => OnUploadFile(e)}
              type="file"
              value=""
              className={
                !isChecked
                  ? "disabledButton w-1/2"
                  : isMinting
                  ? "waitingButton w-1/2"
                  : isSaving
                  ? "waitingButton w-1/2"
                  : !fileURL
                  ? "inactiveButton w-1/2 shadow-lg shadow-indigo-500/30 duration-300"
                  : "activeButton w-1/2"
              }
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
