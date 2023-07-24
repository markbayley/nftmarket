import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftImage3 from "../images/kyoto-girl.jpg";
import nftImage4 from "../images/laughing-panda.jpg";
import nftImage5 from "../images/tokyo-dreams.jpg";
import nftImage6 from "../images/download.jpg";
import { Link, useParams } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { useContext, useEffect, useState } from "react";
import NFTTile from "./NFTTile";
import { collections } from "../data/collections";

const Collections = () => {
  const { marketData, filteredResults, handleCollection, getAllNFTs } =
    useContext(TransactionContext);

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
        {collections.map((collection, index) => {
          return (
             <Link to={{ pathname: `/CollectionPage/${collection.name}` }} key={collection.id}>
             <button 
             id="collection"
                  value={collection.name}
                  onClick={(id) => handleCollection(id)}
                  className="flex items-end rounded-full h-auto bg-cover bg-center border-transparent hover:border-[#4c46b6] hover:scale-[1.05]" 
                  style={{backgroundImage: `url(${collection.image})`, height: "10rem", width: "10rem"}} 
                >
                 <div className="bg-yellow-600 py-1 px-2 rounded-full text-white text-sm"> #{collection.id} {collection.name}</div>
             </button>{" "}
          </Link>
          );
        })}
      </div>
    </>
  );
};

export default Collections;
