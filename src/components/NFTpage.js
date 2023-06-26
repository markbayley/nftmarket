import Navbar from "./Navbar";
import axie from "../tile.jpeg";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { shortenAddress } from "../utils/shortenAddress";

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  async function getNFTData(tokenId) {
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

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };

    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
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
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  return (
    <div style={{ minHeight: "100vh" }} className="gradient-bg-services">

      <div className="flex  pt-7 w-full justify-evenly flex-col md:flex-row ">
        <div className="md:w-3/5 m-5 p-2 white-glassmorphism">
          <img src={data.image} alt="" />
        </div>

        <div className="text-xl my-5 mx-1 h-5/5 md:w-3/5 space-y-8 text-white  rounded-lg blue-glassmorphism p-10 ">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            {data.name}
          </h1>
          <p className="text-left my-3 text-md text-white font-light ">
            {data.description}.
          </p>

          <div>
            Price: <span className="">{data.price + " ETH"}</span>
          </div>
          <div>
            NFT Contract:{" "}
            <span className="text-md">
              {data.owner && shortenAddress(data.owner)}
            </span>
          </div>
          <div>
            Seller:{" "}
            <span className="text-md">
              {data.seller && shortenAddress(data.seller)}
            </span>
          </div>
          <div>
            {currAddress != data.owner && currAddress != data.seller ? (
              <button
                className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                onClick={() => buyNFT(tokenId)}
              >
                Buy this NFT
              </button>
            ) : (
              <div className="text-yellow-400">You own this NFT</div>
            )}

            <div className="text-orange text-center mt-3">{message}</div>
          </div>
        </div>

        <div className="text-xl m-5 h-5/5 md:w-1/5 space-y-8 text-white shadow-2xl rounded-lg blue-glassmorphism p-10 "></div>
      </div>
    </div>
  );
}
