import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import Marketplace from "../abis/Marketplace.json";
import { useLocation } from "react-router";
import axios from "axios";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";

const Create = () => {
  const [formParams, updateFormParams] = useState({
    title: "",
    description: "",
    style: "",
    artist: "",
    colour: "",
    category: "",
    medium: "",
    texture: "",
    points: "",
    seal:"Yes",
    price: "",
  });

  
  const [isChecked, setIsChecked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [activeKeywords, setActiveKeywords] = useState([]);
  const [powerPoints, setPowerPoints] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [transactionHash, setTransactionHash] = useState();
  const [hashLink, setHashLink] = useState(null);
  const [dateCreated, setDateCreated] = useState();

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();



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
    setFile(file);
    var src = createObjectURL(file);
    var image = new Image();
    image.src = src;
    setFileURL(image.src);
    // Do whatever you want with your image, it's just like any other image
    // but it displays directly from the user machine, not the server!
    // console.log("file", file);
    //   console.log("src", src);
    // console.log("image", image);
    // console.log("image.src", image.src);
  }

  const handleForm = (e) => {
    let title = e.target.id;
    setActiveKeywords([...activeKeywords, e.target.value]);
    updateFormParams({ ...formParams, [title]: e.target.value });
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (activeKeywords.includes(e.target.value)) {
      const newActive = activeKeywords.filter((item) => item !== e.target.value);
      setActiveKeywords(newActive);
    } else {
      setActiveKeywords((prevArr) => [...prevArr, e.target.value]);
    }
  };

  //This function uploads the NFT image to IPFS
  async function OnUploadFile(e) {
    e.preventDefault();

    if (isChecked) {
      // uploadLocally(e);
      updateMessage("Uploading image...");
      const file = e.target.files[0];
      // setFileURL(file);
     
      // if (isSaving) {
        
        try {
          //upload the file to IPFS
          // disableButton();
          setIsUploading(true);
          updateMessage("Loading image..!");
          const response = await uploadFileToIPFS(file);
          if (response.success === true) {
            // enableButton();
            updateMessage("Image uploaded successfully!");
            console.log("Image uploaded: ", response.pinataURL);
            setFileURL(response.pinataURL);
            setIsUploading(false);
          }
        } catch (e) {
          updateMessage("Error during file upload", e);
          setIsUploading(false);
        // }
      }
    } else {
      // var file = e.target.files[0];
      //check for file extension
    }
  }

  async function OnCreateFile() {
      // Create Image Function
      // const createImage = async () => {
      setIsCreating(true);
      updateMessage("Generating AI Image...");
      const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;
      const huggingKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
      // Send the request
      const response = await axios({
        url: URL,
        method: "POST",
        headers: {
          Authorization: `Bearer ${huggingKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          inputs:
            formParams.title + " " + formParams.description + " " + activeKeywords,
          options: { wait_for_model: true },
        }),
        responseType: "arraybuffer",
      });

      const type = response.headers["content-type"];
      const data = response.data; //arrayBuffer
      const base64data = Buffer.from(data).toString("base64"); //raw string
      const file = `data:${type};base64,` + base64data; //formatted string
      const filePinata = new File([data], "image.jpeg", { type: "image/jpeg" });
      setFile(filePinata);
      // const filePinata = file;
      console.log("fileIS", filePinata);
      //check for file extension
      setFileURL(file);
      updateMessage("Image Created...");
      setIsCreating(false);
      // return data;
      // };

      try {
        //upload the file to IPFS
        // disableButton();
        updateMessage("Storing image..!");
        const response = await uploadFileToIPFS(filePinata);
        if (response.success === true) {
          // enableButton();
          updateMessage("Image created..!");
          console.log("Image created: ", response.pinataURL);
          setFileURL(response.pinataURL);
        }
      } catch (e) {
        setIsCreating(false);
        updateMessage("Install MetaMask to mint NFTs");
      }
    }
  

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const {
      name,
      description,
      price,
      artist,
      colour,
      style,
      category,
      medium,
      points,
      seal
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

    const nftJSON = {
      name,
      description,
      price,
      artist,
      colour,
      style,
      category,
      medium,
      points,
      seal,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
       
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    setIsMinting(true);
   
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      
      if (metadataURL === -1) return;
      setMetaData(metadataURL);
      console.log("metadataURL", metadataURL);
      updateMessage("Click Confirm in MetaMask");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // disableButton();
     
      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();
     
      //actually create the NFT
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

      const date = `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`;
      setDateCreated(date);

      updateMessage("Successfully listed your NFT!");
      setIsMinting(false);
      // enableButton();
      // updateMessage("");
      // updateFormParams({ name: "", description: "", price: "" });
      // window.location.replace("/Wallet");
    } catch (e) {
      updateMessage("Upload error" + e);
    }
  }
  // console.log("transactionHash", transactionHash);
  // console.log(formParams);
  // console.log(activeKeywords);

  // console.log("file", file);
  // console.log("formParams: " + formParams.name)
  // console.log("Working", process.env);
  return (
    <div className="fade-in min-h-screen lg:mx-10">
      <>
        <div className="items-start flex-col justify-between px-2 md:p-5">
          <div className="pt-2 pl-4 ">
            <h1 className="text-4xl sm:text-5xl text-white text-gradient">
              Create & Mint NFTs
            </h1>

            <p className="text-left text-white font-light md:w-9/12  text-base py-2">
              Generate an A.I. image or upload your own.
            </p>
          </div>{" "}
          {/* Form */}
          <div className="form blue-glassmorphism mt-4 px-2 pb-5">
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
            />

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
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Create;
