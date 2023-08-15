import React, { useContext } from "react";
import { useParams } from "react-router";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import SubMenu from "./SubMenu";
import { shortenAddress } from "../utils/shortenAddress";
import Slider from "react-slick";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

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

  const { profileParams, id, marketData, handleTab, tab } =
    useContext(TransactionContext);

  const params = useParams();
  const creatorAddress = params.creatorAddress;

  const creatorNFTs = marketData
    .reverse()
    .filter(
      (item) =>
        (item[id] && shortenAddress(item[id]) === creatorAddress) ||
        "0x8d0...Ba2B"
    );

  const backLink = creatorNFTs.length.toString();

  return (
    <div className="mx-2 lg:mx-[15%] pb-20 ">
      <SubMenu
        title="Profile"
        subtitle="Featuring artists and collectors"
        //tab1="x"
        handleTab={handleTab}
        tab={tab}
        backLink={backLink}
        id={id}
        creatorAddress={creatorAddress}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
        <div className="flex flex-col  justify-start items-start white-glassmorphism p-5 h-auto cursor-pointer hover:shadow-xl mb-4 md:mb-0">
          <div className="relative w-full">
            <BsShieldFillCheck
              fontSize={28}
              className="text-blue-700 absolute right-0"
            />
            <BiSearchAlt
              fontSize={32}
              className="text-yellow-700 absolute right-10"
            />
            <RiHeart2Fill
              fontSize={32}
              className="text-red-700 absolute right-20"
            />
          </div>
          <a
            id={id}
            className="flex items-end rounded-full bg-cover bg-center  h-16 w-16 md:h-32 md:w-32  border-2 bg-transparent"
            style={{
              backgroundImage: `url("https://robohash.org/${creatorAddress}.png?set=set3")`,
            }}
          >
            <div
              className={
                id === "seller"
                  ? "bg-red-500 py-1 px-3 rounded-full text-white text-sm hidden md:inline-block capitalize"
                  : "bg-amber-500 py-1 px-3 rounded-full text-white text-sm hidden md:inline-block capitalize"
              }
            >
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
                {creatorAddress
                  ? shortenAddress(creatorAddress)
                  : "0x123...aBcD"}
              </a>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <Slider {...settings}>
            {creatorNFTs
              .reverse()
              .slice(creatorNFTs.length - 8)
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
