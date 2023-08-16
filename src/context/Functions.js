import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import axios from "axios";
import Marketplace from "../abis/Marketplace.json";

 //UPLOADING
 export const OnUploadFile = async (e) => {
    const {
        updateMessage,
        setIsUploading,
        setFileURL,
        isChecked
      } = useContext(TransactionContext);

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

  //CREATING
  export const OnCreateFile = async (e) => {

    const {
      updateMessage,
      setIsCreating,
      setFileURL,
      activeKeywords,
      formParams,
      setFile
    } = useContext(TransactionContext);

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
export const OnUploadMetadata = async () => {

  const {
    updateMessage,
    activeKeywords,
    formParams,
    fileURL,
    checksumAddress,
    setIsMinting,
    setDateCreated
  } = useContext(TransactionContext);
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
  export const OnMintNFT = async (e) => {

    const ethers = require("ethers");

    const {
      updateMessage,
      formParams,
      setIsMinting,
      setActiveKeywords,
      getAllNFTs,
      setMetaData,
      setTransactionHash,
      setHashLink
    } = useContext(TransactionContext);

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




  

