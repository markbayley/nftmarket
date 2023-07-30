import { Link, useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../abis/Marketplace.json";
import axios from "axios";
import { useContext, useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";
import { BsInfoCircle } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import Loader from "./Loader";
import avatarImg from "../images/download.jpg";

const NFTPage = () => {
  const {
    ethereum,
    tab,
    handleTab,
    checksumAddress,
    createMarketplaceContractReadOnly,
    provider,
    handleCollection,
    marketData,
    setFilteredResults,
    setCollection,
    setId,
    formParams,
    updateFormParams
  } = useContext(TransactionContext);

  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");


  console.log(formParams.price)

  // const handleCollection = (e) => {
  //   let col = e.target.value;
  //   let id = e.target.id;
  //   setCollection(col);
  //   setId(id);
  //   console.log(col, id);
  //   const results = marketData.filter((item) =>  item.style == col);
  //   setFilteredResults(results);
  //   console.log("results", results)
  // }

  //   function handleCollection(e) {
  //     let col = e.target.value;
  //     setCollection(col);
  //     let id = e.target.id;
  //     setId(id);
  //     console.log(col, id);

  //     const results= marketData.filter(item => {
  //         return item[id] === col;
  //     });
  //     setFilteredResults(results);

  //     // Do something with the filtered data (e.g., display it on the page)
  //     console.log(results);
  // }

  async function getNFTToken(tokenId) {
    try {
      // if (provider) {
      // const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const addr = await signer.getAddress();
      // //Pull the deployed contract instance
      // let contract = new ethers.Contract(
      //   MarketplaceJSON.address,
      //   MarketplaceJSON.abi,
      //   signer
      // );
      const contract = createMarketplaceContractReadOnly(provider);
      // const marketplaceContract = createMarketplaceContract();

      //create an NFT Token
      var tokenURI = await contract.tokenURI(tokenId);
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

        trait1: meta.attributes?.[0] && meta.attributes[0].trait_type,
        value1: meta.attributes?.[0] && meta.attributes[0].value,
        trait2: meta.attributes?.[1] && meta.attributes[1].trait_type,
        value2: meta.attributes?.[1] && meta.attributes[1].value,
        trait3: meta.attributes?.[2] && meta.attributes[2].trait_type,
        value3: meta.attributes?.[2] && meta.attributes[2].value,
        trait4: meta.attributes?.[3] && meta.attributes[3].trait_type,
        value4: meta.attributes?.[3] && meta.attributes[3].value,
        trait5: meta.attributes?.[4] && meta.attributes[4].trait_type,
        value5: meta.attributes?.[4] && meta.attributes[4].value,
        trait6: meta.attributes?.[5] && meta.attributes[5].trait_type,
        value6: meta.attributes?.[5] && meta.attributes[5].value,

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
      };

      console.log(item);
      updateData(item);
      updateDataFetched(true);
      // } else {
      //   console.log("Ethereum is not present NFT Page");
      // }
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
      // updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

 

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
      const listPrice = ethers.utils.parseUnits(formParams.price, "ether");
      updateMessage("Listing NFT... Please Wait");
 
      let transaction = await contract.updateListPrice(tokenId, {
        value: listPrice,
      });
      await transaction.wait();

      updateMessage("Success! Check your wallet");
      // updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  console.log("tokenId", tokenId);
  if (!dataFetched) getNFTToken(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  console.log("Message", message);

  const link = `https://sepolia.etherscan.io/address/${data.owner}`;

  return (
    <div className=" mx-2 md:px-[5%] fade-in">
      <div className="flex flex-row items-center flex-wrap ">
        <div className="flex lg:w-1/2 w-full ">
          <h1 className="text-3xl sm:text-3xl  text-gradient capitalize">
            NFT Detail
          </h1>
          &nbsp; &nbsp;
          <Link to={"/Trade"}>
            <button
              id="colour"
              value={data.name}
              className=" text-sm text-white border px-3 h-8 rounded-full white-glassmorphism  "
            >
              #{data.name}
            </button>
          </Link>
        </div>

        <div className="flex lg:w-1/2 w-full justify-center lg:justify-end ">
          <TETabs className="">
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleTab("tab1")}
              active={tab === "tab1"}
            >
              Details
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent "
              onClick={() => handleTab("tab2")}
              active={tab === "tab2"}
            >
              Trade
            </TETabsItem>
          </TETabs>
        </div>
      </div>

      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          <div className="flex flex-wrap w-full justify-center flex-col md:flex-row white-glassmorphism  ">
            <div className="text-lg w-full md:w-1/2 xl:w-2/5 aspect-square   rounded-lg  ">
              <div className="rounded-xl   p-2 md:py-6 md:pl-6 h-fit mb-2">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Detailed image"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full aspect-square rounded-lg seal ">
                    <label className="flex  items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="text-sm text-white ">
                          CONNECT to MetaMask to view
                        </p>
                        <Loader />
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="text-lg w-full md:w-1/2 xl:w-3/5 px-2 md:p-5 rounded-lg ">
              <div className="  flex justify-between items-start flex-nowrap  text-white  h-fit pb-3 ">
                <div className="">
                  <p className=" text-3xl  drop-shadow-x2 leading-tight font-thin group relative">
                    <strong>
                      {data.collection ? data.collection : "Title"}{" "}
                    </strong>
                    <span className="absolute bottom-10 -right-5 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Etherscan
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

                  <span className=" text-2xl font-extralight text-gradient py-2 italic leading-tight">
                    '{data.name ? data.name : "Untitled"}'
                  </span>
                  {/* 
                  <div className=" flex items-center text-[#868686] text-sm h-fit mt-5">
                <p>
                  TOKEN ID
                  <br />
                  <p className="text-xl text-white py-2 ">
                    {data.tokenId
                      ? "#" + data.tokenId
                     
                      : "#Token ID"}
                  </p>
                  
                </p>
              </div>{" "} */}
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit mb-2 "></div>{" "}
                <Link
                  to={{ pathname: `/Trade/CreatorPage/${data.seller}` }}
                  key={data.id}
                >
                  <button
                    id="seller"
                    token={tokenId}
                    value={data.seller}
                    onClick={(id, token) => handleCollection(id, token)}
                    className="flex items-end rounded-full bg-cover bg-center  border-2 h-16 w-16 md:h-24 md:w-24 hover:scale-[1.02] "
                    style={{ backgroundImage: `url(${avatarImg})` }}
                  >
                    <div className="bg-yellow-600  px-2 rounded-full text-white text-sm hidden md:inline-block">
                      Creator
                    </div>
                  </button>{" "}
                </Link>
                {/* <p>
                  <span className=" text-2xl  text-white border px-3 py-1 rounded-full white-glassmorphism">
                    #{data.tokenId}
                  </span>
                  &nbsp;&nbsp;
                </p> */}
                {/* <p>COLLECTION&nbsp;&nbsp;<span className="text-md text-[#868686]">{data.subtitle}</span></p> */}
              </div>

              {/* <div className=" flex items-center text-[#868686] text-sm h-fit mb-2 ">
                <p>
                  NAME
                  <br />
                  <p className="text-lg text-white py-2 ">
                    {data.name
                      ? data.name
                     
                      : "Untitled"}
                  </p>
                  
                </p>
              </div>{" "} */}

              <div className=" w-full text-[#868686] text-sm  h-fit ">
                DESCRIPTION{" "}
                <div className=" text-lg  pt-3 text-white">
                  {data.description} Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </div>
              </div>
              <div className="  text-white rounded-lg py-5 ">
                <div className="">
                  <p className="flex text-[#868686] text-sm ">
                    ATTRIBUTES&nbsp;&nbsp;
                    <div className="group cursor-pointer relative">
                      <span className="absolute bottom-7 scale-0 transition-all rounded bg-gray-900  p-2 text-xs text-white group-hover:scale-100">
                        Metadata
                      </span>
                      <a
                        href={data.metadataURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <BiLinkExternal fontSize={20} className="" />
                      </a>
                    </div>
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-3  gap-3 pt-5 text-sm text-white  ">
                    {/* <div className="border rounded-lg p-3 ">
                  <p className="text-xs text-[#6c63ff]">CATEGORY &nbsp;</p>
                  {data.category}
                </div>
                <div className="border rounded-lg p-3 capitalize">
                  <p className="text-xs text-[#6c63ff]">SUBCATEGORY &nbsp;</p>
                  {data.subcategory}
                </div> */}
                    <div className=" bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait1 ? data.trait1 : "Trait 1"} &nbsp;
                      </p>
                      {data.value1 ? data.value1 : "Value 1"}
                    </div>
                    <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait2 ? data.trait2 : "Trait 2"} &nbsp;
                        {/* { data.attributes.trait_type[1]  ? data.attributes.trait_type[1] : "Trait 2"} */}
                      </p>
                      {data.value2 ? data.value2 : "Value 2"}
                    </div>
                    <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait3 ? data.trait3 : "Trait 3"} &nbsp;
                      </p>
                      {data.value3 ? data.value3 : "Value 3"}
                    </div>
                    <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait4 ? data.trait4 : "Trait 4"} &nbsp;
                      </p>
                      {data.value4 ? data.value4 : "Value 4"}
                    </div>
                    <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait5 ? data.trait5 : "Trait 5"} &nbsp;
                      </p>
                      {data.value5 ? data.value5 : "Value 5"}
                    </div>
                    <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                      <p className="text-xs text-[#868686] uppercase">
                        {data.trait6 ? data.trait6 : "Trait 6"} &nbsp;
                      </p>
                      {data.value6 ? data.value6 : "Value 6"}
                    </div>
                    {/* {data.trait5 && (
                      <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 drop-shadow-2xl">
                        <p className="text-xs text-[#6c63ff]">
                          {data.trait5} &nbsp;
                        </p>
                        {data.value5}
                      </div>
                    )}
                    {data.trait6 && (
                      <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 drop-shadow-2xl">
                        <p className="text-xs text-[#6c63ff]">
                          {data.trait6} &nbsp;
                        </p>
                        {data.value6}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="text-[#868686] text-sm my-2 w-96 md:w-1/12 ">
                  {" "}
                  TAGS
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit ">
                  <div className="flex flex-wrap ">
                    <Link to={{ pathname: `/Trade/${data.style}` }}>
                      <button
                        id="style"
                        value={data.style}
                        onClick={(id) => handleCollection(id)}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                      >
                        #{data.style ? data.style : "Style"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={{ pathname: `/Trade/${data.medium}` }}>
                      <button
                        id="medium"
                        value={data.medium}
                        onClick={(id) => handleCollection(id)}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                      >
                        #{data.medium ? data.medium : "Medium"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={{ pathname: `/Trade/${data.texture}` }}>
                      <button
                        id="texture"
                        value={data.texture}
                        onClick={handleCollection}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                      >
                        #{data.texture ? data.texture : "Texture"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={{ pathname: `/Trade/${data.artist}` }}>
                      <button
                        id="artist"
                        value={data.artist}
                        onClick={handleCollection}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                      >
                        #{data.artist ? data.artist : "Artist"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={{ pathname: `/Trade/${data.colour}` }}>
                      <button
                        id="colour"
                        value={data.colour}
                        onClick={handleCollection}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1 "
                      >
                        #{data.colour ? data.colour : "Colour"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={{ pathname: `/Trade/${data.theme}` }}>
                      <button
                        id="theme"
                        value={data.theme}
                        onClick={handleCollection}
                        className=" text-md  border px-3 h-8 rounded-full white-glassmorphism my-1"
                      >
                        #{data.theme ? data.theme : "Theme"}
                      </button>{" "}
                    </Link>
                    &nbsp;&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TETabsPane>
        <TETabsPane show={tab === "tab2"}>
          <div className="flex  w-full justify-center  flex-col md:flex-row white-glassmorphism  ">
            <div className="text-lg w-full md:w-1/2 xl:w-2/5 aspect-square   rounded-lg  ">
              <div className="rounded-xl   p-3 md:p-6 h-fit mb-2">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Detailed image"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full aspect-square rounded-lg seal ">
                    <label className="flex  items-center justify-center w-full h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="text-sm text-white ">
                          CONNECT to MetaMask to view
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="text-lg w-full md:w-1/2 xl:w-3/5 px-2 md:p-5 rounded-lg ">
              <div className=" flex justify-between  flex-wrap  text-[#868686]   h-fit pb-5 ">
                <p className="flex">
                  <span className=" text-2xl sm:text-3xl uppercase text-white">
                    {data.collection ? data.collection : "Collection"}
                  </span>
                </p>

                <p>
                  <span className=" text-2xl  text-white border px-3 py-1 rounded-full white-glassmorphism">
                    #{data.tokenId}
                  </span>
                  &nbsp;&nbsp;
                </p>
                {/* <p>COLLECTION&nbsp;&nbsp;<span className="text-md text-[#868686]">{data.subtitle}</span></p> */}
              </div>
              <div className=" flex items-center text-[#868686] text-sm h-fit mb-2 ">
                <p>
                  NAME
                  <br />
                  <p className="text-lg text-white py-2">
                    {data.name ? data.name : "Untitled"}
                  </p>
                </p>
              </div>{" "}
              <div className=" text-[#868686] text-sm  mt-2 ">
                <div className="white-glassmorphism py-5">
                  {checksumAddress !== data.seller ? (
                    <div>
                      <div className="check mt-3 gap-x-2.5"></div>
                      <div className="flex justify-around items-center">
                        <button
                          className="activeButton text-white outline-none  font-bold py-2 px-10 my-5 rounded text-sm"
                          onClick={() => buyNFT(tokenId)}
                        >
                          BUY
                        </button>
                        {/* <div className="text-1xl lg:text-3xl mx-2 text-white">
                             {data.price}&nbsp;ETH
                           </div> */}
                        <input
                          className=" rounded outline-none text-white text-md border-none white-glassmorphism shadow-2xl px-2 text-center h-11 w-[120px] "
                          type="number"
                          placeholder="Price (ETH)"
                          step="0.001"
                          min="0.00"
                          // value={formParams.price}
                          // onChange={(e) =>
                          //   updateFormParams({
                          //     ...formParams,
                          //     price: e.target.value,
                          //   })
                          // }
                        ></input>
                        {/* <button
                             className="outline-none bg-[#F60C4B] hover:bg-[#F60C6d] border-[#F60C4B] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                             onClick={() => buyNFT(tokenId)}
                           >
                             SELL
                           </button> */}
                      </div>
                      <div className="text-white text-center font-light text-sm ">
                        Enter your buy price
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="check mt-3 gap-x-2.5"></div>
                      <div className="flex justify-around items-center">
                        {/* <button
                          className="disabledButton bg-transparent outline-none hover:bg-transparent  font-bold py-2 px-10 my-5 rounded text-sm"
                          onClick={() => buyNFT(tokenId)}
                        >
                          BUY
                        </button> */}
                        {/* <div className="text-1xl lg:text-3xl mx-2 text-white">
                          {data.price}&nbsp;ETH
                        </div> */}
                        <input
                          className=" rounded outline-none text-white text-md text-center border-none white-glassmorphism shadow-2xl px-2  h-11 w-[120px] "
                          type="number"
                          placeholder="Price (ETH)"
                          step="0.001"
                          min="0.00"
                          value={formParams.price}
                          onChange={(e) =>
                            updateFormParams({
                              ...formParams,
                              price: e.target.value,
                            })
                          }
                        ></input>
                        <button
                          className="outline-none bg-[#F60C4B] hover:bg-[#F60C6d] border-[#F60C4B] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                          onClick={() => listNFT(tokenId)}
                        >
                          SELL
                        </button>
                      </div>
                      <div className="text-white text-center font-light text-sm ">
                        Enter your sell price
                      </div>
                    </div>
                  )}

                  <div className="text-orange text-center mt-3">{message}</div>
                </div>
                <p className="flex text-[#868686] text-sm pt-5">
                  METADATA&nbsp;&nbsp;
                  <div className="group cursor-pointer relative mb-3">
                    <span className="absolute bottom-8 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Metadata
                    </span>
                    <a
                      href={data.metadataURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <BiLinkExternal fontSize={20} className="" />
                    </a>
                  </div>
                </p>
                <div className=" grid grid-cols-2 xl:grid-cols-4 w-full text-[#868686] text-lg gap-3  md:py-2 h-fit   ">
                  {/* <p className="white-glassmorphism px-5 pt-3 w-full">
                    STATUS
                    <br />
                    <p className="text-lg text-white text-center py-2 ">
                      {data.listing ? data.listing : "Listed"}
                    </p>
                  </p> */}

                  <div className="bg-[darkgrey] bg-opacity-[0.1] text-white rounded-lg p-3 w-full">
                    <p className="text-xs text-[#868686]">STATUS&nbsp;</p>
                    {data.listing ? data.listing : "Listed"}
                  </div>
                  <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 w-full  text-white">
                    <p className="text-xs text-[#868686]">ROYALTY&nbsp;</p>
                    {data.royalty ? data.royalty : "No Royalty"}
                  </div>
                  <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 w-full text-white">
                    <p className="text-xs text-[#868686]">CODE&nbsp;</p>
                    {data.code ? data.code : "No Code"}
                  </div>
                  <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 w-full text-white">
                    <p className="text-xs text-[#868686]">VERIFIED&nbsp;</p>
                    {data.seal ? data.seal : "None"}
                  </div>

                  {/* <div className="bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 px-5 pt-3 w-full mx-3">
                    ROYALTY
                    <br />
                    <p className="text-lg text-white text-center py-2">
                      {data.royalty ? data.royalty : "No Royalty"}
                    </p>
                  </div>
                  <p className="white-glassmorphism px-5 pt-3 w-full">
                    VERIFIED
                    <br />
                    <p className="text-lg text-white text-center py-2">
                      {data.seal ? data.seal : "None"}
                    </p>
                  </p> */}
                  {/* <p>
                 SPECIAL CODE
                  <br />
                  <p className="text-lg text-white py-2">{ data.code ? data.code : "None"}</p>
                </p> */}
                </div>
                <br />
                CONTRACT
                <div className="flex text-white justify-between items-end py-2 ">
                  <p className="text-sm">
                    Contract
                    <a className="">
                      &nbsp; &nbsp;&nbsp;
                      {data.owner && shortenAddress(data.owner)}
                    </a>
                  </p>

                  <p className="text-sm text-right ">
                    Seller{" "}
                    <a>
                      &nbsp;&nbsp;{data.seller && shortenAddress(data.seller)}
                      &nbsp;
                    </a>
                    <br />
                    {/* <span>{checksum && shortenAddress(checksum)}</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TETabsPane>
      </TETabsContent>
    </div>
  );
};

export default NFTPage;
