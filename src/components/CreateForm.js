import React, { useState } from "react";
import {
  artists,
  styles,
  mediums,
  textures,
  colours,
  themes,
} from "../data/lists.js";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const CreateForm = ({
  formParams,
  OnCreateFile,
  OnUploadFile,
  activeKeywords,
  handleChecked,
  handleForm,
  updateFormParams,
  isChecked,
}) => {
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
        <div className="group relative">
        <button
          key={index}
          onClick={onClick}
          value={item}
          style={
            id === "colour"
              ? { backgroundColor: item, border: "none", color: "transparent" }
              : { border: "none" }
          }
          className={`fade-in button ${
            activeKeywords.includes(item)
              ? "flex items-center text-sm text-indigo-500 border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent mt-2"
              : ""
          }`}
        >
          {id !== "colour" ? "#"+item : '#'}
        </button>
        <span className="absolute flex bottom-10  scale-0 transition-all rounded-full bg-gray-900 p-2 text-xs text-white group-hover:scale-100 capitalize">
                            <MdOutlineRemoveCircleOutline
                              fontSize={16}
                            />
                            { keywords === colourWords ?  item : id}
                          </span>
        </div>
      ))}
    </div>
  );

  // Define the auto description input
  const [autoDescription, setAutoDescription] = useState(false);

  const fill =
    "From the collection '" +
    formParams.collection +
    "' this artwork entitled '" +
    formParams.name +
    "' was made using a digital " +
    formParams.medium +
    " medium in a creative " +
    formParams?.style +
    " style. The " +
    formParams.theme +
    " theme combines with subtle " +
    formParams.texture +
    " textures, " +
    formParams.colour +
    " colors and " +
    formParams.artist +
    " influences." +
    formParams.description;

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

  // Handle the selector dropdown inputs
  const SelectOptions = ({ id, options, value, onChange }) => (
    <select
      id={id}
      onChange={(e) => onChange(id, e.target.value)}
      value={value}
      className="text-white outline-none blue-glassmorphism w-half rounded bg-[#313751] shadow-2xl border-none"
    >
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );

  console.log("formparams: ", formParams);

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
          <p className="pb-3 text-[#868686] text-sm uppercase">INPUTS</p>
          <div className="check ">
            <SelectOptions
              id="style"
              options={styles}
              value={""}
              onChange={handleForm}
            />
            <SelectOptions
              id="medium"
              options={mediums}
              value={""}
              onChange={handleForm}
            />
          </div>
          <div className="check mt-3">
            <SelectOptions
              id="theme"
              options={themes}
              value={""}
              onChange={handleForm}
            />
            <SelectOptions
              id="texture"
              options={textures}
              value={""}
              onChange={handleForm}
            />
          </div>
          <div className="check mt-3">
            <SelectOptions
              id="artist"
              options={artists}
              value={""}
              onChange={handleForm}
            />
            <SelectOptions
              id={ formParams.colour ? "colour2" : formParams.colour2 ? "colour3" : "colour"}
              options={colours}
              value={""}
              onChange={handleForm}
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
            id="colour"
              activeKeywords={activeKeywords}
              keywords={colourWords}
              onClick={handleChecked}
            />
          </div>

          {/* DESCRIPTION */}
          <div className=" text-white leading-tight mb-2 w-full">
            <div className="py-3 text-[#868686] text-sm uppercase">
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
                rows="4"
                className="mb-3 block py-1.5 px-2.5 w-full text-white rounded border border-[#6c63ff] focus:ring-blue-500 focus:border-blue-500 white-glassmorphism"
                placeholder="NFT Description..."
              ></textarea>
            ) : (
              <p>{formParams.description}</p>
            )}
          </div>
        </>

        {/* BUTTONS */}
        <div className="flex w-full justify-end text-white gap-x-3 relative">
          {!isChecked ? (
            <button
              type="button"
              onClick={OnCreateFile}
              value="Create"
              className={
                formParams.name &&
                formParams.collection &&
                formParams.description
                  ? "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 px-3 h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
                  : "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-neutral-900 px-3 h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
              }
            >
              Generate
            </button>
          ) : (
            <input
              onChange={(e) => OnUploadFile(e)}
              type="file"
              value=""
              className={
                "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-neutral-900 h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
              }
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
