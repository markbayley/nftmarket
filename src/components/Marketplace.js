import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { TransactionContext } from "../context/TransactionContext";

import marketDataTest from "../utils/marketDataTest";

export default function Marketplace() {
  const { getAllNFTs, marketData } = useContext(TransactionContext);

  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];

  // useEffect(() => {
  //   getAllNFTs();
  // }, [marketData]);
  console.log("marketData", marketData)

  return (
    <div className="gradient-bg-services" >
      <div className="w-half items-start flex-col justify-between md:p-10 py-6 px-4">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
          Trade your NFTs
        </h1>
        <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
          Buy and sell your NFTs with ease.
        </p>

        <div className="flex flex-col place-items-center ">
        <h3 className="text-white text-3xl text-center my-2">
            Listed For Sale
          </h3>
          <div className="flex mt-5  flex-wrap max-w-screen-xl text-center">
         
            {marketData &&
          [...marketDataTest, ...marketData].reverse().map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
