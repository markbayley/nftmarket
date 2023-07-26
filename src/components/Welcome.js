import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftImage3 from "../images/kyoto-girl.jpg";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

// const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
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
  } = useContext(TransactionContext);



  return (
    <div className="flex w-full justify-center items-center fade-in">
      <div className="items-start flex-col justify-between md:p-10 p-4 ">
        <h1 className="text-3xl sm:text-6xl text-gradient py-1">
          Create & Trade NFTs
        </h1>
        <h2 className="text-left mb-3 text-gradient text-lg ">
          With Advanced AI Technology
        </h2>

        <div className="flex flex-wrap justify-start items-start flex-row cursor-pointer ">
          <div className=" scale-[0.95] hover:scale-[0.98] duration-300 cursor-pointer p-5 md:-mr-5 sm:w-96  w-full flex flex-col justify-center items-center white-glassmorphism relative z-0  -rotate-3 -md:rotate-6 ">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
            {/* <div className="absolute top-7 right-7 ">
              <BsInfoCircle fontSize={20} color="#fff" />
            </div> */}

            <img src={nftImage1} alt="Futuristic City NFT" className="" />
            <div className="title">
              <strong>Future Drift</strong>&nbsp; <em>'Cypherdome Rain'</em>
            </div>
          </div>

          <div
            className="  scale-[0.95] hover:scale-[0.98] duration-300 backdrop-blur-[5px] p-5 cursor-pointer sm:w-96 w-full white-glassmorphism  z-30
            rotate-3 md:rotate-6 "
          >
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>

            <img src={nftImage2} alt="Futuristic City NFT" />
            <div className="title">
              <strong>Tokyo Haze </strong> &nbsp;<em>'Metropolis Life'</em>
            </div>
          </div>

          <div
            className=" scale-[0.95] hover:scale-[0.98] duration-300 backdrop-blur-[5px] p-5 sm:w-96 w-full flex flex-col justify-center items-center white-glassmorphism relative top-70 left-70 z-10 
         -rotate-3"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>

            <img src={nftImage3} alt="Futuristic City NFT" />
            <div className="title">
              <strong>Kyoto Life </strong> &nbsp;<em>'Dreams of Afterlife'</em>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">

          <Link to={'/Create'} >
          <button className="rounded-md text-md py-5 px-12 flex items-center font-thin bg-transparent shadow-lg shadow-indigo-500/30 duration-300">Get Started</button>
       </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
