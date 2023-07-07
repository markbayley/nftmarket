import { useContext, useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import Marketplace from "../abis/Marketplace.json";
import { useLocation } from "react-router";
import axios from "axios";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";
import { TransactionContext } from "../context/TransactionContext";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import MintForm from "./MintForm";

const Create = () => {
  const {
    formParams,
    updateFormParams,
    mintParams,
    updateMintParams,
    activeKeywords,
    setActiveKeywords,
    fileURL,
    setFileURL,
    currentAccount,
    ethereum,
  } = useContext(TransactionContext);

  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

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

  window.localStorage.setItem("activeKeywords", activeKeywords);

  window.localStorage.setItem("fileURL", fileURL);

  window.localStorage.setItem("formParams", [
    formParams.name,
    formParams.subtitle,
    formParams.description,
  ]);

  window.localStorage.setItem("mintParams", [
    mintParams.category,
    mintParams.subcategory,
    mintParams.seal,
  ]);

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
  }

  const handleForm = (e) => {
    let title = e.target.id;
    setActiveKeywords([...activeKeywords, e.target.value]);
    updateFormParams({ ...formParams, [title]: e.target.value });
  };

  const handleMint = (e) => {
    let title = e.target.id;
    setActiveKeywords([...activeKeywords, e.target.value]);
    updateMintParams({ ...mintParams, [title]: e.target.value });
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
        updateMessage("Error during file upload");
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
          formParams.name +
          " " +
          formParams.description +
          " " +
          formParams.subtitle +
          " " +
          activeKeywords,
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
        updateMessage("Success! Image created");
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
      subtitle,
      description,
      activeKeywords,
    } = formParams;

    const {
      category,
      subcategory,
      trait1,
      trait2,
      trait3,
      trait4,
      value1,
      value2,
      value3,
      value4,
      seal,
      price,
      points,
    } = mintParams;
    // Make sure that none of the fields are empty
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
      subtitle,
      description,
      attributes: [
        { trait_type: "Category", value: category },
        { trait_type: "Subcategory", value: subcategory },
        { trait_type: trait1, value: value1 },
        { trait_type: trait2, value: value2 },
        { trait_type: trait3, value: value3 },
        { trait_type: trait4, value: value4 },
      ],
      price,
      seal,
      activeKeywords,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("error uploading JSON metadata:");
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
      // const powerPoints = transaction.hash.slice(64, 66);
      // setPowerPoints(powerPoints);

      // const date = `${new Date().getDate()}/${
      //   new Date().getMonth() + 1
      // }/${new Date().getFullYear()}`;
      // setDateCreated(date);

      updateMessage("Successfully listed your NFT!");
      setIsMinting(false);

      // updateFormParams({ name: "", description: "", price: "" });
      // window.location.replace("/Wallet");
    } catch (e) {
      updateMessage("Upload error" + e );
      setIsMinting(false);
    }
  }



  return (
    <div className="items-center flex-col justify-between gap-x-2 md:p-5 fade-in lg:mx-16">
      <div className="flex flex-row  place-items-center flex-wrap ">
        <div className="pt-2 pl-4  md:w-1/2 w-full ">
          <h1 className="text-4xl sm:text-5xl text-white text-gradient">
            Create & Mint NFTs
          </h1>

          <p className="text-left text-white font-light md:w-9/12  text-base py-2">
            Generate an A.I. image or upload your own.
          </p>
        </div>{" "}
        <div className="flex md:w-1/2 w-full justify-center md:justify-end ">
          <TETabs className="lg:pr-4">
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => (handleBasicClick("tab1"), setMint(() => false))}
              active={basicActive === "tab1"}
            >
              Create
            </TETabsItem>
            {/* <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              Upload
            </TETabsItem> */}
            <TETabsItem
              className="hover:bg-transparent  px-1 md:px-7"
              onClick={() => (handleBasicClick("tab3"), setMint(() => true))}
              active={basicActive === "tab3"}
            >
              Mint
            </TETabsItem>
          </TETabs>
        </div>
      </div>

      <TETabsContent>
        <TETabsPane show={basicActive === "tab1"}>
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
        </TETabsPane>

        {/* <TETabsPane show={basicActive === "tab2"}>




            </TETabsPane> */}

        <TETabsPane show={basicActive === "tab3"}>
          <div className="form blue-glassmorphism mt-4 px-2 pb-5 ">
            <MintForm
              isUploading={isUploading}
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              mintParams={mintParams}
              fileURL={fileURL}
              OnCreateFile={OnCreateFile}
              file={file}
              handleChecked={handleChecked}
              handleMint={handleMint}
              updateFormParams={updateFormParams}
              updateMintParams={updateMintParams}
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
              mint={mint}
            />
          </div>
        </TETabsPane>
      </TETabsContent>
    </div>
  );
};

export default Create;
