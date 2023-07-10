import { useState, useEffect } from "react";
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



const Create = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    subtitle: "",
    theme: "",
    style: "",
    artist: "",
    colour: "",
    medium: "",
    texture: "",
    seal: "Yes",
    price: "",
    category: "",
    subcategory: "",
    trait1: "",
    value1: "",
    trait2: "",
    value2: "",
    trait3: "",
    value3: "",
    trait4: "",
    value4: "",
    trait5: "",
    value5: "",
    trait6: "",
    value6: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mint, setMint] = useState(false);

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
  const [ svgFile, setSvgFile ] = useState('')

  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };




  
  

  console.log(activeKeywords)


  // window.localStorage.setItem("activeKeywords", activeKeywords);

  window.localStorage.setItem("fileURL", fileURL);

  // window.localStorage.setItem("formParams", [
  //   formParams.name,
  //   formParams.subtitle,
  //   formParams.description,
  // ]);

  // window.localStorage.setItem("mintParams", [
  //   mintParams.category,
  //   mintParams.subcategory,
  //   mintParams.seal,
  // ]);

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
 // Call the convertToSVG function with your file URL

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
          formParams.name +
          " " +
          formParams.subtitle +
          " " +
          formParams.description +
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
   
   console.log("fileRAW", file); //data:image/jpeg;base64,/9j/4A


    const image = file;
    const svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
    svgimg.setAttribute( 'width', '100' );
    svgimg.setAttribute( 'height', '100' );
    svgimg.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', image);
    setSvgFile(svgimg); 
    // document.getElementById("mySvg").appendChild(svgimg);

    console.log("svgFile 00000000000", svgimg)  //<image width="500" height="500" src="data:image/jpeg;base64,/9j/4A

    const filePinata = new File([data], "image.jpeg", { type: "image/jpeg" });
    setFile(filePinata);

    console.log("fileAFTERP", file) ////data:image/jpeg;base64,/9j/4A
    // const filePinata = file;
    console.log("filePinata", filePinata);  //File lastModified: 16886072340 lastModifiedDate:Thu
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
        console.log("Image created: ", response.pinataURL);  //https://magenta-realistic-haddock-479.mypinata.cl
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
      artist,
      colour,
      style,
      medium,
      texture,
      theme,
      category,
      subcategory,
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
      price,
      seal,
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
      subtitle,
      category,
      description,
      theme,
      price,
      artist,
      colour,
      style,
      texture,
      medium,
      seal,
      attributes: [
        { trait_type: "Category", value: theme },
        { trait_type: "Subcategory", value: style },
        { trait_type: trait1, value: value1 },
        { trait_type: trait2, value: value2 },
        { trait_type: trait3, value: value3 },
        { trait_type: trait4, value: value4 },
        { trait_type: trait5, value: value5 },
        { trait_type: trait6, value: value6 },
      ],
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

      // updateFormParams({ name: "", description: "", price: "" });
      // window.location.replace("/Wallet");
    } catch (e) {
      updateMessage("Upload error" + e);
    }
  }



  return (
    <div className="items-center flex-col justify-between gap-x-2 md:p-5 fade-in lg:mx-12">
      <div className="flex flex-row  place-items-center flex-wrap ">
        <div className="pt-2 pl-4  md:w-1/2 w-full ">
          <h1 className="text-4xl sm:text-5xl text-white text-gradient">
            Create & Mint NFTs
          </h1>
{/* { svgFile &&
          <svg id="mySvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

</svg>} */}
          <p className="text-left text-white font-light md:w-9/12  text-base py-2">
            Generate an A.I. image or upload your own.
          </p>
        </div>{" "}
        <div className="flex md:w-1/2 w-full justify-center md:justify-end ">
          <TETabs className="lg:pr-4 ">
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => (handleBasicClick("tab1"), setMint(() => false))}
              active={basicActive === "tab1"}
            >
              Create
            </TETabsItem>

            <TETabsItem
              className="hover:bg-transparent mx-5"
              onClick={() => (handleBasicClick("tab2"), setMint(() => true))}
              active={basicActive === "tab2"}
            >
              Mint
            </TETabsItem>
          </TETabs>
        </div>
      </div>
      <div className="form blue-glassmorphism py-5 md:py-10 px-5">
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
        <TETabsContent>
          <TETabsPane show={basicActive === "tab1"}>
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
          </TETabsPane>

          <TETabsPane show={basicActive === "tab2"}>
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
             
            />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default Create;
