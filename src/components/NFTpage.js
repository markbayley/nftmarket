import { Link, useParams } from "react-router-dom";
import MarketplaceJSON from "../abis/Marketplace.json";
import axios from "axios";
import { useContext, useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";
import { BsInfoCircle } from "react-icons/bs";
import { BiCurrentLocation, BiLinkExternal } from "react-icons/bi";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import Loader from "./Loader";
import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlinePercent,
  MdQrCode2,
} from "react-icons/md";
import {
  GiAbstract013,
  GiAbstract039,
  GiAbstract066,
  GiAbstract069,
  GiAbstract083,
  GiAbstract103,
  GiAerialSignal,
  GiBrain,
  GiChaingun,
  GiCloudRing,
  GiCrackedSaber,
  GiCrystalEye,
  GiCrystalWand,
  GiCurlyWing,
  GiDwennimmen,
  GiFigurehead,
  GiFist,
  GiFleshyMass,
  GiHeartPlus,
  GiLaserGun,
  GiMazeCornea,
  GiSewedShell,
  GiStoneAxe,
} from "react-icons/gi";
import SubMenu from "./SubMenu";
import NFTTile from "./NFTTile";
import { SiEthereum } from "react-icons/si";
import { MdSell } from "react-icons/md";
import Slider from "react-slick";

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
    formParams,
    updateFormParams,
    favorites,
    marketData,
    id,
    collection,
    progress,
    setProgress
  } = useContext(TransactionContext);

  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");

  console.log(formParams.price);

  async function getNFTToken(tokenId) {
    try {
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

        creator: meta.creator,
      };

      console.log(item);
      updateData(item);
      updateDataFetched(true);
      setProgress('Viewed');
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
      setProgress('Traded');
      // updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const [price, setPrice] = useState('"');
  console.log("price", price)

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
 console.log("updateListPrice", transaction)
      updateMessage("Success! Check your wallet");
      // updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;

  console.log("MDtokenId", marketData[tokenId]);

  if (!dataFetched) getNFTToken(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  const link = `https://sepolia.etherscan.io/address/${data.owner}`;

  const tokenid = parseInt(tokenId) - 1;
  console.log("tid", tokenid, tokenId);

  console.log("data", data);
  console.log("marketData", marketData);

  const [loaded, setLoaded] = useState(false);

  const collectionNFTs = marketData.filter(
    (item) => item.collection === data.collection
  );

  console.log("collectionNFTS", collection, collectionNFTs);

  return (
    <div className=" mx-2 lg:px-[5%] fade-in">
      {/* <div className="flex flex-row items-center flex-wrap ">
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
      </div> */}

      <SubMenu
        title="View NFT"
        subtitle="Discover more or trade this NFT"
        tab0={<MdOutlineKeyboardDoubleArrowLeft fontSize={20} />}
        tab1="View"
        tab2="Trade"
        //tab3={<MdOutlineKeyboardDoubleArrowRight fontSize={20} />}
        handleTab={handleTab}
        tab={tab}
        setTab={setTab}
        data={data}
        tokenId={tokenId}
        progress={progress}
      />

      <TETabsContent>
        <TETabsPane show={tab === "tab1"}>
          <div className="flex flex-wrap w-full justify-center flex-col md:flex-row white-glassmorphism  ">
            <div className="text-lg w-full md:w-1/2 xl:w-2/5 aspect-square   rounded-lg  ">
              <div className="rounded-xl   p-2 md:py-6 md:pl-6 h-fit mb-2">
              {/* <img
                  src={ data.image || marketData[tokenid].image ||     
                     <div className="w-full h-full aspect-square rounded-lg seal ">
                  <label className="flex  items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center ">
                      <Loader />
                      <p className="text-sm text-white ">
                        LOADING NFT DATA...
                      </p>
                    </div>
                  </label>
                </div>}
                    alt="Detailed image"
                    className="rounded-lg"
                 
                  /> */}

                {/* {marketData ? (
                  // <img
                  //   src={marketData[tokenid].image}
                  //   alt="Detailed image"
                  //   className="rounded-lg"
                  // />
                  // <NFTTile data={marketData[tokenid]} key={tokenId}></NFTTile>
                  // <Link to={{ pathname: `/Trade/Detail/` + data.data.tokenId }} className="z-0">
                  <img
                    src={marketData[tokenid].image} 
                    alt="thumbnail"
                    className="rounded-lg"
                  />
                // </Link>
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
                )} */}

                {loaded ? null : (
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
                  src={ data.image}
                  onLoad={() => setLoaded(true)}
                  alt="thumbnail"
                  className="rounded-lg "
                />
               
              </div>
            </div>

            <div className="text-lg w-full md:w-1/2 xl:w-3/5 px-2 md:p-5 rounded-lg ">
              <div className="  flex justify-between items-start flex-nowrap  text-white  h-fit pb-3">
                <div className="">
                  <p className=" text-2xl md:text-3x1  drop-shadow-x2 leading-tight font-thin group relative">
                    <strong>
                      { data?.collection || "Token"}{" "}
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
                      #{ data?.tokenId}
                      {/* #{marketData[tokenid].tokenId} */}
                    </a>
                  </p>

                  <span className=" text-2xl font-extralight text-gradient py-2 italic leading-tight">
                    '{ data?.name || "Untitled"}'
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
                  {/* <MdFavorite fontSize={24} className="text-[#ff3366]" /> */}
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit mb-2 "></div>{" "}
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
                    className="flex items-end rounded-full bg-cover bg-center  border-2 h-16 w-16 md:h-24 md:w-24 hover:scale-[1.02] shadow-xl shadow-indigo-500/30 duration-300 hover:shadow-indigo-500/50 border-indigo-500"
                    style={{
                      backgroundImage: `url( "https://robohash.org/${
                        data.creator
                          ? shortenAddress(data.creator)
                          : "0x123...aBcD"
                      }.png?set=set3" `,
                    }}
                  >
                    <div className="bg-amber-500  px-2 py-1 rounded-full text-white text-xs hidden md:inline-block">
                      {/* {data.creator ? shortenAddress(data.creator)  : "0x123...aBcD"} */}
                      Creator
                    </div>
                  </div>{" "}
                </Link>
              </div>

              <div className=" w-full text-[#868686] text-sm  h-fit ">
                DESCRIPTION{" "}
                <div className=" text-lg  pt-3 text-white">
                  { data?.description}
                  {/* Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. */}
                </div>
              </div>
              <div className="  text-white rounded-lg py-5 ">
                <div className="">
                  <div className="flex text-[#868686] text-sm ">
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
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3  gap-3 pt-5 text-sm text-white">
                    {/* Trait 1 */}
                    <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait1 ? data.trait1 : "Trait 1"} &nbsp;
                        </p>
                        {data.value1 ? data.value1 : "Value 1"}
                      </div>
                      {/* <div
                    id="creator"
                    token={tokenId}
                    value={data.creator}
                    onClick={(id, token) => handleCollection(id, token)}
                    className="flex items-end rounded-md bg-cover bg-center bg-indigo-500 h-10 w-10  shadow-xl shadow-indigo-500/30 duration-300 hover:shadow-indigo-500/50 "
                    style={{backgroundImage: `url( "https://source.unsplash.com/random?symbol+${data.value1}" `}}>
                  </div>{" "} */}
                      {data?.value1?.includes("e") ? (
                        <GiFigurehead
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value1?.includes("t") ? (
                        <GiMazeCornea
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiCurlyWing
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}

                      {/* <GiAerialSignal fontSize="2.4em" color="#ff3366" className="drop-shadow"/> */}
                    </div>
                    {/* Trait 2 */}
                    <div className="flex justify-between  bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait2 ? data.trait2 : "Trait 2"} &nbsp;
                        </p>
                        {data.value2 ? data.value2 : "Value 2"}
                      </div>
                      {data.trait2 === "Location" ||
                      "Zone" ||
                      "District" ||
                      "Place" ||
                      "Country" ||
                      "City" ||
                      "Venue" ||
                      "Street" ||
                      "Season" ? (
                        <GiAbstract103
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value2?.includes("a") ? (
                        <GiCrystalWand
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value2?.includes("s") ? (
                        <GiSewedShell
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiAbstract066
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}
                    </div>
                    {/* Trait 3 */}
                    <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait3 ? data.trait3 : "Trait 3"} &nbsp;
                        </p>
                        {data.value3 ? data.value3 : "Value 3"}
                      </div>
                      {data?.value3?.includes("e") ? (
                        <GiCloudRing
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value3?.includes("t") ? (
                        <GiLaserGun
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiChaingun
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}
                    </div>

                    {/* Trait 4 */}
                    <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait4 ? data.trait4 : "Trait 4"} &nbsp;
                        </p>

                        {data.value4 ? data.value4 : "Value 4"}
                      </div>
                      {data.trait4 === "Strength" ? (
                        <GiFist
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value4?.includes("t") ? (
                        <GiFleshyMass
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value4?.includes("o") ? (
                        <GiChaingun
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiAbstract039
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}
                    </div>
                    {/* Trait 5 */}
                    <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait5 ? data.trait5 : "Trait 5"} &nbsp;
                        </p>

                        {data.value5 ? data.value5 : "Value 5"}
                      </div>
                      {data.trait5 === "Health" ? (
                        <GiHeartPlus
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value5?.includes("e") ? (
                        <GiAbstract083
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value5?.includes("r") ? (
                        <GiAbstract013
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiCrackedSaber
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}
                    </div>
                    {/* Trait 6 */}
                    <div className="flex justify-between bg-[darkgrey] bg-opacity-[0.1] rounded-lg p-3 ">
                      <div>
                        <p className="text-xs text-[#868686] uppercase">
                          {data.trait6 ? data.trait6 : "Trait 6"} &nbsp;
                        </p>

                        {data.value6 ? data.value6 : "Value 6"}
                      </div>

                      {data.trait6 === "Intelligence" ? (
                        <GiBrain
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value6?.includes("p") ? (
                        <GiDwennimmen
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : data?.value6?.includes("s") ? (
                        <GiCrystalEye
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      ) : (
                        <GiAbstract069
                          fontSize="2.4em"
                          color="orange"
                          className="drop-shadow"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap mt-2">
                <div className="text-[#868686] text-sm mt-3 w-96 md:w-11 ">
                  {" "}
                  TAGS
                </div>
                <div className=" flex items-center text-[#868686] text-sm h-fit ">
                  <div className="flex flex-wrap ">
                    <Link to={{ pathname: `/Explore/${data.style}` }}>
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
                    <Link to={{ pathname: `/Explore/${data.medium}` }}>
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
                    <Link to={{ pathname: `/Explore/${data.texture}` }}>
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
                    <Link to={{ pathname: `/Explore/${data.artist}` }}>
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
                    <Link to={{ pathname: `/Explore/${data.colour}` }}>
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
                    <Link to={{ pathname: `/Explore/${data.theme}` }}>
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
              <div className="rounded-xl p-2 md:py-6 md:pl-6 h-fit mb-2">
                {data.image ? (
                  <img
                  src={marketData[tokenid]?.image || data?.image}
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
                    className="flex items-end rounded-full bg-cover bg-center  border-2 h-16 w-16 md:h-24 md:w-24 hover:scale-[1.02] shadow-xl shadow-indigo-500/30 duration-300 hover:shadow-indigo-500/50 border-indigo-500"
                    style={{
                      backgroundImage: `url( "https://robohash.org/${data.seller}.png?set=set3"  `,
                    }}
                  >
                    <div className="bg-red-500  px-2 py-1 rounded-full text-white text-xs hidden md:inline-block">
                      {/* { data.seller && shortenAddress(data.seller)} */}
                      Seller
                    </div>
                  </div>{" "}
                </Link>
              </div>

              <div className=" w-full text-[#868686] text-sm  h-fit ">
                TRADE{" "}
                <div className=" text-lg  pt-3 text-white">
                  Make an offer on this NFT above {data.price} ETH.
                </div>
              </div>

              <div className=" text-[#868686] text-sm  mt-2 ">
                <div className="white-glassmorphism ">
                  {checksumAddress !== data.seller ? (
                    <div>
                      <div className="check mt-3 gap-x-2.5"></div>
                      <div className="flex justify-around items-center">
                        <button
                          className="activeButton text-white outline-none  font-semibold py-2 px-10 my-5 rounded text-[15px]"
                          onClick={() => buyNFT(tokenId)}
                        >
                          BUY
                        </button>
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
                      <div className="flex justify-around items-center">
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
                          className="outline-none bg-[#F60C4B] hover:bg-[#F60C6d] border-[#F60C4B] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                          onClick={() => listNFT(tokenId)}
                        >
                          SELL
                        </button>
                      </div>
                      <div className="text-white text-center  text-lg ">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* <Slider {...settings}> */}
        {collectionNFTs
          // .slice(collectionNFTs.length - 8)
          .reverse()
          .map((data) => (
            <NFTTile data={data} key={data.tokenId} />
          ))}
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default NFTPage;
