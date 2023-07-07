import React from "react";
import {
  artists,
  styles,
  mediums,
  category,
  textures,
  colours,
  themes
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
  currentAccount

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
  console.log("activeKeywords", activeKeywords);

  return (
    <form className="">
      <div className="py-1 mt-1 md:py-5 md:mt-4  flex flex-col justify-start items-start   ">
        <div className="flex w-full  sm:flex-wrap justify-between gap-x-2.5 ">
          <input
            className="my-1 w-full lg:w-[48%] rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism "
            required
            type="text"
            placeholder="NFT Title..."
            value={formParams.name}
            id="name"
            onChange={(e) =>
              updateFormParams({
                ...formParams,
                name: e.target.value,
              })
            }
            
          ></input>
         <input
            className="my-1 w-full lg:w-[48%] rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism "
         
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
     


 <>
 {/*
        <textarea 
         onChange={(e) =>
          updateFormParams({
            ...formParams,
            description: e.target.value,
          })
        }
        value={formParams.description}
        required id="description" 
        rows="3" 
        className=" my-2  block p-2.5 w-full text-white  rounded border border-[#6c63ff] focus:ring-blue-500 focus:border-blue-500 bg-[#273057] " placeholder="NFT Description..."></textarea> */}
   



   <div className="check  ">
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
      
        </div>

        <div className="check">
        <div className="tabs">
            {themeWords.slice(0, 4).map((item, index) => (
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

        <div className="check ">
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

        </>

        {/* Buttons */}
      
        <div className="flex w-full justify-between text-white gap-x-3 sm:mt-3 mt-5">
  { !isChecked ?
          <button
            type="button"
            onClick={OnCreateFile}
            value={isCreating ? "Creating..." : "Create"}
            className={
                 isMinting
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
            AI Generate
          </button>
         
         :
      
          <input
            onChange={(e) => OnUploadFile(e)}
            type="file"
            // value={isSaving ? "Saving..." : "Save"}
            // className="hidden"
            id="dropzone-file"
            className={ !fileURL
                ? "activeButton w-1/3 rounded group"
                : "inactiveButton w-1/3 rounded group"
            }
          />
      
          
          }
      


          {/* <button
            onClick={listNFT}
            value={isMinting ? "Minting..." : "Mint"}
            type="button"
            className={
              !fileURL || currentAccount == '0x'
                ? "disabledButton w-1/3 group"
                :  !formParams.price || !formParams.name || !formParams.description
                ? "inactiveButton w-1/3 group"
                : isMinting || isCreating
                ? "waitingButton w-1/3 group"
                : "activeButton w-1/3 group"
            }
          >
            <span className="absolute bottom-20  scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
              { currentAccount === '0x' ? "Please connect wallet first" :
              !fileURL
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
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
