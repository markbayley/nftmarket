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

const FeaturedArtist = () => (
  <div className="flex w-full justify-center items-center fade-in ">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 ">





      <div className="flex-1 flex flex-col justify-start items-start w-half">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
         Featured Artist
          {/* <br />
          continue to improve */}
        </h1>
        <p className="text-left my-2 text-white font-light  text-base">
          Each week we feature one of our top creators.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Install MetaMask"
          icon={<BsShieldFillCheck fontSize={21} className="text-white w-half" />}
          subtitle="Metamask is an Ethereum based wallet. Is a decentralized account to make payments on the blockchain."
        />
    
      
      </div>
    </div>
  </div>
);

export default FeaturedArtist;