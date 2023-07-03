import React from "react";
import {
  artists,
  styles,
  mediums,
  category,
  textures,
  colours,
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
  transactionHash
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

  const categoryWords = activeKeywords.filter((word) =>
    category.some((category) => category.name === word)
  );

  const mediumWords = activeKeywords.filter((word) =>
    mediums.some((medium) => medium.name === word)
  );

  return (
    <form className="">
      <div className="py-5 mt-4  flex flex-col justify-start items-start   ">
        <div className="select gap-x-2 mb-1">
          <input
            className="my-1 w-half rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism gap-x-2"
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
          <input
            className="my-1 w-half gap-x-2 rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism gap-x-2"
            required
            type="text"
            placeholder="NFT Description..."
            id="description"
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                description: e.target.value,
              })
            }
            value={formParams.description}
          ></input>
        </div>

        <div className="check ">
          <select
            id="style"
            onChange={(id) => handleForm(id)}
            value=""
            className="text-white outline-none  w-half  rounded bg-[#273057] shadow-2xl border-none"
          >
            {styles.map((style, index) => (
              <option key={index} value={style.name}>
                {style.name}
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
          <div className="tabs">
            {styleWords.slice(0, 4).map((item, index) => (
              <button
                key={index}
                onClick={handleChecked}
                value={item}
                className={`fade-in button ${
                  activeKeywords.includes(item) ? "colourButton" : ""
                }`}
              >
                {item}
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
                  activeKeywords.includes(item) ? "colourButton" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="check">
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
                  activeKeywords.includes(item) ? "colourButton" : ""
                }`}
              >
                {item}
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
                  activeKeywords.includes(item) ? "colourButton" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="check  ">
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
            id="category"
            onChange={(id) => handleForm(id)}
            value=""
            className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#273057] shadow-2xl border-none "
          >
            {category.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="check">
          <div className=" tabs">
            {colourWords.slice(0, 5).map((item, index) => (
              <button
                style={{ backgroundColor: item }}
                className="colourButton fade-in"
                key={index}
                onClick={handleChecked}
                value={item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="tabs">
            {categoryWords.slice(0, 4).map((item, index) => (
              <button
                key={index}
                onClick={handleChecked}
                value={item}
                className={`fade-in button ${
                  activeKeywords.includes(item) ? "colourButton" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="check  gap-x-2.5">

        <select
            id="seal"
            onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  seal: e.target.value,
                })
              }
            defaultValue={'Yes'}
    
            className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#273057] shadow-2xl border-none  w-[50%] "
          >
              <option value="Yes"  >
               Authentication Seal
              </option>
              <option  value="No">
               Don't Add A Seal
              </option>
        
          </select>

          {/* <input
            className=" rounded outline-none text-white border-none bg-[#273057] shadow-2xl px-2  w-[50%] "
            type="number"
            placeholder="Authenticity Seal"
            step="1"
            value={formParams.points}
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                points: e.target.value,
              })
            }
          ></input> */}

          <input
            className=" rounded outline-none text-white border-none bg-[#273057] shadow-2xl px-2  w-[50%] "
            type="number"
            placeholder="Price (ETH)"
            step="0.001"
            min="0.00"
            value={formParams.price}
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                price: e.target.value,
              })
            }
          ></input>
        </div>

        {/* Buttons */}
        <div className="flex w-full justify-between text-white gap-x-3 mt-3 ">
          <button
            type="button"
            onClick={OnCreateFile}
            value={isCreating ? "Creating..." : "Create"}
            className={
              isChecked
                ? "disabledButton w-1/3 group"
                : isMinting
                ? "inactiveButton w-1/3 group"
                : isCreating
                ? "waitingButton w-1/3 group"
                : !formParams.name || !formParams.description
                ? "inactiveButton  w-1/3 group"
                : "activeButton w-1/3 group"
            }
          >
               <span className="absolute bottom-20  scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
              { isChecked
                ? "Upload is selected..?"
                : !formParams.name || !formParams.description 
                ? "Enter title & description..."
                : "Ready to create image..."
                }
            </span>
            Create
          </button>

          {/* <button
            onChange={(e) => OnUploadFile(e)}
            type="button"
            value={isSaving ? "Saving..." : "Save"}
            className={
              !isChecked
                ? "disabledButton w-1/3"
                : isMinting
                ? "waitingButton w-1/3"
                : isSaving
                ? "waitingButton w-1/3"
                : !fileURL
                ? "inactiveButton w-1/3"
                : "activeButton w-1/3"
            }
          >
            Save
          </button> */}

          <button
            onClick={listNFT}
            value={isMinting ? "Minting..." : "Mint"}
            type="button"
            className={
              !fileURL  
                ? "disabledButton w-1/3 group"
                :  !formParams.price || !formParams.name || !formParams.description
                ? "inactiveButton w-1/3 group"
                : isMinting || isCreating
                ? "waitingButton w-1/3 group"
                : "activeButton w-1/3 group"
            }
          >
            <span className="absolute bottom-20  scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
              {!fileURL
                ? "Create or upload image to mint..."
                : !formParams.price
                ? "Enter a price..."
                : !formParams.name || !formParams.description 
                ? "Enter title & description..."
                : transactionHash 
                ? "Already minted NFT..."
                : "Ready to mint..."
                }
            </span>
            Mint
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
