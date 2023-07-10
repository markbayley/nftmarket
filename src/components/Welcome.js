import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftCards from "../images/cards.png";

// const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="m-3 p-3 w-full rounded-sm outline-none bg-[#273057] text-white border-none shadow-2xl "
  />
);

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

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  // console.log("transactions", transactions[0].addressTo)
  // const sender = transactions[0].addressFrom;
  // const receiver = transactions[0].addressTo;
  // const amount = transactions[0].amount;
  // const text = transactions[0].message;

  return (
    <div className="flex w-full justify-center items-center fade-in">
      <div className="items-start flex-col justify-between md:p-10 p-4 ">
        <h1 className="text-3xl sm:text-6xl text-white text-gradient py-1">
          Create & Trade NFTs
        </h1>
        <h2 className="text-left mb-3 text-white font-light md:w-12/12 w-11/12 text-base text-3xl sm:text-2xl ">
          {/* Explore the crypto world. <br /> */}
          With Advanced AI Technology
        </h2>

        <div className="flex flex-wrap justify-start items-start flex-row ">


        





          <div className="p-5 md:-mr-5 sm:w-96  w-full flex flex-col justify-center items-center blue-glassmorphism relative z-0
          translate-y-6 -rotate-3 md:-rotate-6  -skew-x-1 ">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
            {/* <div className="absolute top-7 right-7 ">
            <BsInfoCircle fontSize={20} color="#fff" />
            </div> */}
        
            {/* <img src={nftCards} alt="Futuristic City NFT" className="absolute top-7 left-7" /> */}
            <img src={nftImage1} alt="Futuristic City NFT" className=""/>
            <div className="title">
            <strong>Future Drift</strong>&nbsp; <em>'Cypherdome Rain'</em>
            </div>

            </div>

            <div className="p-5  sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism relative top-70 left-70 z-30
              rotate-3 md:rotate-12">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
         
            <img src={nftImage2} alt="Futuristic City NFT" />
            <div className="title">
              <strong>Tokyo Haze </strong> &nbsp;<em>'Metropolis Life'</em>
            </div>
          </div>


          <div className="p-5  sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism relative top-70 left-70 z-10
            -translate-x-12 -translate-y-24 skew-y-6 skew-x-3 scale-[0.7] rotate-3 md:rotate-45">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
         
            <img src="https://magenta-realistic-haddock-479.mypinata.cloud/ipfs/QmSWWPGQVDGqVgyRDhuUfEyMthFbhTCCZRSmHfqV8nv8Jk" alt="Futuristic City NFT" />
            <div className="title">
              <strong>Kyoto Life </strong> &nbsp;<em>'Dreams of Aftrelife'</em>
            </div>
          </div>
            {/* <Input
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
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )} */}
       


          {/* //card div */}

          {/* <div className="py-1 sm:w-96 w-full flex flex-col justify-start items-center "> */}

          {/* <div className=" p-5 mt-3 sm:w-96 h-48 w-full lg:h-56 lg:mx-0 lg:mt-0 flex justify-end items-start flex-col rounded-xl eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                { walletBalance && Math.round((walletBalance + Number.EPSILON) * 1000) / 1000 + " " } Ethereum
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>  */}
        {/* <div className="h-[1px] w-full bg-gray-400 my-2" /> */}
        {/* {!currentAccount ? 
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            :
            <button
            type="button"
          
            className="flex flex-row justify-center items-center my-5 bg-[#FFA500] p-3 rounded-full cursor-pointer hover:bg-[#FFA500]"
          >
            <AiFillPlayCircle className="text-white mr-2" />
            <p className="text-white text-base font-semibold">
              Connected
            </p>
          </button> 
           }   */}

        {/* </div> */}

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <p className="text-center my-3 text-white font-light md:w-12/12 w-11/12 text-base">
            Learn about NFTs and how to get started below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
