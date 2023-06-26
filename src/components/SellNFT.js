import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import placeholder from "../placerdark.png";
import axios from "axios";


export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    title: "",
    description: "",
    style: "",
    artist: "",
    colour: "",
    category: "",
    price: "",
  });

  console.log(formParams)
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();

  async function disableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = true;
    listButton.style.backgroundColor = "grey";
    listButton.style.opacity = 0.3;
  }

  async function enableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = false;
    listButton.style.backgroundColor = "#A500FF";
    listButton.style.opacity = 1;
  }

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e, title, description) {
    e.preventDefault();
    // var file = e.target.files[0];
    //check for file extension


     // Create Image Function
  // const createImage = async () => {
    // setIsCreating(true);
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
        formParams.title + " " +
        formParams.description + " " +
        formParams.style + " " +
        formParams.artist + " " +
        formParams.colour + " " +
        formParams.category,
       
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
    console.log("fileIS", file, filePinata)
    //check for file extension
    setFileURL(file);
    updateMessage("Image Created...");
    // setIsCreating(false);
    // return data;
  // };


    try {
      //upload the file to IPFS
      disableButton();
      updateMessage("Uploading image.. please dont click anything!");
      const response = await uploadFileToIPFS(filePinata);
      if (response.success === true) {
        enableButton();
        updateMessage("");
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }






  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, price,  artist,
      colour,
      style,
      category, } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill in all fields!");
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
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      disableButton();
      updateMessage(
        "Uploading NFT(takes 5 mins).. please dont click anything!"
      );

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

      alert("Successfully listed your NFT!");
      enableButton();
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (e) {
      alert("Upload error" + e);
    }
  }
  // console.log("formParams: " + formParams.name)
  // console.log("Working", process.env);
  return (
    <div className="gradient-bg-services ">
      <div className="w-full items-start flex-col  md:p-10 py-6 px-4">
        <h1 className="text-4xl sm:text-4xl text-white text-gradient py-1">
          Upload & Mint NFTs
        </h1>
        <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
          Explore the crypto world.
        </p>

        <div className="form blue-glassmorphism px-8 py-8">
      
          <div className=" flex flex-col " id="nftForm">

            <form className=" blue-glassmorphism  mr-8 pb-3">

            <div className="p-5  w-full flex flex-col justify-start items-start ">
            <div className="select ">
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Title..."
                id="name"
                onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                  value={formParams.name}
              ></input>
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Description..."
                id="description"
                onChange={(e) =>
                    updateFormParams({ ...formParams, description: e.target.value })
                  }
                  value={formParams.description}
              ></input>
            </div>
            <div className="select ">
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Style..."
                id="style"
                onChange={(e) =>
                    updateFormParams({ ...formParams, style: e.target.value })
                  }
                  value={formParams.style}
              ></input>
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Category..."
                id="category"
                onChange={(e) =>
                    updateFormParams({ ...formParams, category: e.target.value })
                  }
                  value={formParams.category}
              ></input>
            </div>
            <div className="select ">
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Colour..."
                id="colour"
                onChange={(e) =>
                    updateFormParams({ ...formParams, colour: e.target.value })
                  }
                  value={formParams.colour}
              ></input>
              <input
                className="my-2 w-half rounded-sm p-2 outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                required
                type="text"
                placeholder="NFT Artist..."
                id="artist"
                onChange={(e) =>
                    updateFormParams({ ...formParams, artist: e.target.value })
                  }
                  value={formParams.artist}
              ></input>
            </div>
          </div>

          
         
             

              <div>
                <div className="px-3">
                  <label className="block text-white ml-4 " htmlFor="price">
                    Price (in ETH)
                  </label>
                  <input
                    className="m-3 p-3  w-72 rounded-sm outline-none bg-transparent shadow-2xl text-white border-none white-glassmorphism"
                    type="number"
                    placeholder="Min 0.01 ETH"
                    step="0.01"
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                  ></input>
                     {/* <label className="block text-white  mb-2 p-3" htmlFor="image">
                    Upload Image (&lt;500 KB)
                  </label> */}
             
                </div>
             
              </div>
            </form>
            <div className="flex justify-between pr-8">
               
                  <button
                    type="button"
                    onClick={OnChangeFile}
                    className="px-7 m-3 text-white"
                  >Create</button>


                      <button
                onClick={listNFT}
                type="button"
                className="text-white px-7 m-3 "
                id="list-button"
              >
                List NFT
              </button>
              
                </div>
          </div>
        
          <>
            <div className="text-red-500 text-center">
              {message}
              <img
                src={fileURL ? fileURL : placeholder}
                alt="Pinata URL"
                className="spinner mt-1"
              />

          
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
