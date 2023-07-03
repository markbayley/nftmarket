import NFTTile from "./NFTTile";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import marketDataTest from "../utils/marketDataTest";
import Transactions from "./Transactions";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";

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

  useEffect(() => {
    getAllNFTs();
  }, []);
  console.log("marketData", marketData);

  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (

      <div className="items-center flex-col justify-between gap-x-2 md:p-5 fade-in">


        <div className="flex flex-row  items-center flex-wrap ">
          <div className="pt-2 pl-4  md:w-1/3 w-full ">
            <h1 className="text-4xl sm:text-5xl text-white text-gradient ">
              NFT Exchange
            </h1>
            <p className="text-left text-white font-light text-base py-2">
              Buy and sell your NFTs on our exchange.
            </p>
          </div>
      
   <div className="flex md:w-1/3 w-full justify-center ">
          <TETabs className="lg:pr-4">
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              For Sale
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              Just Sold
            </TETabsItem>
          </TETabs>
          </div>
          </div>


          <TETabsContent>
            <TETabsPane show={basicActive === "tab1"}>
              <div className="flex flex-col place-items-center text-white">
                <div className="flex flex-wrap max-w-screen-xl text-center">
                  {marketData &&
                    [...marketDataTest, ...marketData]
                      .reverse()
                      .map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>;
                      })}
                </div>
              </div>
            </TETabsPane>
            <TETabsPane show={basicActive === "tab2"}>
              <Transactions />
            </TETabsPane>
          </TETabsContent>
       
      </div>
 
  );
}
