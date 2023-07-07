import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftCards from "../images/cards.png";
import Loader from "./Loader";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import Profile from "../misc/Profile";
import NFTTile from "./NFTTile";
import Gradient from "./Gradient";

// const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
//bg-[#273057]
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="m-3 p-3 w-full rounded-sm outline-none  text-white border-none shadow-2xl white-glassmorphism"
  />
);

const Wallet = () => {
  const {
    currentAccount,
    walletBalance,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    transactions,
    dummyData,
    getNFTData,
    walletData,
    tokenId,
    walletAddress,
    setCurrentAccount,
    updateWalletBalance,
    ethereum,
 
  } = useContext(TransactionContext);



  const handleAccountChange = async (...args) => {
    // you can console to see the args
    const accounts = args[0] ;
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    const amount = await provider.getBalance(addr);
    const bal = parseInt(amount._hex) / 10 ** 18;
console.log('bal', bal)
    // if no accounts that means we are not connected
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask");

    } else if (accounts[0] !== currentAccount) {
      getNFTData();
      setCurrentAccount(accounts[0]);
      updateWalletBalance(bal);
    }
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  const [basicActive, setBasicActive] = useState("tab1");
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };


  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  },[walletBalance]);


  console.log(walletBalance)
  console.log(walletData)

  return (
    <div className="flex w-full justify-center items-center fade-in ">
      <div className="items-start w-2/3 flex-col justify-between  my-5 ">

        <div className="flex items-center mb-5  justify-center w-full ">

          <div className="flex flex-col md:w-1/2 w-full justify-center md:justify-end ">
            <h1 className="text-4xl sm:text-5xl text-white text-gradient py-1">
              My Wallet
            </h1>
            <p className="text-left mb-3 text-white font-light text-base text-3xl sm:text-1xl">
              {/* Explore the crypto world. <br /> */}
              Fund your wallet to mint and trade NFTs.
            </p>
          </div>

          <div className="flex flex-row md:w-1/2 w-full justify-center md:justify-end ">
            <TETabs className="lg:pr-4">
              <TETabsItem
                className="hover:bg-transparent"
                onClick={() => handleBasicClick("tab1")}
                active={basicActive === "tab1"}
              >
                Wallet
              </TETabsItem>
              <TETabsItem
                className="hover:bg-transparent  px-1 md:px-7"
                onClick={() => handleBasicClick("tab2")}
                active={basicActive === "tab2"}
              >
                View NFTs
              </TETabsItem>
            </TETabs>
          </div>
        </div>

        <TETabsContent>
          <TETabsPane show={basicActive === "tab1"}>
            <div className="flex flex-wrap justify-start items-start flex-row w-full">
              <div className="p-6 md:mr-3 sm:w-96 mf:mr-3 w-full flex flex-col justify-center items-center white-glassmorphism ">
                <Input
                  placeholder="Address To"
                  name="addressTo"
                  type="text"
                  handleChange={handleChange}
                />
                <Input
                  placeholder="Amount (ETH)"
                  name="amount"
                  type="number"
                  handleChange={handleChange}
                />
                <Input
                  placeholder="Keyword (Gif)"
                  name="keyword"
                  type="text"
                  handleChange={handleChange}
                />
                <Input
                  placeholder="Enter Message"
                  name="message"
                  type="text"
                  handleChange={handleChange}
                />

                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#6c63ff] hover:bg-[#6c63ff] rounded cursor-pointer"
                  >
                    SEND 
                  </button>
                )}
              </div>
              <div className=" p-5 mt-3 sm:w-96 h-48 w-full lg:h-56 lg:mx-0 lg:mt-0 flex justify-end items-start flex-col rounded-xl seal  eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border border-white flex justify-center items-center eth-card seal  ">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className=" text-white font-light tshade ">
                      {shortenAddress(currentAccount)}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1 tshade">
                      {walletBalance &&
                        Math.round((walletBalance + Number.EPSILON) * 1000) /
                          1000 +
                          " "}{" "}
                      Ethereum
                    </p>
                  </div>
                </div>
              </div>
              {/* <Gradient /> */}
            </div>
          </TETabsPane>

          <TETabsPane show={basicActive === "tab2"}>
            <div className="flex justify-center flex-wrap max-w-screen-xl ">
              {[...walletData].reverse().map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
            </div>
            {/* <div className="mt-10 text-xl">
              {walletData && walletData.length == 0
                ? "Oops, No NFT data to display (Are you logged in?)"
                : ""}
            </div> */}
          </TETabsPane>
        </TETabsContent>

        <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 mt-10 ">
          <p className="text-center  text-white font-light text-base w-full">
           
          {!ethereum ? "Install MetaMask and connect wallet to send ethereum and view your NFTs" : currentAccount !== "0x" ? "":"Connect MetaMask wallet to send ethereum and view your NFTs" }
      
           {/* {currentAccount !== "0x" ? (currentAccount.substring(0,5)+'...'+(currentAccount.substring(38,42))):""} */}
      
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
