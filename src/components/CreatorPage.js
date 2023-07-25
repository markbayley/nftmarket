import React, { useContext } from "react";
import { useParams } from "react-router";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import { shortenAddress } from "../utils/shortenAddress";
import profileImg from "../images/profile.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CreatorPage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: false,
  };

  const { filteredResults, currentAccount, profileParams, id, token } =
    useContext(TransactionContext);

  const params = useParams();
  const creatorAddress = params.creatorAddress;

  console.log("creatorAddress", creatorAddress, token);

  return (
    <div className="mx-2 lg:mx-[15%]">


  
           
  <div className="flex  justify-start items-center py-3">
        <div className="flex mf:flex-row flex-col items-center justify-between ">
          <div className="flex-1 flex flex-col justify-start items-center py-2 ">
            <div className="flex flex-wrap w-full">
              <div className="flex w-full items-center lg:w-1/2 pl-4 pt-2 md:pt-0">
                <h1 className="text-3xl text-gradient capitalize">
                  Seller&nbsp;Profile
                </h1>
                &nbsp;&nbsp;
                <button
                  id="colour"
                  // value={collection}
                  className="flex items-center text-sm text-white border px-3 h-8 rounded-full white-glassmorphism"
                >
                  #{creatorAddress && shortenAddress(creatorAddress)}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div> 


      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">

      <div className="flex flex-col md:flex-row justify-start items-start white-glassmorphism p-3 h-auto cursor-pointer hover:shadow-xl ">
                  <button
                    id="seller"
                    className="flex items-end rounded-full bg-cover bg-center border-transparent h-16 w-16 md:h-32 md:w-32 hover:scale-[1.02] "
                    style={{
                      backgroundImage: `url(${
                        profileParams.profileUrl || profileImg
                      })`,
                    }}
                  >
                    <div className="bg-yellow-600 py-1 px-2 rounded-full text-white text-sm hidden md:inline-block">
                      {shortenAddress(creatorAddress) || "0x..."}
                    </div>
                  </button>{" "}
                  <div className="md:ml-5 flex flex-col flex-1">
                    <h3 className=" text-white text-lg">
                      {profileParams.user || "User"},{" "}
                      <em>{profileParams.country || "Country"}</em>
                    </h3>

                    <p className="mt-3 text-white text-md ">
                      {profileParams.bio} A brief bio describing your interests
                      and creative influences as well as how you became
                      interested in blockchain and NFTs.
                    </p>
                    <p className="mt-3 text-white text-md ">
                      The NFTs below were created by{" "}
                      {profileParams.user || "User"} and are currently listed
                      for sale by Inblock.
                    </p>
                    <div className="flex w-full justify-between pt-2">
                      <h3 className=" text-white text-md py-3">
                        {profileParams.website || "Website URL"}
                      </h3>
                      <a href="" className="mt-3  text-sm pr-4">
                        {shortenAddress(creatorAddress) || "0x..."}
                      </a>
                    </div>
                  </div>
                </div>



                <div class="w-full ">
           
                <Slider {...settings}>
              {filteredResults
                .slice()
                .reverse()
                .map((data) => (
              <NFTTile data={data} key={data.id} />
                ))}
            </Slider>

           
              </div>



        </div>







   
  
    </div>
  );
};

export default CreatorPage;
