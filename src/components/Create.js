import { useContext, useState } from "react";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";
import MintForm from "./MintForm";
import { TETabsContent, TETabsPane } from "tw-elements-react";
import { TransactionContext } from "../context/TransactionContext";
import SubMenu from "./SubMenu";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Marketplace from "../abis/Marketplace.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import axios from "axios";
import { BsFillTrash2Fill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import Loader from "./Loader";

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
    setDateCreated,
    setIsUploading,
    fileURLs, setFileURLs
  } = useContext(TransactionContext);

  // window.localStorage.setItem("activeKeywords", activeKeywords);
  // window.localStorage.setItem("fileURL", fileURL);

  //UPLOADING FUNCTION
  const OnUploadFile = async (e) => {
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
  };

  //CREATING FUNCTION

  const [files, setFiles] = useState([]);
  // const [fileURLs, setFileURLs] = useState([]);

  const OnCreateFile = async (e, i) => {
    if (!formParams.collection || !formParams.name) {
      // updateMessage("Enter a collection name and title");
      return -1;
    }

    if (!formParams.description) {
      // updateMessage("Write or generate a description");
      return -1;
    }

    console.log("i", i);
    console.log("formparams: ", formParams);
    console.log("activeKeywords: ", activeKeywords);

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
          activeKeywords +
          " " +
          i,
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

    setFiles((prevArr) => [...prevArr, filePinata]);
    console.log("files", files);
    // setFileURLs((prevArr) => ([...prevArr, file]));
    // console.log("fileURLs-file", fileURLs);

    setIsCreating(false);

    try {
      updateMessage("Storing image..");
      const response = await uploadFileToIPFS(filePinata, formParams.collection, formParams.name);
      if (response.success === true) {
        updateMessage("AI Image created!");
        setFileURL(response.pinataURL);
        setFileURLs((prevArr) => [...prevArr, response.pinataURL]);
        console.log("fileURLs-response", fileURLs);
      }
    } catch (e) {
      setIsCreating(false);
      updateMessage("Install MetaMask to mint NFTs");
    }
  updateMessage("Success! Select the next tab to mint NFT");
    setIsCreating(false);

    return data;
  };

  //UPLOAD METADATA
  const OnUploadMetadata = async () => {
    const {
      name,
      collection,
      description,
      style,
      theme,
      artist,
      medium,
      texture,
      colour0,
      colour1,
      colour2,
      royalty,
      listing,
      seal,
      price,
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
      // updateMessage("Please select a price in ETH!");
      setIsMinting(false);
      return -1;
    }
    if (!fileURL) {
      // updateMessage("No image created or uploaded yet!");
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
      date: date,
      image: fileURL,
      createParams: [
        { style: style },
        { theme: theme },
        { artist: artist },
        { medium: medium },
        { texture: texture },
        { colour: [colour0, colour1, colour2] },
        { tags: activeKeywords },
      ],
      attributes: [
        { trait_type: trait1, value: value1 },
        { trait_type: trait2, value: value2 },
        { trait_type: trait3, value: value3 },
        { trait_type: trait4, value: value4 },
        { trait_type: trait5, value: value5 },
        { trait_type: trait6, value: value6 },
      ],
      mintParams: [
        { royalty: royalty },
        { listing: listing },
        { seal: seal },
        { price: price },
      ],
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON, formParams.collection, formParams.name);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("Error storing metadata. Try again");
    }
  };

  //MINTING FUNCTION
  const OnMintNFT = async (e) => {
    const ethers = require("ethers");

    e.preventDefault();
    setIsMinting(true);

    try {
      const metadataURL = await OnUploadMetadata();

      console.log("metadataURL", metadataURL);

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
      updateMessage("Minting NFT...");
      await transaction.wait();

      console.log("transaction", transaction);

      updateMessage("Minted NFT...Storing Data");
      setTransactionHash(transaction.hash);
      setHashLink(`https://sepolia.etherscan.io/tx/${transaction.hash}`);
      updateMessage("Successfully listed your NFT!");
      setIsMinting(false);
      // setActiveKeywords([]);
      updateFormParams({
        ...formParams,
        description: "",
        name: "", 
        price: ""
      })

      await getAllNFTs();
    } catch (e) {
      updateMessage("Connect MetaMask wallet to mint NFT.", e);
      setIsMinting(false);
    }
  };

  //FORM HANDLING
  const handleSelect = (id, value) => {
    console.log("select", id);

    setActiveKeywords([...activeKeywords, value]);
    updateFormParams({ ...formParams, [id]: value });
  };

  const handleChecked = (e) => {
    e.preventDefault();
    console.log("button", e.target.id);
    let idn = e.target.id;
    if (activeKeywords.includes(e.target.value)) {
      const newActive = activeKeywords.filter(
        (item) => item !== e.target.value
      );
      setActiveKeywords(newActive);
      updateFormParams({ ...formParams, [idn]: "" });
    } else {
      setActiveKeywords((prevArr) => [...prevArr, e.target.value]);
      updateFormParams({ ...formParams, [idn]: "" }); // Update formParams with an empty string
    }
  };

  // console.log("hashlink", hashLink, transactionHash)

  const removeItem = (index) => {
    const updatedItems = [...fileURLs]; // Create a copy of the original array
    updatedItems.splice(index, 1);   // Remove the item at the specified index
    setFileURLs(updatedItems);          // Update the state with the new array
    setHashLink(null);
  };

  const viewLink = marketData && marketData[0]?.tokenId?.toString();

  // console.log("viewlink", viewLink)   
