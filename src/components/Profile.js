import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
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
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  console.log("dataProfilez: ", data, dataFetched);

  return (
    <div className="profileClass gradient-bg-services" style={{ minHeight: "100vh" }}>

<div className="w-half items-start flex-col justify-between md:p-10 py-6 px-4">
           <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            View your wallet
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. <br />Buy and sell cryptocurrencies easily on Krypto.
          </p>
      {/* <Navbar></Navbar> */}
      <div className="profileClass">

   

       

           <div className=" p-5 mt-3 sm:w-96 h-48 w-full lg:h-56 lg:mt-0 flex justify-end items-start flex-col rounded-xl eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(address)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>



          <div className="mb-5">
            <h2 className="font-bold">Wallet Address</h2>
            {(address.substring(0,5)+'...'+(address.substring(38,42)))}
          </div>
          <div className="flex flex-row text-center justify-center mt-0 text-white">
            <h2 className="font-bold">No. of NFTs   &nbsp;   {data.length} &nbsp; &nbsp;</h2>
         
            <h2 className="font-bold">Total Value   &nbsp; {totalPrice} ETH</h2>
          
          </div>
          <div className="ml-20">
           
        
        </div>
        {/* <div className="flex flex-row text-center justify-center mt-10 text-white"></div> */}
        <div className="flex flex-col text-center items-center mt-11 text-white">
          {/* <h2 className="font-bold">Your NFTs</h2> */}
          <div className="flex justify-center flex-wrap max-w-screen-xl">
            {data.map((value, index) => {
              return <NFTTile data={value} key={index}></NFTTile>;
            })}
          </div>
          <div className="mt-10 text-xl">
            {data.length == 0
              ? "Oops, No NFT data to display (Are you logged in?)"
              : ""}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
