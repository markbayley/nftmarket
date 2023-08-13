import { useState, useEffect, useContext } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import Marketplace from "../abis/Marketplace.json";
import { useLocation } from "react-router";
import axios from "axios";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";
import MintForm from "./MintForm";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { TransactionContext } from "../context/TransactionContext";
import SubMenu from "./SubMenu";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Create = () => {
  const {
    tab,
    handleTab,
    activeKeywords,
    setActiveKeywords,
    fileURL,
    setFileURL,
    setTab,
    currentAccount,
    checksumAddress,
    marketData, 
    getAllNFTs,
    progress,
    setProgress,
  } = useContext(TransactionContext);

  const [isChecked, setIsChecked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mint, setMint] = useState(false);

  const [powerPoints, setPowerPoints] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [transactionHash, setTransactionHash] = useState();
  const [hashLink, setHashLink] = useState(null);
  const [dateCreated, setDateCreated] = useState();

  const [file, setFile] = useState(null);

  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();
  const [svgFile, setSvgFile] = useState("");

  window.localStorage.setItem("activeKeywords", activeKeywords);
  window.localStorage.setItem("fileURL", fileURL);

  // window.localStorage.setItem("formParams", [
  //   formParams.name,
  //   formParams.subtitle,
  //   formParams.description,
  // ]);

  // useEffect(() => {
  //       setTab('tab1')
  // }, []);

  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    collection: "",
    theme: "",
    style: "",
    artist: "",
    colour: "",
    medium: "",
    texture: "",
    seal: "Yes",
    listing: "Listed For Sale",
    price: "",
    royalty: "No Royalties",
    trait1: "Trait",
    value1: "",
    trait2: "Trait",
    value2: "",
    trait3: "Trait",
    value3: "",
    trait4: "Trait",
    value4: "",
    trait5: "Trait",
    value5: "",
    trait6: "Trait",
    value6: "",
  });

  const handleForm = (e) => {
    let title = e.target.id;
    setActiveKeywords([...activeKeywords, e.target.value]);
    updateFormParams({ ...formParams, [title]: e.target.value });
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (activeKeywords.includes(e.target.value)) {
      const newActive = activeKeywords.filter(
        (item) => item !== e.target.value
      );
      setActiveKeywords(newActive);
    } else {
      setActiveKeywords((prevArr) => [...prevArr, e.target.value]);
    }
  };

  //UPLOADING
  async function OnUploadFile(e) {
    e.preventDefault();

    if (isChecked) {
      updateMessage("Uploading image...");
      const file = e.target.files[0];

      try {
        setIsUploading(true);
        updateMessage("Loading image..!");
        const response = await uploadFileToIPFS(file);
        if (response.success === true) {
          updateMessage("Image uploaded successfully!");
          console.log("Image uploaded: ", response.pinataURL);
          setFileURL(response.pinataURL);

          setIsUploading(false);
        }
      } catch (e) {
        updateMessage("Error during file upload", e);
        setIsUploading(false);
      }
    } else {
      console.log("Error during file upload");
    }
  }

  const fill = "From the collection '" + formParams.collection + "' this artwork entitled '" + formParams.name + "' was made using a digital " + formParams.medium + 
  " medium in a creative " + formParams?.style + " style. The " + formParams.theme + " theme combines with subtle " + formParams.texture + " textures, " 
  + formParams.colour + " colors and " + formParams.artist + " influences." + formParams.description

  //CREATING
  async function OnCreateFile(e) {
    setIsCreating(true);
    updateMessage("Generating AI Image...");

    // updateFormParams({
    //   ...formParams,
    //   description: e.target.value,
    // })

    // updateFormParams({
    //   ...formParams,
    //   description: fill,
    // })

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

    // console.log("fileAFTERP", file); 

    // console.log("filePinata", filePinata);

    setFileURL(file);
    updateMessage("Image Created...");
    setProgress('Created');
    setIsCreating(false);

    try {
      updateMessage("Storing image..!");
      const response = await uploadFileToIPFS(filePinata);
      if (response.success === true) {
  
        updateMessage("Image created..!");
        console.log("Image created: ", response.pinataURL); 
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      setIsCreating(false);
      updateMessage("Install MetaMask to mint NFTs");
    }

    // setImage(img);
    updateMessage("Success! Enter details to mint NFT");
    // setTab("tab2");
    setIsCreating(false);
    // updateFormParams({
    //   ...formParams,
    //   description: "",
    // })
   
    return data;


  }






  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const {
      name,
      collection,
      description,
      artist,
      colour,
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
    //Make sure that none of the fields are empty
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
      colour,
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
        { colour: colour },
        { texture: texture },
        { medium: medium },
        { artist: artist },
      ],
      image: fileURL,
      tags: activeKeywords,
      date: date
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("Error storing metadata. Try again");
    }
  }
  async function listNFT(e) {
    e.preventDefault();
    setIsMinting(true);

    try {
      const metadataURL = await uploadMetadataToIPFS();

      if (metadataURL === -1) return;
      setMetaData(metadataURL);
      console.log("metadataURL", metadataURL);
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
      console.log("transaction", transaction);
      updateMessage("Minted NFT...Storing Data");

      setTransactionHash(transaction.hash);
      console.log("transaction", transaction);
      setHashLink(`https://sepolia.etherscan.io/tx/${transaction.hash}`);
      console.log("hashLink", hashLink);
      const powerPoints = transaction.hash.slice(64, 66);
      setPowerPoints(powerPoints);

     

      updateMessage("Successfully listed your NFT!");
      setProgress('Minted');
      setIsMinting(false);
      setActiveKeywords([])
      await getAllNFTs();

      console.log("marketData", marketData)
      console.log("marketData.length", marketData.length)
      console.log("marketData[marketData.length].tokenId", marketData[marketData.length].tokenId )
      // window.location.replace(`/Trade/Detail/${marketData && marketData[marketData.length].tokenId}`);
  //  setTab("tab3")
    } catch (e) {
      updateMessage("Connect MetaMask wallet to mint NFT.", e);
    }
  }

  const index = parseInt(marketData.length)
  console.log("marketData[marketData.length]", marketData[index] )
  // console.log("activeKeywords", activeKeywords);

  return (
    <div className="fade-in lg:px-[5%] px-2">
      <SubMenu
        title={ tab === "tab1" ? "Create NFTs" : "Mint NFTs"}
        subtitle={ tab === "tab1" ? "Generate an image or upload one" : "Mint your NFT to the blockchain" }
        tab1="Create"
        tab2="Mint"
        //tab3="View"
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
        progress={progress}
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
          setIsChecked={setIsChecked}
          transactionHash={transactionHash}
          hashLink={hashLink}
          setIsCreating={setIsCreating}
          setIsUploading={setIsUploading}
          metaData={metaData}
          mint={mint}
          isChecked={isChecked}
        />
        <TETabsContent>
          <TETabsPane show={tab === "tab1"}>
            <CreateForm
              isUploading={isUploading}
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              fileURL={fileURL}
              OnCreateFile={OnCreateFile}
              file={file}
              handleChecked={handleChecked}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              listNFT={listNFT}
              activeKeywords={activeKeywords}
              setIsSaving={setIsSaving}
              isSaving={isSaving}
              isChecked={isChecked}
              OnUploadFile={OnUploadFile}
              transactionHash={transactionHash}
              fill={fill}
              message={message}
            />
          </TETabsPane>

          <TETabsPane show={tab === "tab2"}>
            <MintForm
              isUploading={isUploading}
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              fileURL={fileURL}
              OnCreateFile={OnCreateFile}
              file={file}
              handleChecked={handleChecked}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              listNFT={listNFT}
              activeKeywords={activeKeywords}
              setIsSaving={setIsSaving}
              isSaving={isSaving}
              isChecked={isChecked}
              OnUploadFile={OnUploadFile}
              transactionHash={transactionHash}
              message={message}
            />
          </TETabsPane>

          <TETabsPane show={tab === "tab3"}>


          </TETabsPane>

        </TETabsContent>
   
      </div>
    </div>
  );
};

export default Create;
