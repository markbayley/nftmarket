import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { useParams } from "react-router";

const CollectionPage = () => {
  const { filteredResults, tab, handleTab, getAllNFTs, marketData, collection, id} = useContext(TransactionContext);


    // const results = marketData.filter((item) =>  item.style == (collection));
  

 

// console.log("results", results)

  return (
    <div className="items-center flex-col justify-between gap-2 md:p-5 fade-in px-2">
    <div className="flex flex-row  place-items-center flex-wrap ">
      <div className="pt-2 pl-4  lg:w-1/2 w-full ">
        <h1 className="text-4xl sm:text-5xl  text-gradient">
        #{collection} 
        </h1>
        <p className="text-left text-white font-light text-base py-2">
          Viewing NFTs tagged with {id} #{collection} 
        </p>
      </div>


      <div className="flex lg:w-1/2 w-full justify-center lg:justify-end ">
        <TETabs className="">
          <TETabsItem
            className="hover:bg-transparent"
            onClick={() => handleTab("tab1")}
            active={tab === "tab1"}
          >
            For Sale
          </TETabsItem>
          <TETabsItem
            className="hover:bg-transparent "
            onClick={() => handleTab("tab2")}
            active={tab === "tab2"}
          >
            Just Sold
          </TETabsItem>
          <TETabsItem
            className="hover:bg-transparent"
            onClick={() => handleTab("tab3")}
            active={tab === "tab3"}
          >
            Newest
          </TETabsItem>
        </TETabs>
      </div>
    </div>

    <div className="flex flex-col place-items-center  text-white text-center ">
      <div className="flex flex-wrap gap-4 justify-center">
        {[...filteredResults].reverse().map((value, index) => {
          return <NFTTile data={value} key={index}></NFTTile>;
        })}
      </div>
    </div>

    </div>
  );
};

export default CollectionPage;
