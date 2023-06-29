import React, { useState, useEffect, useContext } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import axios from "axios";
import NFT from "../abis/NFT.json";
import { ethers } from "ethers";
import config from "../config/config.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import Thumbnails from "./Thumbnails";
import MainImage from "./MainImage";
import InputFields from "./InputFields";
import { TransactionContext } from "../context/TransactionContext";

const AIGenerator = () => {
  const {
    currentAccount,
    handleNftData,
    nftData,
    thumbs,
    setThumbs,
    image,
    message,
    isCreating,
    setIsCreating,
    setMessage,
    active,
    setImage,
    generateAIImage,
    setActive,
  } = useContext(TransactionContext);

  const [name, setName] = useState("Artblocks AI NFT Contract");
  const [url, setURL] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [powerPoints, setPowerPoints] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [colour, setColour] = useState("");
  const [pattern, setPattern] = useState("");
  const [subject, setSubject] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingIndex, setMintingIndex] = useState(0);
  const [transactionHash, setTransactionHash] = useState();

  const [nft, setNFT] = useState(null);
  const [provider, setProvider] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    style: [],
    artist: [],
    pattern: [],
    style: [],
    subject: [],
    medium: [],
    colour: [],
    price: "",
  });


  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  //This function uploads the NFT image to IPFS
  
 //This function uploads the NFT image to IPFS
 async function OnChangeFile(e) {
  var file = e.target.files[0];
  //check for file extension

  try {
    //upload the file to IPFS
    // disableButton();
    setMessage("Uploading image.. please dont click anything!");
    const response = await uploadFileToIPFS(file);
    if (response.success === true) {
      // enableButton();
      setMessage("");
      console.log("Uploaded image to Pinata: ", response.pinataURL);
      setFileURL(response.pinataURL);
    }
  } catch (e) {
    console.log("Error during file upload", e);
  }
}

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    const nft = new ethers.Contract(
      config[network.chainId].nft.address,
      NFT,
      provider
    );
    setNFT(nft);
  };

  //  localStorage.clear();
  useEffect(() => {
    if (thumbs.length > 0) {
      localStorage.setItem("thumbs", JSON.stringify(thumbs));
    }
    if (thumbs.title !== "") {
      localStorage.setItem("formData", JSON.stringify(thumbs));
    }
  }, [thumbs]);
  useEffect(() => {
    const thumbs = JSON.parse(localStorage.getItem("thumbs"));
    if (thumbs) {
      setThumbs(thumbs);
    }

    // console.log("localStorage", localStorage);
    // const formData = JSON.parse(localStorage.getItem("formData", "style"));
    // if (formData !== "") {
    //   setFormData({
    //     ...formData,
    //     style: formData.style,
    //     title: formData.title,
    //     description: formData.description,
    //     artist: formData.artist,
    //     medium: formData.medium,
    //     colour: formData.colour,
    //     pattern: formData.pattern,
    //     subject: formData.subject,
    //   });
    // }
  }, []);

  // Create Image Button
  const submitHandler = async (e) => {
    e.preventDefault();
    // const { title, description, style, artist } = nftData;
    // if (!medium) return;
    // generateAIImage();
   createImage()


    setPowerPoints(null);
    setURL(null);
    setMetaData(null);
  };

  // Upload & Mint NFT Button
  const mintHandler = async (e, imageData) => {
    e.preventDefault();
    await uploadImage(imageData);
    // await mintImage(url);
    // setIsMinting(false);
    setActive([]);
  };
  // Create Image Function
  const createImage = async () => {
    setIsCreating(true);
    setMessage("Generating AI Image...");
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
        title +
        " " +
        description +
        " " +
        active,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data; //arrayBuffer
  
    const base64data = Buffer.from(data).toString("base64"); //raw string
  
    const img = `data:${type};base64,` + base64data; //formatted string


    const filePinata = setFile(new File([data], "image.jpeg", { type: "image/jpeg" }));

    // const filePinata = file;
    console.log("fileIS", file, filePinata)
    //check for file extension


    setImage(img);
    // setMessage("Image Created...");

    setIsCreating(false);
    return data;
  };

  const storageKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;

  // Upload Function
  const uploadImage = async (imageData, tokenURI) => {
    
    setIsMinting(true);
    setMintingIndex(thumbs.length + 1);
    setMessage("Requesting remote storage..");
    // Create instance to NFT.Storage

    const nftstorage = new NFTStorage({
      token: storageKey,
    });

    const blob = await (await fetch(image)).blob();  // formatted blob
    const imageHash = await nftstorage.storeBlob(blob);  //hash blob

    const url = `https://ipfs.io/ipfs/${imageHash}/`;  // url hash

    setMessage("Click 'Confirm' in Metamask...");


    // start mint
    const signer = await provider.getSigner();
    const transaction = await nft
      .connect(signer)
      .mint(url, { value: ethers.utils.parseUnits("0.01", "ether") });
    setMessage("Minting " + `${"'" + description + "'"}` + "...");
    await transaction.wait();

    // setIsLoading(true);
    setMessage("Minted! Storing Data...");

    const hash = transaction.hash;
    setTransactionHash(hash);
    const powerPoints = hash.slice(64, 66);
    setPowerPoints(powerPoints);

    const date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;

    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      blob: blob,
      creator: currentAccount,
      name: name,
      description: description,
      contract: nft.address,
      hash: hash,
      owner: currentAccount,
      date: date,
      powerPoints: powerPoints,
      inputData: [
        title,
        description,
        artist,
        medium,
        active,
        pattern,
        subject,
        colour,
        style,
      ],
      imageURL: url,
    });

    setURL(url);
    const metaData = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setMetaData(metaData);

    const newItem = [
      {
        account: currentAccount,
        title: title,
        description: description,
        data: [
          title,
          description,
          artist,
          medium,
          active,
          pattern,
          subject,
          colour,
          style,
          powerPoints,
        ],
        url: url,
        hash: hash,
        contract: nft.address,
        metaData: metaData,
        date: date,
      },
    ];
    setMintingIndex(thumbs.length);
    setThumbs([...thumbs, ...newItem]);
    setIsMinting(false);
    setIsLoading(true);

    // setItems((prevArr) => ([...prevArr, newItem]));
    return url;
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  // console.log("thumbs", thumbs);
  // console.log("active", active);
  // console.log("formDataAI: ", formData);

  
  // console.log("nftDataAI: ", nftData);
  // console.log("account", account);
  // console.log("currentAcc", currentAccount);
  // console.log("provider", provider);
  // console.log("metaDatai", mintingIndex);

  return (
    <div className="gradient-bg-services ">

      <>
        <div className="w-half items-start flex-col justify-between md:p-10 py-6 px-4">
          <h1 className="text-4xl sm:text-4xl text-white text-gradient py-1">
            Create & Mint NFTs
          </h1>
          <div className="flex items-center">
            <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
              Create an A.I. generated image or upload your own.
            </p>
          </div>

          <div className="form blue-glassmorphism">
            <form onSubmit={submitHandler}>
              <InputFields
                setTitle={setTitle}
                setDescription={setDescription}
                setSubject={setSubject}
                setMedium={setMedium}
                setStyle={setStyle}
                setColour={setColour}
                setArtist={setArtist}
                setPattern={setPattern}
                setFormData={setFormData}
                formData={formData}
                style={style}
                pattern={pattern}
                colour={colour}
                description={description}
                title={title}
                subject={subject}
                artist={artist}
                medium={medium}
                active={active}
                setActive={setActive}
                handleNftData={handleNftData}
                nftData={nftData}
                mintHandler={mintHandler}
                isCreating={isCreating}
                isMinting={isMinting}
                image={image}
                url={url}
                OnChangeFile={OnChangeFile}
                isUploading={isUploading}
                fileURL={fileURL}
                setChecked={setChecked}
                checked={checked}
                file={file}
              />

              {/* <CreateButton
              isCreating={isCreating}
              isMinting={isMinting}
              image={image}
              mintHandler={mintHandler}
              url={url}
              nftData={nftData}
              OnChangeFile={OnChangeFile}
              isUploading={isUploading}
              fileURL={fileURL}
              setChecked={setChecked}
              checked={checked}
            /> */}
            </form>
            <MainImage
              image={image}
              message={message}
              medium={medium}
              subject={subject}
              description={description}
              isMinting={isMinting}
              isCreating={isCreating}
              url={url}
              title={title}
              metaData={metaData}
              transactionHash={transactionHash}
              powerPoints={powerPoints}
              fileURL={fileURL}
              isUploading={isUploading}
              setChecked={setChecked}
              checked={checked}
              setImage={setImage}
              setFile={setFile}
              OnChangeFile={OnChangeFile}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default AIGenerator;

{
  /* {currentAccount ? (
        <Thumbnails
          url={url}
          thumbs={thumbs}
          isCreating={isCreating}
          image={image}
          mintingIndex={mintingIndex}
          account={currentAccount}
          isMinting={isMinting}
          transactionHash={transactionHash}
          message={message}
          isLoading={isLoading}
          setThumbs={setThumbs}
          currentAccount={currentAccount}
        />
     
      ) : (
        <div className="heading">
          Connect to account to view minted Artblocks
        </div>
      )} */
}
