import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftImage3 from "../images/kyoto-girl.jpg";
import nftImage4 from "../images/laughing-panda.jpg";
import nftImage5 from "../images/tokyo-dreams.jpg";
import nftImage6 from "../images/download.jpg";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useEffect, useState } from "react";
import NFTTile from "./NFTTile";

const Collections = () => {
  const { marketData, filteredResults, handleCollection } = useContext(TransactionContext);

  console.log("marketData", marketData);
  console.log("filteredResults", filteredResults);
  

  return (
    <>
      <div className="flex w-full justify-start items-center fade-in ">
        <div className="flex mf:flex-row flex-col items-center justify-between md:px-20 py-5 px-4 ">
          <div className="flex-1 flex flex-col justify-start items-start w-half">
            <h1 className="text-white text-3xl sm:text-5xl py-2  ">
              Top Collections
              {/* <br />
          continue to improve */}
            </h1>
            <p className="text-left my-2 text-white font-light  text-base">
              View what others top artists have created.
            </p>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 px-4 gap-6  md:px-20 w-full ">

        <div  className="relative">
          <img
            src={nftImage1}
            alt="Future Drift NFT"
            className="rounded-full "
          />
         <button value="Future Drift" onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #1 Future Drift
          </button> 
        </div>

        <div className="relative">
          <img
            src={nftImage2}
            alt="Tokyo Haze NFT"
            className="rounded-full mb-3"
          />
            <button value="Toyko Haze" onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #2 Tokyo Haze
          </button> 
        </div>

        <div className="relative">
          <img
            src={nftImage3}
            alt="Futuristic City NFT"
            className="rounded-full mb-3"
          />
            <button value="Kyoto Nights" onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #3 Kyoto Nights
          </button> 
        </div>
        <div className="relative">
          <img
            src={nftImage4}
            alt="Laughing Panda NFT"
            className="rounded-full mb-3"
          />
          <button value="Laughing Panda" onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #4 Laughing Panda
          </button> 
        </div>
        <div className="relative">
          <img
            src={nftImage5}
            alt="Tokyo Dreams"
            className="rounded-full mb-3"
          />
            <button value="Tokyo Dreams" onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #5 Tokyo Dreams
          </button>
        </div>
        <div className="relative">
          <img
            src={nftImage6}
            alt="Baby Panda NFT"
            className="rounded-full mb-3"
          />
            <button value="baby pandas " onClick={handleCollection} className="bg-[orange] h-8 flex items-center rounded-full absolute bottom-5 right-0">
            #6 Baby Pandas
          </button> 
        </div>
      </div>
      <div className="flex flex-col place-items-center  text-white text-center ">
        <div className="flex flex-wrap gap-x-4 justify-center">
          {[...filteredResults].reverse().map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
    </>
  );
};

export default Collections;
