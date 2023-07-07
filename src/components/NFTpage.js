import Navbar from "./Navbar";
import axie from "../images/tile.jpeg";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../abis/Marketplace.json";
import axios from "axios";
import { useContext, useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";
import { BsInfoCircle } from "react-icons/bs";

export default function NFTPage(props) {
  const { marketData, provider } = useContext(TransactionContext);

  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  async function getNFTData(tokenId) {
    try {
      if (provider) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(
          MarketplaceJSON.address,
          MarketplaceJSON.abi,
          signer
        );
        //create an NFT Token
        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);
        console.log("meta", meta);
        console.log("tokenURI", tokenURI);

        let item = {
         
          tokenId: tokenId,
          seller: listedToken.seller,
          owner: listedToken.owner,
          
          image: meta.image,
          price: meta.price,
          trait1: meta.attributes && meta.attributes[2].trait_type,
          value1: meta.attributes && meta.attributes[2].value,

          trait2: meta.attributes && meta.attributes[3].trait_type,
          value2: meta.attributes && meta.attributes[3].value,

          trait3: meta.attributes && meta.attributes[4].trait_type,
          value3: meta.attributes && meta.attributes[4].value,

          trait4: meta.attributes && meta.attributes[5].trait_type,
          value4: meta.attributes && meta.attributes[5].value,

          trait5: meta.attributes && meta.attributes[6].trait_type,
          value5: meta.attributes && meta.attributes[6].value,

          trait6: meta.attributes && meta.attributes[7].trait_type,
          value6: meta.attributes && meta.attributes[7].value,
           
          code: meta.image.substring(100, 104),

          name: meta.name,
          description: meta.description,
          subtitle: meta.subtitle,
          category: meta.attributes && meta.attributes[0].value,
          subcategory: meta.attributes && meta.attributes[1].value,
          style: meta.style,
          medium: meta.medium,
          texture: meta.texture,
          artist: meta.artist,
          colour: meta.colour,
          metadataURL: tokenURI
        };

        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr);
        updateCurrAddress(addr);
      } else {
        console.log("Ethereum is not present NFT Page");
      }
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

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  console.log("Message", message);

  return (
    <div style={{ minHeight: "100vh" }} className="fade-in mx-1  lg:mx-36 ">
      {/* <h1 className="text-4xl sm:text-5xl text-white text-gradient ">
            Detailed View
          </h1> */}
      {/* <div className="flex items-center">
            <p className="text-left mt-3 text-white font-light md:w-9/12 w-11/12 text-base pl-5">
              Ready to buy this NFT?
            </p>
          </div> */}

      <div className="flex  pt-5 w-full justify-center flex-col md:flex-row  ">

      <div className="text-lg w-full lg:w-1/2  md:ml-5   rounded-lg  ">
        <div className="rounded-xl w-full  white-glassmorphism p-3 md:p-6 h-fit mb-2">
          {data ? (
            <img src={data.image} alt="detailed view" className="rounded-lg" />
          ) : (
            updateMessage(() => "Install Metamask")
          )}

          <div className="title text-md md:text-xl">
            <strong> {data.name}</strong> &nbsp;<em>'{data.subtitle}'</em>
            &nbsp; &nbsp;
            <div className="group cursor-pointer">
              <span className="absolute  bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
                {data.price}&nbsp;Eth
              </span>
             <a href={data.metadataURL} target="_blank" rel="noopener noreferrer"> <BsInfoCircle fontSize={18} color="#888888" className="mt-1" /></a>
            </div>
          </div>
        </div>

        <div className="rounded-xl w-full text-white white-glassmorphism p-2 md:p-5 h-fit mb-2">
        
        DESCRIPTION{" "}
          <div className="title text-md md:text-md">
            {data.description}
            &nbsp; &nbsp;
            <div className="group cursor-pointer">
         
          </div>
        </div>
        </div>
        </div>

        <div className="text-lg w-full  lg:w-1/2 md:ml-5   rounded-lg  ">
          <div className="  text-white rounded-lg white-glassmorphism mb-2">
            <div className="p-5 ">
              ATTRIBUTES{" "}
              <div class="grid grid-cols-2 text-xl gap-3 py-5">
                <div className="border rounded-lg p-3 ">
                  <p className="text-xs text-[#6c63ff]">CATEGORY &nbsp;</p>
                  {data.category}
                </div>
                <div className="border rounded-lg p-3 capitalize">
                  <p className="text-xs text-[#6c63ff]">SUBCATEGORY &nbsp;</p>
                  {data.subcategory}
                </div>
                <div className="border rounded-lg p-3">
                  <p className="text-xs text-[#6c63ff]">{data.trait1} &nbsp;</p>
                  {data.value1}
                </div>
                <div className="border rounded-lg p-3">
                <p className="text-xs text-[#6c63ff]">{data.trait2} &nbsp;</p>
                  {data.value2}
                </div>
                <div className="border rounded-lg p-3">
                <p className="text-xs text-[#6c63ff]">{data.trait3} &nbsp;</p>
                  {data.value3}
                </div>
                <div className="border rounded-lg p-3 drop-shadow-2xl">
                <p className="text-xs text-[#6c63ff]">{data.trait4} &nbsp;</p>
                  {data.value4}
                </div>
                <div className="border rounded-lg p-3 drop-shadow-2xl">
                <p className="text-xs text-[#6c63ff]">{data.trait5} &nbsp;</p>
                  {data.value5}
                </div>
                <div className="border rounded-lg p-3 drop-shadow-2xl">
                <p className="text-xs text-[#6c63ff]">{data.trait6} &nbsp;</p>
                  {data.value6}
                </div>
              </div>
            </div>
          </div>

          <div className="white-glassmorphism text-white p-5 ">
            MARKET
            {/* <p className="text-left my-3 text-md text-white font-light ">
          {data.hashLink}
          </p> */}
            <div>
              {currAddress != data.owner && currAddress != data.seller ? (
                <>
                  <button
                    className=" bg-transparent outline-none hover:bg-[#4c46b6] text-white font-bold py-2 px-5 my-5 rounded "
                    onClick={() => buyNFT(tokenId)}
                  >
                    BUY
                  </button>
                  <div className=" text-xl">
                    <span className="">{data.price + " ETH"}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <button
                      className="enableEthereumButton bg-transparent outline-none hover:bg-[#4c46b6] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                      onClick={() => buyNFT(tokenId)}
                    >
                      BUY
                    </button>
                    <div className="text-xl">{data.price}&nbsp;ETH</div>
                    <button
                      className=" bg-transparent outline-none hover:bg-[#F60C4B] border-[#F60C4B] text-white font-bold py-2 px-10 my-5 rounded text-sm"
                      onClick={() => buyNFT(tokenId)}
                    >
                      SELL
                    </button>
                  </div>
                  <div className="text-white font-light text-sm pt-3">
                    You already own this NFT
                  </div>
                </>
              )}

              <div className="text-orange text-center mt-3">{message}</div>
            </div>
            <br />
            CONTRACT
            <div className="flex justify-between items-end py-2 ">
              <div className="text-sm">
                NFT Contract:{" "}
                <span>{data.owner && shortenAddress(data.owner)}</span>
              </div>
              <p className="  text-sm  font-light ">
              Token Id #{data.tokenId}
            </p>
              <div className="text-sm">
                Seller:{" "}
                <span>{data.seller && shortenAddress(data.seller)}</span>
              </div>
            </div> 
          </div>
          <div className="rounded-xl w-full  white-glassmorphism p-3 md:p-6 h-fit my-2">
        

        <div className="title text-sm md:text-md text-white">
          {data.style}, {data.medium}, {data.texture}, {data.artist}, {data.colour}
          &nbsp; &nbsp;
          <div className="group cursor-pointer">
       
        </div>
      </div>
      </div>
        </div>
      </div>
    </div>
  );
}
