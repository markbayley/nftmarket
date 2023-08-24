import React, { useState } from "react";
import {
  artists,
  styles,
  mediums,
  textures,
  colours,
  themes,
} from "../data/lists.js";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { FaUndoAlt } from "react-icons/fa";

const CreateForm = ({
  formParams,
  OnCreateFile,
  OnUploadFile,
  activeKeywords,
  handleChecked,
  handleSelect,
  updateFormParams,
  isChecked,
  handleTab,
  fileURL,
  setFileURL,
  updateMessage,
  isCreating
}) => {
  // Define the auto description input
  const [autoDescription, setAutoDescription] = useState(false);

  const fill =
    "From the collection '" +
    formParams.collection +
    "' this artwork entitled '" +
    formParams.name +
    "' was made using a digital "  
     + formParams.medium  +
    " medium in a creative " +
    formParams?.style +
    " style. The " +
    formParams.theme +
    " theme combines with subtle " +
    formParams.texture +
    " textures, " +
    formParams.colour0 +
    " " +
    formParams.colour1 +
    " & " +
    formParams.colour2 +
    " colors and " +
    formParams.artist +
    " influences.";


  const handleDescription = (e) => {
    if (formParams.description) {
      e.preventDefault();
      updateFormParams({
        ...formParams,
        description: "",
      });
    } else {
      updateFormParams({
        ...formParams,
        description: e.target.value,
      });
    }
  };

  // Filter the keywords tags selected
  function filterKeywordsByArray(activeKeywords, arrayToFilter, property) {
    return activeKeywords.filter((word) =>
      arrayToFilter.some((item) => item[property] === word)
    );
  }

  const styleWords = filterKeywordsByArray(activeKeywords, styles, "name");
  const artistWords = filterKeywordsByArray(activeKeywords, artists, "name");
  const textureWords = filterKeywordsByArray(activeKeywords, textures, "name");
  const colourWords = filterKeywordsByArray(activeKeywords, colours, "name");
  const themeWords = filterKeywordsByArray(activeKeywords, themes, "name");
  const mediumWords = filterKeywordsByArray(activeKeywords, mediums, "name");

  const KeywordButtons = ({ activeKeywords, keywords, onClick, id }) => (
    <div className="tabs">
      {keywords.slice(0, 3).map((item, index) => (
        <div className="group relative" key={index}>
          <button
            id={keywords === colourWords ? id + index : id} // Ensure that each button has a unique id
            value={item} //colour name
            onClick={(e) => onClick(e, e.target.id)} // Pass the item and id to the onClick function
            style={
              id.includes("colour")
                ? {
                    backgroundColor: item,
                    color: "transparent",
                  }
                : null
            }
            className={`fade-in button ${
              activeKeywords.includes(item)
                ? "flex items-center text-sm text-indigo-500 border-none px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent mt-2"
                : ""
            }`}
          >
            {!id.includes("colour") ? "#" + item : "#"}
          </button>
          <span className="absolute flex bottom-10 scale-0 transition-all rounded-full bg-gray-900 p-2 text-xs text-white group-hover:scale-100 capitalize">
            <MdOutlineRemoveCircleOutline fontSize={16} />
            {keywords === colourWords ? item : id}
          </span>
        </div>
      ))}
    </div>
  );

  // Handle the selector dropdown inputs
  const SelectOptions = ({ id, options, value, onChange }) => (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className={
        "text-white outline-none blue-glassmorphism w-half rounded bg-[#313751] shadow-2xl border-none"
      }
    >
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );

  console.log("formparams: ", formParams);
  console.log("activeKeywords: ", activeKeywords);

  return (
    <form>
      <div className="flex flex-col justify-start items-start">
        <>
          {/* INPUTS */}
          <div className="flex w-full mb-3 justify-between gap-x-2.5">
            <input
              required
              className="w-full xl:w-[48%] rounded-sm outline-none text-white border-none white-glassmorphism select:bg-red-500"
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
              className="w-full xl:w-[48%] rounded-sm outline-none text-white border-none white-glassmorphism"
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

          {/* SELECTORS */}
          <div className=" flex w-full justify-between pb-3 text-[#868686] text-sm ">
            INPUTS
            <div className="group relative cursor-pointer mt-1">
              <BsInfoCircle fontSize={15} color="#fff" />
              <span className="flex absolute w-64 bottom-0 right-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                Selecting inputs below will assist the A.I. to generate your
                artwork and auto description.{" "}
              </span>
            </div>
          </div>
          <div className="check ">
            <SelectOptions
              id="style"
              options={styles}
              value={""}
              onChange={handleSelect}
            />
            <SelectOptions
              id="medium"
              options={mediums}
              value={""}
              onChange={handleSelect}
            />
          </div>
          <div className="check mt-3">
            <SelectOptions
              id="theme"
              options={themes}
              value={""}
              onChange={handleSelect}
            />
            <SelectOptions
              id="texture"
              options={textures}
              value={""}
              onChange={handleSelect}
            />
          </div>
          <div className="check mt-3">
            <SelectOptions
              id="artist"
              options={artists}
              value={""}
              onChange={handleSelect}
            />

            <SelectOptions
              id={
                !formParams.colour0
                  ? "colour0"
                  : !formParams.colour1
                  ? "colour1"
                  : "colour2"
              }
              options={colours}
              value={""}
              onChange={handleSelect}
            />
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-x-2 py-1">
            <KeywordButtons
              id="style"
              activeKeywords={activeKeywords}
              keywords={styleWords}
              onClick={handleChecked}
            />
            <KeywordButtons
              id="theme"
              activeKeywords={activeKeywords}
              keywords={themeWords}
              onClick={handleChecked}
            />
            <KeywordButtons
              id="artist"
              activeKeywords={activeKeywords}
              keywords={artistWords}
              onClick={handleChecked}
            />
            <KeywordButtons
              id="medium"
              activeKeywords={activeKeywords}
              keywords={mediumWords}
              onClick={handleChecked}
            />
            <KeywordButtons
              id="texture"
              activeKeywords={activeKeywords}
              keywords={textureWords}
              onClick={handleChecked}
            />
            <KeywordButtons
              id={"colour"}
              activeKeywords={activeKeywords}
              keywords={colourWords}
              onClick={handleChecked}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="  leading-tight mb-2 w-full">
            <div className="py-2 text-[#868686] text-sm uppercase">
              {" "}
              {!formParams.description &&
              formParams.collection &&
              formParams.name ? (
                <p>
                  Write a description or{" "}
                  <button
                    className=" text-indigo-500 h-6 px-0 bg-transparent border-none hover:bg-transparent"
                    value={fill}
                    onClick={(e) => handleDescription(e)}
                  >
                    AUTO GENERATE
                  </button>{" "}
                  one.
                </p>
              ) : (
                <>
                  <p>
                    DESCRIPTION
                    <button
                      className=" text-indigo-500 h-6 px-0 bg-transparent border-none hover:bg-transparent"
                      value={fill}
                      onClick={(e) => handleDescription(e)}
                    >
                      {" "}
                      &nbsp;&nbsp;CLEAR
                    </button>
                  </p>
                </>
              )}
            </div>
            {!autoDescription ? (
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
                rows="3"
                className="mb-3 block py-1.5 px-2.5 w-full text-white rounded border border-[#6c63ff] focus:ring-blue-500 focus:border-blue-500 white-glassmorphism"
                placeholder="NFT Description..."
              ></textarea>
            ) : (
              <p>{formParams.description}</p>
            )}
          </div>
        </>

        {/* BUTTONS */}
        {fileURL ? (
          <div className="flex w-full justify-end text-white gap-x-3 group relative">
            <button
              type="button"
              onClick={() => (setFileURL(""), updateMessage(""))}
              // value="Create"
              className={
                "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-[#F60C6d] border-none px-3 h-10 rounded-lg hover:bg-[#F60C6d] hover:brightness-125"
              }
            >
              Remove Image &nbsp;
              <FaUndoAlt fontSize={14} />
            </button>
            <button
              type="button"
              onClick={() => handleTab("tab2")}
              value="tab2"
              className={
                "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 brightness-90 px-3 h-10 rounded-lg hover:bg-indigo-500 hover:brightness-110"
              }
            >
              Go To Mint&nbsp;
              <MdOutlineKeyboardDoubleArrowRight
                fontSize={26}
                fontStyle={"bold"}
              />
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-end text-white gap-x-3 group relative">
            {!isChecked ? (
              <button
                type="button"
                onClick={OnCreateFile}
                value=""
                className={
                  formParams.name &&
                  formParams.collection &&
                  formParams.description
                    ? "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 brightness-90 px-3 h-10 rounded-lg hover:bg-indigo-500 hover:brightness-110"
                    : "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-neutral-900 px-3 h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
                }
              >
               { isCreating ?  "Generating..." : "Generate Image" }
              </button>
            ) : (
              <input
                onChange={(e) => OnUploadFile(e)}
                type="file"
                value=""
                className={
                  formParams.name &&
                  formParams.collection &&
                  formParams.description
                    ? "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 brightness-90  h-10 rounded-lg hover:bg-indigo-500 hover:brightness-110"
                    : "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-neutral-900  h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
                }
              />
            )}
            <span className="flex absolute w-44 bottom-12 right-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
              {formParams.name &&
              formParams.collection &&
              formParams.description
                ? "Click when ready to proceed..."
                : "Enter a collection name, title and a description to proceed."}
            </span>
          </div>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
