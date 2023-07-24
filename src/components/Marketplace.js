import NFTTile from "./NFTTile";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import {
  marketDataSale,
  marketDataSold,
  marketDataNew,
} from "../data/marketDataTest";
import Transactions from "./Transactions";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { BiSearchAlt } from "react-icons/bi";

export default function Marketplace() {
  const { getAllNFTs, marketData, tab, handleTab, ethereum, currentAccount } =
    useContext(TransactionContext);

  useEffect(() => {
    getAllNFTs();
  }, []);

  const [filteredResults, setFilteredResults] = useState(marketData);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = marketData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(marketData);
    }
  };

  console.log("marketData", marketData);
  console.log("marketDataSold", marketDataSold);

  return (
    <div className="items-center flex-col justify-between gap-x-2 md:px-0 fade-in px-2  ">
      <div className="flex flex-row flex-wrap md:px-10">
        <div className="pt-2 pl-4  lg:w-1/3 w-full ">
          <h1 className="text-4xl sm:text-5xl text-gradient">
            NFT Exchange
          </h1>
          <p className="text-left text-white font-light text-base py-2">
            Buy and sell your NFTs on our exchange.
          </p>
        </div>

        <div className="  w-full lg:w-1/3 m-3 lg:mx-0">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 right-4 flex items-center ">
              <BiSearchAlt fontSize={26} color="grey" className="z-10" />
            </span>
            <input
              type="text"
              onChange={(e) => searchItems(e.target.value)}
              className="w-full rounded-full outline-none py-3 pl-7 text-white border-none white-glassmorphism"
              placeholder="Search NFTs..."
              name="search"
            />
          </label>
        </div>

        <div className="flex lg:w-1/3 w-full justify-center lg:justify-end ">
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

      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          <div className="flex flex-col  text-white text-center">
            <div className="flex flex-wrap gap-3 justify-evenly md:px-10">
              {[ ...filteredResults]
                .reverse()
                .map((value, index) => {
                  return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab2"}>
          <div className="flex flex-col place-items-center text-white ">
            <div className="flex flex-wrap  text-center gap-x-4">
              {marketData &&
                [...marketDataSold].reverse().map((value, index) => {
                  return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab3"}>
          <div className="flex flex-col place-items-center text-white ">
            <div className="flex flex-wrap  text-center gap-x-4">
              {marketData &&
                [...marketDataNew].reverse().map((value, index) => {
                  return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
          </div>
        </TETabsPane>
      </TETabsContent>
      <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 my-10 lg:px-7">
        <div className="text-center  text-white font-light text-base w-full">
          {!ethereum ? (
            "Install MetaMask and connect wallet to send ethereum and view your NFTs"
          ) : currentAccount !== "" ? (
            ""
          ) : (
            <div className="flex flex-wrap justify-around items-center flex-row w-full white-glassmorphism p-5 ">
              Connect your MetaMask wallet to view and trade NFTs
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col place-items-center  text-white text-center">
            <div className="flex flex-wrap gap-x-4 justify-center">
              {[...marketDataSale]
                .reverse()
                .map((value, index) => {
                  return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
          </div>

    </div>
  );
}
