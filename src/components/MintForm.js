import React, { useState } from "react";
import {
  royalty,
  listing,
} from "../data/lists.js";
import { traits1, traits2, traits3 } from "../data/traits.js";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const MintForm = ({
  isCreating,
  isMinting,
  formParams,
  fileURL,
  handleForm,
  updateFormParams,
  listNFT,
  transactionHash,
}) => {
  // console.log("formParams", formParams);

  const [showMore, setShowMore] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <form className="">
      <div className="max-w-2/3  ">
        <div>
          <p className="pb-3 text-[#868686] text-sm uppercase">ATTRIBUTES</p>

          {!showMore ? (
            // First Three Traits
            <div>
              <div className="check  gap-x-2.5">
                <select
                  id="trait1"
                  onChange={(id) => handleForm(id)}
                  value={traits1.name}
                  className="text-white outline-none  w-half  rounded  bg-[#313751] shadow-2xl border-none "
                >
                  {traits1.map((trait, index) => (
                    <option key={index} value={trait.name}>
                      {trait.name}
                    </option>
                  ))}
                </select>

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
              </div>

              <div className="check mt-3 gap-x-2.5">
                <select
                  id="trait2"
                  onChange={(id) => handleForm(id)}
                  value={traits2.name}
                  className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none"
                >
                  {traits2.map((trait, index) => (
                    <option key={index} value={trait.name}>
                      {trait.name}
                    </option>
                  ))}
                </select>

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
              </div>

              <div className="check mt-3 gap-x-2.5">
                <select
                  id="trait3"
                  onChange={(id) => handleForm(id)}
                  value={traits3.name}
                  className="text-white outline-none blue-glassmorphism w-half  rounded  bg-[#313751] shadow-2xl border-none"
                >
                  {traits3.map((trait, index) => (
                    <option key={index} value={trait.name}>
                      {trait.name}
                    </option>
                  ))}
                </select>

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
              </div>

              {/* <div className="flex w-full mb-3  justify-between gap-x-2.5 ">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Nature..."
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
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                  type="text"
                  placeholder="Personality Trait..."
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

              <div className="flex w-full my-2 sm:flex-wrap justify-between gap-x-2.5 ">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Talent..."
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
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                  type="text"
                  placeholder="Special Ability..."
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

            <div className="flex w-full my-3 sm:flex-wrap justify-between gap-x-2.5 ">
                <input
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Possession..."
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
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                  type="text"
                  placeholder="Survival Tool..."
                  id="value3"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      value3: e.target.value,
                    })
                  }
                  value={formParams.value3}
                ></input>
              </div> */}
            </div>
          ) : (
            <div>
              {/* Second Three Traits */}
              <div className="flex w-full  mb-3  justify-between gap-x-2.5 ">
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 4 Type..."
                  value={formParams.trait4}
                  id="trait4"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait4: e.target.value,
                    })
                  }
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

              <div className="flex w-full my-2  justify-between gap-x-2.5 ">
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 5 Type..."
                  value={formParams.trait5}
                  id="trait5"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait5: e.target.value,
                    })
                  }
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

              <div className="flex w-full  mt-3  justify-between gap-x-2.5 ">
                <input
                  className="w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Trait 6 Type..."
                  value={formParams.trait6}
                  id="trait6"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      trait6: e.target.value,
                    })
                  }
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
              ? "Click right to enter more traits"
              : "Click left to go back"}
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

          <p className="pt-3 text-[#868686] text-sm uppercase">
            LiSTING DETAILS
          </p>

          {/* <div className="flex w-full mb-3  justify-between gap-x-2.5 ]">
                <input5
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism"
                  type="text"
                  placeholder="Nature..."
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
                  className=" w-full lg:w-[48%] rounded-sm p-2 outline-none  text-white border-none white-glassmorphism "
                  type="text"
                  placeholder="Personality Trait..."
                  id="value1"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      value1: e.target.value,
                    })
                  }
                  value={formParams.value1}
                ></input>
              </div> */}

          <div className="check mt-3 ">
            <select
              id="royalty"
              onChange={(id) => handleForm(id)}
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
              onChange={(id) => handleForm(id)}
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

   

        {/* Buttons */}
        <div className="flex w-full justify-end text-white gap-x-3 mt-14 relative">
          {/* <button
            onChange={(e) => OnUploadFile(e)}
            type="button"
            value={isSaving ? "Saving..." : "Save"}
            className={
              !isChecked
                ? "disabledButton w-1/3"
                : isMinting
                ? "waitingButton w-1/3"
                : isSaving
                ? "waitingButton w-1/3"
                : !fileURL
                ? "inactiveButton w-1/3"
                : "activeButton w-1/3"
            }
          >
            Save
          </button> */}

{/* <div className="message group relative text-white w-1/2 h-9 flex items-center ">
        {message}
      </div> */}

          <button
            onClick={listNFT}
            value={isMinting ? "Minting..." : "Mint"}
            type="button"
            className={
              !fileURL
                ? "disabledButton md:w-1/2 w-full group"
                : !formParams.price ||
                  !formParams.name ||
                  !formParams.description
                ? "inactiveButton md:w-1/2 w-full group"
                : isMinting || isCreating
                ? "waitingButton md:w-1/2 w-full group"
                : "activeButton md:w-1/2 w-full group"
            }
          >
            <span className="absolute -bottom-12  scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
              {!fileURL
                ? "Create or upload image to mint..."
                : !formParams.price
                ? "Enter a price..."
                : !formParams.name || !formParams.description
                ? "Enter title & description..."
                : transactionHash
                ? "Already minted NFT..."
                : "Ready to mint..."}
            </span>
            Mint
          </button>
        </div>
      </div>
    </form>
  );
};

export default MintForm;
