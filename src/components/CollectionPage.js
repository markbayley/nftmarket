import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";

const CollectionPage = () => {
  const { filteredResults } = useContext(TransactionContext);


  return (
    <div className="flex flex-col place-items-center  text-white text-center ">
      <div className="flex flex-wrap gap-x-4 justify-center">
        {[...filteredResults].reverse().map((value, index) => {
          return <NFTTile data={value} key={index}></NFTTile>;
        })}
      </div>
    </div>
  );
};

export default CollectionPage;
