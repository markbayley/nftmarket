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
      {/* SUBNAV */}
      <div className="flex flex-row place-items-center justify-between flex-wrap w-full p-2">
        {/* HEADING */}
        <div>
          <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient ">
            Trade NFTs
          </h1>
          {/* SUBHEADING */}
          <h2 className="text-left text-gradient text-lg  w-full">
            {
              // filteredResults && collection
              //   ? filteredResults.length
              //   :
              tab === "tab1"
                ? listedResults?.length
                : tab === "tab2"
                ? auctionResults?.length
                : unlistedResults?.length
            }{" "}
            NFTs{" "}
            {collection.length > 20
              ? " Tagged '" + shortenAddress(collection) + "'"
              : collection
              ? " Tagged '" + collection + "'"
              : searchInput
              ? " Tagged '" + searchInput + "'"
              : ""}
            {tab === "tab1"
              ? " For Sale " + ` `
              : tab === "tab2"
              ? " Auctioned " + " "
              : " Unlisted"}
            {/* { !sorted ? "- Sorted By Date" : "- Sorted By Price"}
                { showFavorites ? " - Favorited" : ""} */}
            {collection ? "" : searchInput ? "" : " - Unfiltered"}
          </h2>
        </div>

        {/* FILTER/SORT/FAVORITE */}
        <div className="flex md:mb-0 py-2">
          {/* FILTER */}
          <div className="flex items-center  cursor-pointer">
            <FiFilter
              fontSize={26}
              className={collection ? "text-[#E4A11B] " : "text-gray-600"}
            />
            {collection ? (
              <button
                id=""
                value=""
                className="flex items-center text-md text-[#E4A11B]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
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
                    className="flex items-center text-md text-neutral-500  border px-3 h-8 rounded-full white-glassmorphism hover:text-[#6c63ff]  hover:bg-transparent"
                    onClick={toggleShowTags}
                  >
                    #Filter
                  </button>
                </TERipple>
              </>
            )}{" "}
          </div>
          &nbsp; &nbsp;
          {/* SORT */}
          <div className="flex items-center  cursor-pointer text-neutral-500 hover:text-[#E4A11B]">
            {newest ? (
              <>
                <BiSort
                  fontSize={26}
                  className="text-[#6c63ff]"
                  onClick={toggleNewest}
                />
                <button
                  className="flex items-center text-md text-[#6c63ff]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                  onClick={toggleNewest}
                >
                  Date
                </button>
              </>
            ) : (
              <>
                <BiSort
                  fontSize={26}
                  className="text-[#E4A11B]"
                  onClick={toggleNewest}
                />
                <button
                  className="flex items-center text-md text-[#E4A11B]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                  onClick={toggleSort}
                >
                  Price
                </button>
              </>
            )}
          </div>
          &nbsp; &nbsp;
          {/* FAVORITE */}
          <div className="flex items-center  cursor-pointer text-neutral-500 hover:text-[#ff3366]">
            {showFavorites ? (
              <>
                <MdFavorite
                  fontSize={26}
                  className="text-[#ff3366]"
                  onClick={toggleShowFavorites}
                />
                &nbsp;
                <button
                  className="flex items-center text-md text-[#ff3366]  border px-3 h-8 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
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
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
              onClick={() => handleTab("tab1")}
              active={tab === "tab1"}
              color="warning"
            >
              For Sale
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
              onClick={() => handleTab("tab2")}
              active={tab === "tab2"}
              color="warning"
            >
              Auction
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
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
        {/* <Tags handleCollection={handleCollection}/> */}

        <div className="block rounded-lg bg-transparent text-neutral-500 shadow-lg  ">
          <div className=" flex flex-wrap gap-1 ">
            {[...styles].slice(1, 9).map((item, index) => (
              <button
                id="style"
                key={index}
                value={item.name}
                className="hidden md:flex  capitalize items-center text-md text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
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
                className="hidden md:flex  capitalize items-center text-md text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
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
                className="hidden md:flex  capitalize items-center text-md text-gray-500 border border-gray-500 px-3 h-7 rounded-full bg-transparent hover:text-[#6c63ff] hover:border-[#6c63ff] duration-300 hover:bg-transparent"
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
                className="flex items-center text-md text-neutral-500  border px-3 h-7 rounded-full white-glassmorphism hover:text-[#6c63ff] hover:bg-transparent"
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

      {/* NOTIFICATIONS */}
      <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 my-7">
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
    </div>
  );
}
