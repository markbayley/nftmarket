import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useContext, useEffect } from "react";
import NFTTile from "./NFTTile";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
import Thumbnails from "./Thumbnails";
import { TransactionContext } from "../context/TransactionContext";

export default function Profile() {
  const {
    currentAccount,
    getNFTData,
    walletData,
    walletAddress,
    totalPrice,
    tokenId,
    thumbs,
    setThumbs,
    walletBalance,
    
  } = useContext(TransactionContext);

  

  useEffect(() => {
    getNFTData(tokenId);
  }, [walletAddress]);



  return (
<>
    <div className="  w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 flex items-start gradient-bg-services"
     >

    <aside class=" md:w-1/3 lg:w-1/4 p-10 " >
      
        
           <h1 className="text-5xl sm:text-5xl text-white text-gradient ">
            My wallet
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Check your Ethereum balance. <br />
            View your NFT collection.
          </p>
          <div className=" p-3 mt-3 sm:w-80 h-60 w-half lg:h-48 lg:mt-0 flex justify-end items-start flex-col rounded-xl eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
              <p className="text-white font-light text-sm">
                  {shortenAddress(walletAddress)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  {Math.round((walletBalance + Number.EPSILON) * 100) / 100 + " "}Ethereum
                </p>
              </div>
            </div>
          </div>
          <h3 className="text-3xl sm:text-3xl text-white text-gradient py-6">
          Transactions
          </h3>
        </aside>

        <main class=" md:w-2/3 lg:w-3/4 px-5 py-7">
        <h3 className="text-3xl sm:text-3xl text-white text-gradient py-3 text-center">
         Minted NFTs
          </h3>
        <Thumbnails
            thumbs={thumbs}
            setThumbs={setThumbs}
            currentAccount={currentAccount}
          />
      
        </main>
        {/* <aside class=" md:w-1/3 lg:w-2/4 px-5 py-40">
            <h1 class="text-2xl md:text-4xl">Sidebar</h1>
        
           <h1 className="text-3xl sm:text-3xl text-white text-gradient py-1">
            Upload your NFTs 
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. 
          </p>
        </aside> */}
    </div>

    <div
      className="profileClass gradient-bg-services"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-half items-start flex-col justify-between md:p-10  px-4 ">
        <div className="flex flex-col border-2">
        <h1 className="text-3xl sm:text-4xl text-white text-gradient py-1">
          Your wallet
        </h1>
        <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
   
          Buy and sell cryptocurrencies easily on Krypto.
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
                  {shortenAddress(walletAddress)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  {Math.round((walletBalance + Number.EPSILON) * 100) / 100 + " "}Ethereum
                </p>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div className="flex flex-col border-2">
          <Thumbnails
            thumbs={thumbs}
            setThumbs={setThumbs}
            currentAccount={currentAccount}
          />

          <div className="mb-5">
            <h2 className="font-bold">Wallet Address</h2>
            {walletAddress.substring(0, 5) +
              "..." +
              walletAddress.substring(38, 42)}
          </div>
          <div className="flex flex-row text-center justify-center mt-0 text-white">
            <h2 className="font-bold">
              No. of NFTs &nbsp; {walletData.length} &nbsp; &nbsp;
            </h2>

            <h2 className="font-bold">Total Value &nbsp; {totalPrice} ETH</h2>
          </div>
          <div className="ml-20"></div>
          {/* <div className="flex flex-row text-center justify-center mt-10 text-white"></div> */}
          <div className="flex flex-col text-center items-center mt-11 text-white">
            {/* <h2 className="font-bold">Your NFTs</h2> */}
            <div className="flex justify-center flex-wrap max-w-screen-xl">
              {walletData && walletData.map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
            </div>
            <div className="mt-10 text-xl">
              {walletData && walletData.length == 0
                ? "Oops, No NFT data to display (Are you logged in?)"
                : ""}
            </div>
          </div>
          </div>
      </div>
    </div>
    
</>
  );
}
