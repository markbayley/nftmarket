import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center fade-in ">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 ">


    {/* <div className="p-5  sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism relative top-70 left-70 
          scale-[0.75]   translate-x-12 skew-y-12 -skew-x-6 -rotate-3 md:-rotate-45">
          <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
            <SiEthereum fontSize={21} color="#fff" />
          </div>
       
          <img src="https://magenta-realistic-haddock-479.mypinata.cloud/ipfs/QmSWWPGQVDGqVgyRDhuUfEyMthFbhTCCZRSmHfqV8nv8Jk" alt="Futuristic City NFT" />
          <div className="title">
            <strong>Tokyo Haze </strong> &nbsp;<em>'Metropolis Life'</em>
          </div>
        </div> */}



      <div className="flex-1 flex flex-col justify-start items-start w-half">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Getting Started is Easy
          {/* <br />
          continue to improve */}
        </h1>
        <p className="text-left my-2 text-white font-light md:w-11/12 w-11/12 text-base">
          The best choice for creating and trading your digital assets.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Install MetaMask"
          icon={<BsShieldFillCheck fontSize={21} className="text-white w-half" />}
          subtitle="Metamask is an Ethereum based wallet. Is a decentralized account to make payments on the blockchain."
        />
          <ServiceCard
          color="bg-[#F84550]"
          title="Create or Upload Images"
          icon={<RiHeart2Fill fontSize={21} className="text-white w-half" />}
          subtitle="Our A.I. technology makes creating NFTs easy, or you can upload your existing creations to our exchange."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Fund Your Wallet To Mint"
          icon={<BiSearchAlt fontSize={21} className="text-white w-half" />}
          subtitle="Purchase Ethereum and other cryptocurrencies through Coinbase, Binance, or other exchange providers."
        />
      
      </div>
    </div>
  </div>
);

export default Services;