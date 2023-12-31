import React, { useContext, useState } from "react";
import nftImage1 from "../images/futuristic-city.jpg";
import nftImage2 from "../images/tokyo-haze.jpg";
import nftImage3 from "../images/kyoto-girl.jpg";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { SiEthereum } from "react-icons/si";
import Loader from "./Loader";

const Welcome = () => {
  const { marketData } = useContext(TransactionContext);

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="fade-in flex justify-center items-center">
      <div className="items-start flex-col justify-between md:p-10 p-4">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-6xl text-gradient py-1">
          Create & Trade NFTs
        </h1>
        <h2 className="text-left mb-3 text-gradient text-xl ">
          With Advanced AI Technology
        </h2>

        {/* HERO */}
        <div className="flex flex-wrap justify-start items-start flex-row cursor-pointer">
          {/* CARD LEFT */}
          <Link
            to={{ pathname: `/Create` }}
            className={!marketData.length ? "drift-left" : " "}
          >
            <div
              className="hidden xl:flex justify-center items-center w-full scale-[0.95] hover:scale-[0.98] duration-300 cursor-pointer p-5 md:-mr-5 sm:w-96  
           flex-col white-glassmorphism relative z-0  -rotate-3 -md:rotate-6 shadow-xl hover:shadow-indigo-500/20"
            >
              <div className="rounded-full border border-white flex justify-center items-center absolute w-[10%] aspect-square top-[6.5%] left-[7%]  eth-card  seal ">
                <SiEthereum color="#fff" />
              </div>

              {loaded ? null : (
                <div className="w-full h-full aspect-square rounded seal ">
                  <label className="flex  items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center ">
                      <Loader />
                      <p className="text-sm text-white ">LOADING...</p>
                    </div>
                  </label>
                </div>
              )}

              <img
                src={nftImage1}
                alt="Futuristic City NFT"
                style={loaded ? {} : { display: "none" }}
                onLoad={() => setLoaded(true)}
              />
              <div className="title">
                <strong>Future Drift</strong>&nbsp; <em>'Cypherdome Rain'</em>
              </div>
            </div>
          </Link>

          {/* CARD MIDDLE */}
          <Link
            to={{ pathname: `/Explore` }}
            className={!marketData.length ? "drift-center" : " "}
          >
            <div
              className="hidden md:flex justify-center items-center w-full flex-col scale-[0.95] hover:scale-[0.98] duration-300 backdrop-blur-[5px] p-5 cursor-pointer sm:w-96 white-glassmorphism  z-30
            rotate-3 md:rotate-6 shadow-xl hover:shadow-indigo-500/20"
            >
              <div className="w-10 h-10 rounded-full border border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
                <SiEthereum fontSize={21} color="#fff" />
              </div>

              {loaded ? null : (
                <div className="w-full h-full aspect-square rounded seal ">
                  <label className="flex  items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center ">
                      <Loader />
                      <p className="text-sm text-white ">LOADING...</p>
                    </div>
                  </label>
                </div>
              )}

              <img
                src={nftImage2}
                alt="Futuristic City NFT"
                style={loaded ? {} : { display: "none" }}
                onLoad={() => setLoaded(true)}
              />
              <div className="title">
                <strong>Tokyo Dreams </strong> &nbsp;<em>'Metropolis'</em>
              </div>
            </div>
          </Link>

          {/* CARD RIGHT */}
          <Link
            to={{ pathname: `/Wallet` }}
            className={!marketData.length ? "drift-left" : " "}
          >
            <div
              className=" scale-[0.95] hover:scale-[0.98] duration-300 backdrop-blur-[5px] p-5 sm:w-96 flex justify-center items-center w-full flex-col white-glassmorphism relative top-70 left-70 z-10 
         -rotate-3 shadow-xl hover:shadow-indigo-500/20"
            >
              <div className="w-10 h-10 rounded-full border border-white flex justify-center items-center absolute top-7 left-7  seal ">
                <SiEthereum fontSize={21} color="#fff" />
              </div>

              {loaded ? null : (
                <div className="w-full h-full aspect-square rounded seal ">
                  <label className="flex  items-center justify-center w-full h-full">
                    <div className="flex flex-col items-center justify-center ">
                      <Loader />
                      <p className="text-sm text-white ">LOADING...</p>
                    </div>
                  </label>
                </div>
              )}

              <img
                src={nftImage3}
                alt="Futuristic City NFT"
                style={loaded ? {} : { display: "none" }}
                onLoad={() => setLoaded(true)}
              />
              <div className="title">
                <strong>Afterlife </strong> &nbsp;
                <em>'Library'</em>
              </div>
            </div>
          </Link>
        </div>

        {/* BUTTON */}
      
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">
            <Link to={"/Create"}>
              <button className="rounded-md text-md py-5 px-12 flex items-center font-thin bg-transparent shadow-lg shadow-indigo-500/30 duration-300">
              {marketData.length ? "Get Started" : "Loading..." }
                {/* <MdOutlineKeyboardDoubleArrowRight
                  fontSize={20}
                  className="mt-[3px]"
                /> */}
              </button>
            </Link>
          </div>
       
      </div>
    </div>
  );
};

export default Welcome;
