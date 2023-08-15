import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import Loader from "./Loader";
import NFTTile from "./NFTTile";
import Transactions from "./Transactions";
import SubMenu from "./SubMenu";
import { uploadJSONToIPFS } from "../utils/pinata";
import { TETabsContent, TETabsPane } from "tw-elements-react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const Input = ({
  placeholder,
  name,
  type,
  value,
  handleChange,
  handleProfile,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    // onChange={(e) => handleChange(e, name)}
    onChange={(e) => handleProfile(e, name)}
    className="mb-3 p-3 w-full rounded-sm outline-none text-white border border-b-[#6c63ff] shadow-2xl white-glassmorphism"
  />
);

const Wallet = () => {
  const {
    currentAccount,
    accountBalance,
    marketData,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    ethereum,
    profileParams,
    updateProfileParams,
    handleProfile,
    tab,
    handleTab,
    checksumAddress,
    // walletNFTs,
  } = useContext(TransactionContext);

  //TRANSACTION
  const handleSubmitTransaction = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  window.localStorage.setItem("profileParams", profileParams);
  //PROFILE
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    console.log("profileParams", profileParams);
    window.localStorage.setItem("profileParams", profileParams);

    const { user, country, bio, website, profileUrl, address } = profileParams;

    if (!user || !country || !website || !bio || !profileUrl || !address) {
      console.log("Please enter details in all fields");
      // setIsMinting(false);
      return -1;
    }

    const nftJSON = {
      user,
      country,
      bio,
      website,
      profileUrl,
      address: checksumAddress,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log(response.pinataURL);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error storing metadata. Try again");
    }
  };

  //PROFILE IMAGE
  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }
  function revokeObjectURL(url) {
    return window.URL
      ? window.URL.revokeObjectURL(url)
      : window.webkitURL.revokeObjectURL(url);
  }

  function uploadLocally(e) {
    e.preventDefault();
    let file = e.target.files[0];
    // setFile(file);
    var src = createObjectURL(file);
    var image = new Image();
    image.src = src;
    updateProfileParams({
      ...profileParams,
      profileUrl: image.src,
    });
  }

  console.log("profileParams", profileParams);

  const walletNFTs = marketData.filter(
    (item) => item.seller === checksumAddress
  );
  console.log(walletNFTs);

  return (
    <div className="flex w-full justify-center items-center ">
      <div className="flex-col justify-center items-start md:w-3/4 mx-2 ">
        <SubMenu
          title="My Wallet"
          subtitle="Fund your wallet to mint NFTs"
          tab1="Transfer"
          tab2="My NFTs"
          tab3="Profile"
          handleTab={handleTab}
          tab={tab}
        />

        <TETabsContent>
          <TETabsPane show={tab === "tab1"}>
            <div className="flex flex-wrap justify-around items-center flex-row w-auto white-glassmorphism md:p-7 ">
              {/* CARD */}
              <div className=" flex justify-end items-start flex-col rounded-xl seal eth-card w-full  aspect-[10/6] mb-2 max-w-[385px] m-2 md:m-0 p-5 ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border border-white flex justify-center items-center eth-card seal  ">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className=" text-white font-light tshade ">
                      {checksumAddress
                        ? shortenAddress(checksumAddress)
                        : "0x123...aBcD"}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1 tshade">
                      {accountBalance} Ethereum
                    </p>
                  </div>
                </div>
              </div>

              {/* SEND FORM */}
              <div className=" md:w-96  w-full flex flex-col justify-center items-center px-2 md:px-0 md:py-2 max-w-[410px] ">
                <Input
                  placeholder="Address To"
                  name="addressTo"
                  type="text"
                  handleChange={handleChange}
                />
                <Input
                  placeholder="Amount (ETH)"
                  name="amount"
                  type="number"
                  handleChange={handleChange}
                />
                <Input
                  placeholder="Enter Message"
                  name="message"
                  type="text"
                  handleChange={handleChange}
                />
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitTransaction}
                    className="text-white w-full border-[1px] mb-2 lg:mb-0 p-2 h-12 border-[#6c63ff] hover:bg-[#6c63ff] rounded cursor-pointer shadow-lg shadow-indigo-500/30"
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
            <Transactions />
          </TETabsPane>

          <TETabsPane show={tab === "tab2"}>
            <div className="grid md:grid-cols-4 text-md md:text-xs gap-4">
              {[...walletNFTs].map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}
            </div>
          </TETabsPane>

          <TETabsPane show={tab === "tab3"}>
            <div className="flex flex-wrap justify-around items-start flex-row w-full white-glassmorphism md:p-7 ">
              <div className="p-3 w-96 lg:w-1/2 h-96  lg:h-96 lg:mx-0 lg:mt-0 flex justify-end items-start flex-col rounded-xl">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start ">
                    <div className="w-32 h-32 rounded-full border border-white flex justify-center items-start ">
                      <label
                        htmlFor="dropzone-file"
                        className="flex items-center justify-center w-full h-full cursor-move bg-opacity-10 bg-[#273057] hover:bg-opacity-70"
                      >
                        {/* <button
                            style={{
                              backgroundImage: profileParams.profileUrl
                                ? profileParams.profileUrl
                                : ""
                                // `url( "https://robohash.org/${checksumAddress}.png?set=set3" `,
                            }}
                            alt="profile photo"
                            className="rounded-full object-cover w-32 h-32 bg-cover bg-center "
                          ></button> */}
                        <div className="flex flex-col items-start justify-end relative">
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden z-10"
                            onChange={(e) => uploadLocally(e)}
                          />
                          <img src={profileParams.profileUrl} />
                          <div className="bg-indigo-500  px-3 py-1 rounded-full text-white text-sm hidden md:inline-block absolute bottom-2">
                            {/* {checksumAddress ? shortenAddress(checksumAddress) : "0x123...aBcD"} */}
                            Profile
                          </div>
                        </div>
                      </label>
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>

                  <div className="flex align-center">
                    <p className="text-white font-semibold tshade">
                      {profileParams.user ? profileParams.user : "Name"},
                    </p>
                    &nbsp;&nbsp;
                    <em>
                      <p className=" text-white font-light tshade ">
                        {profileParams.country
                          ? profileParams.country
                          : "Country"}
                      </p>
                    </em>
                  </div>
                  <p className=" text-white font-light tshade ">
                    {profileParams.bio
                      ? profileParams.bio
                      : "Write a brief bio describing your interests and creative influences as well as how you became interested in blockchain and NFTs."}
                  </p>
                  <p className=" text-white font-light tshade ">
                    {profileParams.website
                      ? profileParams.website
                      : "Website URL"}
                  </p>
                  <p className=" text-[#868686] font-light tshade ">
                    {checksumAddress
                      ? shortenAddress(checksumAddress)
                      : "0x123...aBcD"}
                  </p>
                </div>
              </div>
              <div className="p-2 sm:w-96  w-full flex flex-col justify-center items-center ">
                <Input
                  placeholder="Name"
                  name="user"
                  type="text"
                  handleProfile={handleProfile}
                />
                <textarea
                  placeholder="Bio"
                  rows="4"
                  id="bio"
                  name="bio"
                  className=" mb-3 block py-1.5 px-2.5 w-full  text-white rounded border border-[#6c63ff] focus:ring-blue-500 focus:border-blue-500 white-glassmorphism "
                  onChange={(e) =>
                    updateProfileParams({
                      ...profileParams,
                      bio: e.target.value,
                      address: currentAccount,
                    })
                  }
                  value={profileParams.bio}
                />
                <Input
                  placeholder="Country"
                  name="country"
                  type="text"
                  handleProfile={handleProfile}
                />
                <Input
                  placeholder="Website"
                  name="website"
                  type="text"
                  handleProfile={handleProfile}
                />

                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitProfile}
                    className="text-white w-full  border-[1px] p-2  h-12 border-[#6c63ff] hover:bg-indigo-500 rounded cursor-pointer shadow-lg shadow-indigo-500/30"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </TETabsPane>
        </TETabsContent>

        <div className="flex flex-col flex-1 items-start justify-center w-full mf:mt-0 mt-10 ">
          <div className="text-center  text-white font-light text-base w-full">
            {!ethereum ? (
              "Install MetaMask and connect wallet to send ethereum and view your NFTs"
            ) : currentAccount !== "" ? (
              ""
            ) : (
              <div className="flex flex-wrap justify-around items-center flex-row w-full white-glassmorphism p-5 ">
                Connect MetaMask wallet to send ethereum and view your NFTs
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
