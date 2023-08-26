import React, { useState } from "react";
import { traits1, traits2, traits3 } from "../data/traits.js";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { royalty, listing } from "../data/lists.js";
import { BsCheckSquare, BsCheckSquareFill, BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

const MintForm = ({
  isMinting,
  formParams,
  fileURL,
  handleSelect,
  updateFormParams,
  OnMintNFT,
  transactionHash,
  hashLink,
  viewLink
}) => {
  // console.log("hashlink", hashLink, transactionHash);
  const [showMore, setShowMore] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <form className="">
      <div className="max-w-2/3  ">
        <div>
          <div className="pb-3 text-[#868686] text-sm flex justify-between w-full">
            <div>
              ATTRIBUTES&nbsp;{" "}
              {!formParams.value1 ? (
                <span
                  onClick={(e) =>
                    updateFormParams({
                      ...formParams,
                      value1:
                        "Skill " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),

                      value2:
                        "Attack " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),
                      value3:
                        "Wealth " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),

                      value4:
                        "Charisma " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),
                      value5:
                        "Health " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),

                      value6:
                        "Defense " +
                        Math.floor(Math.random() * (100 - 0) + 0).toString(),
                    })
                  }
                  className="text-indigo-500 cursor-pointer hover:text-white"
                >
                  AUTO GENERATE
                </span>
              ) : (
                <span
                  onClick={(e) =>
                    updateFormParams({
                      ...formParams,
                      value1:
                        "",

                      value2:
                        "",
                      value3:
                        "",

                      value4:
                        "",
                      value5:
                        "",

                      value6:
                        "",
                    })
                  }
                  className="text-indigo-500 cursor-pointer hover:text-white"
                >
                  RESET
                </span>
              )}
            </div>

            <div className="group relative cursor-pointer mt-1">
            <BsInfoCircle fontSize={16} className="text-teal-500 hover:scale-[1.1] mr-1" />
              <span className="flex absolute w-60 bottom-0 right-7 scale-0 transition-all rounded bg-teal-600 p-2 text-xs text-white group-hover:scale-100">
                Adding several well chosen traits to your NFT helps to enhance
                its rarity and value.{" "}
              </span>
            </div>
          </div>

    
             {/* TRAIT VALUES */}
            <div className=" lg:pr-3">
              {/* First Row Traits */}
              <div className="check flex flex-wrap lg:flex-nowrap gap-2.5">
                <div className="flex  lg:flex-nowrap min-w-full lg:min-w-[50%] gap-x-2.5">
                  <select
                    id="trait1"
                    onChange={(id) => handleSelect(id)}
                    value={traits1.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits1.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 1 Value..."
                    id="value1"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value1: e.target.value,
                      })
                    }
                    value={formParams.value1}
                  ></input>
                </div>
                <div className="flex  lg:flex-nowrap  min-w-full lg:min-w-[50%] gap-x-2.5">
                  <select
                    id="trait1"
                    onChange={(id) => handleSelect(id)}
                    value={traits1.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits1.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>

                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 4 Value..."
                    id="value4"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value4: e.target.value,
                      })
                    }
                    value={formParams.value4}
                  ></input>
                </div>
              </div>

              {/* Second Row Traits */}
              <div className="check flex flex-wrap lg:flex-nowrap gap-2.5 mt-3">
                <div className="flex lg:flex-nowrap min-w-full lg:min-w-[50%] gap-x-2.5">
                  <select
                    id="trait2"
                    onChange={(id) => handleSelect(id)}
                    value={traits2.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits2.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 2 Value..."
                    id="value2"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value2: e.target.value,
                      })
                    }
                    value={formParams.value2}
                  ></input>
                </div>

                <div className="flex  lg:flex-nowrap  min-w-full lg:min-w-[50%] gap-x-2.5 ">
                  <select
                    id="trait2"
                    onChange={(id) => handleSelect(id)}
                    value={traits2.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits2.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>

                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 5 Value..."
                    id="value5"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value5: e.target.value,
                      })
                    }
                    value={formParams.value5}
                  ></input>
                </div>
              </div>

               {/* Third Row Traits */}
              <div className="check flex flex-wrap lg:flex-nowrap gap-2.5 mt-3">
                <div className="flex  lg:flex-nowrap min-w-full lg:min-w-[50%] gap-x-2.5">
                  <select
                    id="trait3"
                    onChange={(id) => handleSelect(id)}
                    value={traits3.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits3.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 3 Value..."
                    id="value3"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value3: e.target.value,
                      })
                    }
                    value={formParams.value3}
                  ></input>
                </div>

              
                <div className="flex  lg:flex-nowrap  min-w-full lg:min-w-[50%] gap-x-2.5 ">
                  <select
                    id="trait3"
                    onChange={(id) => handleSelect(id)}
                    value={traits3.name}
                    className="text-white outline-none  min-w-[10vw] rounded  bg-[#313751] shadow-2xl border-none "
                  >
                    {traits3.map((trait, index) => (
                      <option key={index} value={trait.name}>
                        {trait.name}
                      </option>
                    ))}
                  </select>

                  <input
                    className=" w-full rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                    type="text"
                    placeholder="Trait 6 Value..."
                    id="value6"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        value6: e.target.value,
                      })
                    }
                    value={formParams.value6}
                  ></input>
                </div>
              </div>
            </div>
        
         
        

   

          {/* LISTING OPTIONS */}
          <p className="pt-3 text-[#868686] text-sm uppercase">
            LiSTING DETAILS
          </p>

          <div className="check mt-3 ">
            <select
              id="royalty"
              onChange={(id) => handleSelect(id)}
              value={royalty.name}
              className="text-white outline-none blue-glassmorphism w-half rounded  bg-[#313751] shadow-2xl border-none"
            >
              {royalty.map((royalty, index) => (
                <option key={index} value={royalty.name}>
                  {royalty.name}
                </option>
              ))}
            </select>
            <select
              id="listing"
              onChange={(id) => handleSelect(id)}
              value={listing.name}
              className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none"
            >
              {listing.map((listing, index) => (
                <option key={index} value={listing.name}>
                  {listing.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check mt-3 ">
          <select
              id="seal"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  seal: e.target.value,
                })
              }
              defaultValue={"Yes"}
              className="text-white outline-none white-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none  "
            >
              <option value="Yes">Authentication Seal</option>
              <option value="No">Don't Add A Seal</option>
            </select>
            <select
              id="listing"
              onChange={(id) => handleSelect(id)}
              value={listing.name}
              className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none invisible"
            >
              {listing.map((listing, index) => (
                <option key={index} value={listing.name}>
                  {listing.name}
                </option>
              ))}
            </select>
          </div>


          {/* <p className="pt-3 text-[#868686] text-sm uppercase">
            PRICE
          </p> */}
          <div className="check mt-3 gap-x-2.5">
      

            <input
              className=" rounded outline-none text-white border border-b-indigo-500 white-glassmorphism shadow-2xl px-2  w-[49.5%] "
              type="number"
              placeholder={
                formParams.listing === "Listed For Sale"
                  ? "Sale Price (ETH)"
                  : formParams.listing === "Auction"
                  ? "Floor Price (ETH)"
                  : "No Price Required"
              }
              step="0.001"
              min="0.00"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  price: e.target.value,
                })
              }
            ></input>
          </div>
        </div>
   
        {/* MINT BUTTONS  <Link to={{ pathname: `/Explore/Detail/${viewLink}` }}> */}
        <div className="flex w-full justify-end text-white gap-x-3 mt-8 relative ">
          {hashLink ? 
            <>
            <a
              href={hashLink}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "md:w-1/2 w-full group shadow-lg text-white hover:text-white shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 brightness-90  h-10 rounded-lg hover:bg-indigo-500 hover:brightness-110"
              }
            >
              <span className="absolute bottom-12 right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100 ">
                Confirm your transaction on the blockchain
              </span>
              View Transaction&nbsp;  <BiLinkExternal fontSize={20} className="" />
            </a>
            <Link to={{ pathname: `/Explore/Detail/${viewLink}` }} className={
                    "md:w-1/2 w-full group shadow-lg text-white hover:text-white shadow-indigo-500/30 flex items-center justify-center bg-amber-500 brightness-90  h-10 rounded-lg hover:bg-amber-500 hover:brightness-110"
                  }> 
                  
              
                  <span className="absolute bottom-12 right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100 ">
                    View details of your minted NFT
                  </span>
                  View NFT&nbsp;<FaEye fontSize={22} />
              </Link>
                </>
                :
            <>   
        
                <button
                onClick={OnMintNFT}
                value=""
                type="button"
                className={
                  formParams.name &&
                  formParams.collection &&
                  formParams.description &&
                  formParams.price &&
                  fileURL
                    ? "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-indigo-500 brightness-90  h-10 rounded-lg hover:bg-indigo-500 hover:brightness-110"
                    : "md:w-1/2 w-full group shadow-lg shadow-indigo-500/30 flex items-center justify-center bg-neutral-900  h-10 rounded-lg hover:bg-transparent hover:text-indigo-500"
                }
              >
                <span className="absolute bottom-12 right-0 scale-0 transition-all rounded bg-teal-600 p-2 text-xs text-white group-hover:scale-100 ">
                  {hashLink
                    ? "Already minted NFT..."
                    : !fileURL
                    ? "Create or upload image to mint..."
                    : !formParams.price
                    ? "Enter a price..."
                    : !formParams.name || !formParams.description
                    ? "Enter title & description..."
                    : !formParams.value1 || !formParams.value2 || !formParams.value3 ?
                    "Add or generate some traits..."
                    : "Ready to mint your NFT..."}
                </span>
                {isMinting ? "Minting..." : hashLink ? "Minted NFT" : "Mint NFT"}
              </button>
              </>
          }

   
        </div>
      </div>
    </form>
  );
};

export default MintForm;
