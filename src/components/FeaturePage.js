import React, { useContext } from "react";
import { useParams } from "react-router";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import { shortenAddress } from "../utils/shortenAddress";
import profileImg from "../images/profile.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import SubMenu from "./SubMenu";

const FeaturePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: false,
  };

  const {
    filteredResults,
    currentAccount,
    profileParams,
    id,
    token,
    marketData,
    handleTab,
    tab
  } = useContext(TransactionContext);

  const params = useParams();
  const creatorAddress = params.creatorAddress;

  //   console.log("creatorAddress", creatorAddress, token);
  const creatorNFTs = marketData.filter(
    (item) => item[id] && shortenAddress(item[id]) === creatorAddress
  );

  // console.log(filteredResults, marketData);
const backLink = creatorNFTs.length.toString()
console.log("backLink", backLink)
  return (
    <div className="mx-2 lg:mx-[15%] pb-10">
      {/* <div className="flex  justify-start items-center ">
        <div className="flex mf:flex-row flex-col items-center justify-between ">
          <div className="flex-1 flex flex-col justify-start items-center py-2 ">
            <div className="flex flex-wrap w-full">
              <div className="w-full items-center pl-2 pt-2 md:pt-0">
                <h1 className="text-3xl md:text-5xl text-white capitalize  ">
                  Featured&nbsp;Profile
                </h1>
                <h2 className="text-left mb-3 text-gradient text-lg ">
           
         Each week we feature a talented AI artist
         </h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        <SubMenu
        title="Profile"
        subtitle="Featuring our talented AI artists"
        tab1="Profile"
        tab2="Back"
        // tab3="Market"
        handleTab={handleTab}
        tab={tab}
        backLink={backLink}
        // data={data}
      />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
        <div className="flex flex-col  justify-start items-start white-glassmorphism p-5 h-auto cursor-pointer hover:shadow-xl mb-4 md:mb-0">

       <div className="relative w-full"><BsShieldFillCheck fontSize={28} className="text-blue-700 absolute right-0" />
       <BiSearchAlt fontSize={32} className="text-yellow-700 absolute right-10" />
       <RiHeart2Fill fontSize={32} className="text-red-700 absolute right-20" />
       </div> 
          <a
            id={id}
            className="flex items-end rounded-full bg-cover bg-center  h-16 w-16 md:h-32 md:w-32  border-2 bg-transparent"
            style={{
              backgroundImage: `url("https://robohash.org/${creatorAddress}.png?set=set3")`,
            }}
          >
            <div className={ id === "seller" ? "bg-red-500 py-1 px-3 rounded-full text-white text-sm hidden md:inline-block capitalize" : "bg-amber-500 py-1 px-3 rounded-full text-white text-sm hidden md:inline-block capitalize" }>
               {/* { creatorAddress && creatorAddress.length > 20  ?  shortenAddress(creatorAddress) : "0x123...aBcD" }  */}
            {id || "Profile"}
            </div>
          </a>{" "}

         
          <div className=" flex flex-col flex-1">
            <h3 className=" text-white text-lg">
              {profileParams.user || "User"},{" "}
              <em>{profileParams.country || "Country"}</em>
              
            </h3>

            <p className="mt-3 text-white text-md ">
              {profileParams.bio} A brief bio describing your interests and
              creative influences as well as how you became interested in
              blockchain and NFTs.
            </p>
            <p className="mt-3 text-white text-md ">
              The NFTs below were created by {profileParams.user || "User"} and
              are currently listed for sale by Inblock.
            </p>

            <p className="mt-3 text-white text-md ">
              {" "}
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.{" "}
            </p>
            <div className="flex w-full justify-between pt-2">
              <h3 className=" text-white text-md py-3">
                {profileParams.website || "Website URL"}
              </h3>
              <a href="" className="mt-3  text-md pr-4">
                {creatorAddress && creatorAddress.length > 20
                  ? shortenAddress(creatorAddress)
                  : "0x123...aBcD"}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <Slider {...settings}>
            {creatorNFTs
              .slice(creatorNFTs.length - 7)
              .reverse()
              .map((data) => (
                <NFTTile data={data} key={data.tokenId} />
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
