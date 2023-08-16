import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MarketplaceJSON from "../abis/Marketplace.json";
import axios from "axios";
import SubMenu from "./SubMenu";
import NFTTile from "./NFTTile";
import Loader from "./Loader";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { RandomIcons } from "../data/icons";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";
import { TETabsContent, TETabsPane } from "tw-elements-react";

import { BiLinkExternal, BiFilterAlt } from "react-icons/bi";
import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlinePercent,
  MdQrCode2,
  MdSell,
} from "react-icons/md";
import { SiEthereum } from "react-icons/si";
import { FaEye } from "react-icons/fa";

const NFTPage = () => {
  const {
    tab,
    setTab,
    handleTab,
    checksumAddress,
    createMarketplaceContractReadOnly,
    provider,
    handleCollection,
    currentAccount,
    favorites,
    marketData,
    collection,
    progress,
    setProgress,
  } = useContext(TransactionContext);

  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");

  async function getNFTToken(tokenId) {
    try {
      const contract = createMarketplaceContractReadOnly(provider);
      // const marketplaceContract = createMarketplaceContract();
      var tokenURI = await contract.tokenURI(tokenId);
      console.log("tokenURI", tokenURI);
      const listedToken = await contract.getListedTokenForId(tokenId);
      tokenURI = GetIpfsUrlFromPinata(tokenURI);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      let item = {
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        price: meta.price,
        listing: meta.listing,
        royalty: meta.royalty,
        seal: meta.seal,
        attributes: [
          {
            trait: meta.attributes?.[0] && meta.attributes[0].trait_type,
            value: meta.attributes?.[0] && meta.attributes[0].value,
          },
          {
            trait: meta.attributes?.[1] && meta.attributes[1].trait_type,
            value: meta.attributes?.[1] && meta.attributes[1].value,
          },
          {
            trait: meta.attributes?.[2] && meta.attributes[2].trait_type,
            value: meta.attributes?.[2] && meta.attributes[2].value,
          },
          {
            trait: meta.attributes?.[3] && meta.attributes[3].trait_type,
            value: meta.attributes?.[3] && meta.attributes[3].value,
          },
          {
            trait: meta.attributes?.[4] && meta.attributes[4].trait_type,
            value: meta.attributes?.[4] && meta.attributes[4].value,
          },
          {
            trait: meta.attributes?.[5] && meta.attributes[5].trait_type,
            value: meta.attributes?.[5] && meta.attributes[5].value,
          },
        ],
        code: meta.image.substring(100, 104),
        name: meta.name,
        description: meta.description,
        collection: meta.collection,
        style: meta.style,
        medium: meta.medium,
        texture: meta.texture,
        artist: meta.artist,
        colour: meta.colour,
        theme: meta.theme,
        metadataURL: tokenURI,
        creator: meta.creator,
      };

      updateData(item);
      updateDataFetched(true);
      setProgress("Viewed");
    } catch (error) {
      console.log(error);
    }
  }

  async function buyNFT(tokenId) {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Purchasing NFT... Please Wait");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      updateMessage("Success! Check your wallet");
      setProgress("Traded");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const [price, setPrice] = useState();

  async function listNFT(tokenId) {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      const listPrice = ethers.utils.parseUnits(price, "ether");
      updateMessage("Listing NFT... Please Wait");

      let transaction = await contract.updateListPrice(tokenId, {
        value: listPrice,
      });
      await transaction.wait();
      console.log("updateListPrice", transaction);
      updateMessage("Success! Check your wallet");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  const tokenData = marketData[marketData.length - tokenId];
  const attributesArray = tokenData?.attributes || data?.attributes;

  if (!dataFetched) getNFTToken(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  const link = `https://sepolia.etherscan.io/address/${data.owner}`;

  const collectionNFTs = marketData.filter(
    (item) => item.collection === tokenData.collection
  );

  const tagsArray = [
    { id: "style", value: tokenData?.style },
    { id: "theme", value: tokenData?.theme },
    { id: "artist", value: tokenData?.artist },
    { id: "medium", value: tokenData?.medium },
    { id: "texture", value: tokenData?.texture },
    { id: "colour", value: tokenData?.colour },
  ];

  return (
    <div className=" mx-2 lg:px-[5%] fade-in">
      <SubMenu
        title="NFT Details"
        subtitle={
          tab === "tab1"
            ? "Discover more about this NFT"
            : "View trade details of this NFT"
        }
        tab0={<MdOutlineKeyboardDoubleArrowLeft fontSize={20} />}
        tab1="View"
        tab2="Trade"
        handleTab={handleTab}
        tab={tab}
        setTab={setTab}
        data={data}
        tokenId={tokenId}
        progress={progress}
      />

      <TETabsContent>
        {/* VIEW PANEL */}
        <TETabsPane show={tab === "tab1"}>
          <div className="flex flex-wrap w-full justify-center flex-col md:flex-row white-glassmorphism  ">
            <div className="text-lg w-full md:w-1/2 xl:w-2/5 aspect-square   rounded-lg  ">
              {/* IMAGE */}
              <div className="rounded-xl   p-2 md:py-6 md:pl-6 h-fit mb-2">
                <img
                  src={tokenData?.image || data?.image}
                  alt="thumbnail"
                  className="rounded-lg "
                />

                {/* {loaded ? null : (
                  <div className="w-full h-full aspect-square rounded-lg seal ">
                    <label className="flex  items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <Loader />
                        <p className="text-sm text-white ">
                          LOADING NFT DATA...
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                <img
                  style={loaded ? {} : { display: "none" }}
                  src={marketData[tokenId]?.image || data?.image}
                  onLoad={() => setLoaded(true)}
                  alt="thumbnail"
                  className="rounded-lg "
                /> */}
              </div>
            </div>

            {/* NFT DETAILS */}
            <div className="text-lg w-full md:w-1/2 xl:w-3/5 px-2 md:p-5 rounded-lg">
              <div className="  flex justify-between items-start flex-nowrap  text-white  h-fit pb-3">
                {/* TITLE */}
                <div className="">
                  <p className=" text-2xl md:text-3x1  drop-shadow-x2 leading-tight font-thin group relative">
                    <strong>
                      {tokenData?.collection || data?.collection || "Token"}{" "}
                    </strong>
                    <span className="flex absolute bottom-10 -right-5 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Etherscan <BiLinkExternal fontSize={16} />
                    </span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl border px-3 rounded-full white-glassmorphism"
                    >
                      #{tokenData?.tokenId || data?.tokenId}
                      {/* #{marketData[tokenid].tokenId} */}
                    </a>
                  </p>

                  <span className=" text-2xl font-extralight text-gradient py-2 italic leading-tight">
                    '{tokenData?.name || data?.name || "Untitled"}'
                  </span>

                  <div
                    // token={data.data.tokenId}
                    // onClick={(e) => toggleFavorite(e)}
                    className=" text-white "
                  >
                    {favorites.includes(parseInt(data.tokenId)) ? (
                      <MdFavorite
                        fontSize="1.8em"
                        color="#ff3366"
                        className="drop-shadow"
                      />
                    ) : (
                      <MdOutlineFavoriteBorder
                        fontSize="1.8em"
                        color="#ff3366"
                        className="drop-shadow"
                      />
                    )}
                  </div>
                </div>

                {/* CREATOR */}
                <Link
                  to={{
                    pathname: `/Explore/Profile/${
                      data.creator && shortenAddress(data.creator)
                    }`,
                  }}
                  key={data.id}
                >
                  <div
                    id="creator"
                    token={tokenId}
                    value={data.creator}
                    onClick={(id, token) => handleCollection(id, token)}
                    className="flex group relative items-end rounded-full bg-cover bg-center  border-2 h-16 w-16 md:h-24 md:w-24 hover:scale-[1.02] shadow-xl shadow-indigo-500/30 duration-300 hover:shadow-indigo-500/50 hover:border-teal-400 border-teal-500"
                    style={{
                      backgroundImage: `url( "https://robohash.org/${
                        data.creator
                          ? shortenAddress(data.creator)
                          : "0x123...aBcD"
                      }.png?set=set3" `,
                    }}
                  >
                    <div className="bg-teal-500  px-2 py-1 rounded-full text-white text-xs hidden md:inline-block">
                      {/* {data.creator ? shortenAddress(data.creator)  : "0x123...aBcD"} */}
                      Creator
                    </div>
                    <span className="flex absolute bottom-24 -right-5 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      View &nbsp; <FaEye fontSize={16}/>
                    </span>
                  </div>{" "}
                </Link>
              </div>

              {/* DESCRIPTION */}
              <div className=" w-full text-[#868686] text-sm  h-fit ">
                DESCRIPTION{" "}
                <div className=" text-lg  pt-3 text-white">
                  {tokenData?.description || data?.description}
                </div>
              </div>

              {/* ATTRIBUTES */}
              <div className="  text-white rounded-lg py-5 ">
                <div className="">
                  <div className="flex text-[#868686] text-sm ">
                    ATTRIBUTES&nbsp;&nbsp;
                    <div className="group cursor-pointer relative">
                      <span className="absolute flex bottom-7 scale-0 transition-all rounded bg-gray-900  p-2 text-xs text-white group-hover:scale-100">
                        Metadata   <BiLinkExternal fontSize={16} />
                      </span>
                      <a
                        href={tokenData?.metadataURL || data.metadataURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <BiLinkExternal fontSize={20} className="" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3  gap-3 pt-5 text-sm text-white">
                    {attributesArray?.map((item) => (
                      <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                        <div>
                          <p className="text-xs text-[#868686] uppercase">
                            {item.trait ? item.trait : "Trait"} &nbsp;
                          </p>
                          {item.value ? item.value : "Value"}
                        </div>
                        <RandomIcons
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* VEIW TAGS */}
              <div className="flex flex-wrap mt-2">
                <div className="text-[#868686] text-sm mt-3 w-96 md:w-11 ">
                  {" "}
                  TAGS
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit ">
                  <div className="flex flex-wrap ">
                    {tagsArray.map((tag) => (
                      <Link to={{ pathname: `/Explore/${tag.value}` }}>
                        <div className="group relative">
                          <button
                            id={tag.id}
                            style={ tag.id === "colour" ? { background: tag.value, color: "transparent" } : null}
                            value={tag.value}
                            onClick={(id) => handleCollection(id)}
                            className={
                              tag.value === collection
                                ? "text-amber-500 text-md hover:bg-transparent hover:text-neutral-500 border px-3 h-8 rounded-full white-glassmorphism my-1"
                                : " text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                            }
                          >
                            #{tag.id === "colour" ? "" : tag.value || "Loading..."}
                          </button>{" "}
                          &nbsp;&nbsp;
                          <span className={ tag.value === collection
                                  ? "text-amber-500 absolute flex bottom-10 capitalize scale-0 transition-all rounded-full bg-gray-900 p-2 text-xs  group-hover:scale-100"
                                  : "text-white absolute flex bottom-10 capitalize scale-0 transition-all rounded-full bg-gray-900 p-2 text-xs  group-hover:scale-100"}>
                            <BiFilterAlt
                              fontSize={16}
                              className={
                                tag.value === collection
                                  ? "text-amber-500 "
                                  : "text-white"
                              }
                            />
                            { tag.id === "colour" ?  tag.value: tag.id}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TETabsPane>

        {/* TRADE PANEL */}
        <TETabsPane show={tab === "tab2"}>
          <div className="flex  w-full justify-center  flex-col md:flex-row white-glassmorphism  ">
            <div className="text-lg w-full md:w-1/2 xl:w-2/5 aspect-square   rounded-lg  ">
              <div className="rounded-xl p-2 md:py-6 md:pl-6 h-fit mb-2">
                {data.image ? (
                  <img
                    src={data?.image}
                    alt="Detailed image"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full aspect-square rounded-lg seal ">
                    <label className="flex  items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <Loader />
                        <p className="text-sm text-white ">
                          LOADING NFT DATA...
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="text-lg w-full md:w-1/2 xl:w-3/5 px-2 md:p-5 rounded-lg ">
              <div className="  flex justify-between items-start flex-nowrap  text-white  h-fit pb-3">
                <div className="">
                  <p className="text-2xl md:text-3x1  drop-shadow-x2 leading-tight font-thin group relative">
                    <strong>
                      {data.collection ? data.collection : "Title"}{" "}
                    </strong>
                    <span className="flex absolute bottom-10 -right-5 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Etherscan&nbsp;
                      <BiLinkExternal fontSize={16} className="" />
                    </span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl border px-3 rounded-full white-glassmorphism"
                    >
                      #{data.tokenId}
                    </a>
                  </p>

                  <span className=" text-2xl font-extralight text-gradient py-2 italic leading-tight ">
                    '{data.name ? data.name : "Untitled"}'
                  </span>

                  <div className="w-7 h-7 rounded-full border border-white flex justify-center items-center eth-card seal mt-1">
                    <SiEthereum fontSize={16} color="#fff" />
                  </div>
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit mb-2 "></div>{" "}
                <Link
                  to={{
                    pathname: `/Trade/Profile/${
                      data.seller && shortenAddress(data.seller)
                    }`,
                  }}
                  key={data.id}
                >
                  <div
                    id="seller"
                    token={tokenId}
                    value={data.seller}
                    onClick={(id, token) => handleCollection(id, token)}
                    className="flex group relative items-end rounded-full bg-cover bg-center  border-2 h-16 w-16 md:h-24 md:w-24 hover:scale-[1.02] shadow-xl shadow-indigo-500/30 duration-300 hover:shadow-indigo-500/50 border-[#F60C4B]"
                    style={{
                      backgroundImage: `url( "https://robohash.org/${data.seller}.png?set=set3"  `,
                    }}
                  >
                    <div className="bg-[#F60C4B]  px-2 py-1 rounded-full text-white text-xs hidden md:inline-block">
                      {/* { data.seller && shortenAddress(data.seller)} */}
                      Seller
                    </div>
                    <span className="absolute bottom-24 -right-5 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      View Profile?
                    </span>
                  </div>{" "}
                </Link>
              </div>

              <div className=" w-full text-[#868686] text-sm  h-fit ">
                TRADE{" "}
                <div className=" text-lg  pt-3 text-white">
                  This NFT last sold for {data.price} ETH{" "}
                  {data.date ? "on " + data.date : ""}
                </div>
              </div>

              <div className=" text-[#868686] text-sm  mt-2 ">
                <div className="white-glassmorphism ">
                  {checksumAddress !== data.seller ? (
                    <div>
                      <div className="check mt-3 gap-x-2.5"></div>
                      <div className="flex justify-around items-center group relative">
                        <button
                          className="activeButton text-white outline-none  font-semibold py-2 px-10 my-5 rounded text-[15px]"
                          onClick={() => buyNFT(tokenId)}
                        >
                          BUY
                        </button>
                        <span className="absolute bottom-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                          {!currentAccount
                            ? "Wallet Not Connected?"
                            : !data.price
                            ? "Enter an offer price"
                            : ""}
                        </span>
                        <input
                          className=" rounded outline-none text-white text-[15px] font-semibold border-none white-glassmorphism shadow-2xl px-2 text-center h-11 w-[120px] "
                          type="number"
                          placeholder="Price (ETH)"
                          step="0.001"
                          min={data.price}
                          // value={formParams.price}
                          // onChange={(e) =>
                          //   updateFormParams({
                          //     ...formParams,
                          //     price: e.target.value,
                          //   })
                          // }
                        ></input>
                      </div>
                      <div className="text-white text-center text-md ">
                        {currentAccount
                          ? "Enter your buy price"
                          : "Connect your MetaMask account to trade"}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="check mt-3 gap-x-2.5"></div>
                      <div className="flex justify-around items-center group relative">
                        <input
                          className=" rounded outline-none text-white text-md text-center border-none white-glassmorphism shadow-2xl px-2  h-11 w-[120px] "
                          type="number"
                          placeholder="Price (ETH)"
                          step="0.001"
                          min="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          // onChange={(e) =>
                          //   updateFormParams({
                          //     ...formParams,
                          //     price: e.target.value,
                          //   })
                          // }
                        ></input>
                        <button
                          className=" outline-none bg-[#F60C4B] hover:bg-[#F60C6d] border-[#F60C4B] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                          onClick={() => listNFT(tokenId)}
                        >
                          SELL
                        </button>
                        <span className="absolute bottom-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                          {!currentAccount
                            ? "Wallet Not Connected?"
                            : !price
                            ? "No Price Entered?"
                            : "Click 'Sell' To Proceed"}
                        </span>
                      </div>
                      <div className="text-white text-center  text-md ">
                        {currentAccount
                          ? "Enter your sell price"
                          : "Connect your MetaMask account to trade"}
                      </div>
                    </div>
                  )}

                  <div className="text-orange text-center mt-3">{message}</div>
                </div>
                <div className="flex text-[#868686] text-sm pt-5">
                  METADATA&nbsp;&nbsp;
                  <div className="group cursor-pointer relative mb-3">
                    <span className="flex absolute bottom-7 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Metadata&nbsp;
                      <BiLinkExternal fontSize={16} />
                    </span>
                    <a
                      href={data.metadataURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <BiLinkExternal fontSize={16} />
                    </a>
                  </div>
                </div>
                <div className=" grid grid-cols-2 xl:grid-cols-4 w-full text-white text-md gap-3  md:py-2 h-fit ">
                  <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                    <div>
                      <p className="text-xs text-[#868686] uppercase">
                        {"Status"} &nbsp;
                      </p>

                      {data.listing ? data.listing : "N/A"}
                    </div>
                    <MdSell
                      fontSize="2.4em"
                      color="orange"
                      className="drop-shadow"
                    />
                  </div>

                  <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                    <div>
                      <p className="text-xs text-[#868686] uppercase">
                        {"Royalty"} &nbsp;
                      </p>

                      {data.royalty ? data.royalty : "N/A"}
                    </div>
                    <MdOutlinePercent
                      fontSize="2.4em"
                      color="orange"
                      className="drop-shadow"
                    />
                  </div>

                  <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                    <div>
                      <p className="text-xs text-[#868686] uppercase">
                        {"Code"} &nbsp;
                      </p>
                      {data.code ? data.code : "N/A"}
                    </div>
                    <MdQrCode2
                      fontSize="2.4em"
                      color="orange"
                      className="drop-shadow"
                    />
                  </div>

                  <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                    <div>
                      <p className="text-xs text-[#868686] uppercase">
                        {"Seal"} &nbsp;
                      </p>
                      {data.seal ? data.seal : "N/A"}
                    </div>
                    <SiEthereum
                      fontSize="2.4em"
                      color="orange"
                      className="drop-shadow"
                    />
                  </div>
                </div>
                <br />
                CONTRACT
                <div className="flex text-white justify-between items-end py-2 ">
                  <p className="text-sm group relative">
                    Contract
                    <a className="">
                      &nbsp; &nbsp;&nbsp;
                      {data.owner && shortenAddress(data.owner)}
                    </a>
                    <span className="absolute flex bottom-6 right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      <BiLinkExternal fontSize={16} className="" />
                    </span>
                  </p>

                  <p className="text-sm text-right group relative ">
                    Seller{" "}
                    <a>
                      &nbsp;&nbsp;{data.seller && shortenAddress(data.seller)}
                      &nbsp;
                    </a>
                    <span className="absolute flex bottom-6 right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      <BiLinkExternal fontSize={16} className="" />
                    </span>
                    <br />
                    {/* <span>{checksum && shortenAddress(checksum)}</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TETabsPane>
      </TETabsContent>

      <div className="w-full py-5 pl-2">
        <div className=" whitespace-nowrap">
          <h1 className="text-2xl sm:text-3xl text-white leading-tight text-gradient">
            Explore Collection
            <h2 className="text-left text-gradient text-lg">
              Click on any image to view details.
            </h2>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:text-xs gap-4">
        {collectionNFTs.reverse().map((data) => (
          <NFTTile data={data} key={data.tokenId} />
        ))}
      </div>
    </div>
  );
};

export default NFTPage;
