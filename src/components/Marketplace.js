import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import { shortenAddress } from "../utils/shortenAddress";
import {
  TECollapse,
  TETabsContent,
  TETabsPane,
} from "tw-elements-react";
import Loader from "./Loader";
import { BiSearchAlt, BiSort, BiFilterAlt } from "react-icons/bi";
import {
  MdFavorite,
} from "react-icons/md";

export default function Marketplace() {
  const {
    marketData,
    tab,
    handleTab,
    collection,
    filteredResults,
    handleCollection,
    favorites,
  } = useContext(TransactionContext);

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
      const searchedData = marketData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    // Find subset of items in both searchResults and filteredResults
    const commonResults = filteredResults.filter(item => searchedData.includes(item));
    console.log("commonResults", commonResults);
      setSearchResults(commonResults);
    }
  };

  //FILTER/SORT
  const sortDate = (array) => {
    return array.sort((a, b) => parseFloat(b.tokenId) - parseFloat(a.tokenId));
  };

  const sortPrice = (array) => {
    return array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  };

  function getTerms(tab) {
    switch (tab) {
      case "tab1":
        return ["Unlisted", "Auction", "Listed For Sale", undefined];
      case "tab2":
        return ["Listed For Sale"];
      case "tab3":
        return ["Auction"];
      default:
        return ["Unlisted"];
    }
  }

  function filterArray(array) {
    const terms = getTerms(tab);
    return array.filter((item) => terms.includes(item.listing));
  }

  const getResults = () => {
    return sorted && showFavorites
      ? filterArray(
          sortPrice(
            searchResults.filter((item) => favorites.includes(item.tokenId))
          )
        )
      : showFavorites
      ? filterArray(
          sortDate(
            searchResults.filter((item) => favorites.includes(item.tokenId))
          )
        )
      : sorted
      ? filterArray(sortPrice(searchResults))
      : filterArray(sortDate(searchResults));
  };

  // TOGGLES
  const [sorted, setSorted] = useState(false);
  const [newest, setNewest] = useState(true);
  
  const toggleSort = () => {
    setSorted(prevSorted => !prevSorted);
    setNewest(prevNewest => !prevNewest);
  };

  const [showFavorites, setShowFavorites] = useState(false);
  const toggleShowFavorites = () => setShowFavorites(!showFavorites);

  const [showTags, setShowTags] = useState(false);
  const toggleShowTags = () => setShowTags(!showTags);

  useEffect(() => {
    searchItems(searchInput);
  }, [searchInput, collection]);

  //TAGS
  function extractUniqueValuesWithProperty(dataArray, properties) {
    const uniqueValues = new Set();

    properties.forEach((property) => {
      dataArray.forEach((item) => {
        if (item[property] !== undefined && item[property] !== "") {
          if (Array.isArray(item[property])) {
            item[property].forEach((value) =>
              uniqueValues.add(JSON.stringify({ property, value }))
            );
          } else {
            uniqueValues.add(
              JSON.stringify({ property, value: item[property] })
            );
          }
        }
      });
    });

    return Array.from(uniqueValues).map((item) => JSON.parse(item));
  }

  const propertiesToExtract = [
    "collection",
    "theme",
    "style",
    "medium",
    "texture",
    "artist",
  ];

  const uniqueValuesWithProperty = extractUniqueValuesWithProperty(
    marketData,
    propertiesToExtract
  );
 
  const resultLength = getResults(getTerms(tab)).length;
  console.log(resultLength)

  console.log("searchResults", searchResults)
  console.log("filteredResults", filteredResults)

  return (
    <div className="fade-in md:px-[3%] px-2">
      <div className="flex flex-row place-items-center justify-between flex-wrap w-full pt-3 pb-1 lg:pl-2">
        {/* HEADING */}
        <div className="w-full xl:w-auto">
          <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient ">
            Explore NFTs
          </h1>

          <div className="text-white flex items-center text-gradient text-lg">
            {tab == "tab1"
              ? " All NFT"
              : tab == "tab2"
              ? " " + resultLength + " For Sale "
              : tab == "tab3"
              ? " " + resultLength + " Auctioned "
              : " " + resultLength + " Unlisted "}
              { tab == "tab1" ? "s " : " " }
            {collection && showFavorites
              ? "| Filtered | Favorites"
              : collection
              ? "| Filtered"
              : showFavorites
              ? "| Favorites"
              : searchInput
              ? "| Search"
              : "| Unfiltered"}
            &nbsp;
            {newest ? "| By Date" : "| By Price"}
          </div>
        </div>

        {/* MENU BUTTONS */}
        <div className="flex items-center justify-center gap-x-2">

          {/* Filter */}
          <div className="flex items-center cursor-pointer">
              <button
                id=""
                value=""
                className={ collection ? "flex items-center whitespace-nowrap bg-transparent text-amber-500 border border-amber-500 px-3 h-10 rounded-full white-glassmorphism hover:text-neutral-500 hover:bg-transparent"
                : "flex items-center justify-center text-white  border px-3 h-10 rounded-full white-glassmorphism hover:text-[#E4A11B] hover:brightness-110 hover:bg-transparent lg:w-[100px]" }
                onClick={collection ? (id) => handleCollection(id) : toggleShowTags }
              >
                <BiFilterAlt 
                  fontSize={22}
                  className={collection ? "text-amber-500" : " hover:text-amber-500"}
                />
               {collection?.length > 30
                  ? shortenAddress(collection)
                  : collection || "Filter"}
              </button>
          </div>
     
          {/* Sort */}
          <div className={ collection ? "hidden md:flex items-center cursor-pointer text-white" : "flex items-center cursor-pointer text-white" }>
                <button
                  onClick={toggleSort}
                  className="flex items-center bg-indigo-500 text-white px-3 h-10 rounded-full border-none hover:brightness-150 lg:w-[85px]"
                >
                  <BiSort fontSize={20} />
                  <p className="hidden lg:flex">{ newest ? "Date" : "Price" }</p>
                </button>
          </div>
        
          {/* Favorite */}
          <div className="flex items-center cursor-pointer text-white ">
                <button
                  className={ showFavorites ? "flex items-center bg-[#ff3366] px-3 h-10 rounded-full hover:bg-[#ff3366] border-none hover:brightness-150 lg:w-[85px]"
                  : "flex items-center white-glassmorphism border px-3 h-10 rounded-full hover:bg-transparent hover:brightness-150 lg:w-[85px]" }
                  onClick={toggleShowFavorites}
                >
                  <MdFavorite
                    fontSize={22}
                  />
                  <p className="hidden lg:flex">&nbsp;Favs</p>
                </button>
          </div>
   
          {/* Listing */}
          <div className="flex cursor-pointer text-white">
            <select
              className="flex outline-none py-2 min-w-[90px] h-[40px] bg-teal-600 shadow-2xl border border-teal-600 rounded-full hover:brightness-110"
              onChange={(e) => handleTab(e.target.value)}
            >
              <option value="tab1">&nbsp;&nbsp;All NFTs</option>
              <option value="tab2">&nbsp;&nbsp;For Sale</option>
              <option value="tab3">&nbsp;&nbsp;Auction</option>
              <option value="tab4">&nbsp;&nbsp;Unlisted</option>
            </select>
          </div>
        </div>

        {/* SEARCH */}
        <div className="w-full lg:w-auto my-3 lg:mx-0">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 right-4 flex items-center">
              <BiSearchAlt fontSize={26} color="grey"/>
            </span>
            <input
              type="text"
              onChange={(e) => searchItems(e.target.value)}
              className="w-full rounded-full outline-none h-12 pl-7 text-white border-none white-glassmorphism min-w-[300px]"
              placeholder="Search NFTs..."
              name="search"
            />
          </label>
        </div>
      </div>

      {/* HASHTAGS */}
      <TECollapse show={showTags} className="z-50">
        <div className="block rounded-lg bg-transparent text-neutral-500 shadow-lg z-50">
          <div className=" flex flex-wrap gap-1 ">
            {uniqueValuesWithProperty.map((item, index) => (
              <button
                id={item.property}
                key={index}
                value={item.value}
                className="flex items-center text-md text-neutral-500 border px-3 h-7 rounded-full white-glassmorphism hover:text-[#E4A11B] hover:bg-transparent"
                onClick={(id) => (handleCollection(id), setShowTags(false))}
              >
                #{item.value}
              </button>
            ))}
          </div>
        </div>
      </TECollapse>

      {/*TAB GALLERIES */}
      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getResults(getTerms(tab)).map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>

        <TETabsPane show={tab === "tab2"}>
          {/* Listed */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getResults(getTerms(tab)).map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab3"}>
          {/* Auction */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {getResults(getTerms(tab)).map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab4"}>
          {/* Unlisted */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {getResults(getTerms(tab)).map((value, tokenId) => {
              return <NFTTile data={value} key={tokenId}></NFTTile>;
            })}
          </div>
        </TETabsPane>
      </TETabsContent>
      {/* NOTIFICATIONS */}
      <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 my-7">
        <div className="text-center text-white font-light text-base w-full">
            <div className="flex flex-wrap justify-center items-center flex-row w-full white-glassmorphism p-5">
              {tab == "tab1"
                ? "Found " + resultLength + " NFT result"
                : tab == "tab2"
                ? "Found " + resultLength + " 'For Sale' result"
                : tab == "tab3"
                ? "Found " + resultLength + " 'Auction' result"
                : "Found " + resultLength + " 'Unlisted' result"
              }
               { resultLength !== 1  ? "s. " : ". " }
              {searchInput || showFavorites || collection
                ? "Filtered by"
                : "No search filters applied. "}
              &nbsp;
              {collection && (
                <>
                  <BiFilterAlt  fontSize={18} className="text-[#E4A11B]" />#
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
                  <BiSearchAlt fontSize={20} color="grey" />'{searchInput}'
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
