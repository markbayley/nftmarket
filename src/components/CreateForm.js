import React from 'react'
import {
    artists,
    styles,
    mediums,
    categorys,
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
   file,
   activeKeywords,
   handleChecked,
   handleForm,
updateFormParams,
listNFT,
setIsSaving,
isSaving



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
    categorys.some((category) => category.name === word)
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
        {/* <div className="tabs"  style={{position: "absolute"}}>
          {styleWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div> */}
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
                activeKeywords.includes(item) ? "activeButton" : ""
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
                activeKeywords.includes(item) ? "activeButton" : ""
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
          className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
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
          className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
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
                activeKeywords.includes(item) ? "activeButton" : ""
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
                activeKeywords.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="check  ">
        {/* <select
        id="category"
        onChange={(id) => handleForm(id)} 
        value={formParams.categorys}
        className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
      >
        {categorys.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select> */}
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
          className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none "
        >
          {categorys.map((category, index) => (
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
                activeKeywords.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="check  ">
        <input
          className=" rounded outline-none text-white border-none bg-[#273057] shadow-2xl px-2  w-[50%] "
          type="number"
          placeholder="Numerical Inset"
          step="1"
          value={formParams.points}
          onChange={(e) =>
            updateFormParams({
              ...formParams,
              points: e.target.value,
            })
          }
        ></input>

        {/* <select
          id="colour"
          onChange={(id) => handleForm(id)}
          value={formParams.colour}
          className="text-white outline-none blue-glassmorphism rounded  bg-[#273057] shadow-2xl border-none  w-[50%]"
        >
          {colours.map((colour, index) => (
            <option key={index} value={colour.name}>
              {colour.name}
            </option>
          ))}
        </select> */}
        <input
          className=" rounded outline-none text-white border-none bg-[#273057] shadow-2xl px-2  w-[50%] "
          type="number"
          placeholder="Price (ETH)"
          step="0.01"
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
      <div className="flex w-full justify-between text-white gap-x-3 mt-2 ">
        <button
          type="button"
          onClick={OnCreateFile}
          // className="px-7 m-3 text-white"
          value={isCreating ? "Creating Art..." : "Create"}
          className={
            isCreating
              ? "waitingButton px-7 "
              : isMinting
              ? "disabledButton px-7 "
              : "px-7  "
          }
        >
          Create
        </button>

        { isSaving && fileURL ?

        <button
          onClick={listNFT}
          value={isMinting ? "Minting Art..." : "Mint"}
          type="button"
          // className="text-white px-7 m-3 "
          className={
            isMinting
              ? "waitingButton px-7 "
              : isCreating || !fileURL
              ? "disabledButton px-7 group"
              : "activeButtom loading bg-[#6c63ff] px-7 "
          }
        >
          {!file ? (
            <span class="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              No image to mint
            </span>
          ) : (
            ""
          )}
          Mint
        </button>
        : fileURL ?

        <button onClick={() => setIsSaving(true)}
        type="button"
        className='loading px-9 bg-[#6c63ff]'
        >Save</button>

        : 
        <button 
        type="button"
        className='px-9 cursor-help'
        >Save</button>


          }





      </div>
    </div>
  </form>
  )
}

export default CreateForm