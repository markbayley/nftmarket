import { useContext } from "react";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";
import MintForm from "./MintForm";
import { TETabsContent, TETabsPane } from "tw-elements-react";
import { TransactionContext } from "../context/TransactionContext";
import SubMenu from "./SubMenu";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { OnUploadFile, OnMintNFT } from "../context/Functions";
import Marketplace from "../abis/Marketplace.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import axios from "axios";

const Create = () => {
  const {
    tab,
    handleTab,
    activeKeywords,
    setActiveKeywords,
    fileURL,
    checksumAddress,
    marketData,
    formParams,
    updateFormParams,
    isChecked,
    setIsChecked,
    message,
    isCreating,
    isMinting,
    isUploading,
    transactionHash,
    hashLink,
    setMint,
    setIsCreating,
    setFileURL,
    setFile,
    updateMessage,
    setIsMinting,
    setHashLink,
    setMetaData,
    setTransactionHash,
    getAllNFTs,
    setDateCreated
  } = useContext(TransactionContext);

  // window.localStorage.setItem("activeKeywords", activeKeywords);
  // window.localStorage.setItem("fileURL", fileURL);


  //CREATING
  const OnCreateFile = async (e) => {

    setIsCreating(true);
    updateMessage("Generating AI image...");

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs:
          formParams.name +
          " " +
          formParams.collection +
          " " +
          formParams.description +
          " " +
          activeKeywords,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;
    const base64data = Buffer.from(data).toString("base64");
    const file = `data:${type};base64,` + base64data;
    const filePinata = new File([data], "image.jpeg", { type: "image/jpeg" });

    setFile(filePinata);
    setFileURL(file);
    setIsCreating(false);

    try {
      updateMessage("Storing image..");
      const response = await uploadFileToIPFS(filePinata);
      if (response.success === true) {
        updateMessage("AI Image created!");
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      setIsCreating(false);
      updateMessage("Install MetaMask to mint NFTs");
    }
    updateMessage("Success! Select the next tab to mint NFT");
    setIsCreating(false);

    return data;
  }


  //UPLOAD METADATA
 const OnUploadMetadata = async () => {

    const {
      name,
      collection,
      description,
      artist,
      colour0,
      colour1,
      colour2,
      style,
      medium,
      texture,
      theme,
      royalty,
      listing,
      price,
      seal,
      trait1,
      value1,
      trait2,
      value2,
      trait3,
      value3,
      trait4,
      value4,
      trait5,
      value5,
      trait6,
      value6,
    } = formParams;

    if (!price) {
      updateMessage("Please select a price in ETH!");
      setIsMinting(false);
      return -1;
    }
    if (!fileURL) {
      updateMessage("No image created or uploaded yet!");
      setIsMinting(false);
      return -1;
    }

    const date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;
    setDateCreated(date);

    const nftJSON = {
      name,
      collection,
      description,
      creator: checksumAddress,
      theme,
      artist,
      // colour,
      colour0,
      colour1,
      colour2,
      style,
      texture,
      medium,
      royalty,
      listing,
      seal,
      price,
      attributes: [
        { trait_type: trait1, value: value1 },
        { trait_type: trait2, value: value2 },
        { trait_type: trait3, value: value3 },
        { trait_type: trait4, value: value4 },
        { trait_type: trait5, value: value5 },
        { trait_type: trait6, value: value6 },
      ],
      hashtags: [
        { style: style },
        { theme: theme },
        { colour: [colour0, colour1, colour2] },
        { texture: texture },
        { medium: medium },
        { artist: artist },
      ],
      image: fileURL,
      tags: activeKeywords,
      date: date,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("Error storing metadata. Try again");
    }
  }

  //MINTING
  const OnMintNFT = async (e) => {

    const ethers = require("ethers");

    e.preventDefault();
    setIsMinting(true);

    try {
      const metadataURL = await OnUploadMetadata();

      if (metadataURL === -1) return;
      setMetaData(metadataURL);
      updateMessage("Click Confirm in MetaMask");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      updateMessage("Minted NFT...Storing Data");
      setTransactionHash(transaction.hash);
      setHashLink(`https://sepolia.etherscan.io/tx/${transaction.hash}`);
      updateMessage("Successfully listed your NFT!");
      setIsMinting(false);
      setActiveKeywords([]);

      await getAllNFTs();
      
    } catch (e) {
      updateMessage("Connect MetaMask wallet to mint NFT.", e);
    }
  }






  const handleForm = (id, value) => {

    console.log("select", id);

    setActiveKeywords([...activeKeywords, value]);
    updateFormParams({ ...formParams, [id]: value });
  };


const handleChecked = (e) => {

  e.preventDefault();
  console.log("button", e.target.id);
 let idn = e.target.id
  if (activeKeywords.includes(e.target.value)) {
    const newActive = activeKeywords.filter((item) => item !== e.target.value);
    setActiveKeywords(newActive);
    updateFormParams({ ...formParams, [idn]: "" });
  } else {
    setActiveKeywords((prevArr) => [...prevArr, e.target.value]);
    updateFormParams({ ...formParams, [idn]: "" }); // Update formParams with an empty string
  }
};

  return (
    <div className="fade-in lg:px-[5%] px-2">
      <SubMenu
        title="Create NFTs"
        subtitle={
          tab === "tab1"
            ? "Generate an image or upload one"
            : "Mint your NFT to the blockchain"
        }
        tab1="Create"
        tab2="Mint"
        tab3={<MdOutlineKeyboardDoubleArrowRight fontSize={20} />}
        setMint={setMint}
        handleTab={handleTab}
        tab={tab}
        data={marketData}
        checksumAddress={checksumAddress}
        formParams={formParams}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        marketData={marketData}
      />

      <div className="form  md:py-5 md:px-[2%] gap-x-6 px-1 white-glassmorphism rounded-lg mt-2">
        <CreateImage
          isUploading={isUploading}
          isCreating={isCreating}
          isMinting={isMinting}
          formParams={formParams}
          fileURL={fileURL}
          message={message}
          OnUploadFile={OnUploadFile}
          hashLink={hashLink}
          isChecked={isChecked}
        />
        <TETabsContent>
          <TETabsPane show={tab === "tab1"}>
            <CreateForm
              formParams={formParams}
              OnCreateFile={OnCreateFile}
              handleChecked={handleChecked}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              activeKeywords={activeKeywords}
              isChecked={isChecked}
              OnUploadFile={OnUploadFile}
            />
          </TETabsPane>

          <TETabsPane show={tab === "tab2"}>
            <MintForm
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              fileURL={fileURL}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              OnMintNFT={OnMintNFT}
              transactionHash={transactionHash}
            />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default Create;
