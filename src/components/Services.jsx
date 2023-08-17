import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-5 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 mt-2 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className=" text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm pr-3">{subtitle}</p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center fade-in ">
    <div className="flex mf:flex-row flex-col items-center justify-between md:px-[25%] py-12 px-1 ">
      <div className="flex-1 flex flex-col justify-start items-start w-half pl-2">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Getting Started is Easy
        </h1>
        <h2 className="text-left mb-3 text-gradient text-xl ">
          Create and trade your digital assets and NFTs with us
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Install MetaMask"
          icon={
            <BsShieldFillCheck fontSize={21} className="text-white w-half" />
          }
          subtitle="Metamask is an Ethereum based digital wallet. It can be used like a decentralized bank account to mint, store and transfer digital assets like cryptocurrencies and NFTs on the blockchain."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Create or Upload Images"
          icon={<RiHeart2Fill fontSize={21} className="text-white w-half" />}
          subtitle="Our A.I. technology makes creating NFTs easy. With just a few decriptive keywords you can start generating artworks for free, or you can upload your existing creations to our exchange."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Fund Your Wallet To Mint"
          icon={<BiSearchAlt fontSize={21} className="text-white w-half" />}
          subtitle="When you are ready to list your art for sale or purchase an existing NFT, connect your MetaMask wallet. Ethereum can be purchased through Coinbase or other exchange providers.  "
        />
      </div>
    </div>
  </div>
);

export default Services;
