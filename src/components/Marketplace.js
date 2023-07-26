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
import { shortenAddress } from "../utils/shortenAddress";

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

  const ToggleButton = ({ onClick }) => {
    return (
      <div className="flex items-center  cursor-pointer text-gray-600 hover:text-amber-500">
        {sorted ? (
          <>
            <ImPriceTag
              onClick={onClick}
              fontSize={21}
              className="text-amber-500"
            />

            <button
              className="flex items-center text-sm text-amber-500 border border-amber-500 px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
              onClick={toggleSort}
            >
              #Highest Price
            </button>
          </>
        ) : (
          <ImPriceTag onClick={onClick} fontSize={21} />
        )}
      </div>
    );
  };

  const [sorted, setSorted] = useState(false);
  // Function to toggle and sort the array
  const toggleSort = () => {
    setSorted(!sorted);
    if (!sorted) {
      // If we are sorting, store the original order based on the index
      setSearchResults([...searchResults]);
    }
  };
  // Function to get the sorted products
  const getSortedProducts = () => {
    const sortedResults = [...searchResults];
    sortedResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    return sorted ? sortedResults : searchResults;
  };

  return (
    <div className="items-center flex-col justify-between  md:px-0 fade-in px-2  ">
      <div className="flex flex-row flex-wrap  items-center  md:px-[2%]">
        <div className=" flex items-center justify-between flex-wrap lg:w-2/5 w-full p-4 ">
        <h1 className="text-3xl sm:text-5xl  text-white capitalize ">
            {/* {id || ""} */}
            {/* {marketData.length} {filteredResults.length}  */}
            Trade NFTs
            <h2 className="text-left text-gradient text-lg ">
           
           {searchResults.length} NFTs {searchResults.length < marketData.length ? "Filtered" : "Unfiltered" } { sorted ? "- Sorted by Price" : ""}
    </h2>
          </h1>
          {/* <h1 className="text-3xl md:text-5xl text-white capitalize py-2 ">
                  Featured&nbsp;Profile
                </h1> */}
           

          <div className="flex mt-2 md:mt-0  ">

            <div className="flex items-center  cursor-pointer text-gray-600 hover:text-amber-500">
            <FiFilter
              fontSize={26}
              className={collection ? "text-amber-500" : "text-gray-600"}
            />
            {collection && (
              <button
                id=""
                value=""
                className="flex items-center text-sm text-amber-500 border border-amber-500 px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
                onClick={(id) => handleCollection(id)}
              >
                #
                {collection.length > 30
                  ? shortenAddress(collection)
                  : collection}
              </button>
            )}{" "}
            </div>


            <div className="flex items-center mx-2 cursor-pointer text-gray-600 hover:text-amber-500">
              {sorted ? (
                <>
                  <ImPriceTag
                    onClick={toggleSort}
                    fontSize={21}
                    className="text-amber-500"
                  />
              &nbsp;
                  <button
                    className="flex items-center text-sm text-amber-500 border border-amber-500 px-3 h-7 rounded-full bg-transparent hover:text-gray-600 hover:border-gray-600 duration-300 hover:bg-transparent"
                    onClick={toggleSort}
                  >
                    #Price
                  </button>
                </>
              ) : (
                <ImPriceTag onClick={toggleSort} fontSize={21} />
              )}
            </div>
          </div>
        </div>

        <div className="  w-full lg:w-1/5 m-3 lg:mx-0">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 right-4 flex items-center ">
              <BiSearchAlt fontSize={26} color="grey" className="" />
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

        <div className="flex lg:w-2/5 w-full justify-center lg:justify-end ">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {getSortedProducts()
              .reverse()
              .map((value, index) => {
                return (
                  <div className="">
                    <NFTTile data={value} key={index}></NFTTile>
                  </div>
                );
              })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab2"}>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {marketData &&
              [...marketDataSold].reverse().map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab3"}>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:mx-[3%]">
            {marketData &&
              [...marketDataNew].reverse().map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
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
