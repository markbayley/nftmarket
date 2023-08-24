import React, { useState } from "react";
import { traits1, traits2, traits3 } from "../data/traits.js";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { royalty, listing } from "../data/lists.js";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const MintForm = ({
  isMinting,
  formParams,
  fileURL,
  handleSelect,
  updateFormParams,
  OnMintNFT,
  transactionHash,
  hashLink,
}) => {

  console.log("hashlink", hashLink, transactionHash)
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
              {!showMore ? (
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
                "- TRAIT TITLES"
              )}
            </div>

            <div className="group relative cursor-pointer mt-1">
              <BsInfoCircle fontSize={15} color="#fff" />
              <span className="flex absolute w-60 bottom-0 right-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                Adding several well chosen traits to your NFT helps to enhance
                its rarity and value.{" "}
              </span>
            </div>
          </div>

          {!showMore ? (
            // TRAIT VALUES
            <div>
              <div className="check  gap-x-2.5">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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

                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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

              <div className="check mt-3 gap-x-2.5">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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

                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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

              <div className="check mt-3 gap-x-2.5">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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

                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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
          ) : (
            <div>
              {/* TRAIT TITLES */}
              <div className="flex w-full  mb-3  justify-between gap-x-2.5 ">
                {/* <select
                  id="trait1"
                  onChange={(id) => handleSelect(id)}
                  value={traits1.name}
                  className="text-white outline-none  w-half  rounded  bg-[#313751] shadow-2xl border-none "
                >
                  {traits1.map((trait, index) => (
                    <option key={index} value={trait.name}>
                      {trait.name}
                    </option>
                  ))}
                </select> */}
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 1 Title..."
                  value={formParams.trait1}
                  id="trait1"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait1: e.target.value,
                    })
                  }
                ></input>

                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 4 Title..."
                  value={formParams.trait4}
                  id="trait4"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait4: e.target.value,
                    })
                  }
                ></input>
                {/* <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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
                ></input> */}
              </div>

              <div className="flex w-full my-2  justify-between gap-x-2.5 ">
                {/* <select
                  id="trait2"
                  onChange={(id) => handleSelect(id)}
                  value={traits2.name}
                  className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none"
                >
                  {traits2.map((trait, index) => (
                    <option key={index} value={trait.name}>
                      {trait.name}
                    </option>
                  ))}
                </select> */}
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 2 Title..."
                  value={formParams.trait2}
                  id="trait2"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait2: e.target.value,
                    })
                  }
                ></input>

                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 5 Title..."
                  value={formParams.trait5}
                  id="trait5"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait5: e.target.value,
                    })
                  }
                ></input>

                {/* <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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
                ></input> */}
              </div>

              <div className="flex w-full  mt-3  justify-between gap-x-2.5 ">
                {/* <select
                  id="trait3"
                  onChange={(id) => handleSelect(id)}
                  value={traits3.name}
                  className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none"
                >
                  {traits3.map((trait, index) => (
                    <option key={index} value={traits3.name}>
                      {trait.name}
                    </option>
                  ))}
                </select> */}
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 3 Title..."
                  value={formParams.trait3}
                  id="trait3"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait3: e.target.value,
                    })
                  }
                ></input>
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 6 Title..."
                  value={formParams.trait6}
                  id="trait6"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait6: e.target.value,
                    })
                  }
                ></input>

                {/* <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
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
                ></input> */}
              </div>
            </div>
          )}

          {/* Add More Traits */}
          <div className="flex w-full justify-between items-center  text-white py-3">
            {" "}
            <button
              onClick={handleShow}
              className={
                showMore
                  ? "bg-indigo-500 h-9 border-none"
                  : "bg-transparent bg-neutral-700  border-none h-9"
              }
            >
              {" "}
              <MdOutlineArrowBackIosNew size="24" />
            </button>
            {!showMore
              ? "Add up to six unique traits"
              : "Edit trait titles (optional)"}
            <button
              onClick={handleShow}
              className={
                !showMore
                  ? "bg-indigo-500 h-9 border-none"
                  : "bg-transparent bg-neutral-700  border-none h-9"
              }
            >
              <MdOutlineArrowForwardIos size="24" />
            </button>
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

          <div className="check mt-3 gap-x-2.5">
            <select
              id="seal"
              onChange={(e) =>
                updateFormParams({
                  ...formParams,
                  seal: e.target.value,
                })
              }
              defaultValue={"Yes"}
              className="text-white outline-none white-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none  w-[50%] "
            >
              <option value="Yes">Authentication Seal</option>
              <option value="No">Don't Add A Seal</option>
            </select>

            <input
              className=" rounded outline-none text-white border-none white-glassmorphism shadow-2xl px-2  w-[50%] "
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

        {/* MINT BUTTONS */}
        <div className="flex w-full justify-end text-white gap-x-3 mt-8 relative ">
          {hashLink && (
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
              View Transaction
            </a>
          )}

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
            <span className="absolute bottom-12 right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100 ">
              {hashLink
                ? "Already minted NFT..."
                : !fileURL
                ? "Create or upload image to mint..."
                : !formParams.price
                ? "Enter a price..."
                : !formParams.name || !formParams.description
                ? "Enter title & description..."
                : "Ready to mint..."}
            </span>
            {isMinting ? "Minting..." : hashLink ? "Minted NFT" : "Mint NFT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MintForm;