console.log("activeKeywords", activeKeywords, formParams)

const [loaded, setLoaded] = useState(false);

  return (
    <div className="fade-in lg:px-[3%] xl:px-[6%]   px-2">
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

      <div className="form  md:py-5 md:px-[2%] gap-x-6 px-1 white-glassmorphism rounded-lg mt-2 ">
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
          marketdata={marketData}
       
        />
        <TETabsContent>
          <TETabsPane show={tab === "tab1"}>
            <CreateForm
              formParams={formParams}
              OnCreateFile={OnCreateFile}
              handleChecked={handleChecked}
              handleSelect={handleSelect}
              updateFormParams={updateFormParams}
              activeKeywords={activeKeywords}
              isChecked={isChecked}
              OnUploadFile={OnUploadFile}
              handleTab={handleTab}
              fileURL={fileURL}
              setFileURL={setFileURL}
              updateMessage={updateMessage}
              isCreating={isCreating}
              setHashLink={setHashLink}
            />
          </TETabsPane>

          <TETabsPane show={tab === "tab2"}>
            <MintForm
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              fileURL={fileURL}
              handleSelect={handleSelect}
              updateFormParams={updateFormParams}
              OnMintNFT={OnMintNFT}
              transactionHash={transactionHash}
              hashLink={hashLink}
              viewLink={viewLink}
            />
          </TETabsPane>
        </TETabsContent>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-5 ">
        {fileURLs?.reverse().map((url, index) => (
          <>
          <div className="relative flex items-start justify-end ">
            <button
              key={index}
              onClick={() => removeItem(index)}
              className="absolute bottom-0 text-[14px] bg-[#F60C6d] hover:bg-[#F60C6d] border-none text-white h-7 cursor-pointer z-50  m-1 rounded hover:text-neutral-300"
            >
             < FaTrashAlt />
            </button>

            {loaded ? null : (
          <div className="w-full aspect-square rounded seal ">
            <label className="flex  items-center justify-center w-full h-full">
              <div className="flex flex-col items-center justify-center ">
                <Loader />
                <p className="text-sm text-white ">LOADING IMAGE...</p>
              </div>
            </label>
          </div>
        )}
            <img
              src={url}
              style={loaded ? {} : { display: "none" }}
      
              onLoad={() => setLoaded(true)}
              alt="file-url"
              className="rounded cursor-pointer shadow-lg hover:shadow-indigo-500/50 duration-200"
              onClick={() => ( setFileURL(url),  setHashLink(""))}
            />
            {/* <span className="absolute text-md bg-amber-500 text-white px-2    m-1 rounded-full">
              {index + 1}
            </span> */}
          </div>
            {/* <button
            value={index}
            onClick={() => setFileURLs(fileURLs.splice(index, 1))}
            className="absolute bottom-0 text-[14px] bg-[#F60C6d] text-white p-1 cursor-pointer z-50  m-1 rounded hover:text-neutral-300"
          >
            delete
          </button> */}
          </>
        ))}
      </div>
    </div>
  );
};

export default Create;
