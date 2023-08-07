import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import { BiSearchAlt } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { shortenAddress } from "../utils/shortenAddress";
import { TECollapse, TERipple } from "tw-elements-react";
import { collections } from "../data/collections.js";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { styles, mediums, themes } from "../data/lists.js";
import Loader from "./Loader";

export default function Marketplace() {
  const {
    marketData,
    tab,
    handleTab,
    ethereum,
    currentAccount,
    collection,
    filteredResults,
    handleCollection,
    favorites,
  } = useContext(TransactionContext);

  window.localStorage.setItem("marketData", marketData);

  // SEARCH
  const [searchResults, setSearchResults] = useState(marketData);
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

  // LISTED
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

  // AUCTION
  const auctionResults = searchResults
    .filter((item) => item.listing === "Auction")
    .sort((a, b) => parseFloat(a.tokenId) - parseFloat(b.tokenId));
  const auctionSorted = searchResults
    .filter((item) => item.listing === "Auction")
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const auctionNewest = searchResults
    .filter((item) => item.listing === "Auction")
    .sort((a, b) => parseFloat(b.tokenId) - parseFloat(a.tokenId));
  const getAuctionedNFTs = () => {
    return sorted ? auctionSorted : auctionNewest;
  };

  // UNLISTED
  const unlistedResults = searchResults
    .filter((item) => item.listing === "Unlisted")
    .sort((a, b) => parseFloat(a.tokenId) - parseFloat(b.tokenId));
  const unlistedSorted = searchResults
    .filter((item) => item.listing === "Unlisted")
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const unlistedNewest = searchResults
    .filter((item) => item.listing === "Unlisted")
    .sort((a, b) => parseFloat(b.tokenId) - parseFloat(a.tokenId));
  const getUnlistedNFTs = () => {
    return sorted ? unlistedSorted : unlistedNewest;
  };

  // FAVORITES
  const getFavoriteListed = () => {
    const favoriteListed = listedResults.filter((item) =>
      favorites.includes(item.tokenId)
    );
    return favoriteListed;
  };
  const getFavoriteAuction = () => {
    const favoriteAuction = auctionResults.filter((item) =>
      favorites.includes(item.tokenId)
    );
    return favoriteAuction;
  };
  const getFavoriteUnlisted = () => {
    const favoriteUnlisted = unlistedResults.filter((item) =>
      favorites.includes(item.tokenId)
    );
    return favoriteUnlisted;
  };

  // TOGGLES
  const [showTags, setShowTags] = useState(false);
  const toggleShowTags = () => setShowTags(!showTags);

  const [sorted, setSorted] = useState(false);
  const [newest, setNewest] = useState(true);

  const toggleSort = () => {
    setNewest(!newest);
    setSorted(!sorted);
  };

  const toggleNewest = () => {
    setSorted(!sorted);
    setNewest(!newest);
  };

  const [showFavorites, setShowFavorites] = useState(false);
  const toggleShowFavorites = () => setShowFavorites(!showFavorites);

  useEffect(() => {
    searchItems(searchInput);
  }, [searchInput, collection]);

  console.log("localStorage", localStorage);

  return (
    <div className="fade-in md:px-[3%] px-2">
      <div className="flex flex-row place-items-center justify-between flex-wrap w-full pt-3 pl-2">
        {/* HEADING */}
        <div>
          <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient ">
            Trade NFTs
          </h1>
         
          <div className="text-white flex items-center text-gradient">
              {tab == "tab1"
                ? "Displaying " +
                  (showFavorites
                    ? getFavoriteListed()?.length
                    : listedResults?.length) +
                  " FOR SALE results "
                : tab == "tab2"
                ? "Displaying " +
                  (showFavorites
                    ? getFavoriteAuction()?.length
                    : auctionResults?.length) +
                  " AUCTION results "
                : "Displaying " +
                  (showFavorites
                    ? getFavoriteUnlisted()?.length
                    : unlistedResults?.length) +
                  " UNLISTED results "}
              {searchInput || showFavorites || collection
                ? "- Filtered"
                : "- Unfiltered"}
              &nbsp;
      </div>
      {/* <div className="text-white flex items-center">
              {collection && (
                <>
                  <FiFilter fontSize={16} className="text-[#E4A11B]" />#
                  {collection}
                </>
              )}
              &nbsp;
              {showFavorites && (
                <>
                  <MdFavorite fontSize={18} className="text-[#ff3366]" />
                  Favorites
                </>
              )}
              &nbsp;
              {searchInput && (
                <>
                  <BiSearchAlt fontSize={20} color="grey" />
                  {searchInput}
                </>
              )}
            </div> */}
        </div>

        {/* MENU BUTTONS */}
        <div className="flex md:mb-0 py-2">
          {/* Filter */}
          <div className="flex items-center  cursor-pointer">
            <FiFilter
              fontSize={26}
              className={collection ? "text-[#E4A11B] " : "text-gray-600"}
            />
            {collection ? (
              <button
                id=""
                value=""
                className="flex items-center whitespace-nowrap text-[#E4A11B] text-md border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
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
                    className="flex items-center text-neutral-500  border px-3 h-8 rounded-full white-glassmorphism hover:text-[#E4A11B]   hover:bg-transparent"
                    onClick={toggleShowTags}
                  >
                    #Filter
                  </button>
                </TERipple>
              </>
            )}{" "}
          </div>
          &nbsp; &nbsp;
          {/* Sort */}
          <div className="flex items-center  cursor-pointer text-neutral-500 hover:text-[#E4A11B]">
            {newest ? (
              <>
                <BiSort
                  fontSize={26}
                  className="text-[#6c63ff]"
                  onClick={toggleNewest}
                />
                <button
                  className="flex items-center text-[#6c63ff]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                  onClick={toggleNewest}
                >
                  Date
                </button>
              </>
            ) : (
              <>
                <BiSort
                  fontSize={26}
                  className="text-[#6c63ff]"
                  onClick={toggleNewest}
                />
                <button
                  className="flex items-center text-md text-[#6c63ff]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                  onClick={toggleSort}
                >
                  Price
                </button>
              </>
            )}
          </div>
          &nbsp; &nbsp;
          {/* Favorite */}
          <div className="flex items-center  cursor-pointer text-[#ff3366]">
            {showFavorites ? (
              <>
                <MdFavorite
                  fontSize={26}
                  className="text-[#ff3366]"
                  onClick={toggleShowFavorites}
                />
                &nbsp;
                <button
                  className="flex items-center text-md text-[#ff3366]  px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                  onClick={toggleShowFavorites}
                >
                  Favs
                </button>
              </>
            ) : (
              <>
                <MdFavorite
                  fontSize={26}
                  className="text-neutral-500"
                  onClick={toggleShowFavorites}
                />
                &nbsp;
                <button
                  className="flex items-center text-md text-neutral-500  border px-3 h-8 rounded-full white-glassmorphism hover:text-[#ff3366] hover:bg-transparent"
                  onClick={toggleShowFavorites}
                >
                  Favs
                </button>
              </>
            )}
          </div>
        </div>

        {/* SEARCH */}
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

        {/* TABS */}
        <div className="flex w-full xl:w-auto justify-center xl:justify-end">
          <TETabs className="">
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0 px-[14px]"
              onClick={() => handleTab("tab1")}
              active={tab === "tab1"}
              color="warning"
            >
              For Sale
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0 px-[2em]"
              onClick={() => handleTab("tab2")}
              active={tab === "tab2"}
              color="warning"
            >
              Auction
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0 px-[14px]"
              onClick={() => handleTab("tab3")}
              active={tab === "tab3"}
              color="warning"
            >
              Unlisted
            </TETabsItem>
          </TETabs>
        </div>
      </div>

      {/* HASHTAGS */}
      <TECollapse show={showTags}>
        <div className="block rounded-lg bg-transparent text-neutral-500 shadow-lg  ">
          <div className=" flex flex-wrap gap-1 ">
            {[...styles].slice(1, 9).map((item, index) => (
              <button
                id="style"
                key={index}
                value={item.name}
                className="flex items-center text-md text-neutral-500  border px-3 h-7 rounded-full white-glassmorphism hover:text-[#E4A11B]  hover:bg-transparent"
                onClick={(id) => (
                  handleCollection(id), setShowTags(() => false)
                )}
              >
                #{item.name}
              </button>
            ))}
            {[...themes].slice(1, 9).map((item, index) => (
              <button
                id="theme"
                key={index}
                value={item.name}
                className="flex items-center text-md text-neutral-500  border px-3 h-7 rounded-full white-glassmorphism hover:text-[#E4A11B]  hover:bg-transparent"
                onClick={(id) => (
                  handleCollection(id), setShowTags(() => false)
                )}
              >
                #{item.name}
              </button>
            ))}

            {[...mediums].slice(1, 5).map((item, index) => (
              <button
                id="medium"
                key={index}
                value={item.name}
                className="flex items-center text-md text-neutral-500  border px-3 h-7 rounded-full white-glassmorphism hover:text-[#E4A11B]  hover:bg-transparent"
                onClick={(id) => (
                  handleCollection(id), setShowTags(() => false)
                )}
              >
                #{item.name}
              </button>
            ))}

            {[...collections].map((item, index) => (
              <button
                id="collection"
                key={index}
                value={item.name}
                className="flex items-center text-md text-neutral-500  border px-3 h-7 rounded-full white-glassmorphism hover:text-[#E4A11B]  hover:bg-transparent"
                onClick={(id) => (
                  handleCollection(id), setShowTags(() => false)
                )}
              >
                #{item.name}
              </button>
            ))}
          </div>
        </div>
      </TECollapse>

      {/*TAB GALLERIES */}
      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          {/* Listed */}
          {showFavorites ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {getFavoriteListed().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {getListedNFTs().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          )}
        </TETabsPane>
        <TETabsPane show={tab === "tab2"}>
          {/* Auction */}
          {showFavorites ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {getFavoriteAuction().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 ">
              {getAuctionedNFTs().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          )}
        </TETabsPane>
        <TETabsPane show={tab === "tab3"}>
          {/* Unlisted */}
          {showFavorites ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {getFavoriteUnlisted().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4  ">
              {getUnlistedNFTs().map((value, tokenId) => {
                return <NFTTile data={value} key={tokenId}></NFTTile>;
              })}
            </div>
          )}
        </TETabsPane>
      </TETabsContent>
      {/* <Loader /> */}
      {listedResults ? "" : <Loader />}
      {/* NOTIFICATIONS */}
      <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 my-7">
        <div className="text-center text-white font-light text-base w-full">
          {!ethereum ? (
            <div className="flex flex-wrap justify-around items-center flex-row w-full white-glassmorphism p-5 ">
              Install MetaMask and connect wallet to trade NFTs
            </div>
          ) : currentAccount !== "" ? (
            <div className="flex flex-wrap justify-center items-center flex-row w-full white-glassmorphism p-5 ">
              {tab == "tab1"
                ? "Displaying " +
                  (showFavorites
                    ? getFavoriteListed()?.length
                    : listedResults?.length) +
                  " FOR SALE results. "
                : tab == "tab2"
                ? "Displaying " +
                  (showFavorites
                    ? getFavoriteAuction()?.length
                    : auctionResults?.length) +
                  " AUCTION results. "
                : "Displaying " +
                  (showFavorites
                    ? getFavoriteUnlisted()?.length
                    : unlistedResults?.length) +
                  " UNLISTED results. "}
              {searchInput || showFavorites || collection
                ? "Filtered by"
                : "No search filters applied. "}
              &nbsp;
              {collection && (
                <>
                  <FiFilter fontSize={16} className="text-[#E4A11B]" />#
                  {collection}
                </>
              )}
              &nbsp;
              {showFavorites && (
                <>
                  <MdFavorite fontSize={18} className="text-[#ff3366]" />
                  Favorites
                </>
              )}
              &nbsp;
              {searchInput && (
                <>
                  <BiSearchAlt fontSize={20} color="grey" />
                  '{searchInput}'
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-around items-center flex-row w-full white-glassmorphism p-5 ">
              Connect your MetaMask wallet to trade NFTs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
