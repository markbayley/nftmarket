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
import { FiFilter } from "react-icons/fi";
import { ImPriceTag } from "react-icons/im";
import { BiSort } from "react-icons/bi";

import {
  artists,
  styles,
  mediums,
  textures,
  colours,
  themes,
} from "../data/lists.js";
import { collections } from "../data/collections.js";

import { shortenAddress } from "../utils/shortenAddress";

import { TECollapse, TERipple } from "tw-elements-react";

export default function Marketplace() {
  const {
    marketData,
    tab,
    handleTab,
    ethereum,
    currentAccount,
    collection,
    id,
    filteredResults,
    handleCollection,
  } = useContext(TransactionContext);

  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput === "" && filteredResults.length === 0) {
      setSearchResults(marketData);
    } else if (searchInput === "" && filteredResults.length > 0) {
      setSearchResults(filteredResults);
    } else if (searchInput !== "" && filteredResults.length === 0) {
      const searchedData = marketData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchResults(searchedData);
    } else {
      const result = searchResults.filter(
        (val) => !filteredResults.includes(val)
      );
      setSearchResults(result);
    }
  };

  useEffect(() => {
    searchItems(searchInput);
  }, [searchResults, collection]);

  // const ToggleButton = ({ onClick }) => {
  //   return (
  //     <div className="flex items-center  cursor-pointer text-gray-600 hover:text-amber-500">
  //       {sorted ? (
  //         <>
  //           <ImPriceTag
  //             onClick={onClick}
  //             fontSize={21}
  //             className="text-amber-500"
  //           />

  //           <button
  //             className="flex items-center text-sm text-amber-500 border border-amber-500 px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
  //             onClick={toggleSort}
  //           >
  //             #Highest Price
  //           </button>
  //         </>
  //       ) : (
  //         <ImPriceTag onClick={onClick} fontSize={21} />
  //       )}
  //     </div>
  //   );
  // };

  const [sorted, setSorted] = useState(false);
  const [newest, setNewest] = useState(true);
  // Function to toggle and sort the array
  const toggleSort = () => {
    setNewest(!newest);
    setSorted(!sorted);
  };
  // Function to get the sorted products
  const toggleNewest = () => {
    setSorted(!sorted);
    setNewest(!newest);
  };

  const listedResults = searchResults
    .filter((item) => item.listing !== "Unlisted" && item.listing !== "Auction")
    .sort((a, b) => parseFloat(a.tokenId) - parseFloat(b.tokenId));
  const listedSorted = searchResults
    .filter((item) => item.listing !== "Unlisted" && item.listing !== "Auction")
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const listedNewest = searchResults
    .filter((item) => item.listing !== "Unlisted" && item.listing !== "Auction")
    .sort((a, b) => parseFloat(b.tokenId) - parseFloat(a.tokenId));
  const getListedNFTs = () => {
    return sorted ? listedSorted : listedNewest;
  };

  const auctionResults = searchResults
    .filter((item) => item.listing === "Auction")
    .sort((a, b) => parseFloat(a.tokenId) - parseFloat(b.tokenId));
  const auctionSorted = searchResults
    .filter((item) => item.listing === "Auction")
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const getAuctionedNFTs = () => {
    return sorted ? auctionSorted : auctionResults;
  };

  const unlistedResults = searchResults
    .filter((item) => item.listing === "Unlisted")
    .sort((a, b) => parseFloat(a.tokenId) - parseFloat(b.tokenId));
  const unlistedSorted = searchResults
    .filter((item) => item.listing === "Unlisted")
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const getUnlistedNFTs = () => {
    // const unlistedUnsorted = unlistedResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    return sorted ? unlistedSorted : unlistedResults;
  };

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  // console.log(id, collection)

  return (
    <div className="items-center flex-col justify-between  md:px-0 fade-in px-2  ">
      <div className="flex flex-row flex-wrap  items-center  md:px-[2%] md:pt-3">
        <div className=" flex items-center justify-between flex-wrap  w-full  ">
          <h1 className="text-3xl sm:text-5xl  text-white capitalize px-2 mt-2 lg:mt-0 lg:pl-5">
            Trade NFTs
            <p className="text-left text-gradient text-lg ">
              {filteredResults.length === 0 && collection
                ? filteredResults.length
                : tab === "tab1"
                ? listedResults.length
                : tab === "tab2"
                ? auctionResults.length
                : unlistedResults.length}{" "}
              NFTs{" "}
              {
              
              collection
                ? " Tagged '" + collection + "'"
                : searchInput
                ? " Tagged '" + searchInput + "'"
                : ""}
              {tab === "tab1"
                ? " For Sale "
                : tab === "tab2"
                ? " Auctioned "
                : " Unlisted "}{" "}
              {collection ? "" : searchInput ? "" : "- Unfiltered "}
            </p>
          </h1>

          <div className="flex mt-2 md:mt-0  ">
            <div className="flex items-center  cursor-pointer">
              <FiFilter
                fontSize={26}
                className={collection ? "text-[#6c63ff] " : "text-gray-600"}
              />
              {collection ? (
                <button
                  id=""
                  value=""
                  className="hidden md:flex items-center text-sm text-[#6c63ff] border border-[#6c63ff] px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
                  onClick={(id) => handleCollection(id)}
                >
                  #
                  {collection.length > 30
                    ? shortenAddress(collection)
                    : collection}
                </button>
              ) : (
                <>
                  <TERipple rippleColor="light">
                    <button
                      id=""
                      value=""
                      className="hidden md:flex capitalize items-center text-sm text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
                      onClick={toggleShow}
                    >
                      #Unfiltered
                    </button>
                  </TERipple>
                </>
              )}{" "}
            </div>
            &nbsp; &nbsp;
            <div className="flex items-center  cursor-pointer text-gray-600 hover:text-amber-500">
              {newest ? (
                <>
                  <BiSort
                    fontSize={26}
                    className="text-[#6c63ff]"
                    onClick={toggleNewest}
                  />
                  <button
                    className="hidden md:flex  items-center text-sm text-[#6c63ff] border border-[#6c63ff] px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
                    onClick={toggleNewest}
                  >
                    Date
                  </button>
                </>
              ) : (
                <>
                  <BiSort
                    fontSize={26}
                    className="text-amber-500 "
                    onClick={toggleNewest}
                  />
                  <button
                    className="hidden md:flex  items-center text-sm text-amber-500 border border-amber-500 px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
                    onClick={toggleSort}
                  >
                    Price
                  </button>
                </>
              )}
            </div>
          </div>

          <div className=" w-full lg:w-auto my-3 lg:mx-0">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 right-4 flex items-center ">
                <BiSearchAlt fontSize={26} color="grey" className="" />
              </span>
              <input
                type="text"
                onChange={(e) => searchItems(e.target.value)}
                className="w-full rounded-full outline-none py-3 pl-7 text-white border-none white-glassmorphism min-w-[300px]"
                placeholder="Search NFTs..."
                name="search"
              />
            </label>
          </div>

          <div className="flex w-full xl:w-auto  justify-center xl:justify-end ">
            <TETabs className="">
              <TETabsItem
                className="hover:bg-transparent"
                onClick={() => handleTab("tab1")}
                active={tab === "tab1"}
              >
                For Sale
              </TETabsItem>
              <TETabsItem
                className="hover:bg-transparent"
                onClick={() => handleTab("tab2")}
                active={tab === "tab2"}
              >
                Auction
              </TETabsItem>
              <TETabsItem
                className="hover:bg-transparent"
                onClick={() => handleTab("tab3")}
                active={tab === "tab3"}
              >
                Unlisted
              </TETabsItem>
            </TETabs>
          </div>
        </div>
      </div>

      <TECollapse show={show}>
        <div className="block rounded-lg bg-transparent  shadow-lg mx-[3%]  ">
          <div className=" flex flex-wrap gap-1">
            {[...styles].slice(1, 9).map((item, index) => (
              <button
                id="style"
                key={index}
                value={item.name}
                className="hidden md:flex  capitalize items-center text-sm text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
                onClick={(id) => (handleCollection(id), setShow(() => false))}
              >
                #{item.name}
              </button>
            ))}
            {[...themes].slice(1, 9).map((item, index) => (
              <button
                id="theme"
                key={index}
                value={item.name}
                className="hidden md:flex  capitalize items-center text-sm text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
                onClick={(id) => (handleCollection(id), setShow(() => false))}
              >
                #{item.name}
              </button>
            ))}

            {[...mediums].slice(1, 9).map((item, index) => (
              <button
                id="medium"
                key={index}
                value={item.name}
                className="hidden md:flex  capitalize items-center text-sm text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
                onClick={(id) => (handleCollection(id), setShow(() => false))}
              >
                #{item.name}
              </button>
            ))}

            {[...collections].map((item, index) => (
              <button
                id="collection"
                key={index}
                value={item.name}
                className="hidden md:flex  capitalize items-center text-sm text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
                onClick={(id) => (handleCollection(id), setShow(false))}
              >
                #{item.name}
              </button>
            ))}
          </div>
        </div>
      </TECollapse>

      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {getListedNFTs().map((value, tokenId) => {
              return (
                <div className="">
                  <NFTTile data={value} key={tokenId}></NFTTile>
                </div>
              );
            })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab2"}>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {getAuctionedNFTs().map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab3"}>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {getUnlistedNFTs().map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>
      </TETabsContent>
      <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 my-10 lg:px-7">
        <div className="text-center text-white font-light text-base w-full">
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
      {/* <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:mx-[3%]">
              {[...marketDataSale]
                .reverse()
                .map((value, index) => {
                  return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div> */}
    </div>
  );
}
