import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import placeholder from "../placerdark.png";
import axios from "axios";
import { Link } from "react-router-dom";

const artists = [
  {
    name: "Artists",
  },
  {
    name: "Banksy",
  },
  {
    name: "Hasui Kawase",
  },
  {
    name: "Makoto Shinkai",
  },
  {
    name: "Greg Rutkowski",
  },
  {
    name: "Alphonse Mucha",
  },
  {
    name: "Pablo Picasso",
  },
  {
    name: "M.C. Escher",
  },
  {
    name: "Claude Monet",
  },
  {
    name: "Salvadore Dali",
  },
  {
    name: "Vincent Van Gogh",
  },
  {
    name: "Rembrandt",
  },
  {
    name: "Paul Cézanne",
  },
  {
    name: "Gustav Klimt",
  },
  {
    name: "Henry Matisse",
  },
  {
    name: "Jackson Pollock",
  },
  {
    name: "Mark Rothko",
  },
  {
    name: "Brett Whiteley",
  },
];

const styles = [
  {
    name: "Styles",
  },
  {
    name: "Hyper Realistic",
  },
  {
    name: "Cyberpunk",
  },
  {
    name: "Artstation",
  },
  {
    name: "Abstract",
  },
  {
    name: "Fantasy Art",
  },
  {
    name: "Anime",
  },
  {
    name: "Comic Book",
  },
  {
    name: "Graphic Novel",
  },
  {
    name: "Childrens Book",
  },
  {
    name: "Steampunk",
  },
  {
    name: "Pop Art",
  },
  {
    name: "Renaissance",
  },
  {
    name: "Expressionism",
  },
  {
    name: "Surrealism",
  },
  {
    name: "Realism",
  },
  {
    name: "Minimalism",
  },
  {
    name: "Impressionism",
  },
  {
    name: "Cubism",
  },
  {
    name: "Modernism",
  },
];

const mediums = [
  {
    name: "Mediums",
  },
  {
    name: "Print",
  },
  {
    name: "Sketch",
  },
  {
    name: "Digital",
  },
  {
    name: "Illustration",
  },
  {
    name: "Cinematic",
  },
  {
    name: "Lithograph",
  },
  {
    name: "Drawing",
  },
  {
    name: "Pastels",
  },
  {
    name: "Film Shot",
  },
  {
    name: "Photograhy",
  },
  {
    name: "Watercolor",
  },
  {
    name: "Oil Canvas",
  },
  {
    name: "Charcoal",
  },
  {
    name: "Ink Paint",
  },
  // {
  //   name: "Gouche",
  // },
  {
    name: "Acrylic",
  },
  {
    name: "Pencil",
  },
  {
    name: "Crayon",
  },
];

const categorys = [
  {
    name: "Categorys",
  },
  {
    name: "Cute Animal",
  },
  {
    name: "Portrait",
  },
  {
    name: "Figure",
  },
  {
    name: "Face",
  },
  {
    name: "Girl",
  },
  {
    name: "Boy",
  },
  {
    name: "Warrior",
  },
  {
    name: "Fruit Bowl",
  },
  {
    name: "Streetscape",
  },
  {
    name: "Seascape",
  },
  {
    name: "Landscape",
  },
  {
    name: "Nature",
  },

  {
    name: "Building",
  },
  {
    name: "City",
  },
  {
    name: "Vehicle",
  },
];

const colours = [
  {
    name: "Colours",
  },
  {
    name: "seagreen",
    color: "#2E8B57",
  },
  {
    name: "green",
    color: "#008000",
  },
  {
    name: "forestgreen",
    color: "#228B22",
  },
  {
    name: "limegreen",
    color: "#32CD32",
  },
  {
    name: "greenyellow",
    color: "#ADFF2F",
  },
  {
    name: "yellow",
    color: "#FFFF00",
  },
  {
    name: "gold",
    color: "#FFD700",
  },
  {
    name: "orange",
    color: "#FFA500",
  },
  {
    name: "tomato",
    color: "#FF6347",
  },
  {
    name: "red",
    color: "#FF0000",
  },
  {
    name: "crimson",
    color: "#DC143C",
  },
  {
    name: "hotpink",
    color: "#FF69B4",
  },
  {
    name: "orchid",
    color: "#DA70D6",
  },
  {
    name: "violet",
    color: "#EE82EE",
  },
  {
    name: "plum",
    color: "#DDA0DD",
  },
  {
    name: "lightpink",
    color: "#FFB6C1",
  },
  {
    name: "lightcoral",
    color: "#F08080",
  },
  // {
  //   name: "salmon", color: "#FA8072"
  // },
  {
    name: "coral",
    color: "#FF7F50",
  },
  {
    name: "darkorchid",
    color: "#9932CC",
  },
  {
    name: "mediumorchid",
    color: "#BA55D3",
  },
  {
    name: "slateblue",
    color: "#6A5ACD",
  },
  {
    name: "royalblue",
    color: "#4169E1",
  },
  {
    name: "dodgerblue",
    color: "#1E90FF",
  },
  {
    name: "steelblue",
    color: "#4682B4",
  },
  {
    name: "skyblue",
    color: "#87CEEB",
  },
  {
    name: "paleturquoise",
    color: "#AFEEEE",
  },
  {
    name: "aquamarine",
    color: "#7FFFD4",
  },
  {
    name: "turquoise",
    color: "#40E0D0",
  },
  {
    name: "cadetblue",
    color: "#5F9EA0",
  },
  {
    name: "teal",
    color: "#008080",
  },
  {
    name: "darkcyan",
    color: "#008B8B",
  },
  {
    name: "olivedrab",
    color: "#6B8E23",
  },
  {
    name: "olive",
    color: "#808000",
  },
  {
    name: "wheat",
    color: "#F5DEB3",
  },
  {
    name: "darkkhaki",
    color: "#BDB76B",
  },
  {
    name: "goldenrod",
    color: "#DAA520",
  },
  {
    name: "peru",
    color: "#CD853F",
  },
  {
    name: "chocolate",
    color: "#D2691E",
  },
  {
    name: "sienna",
    color: "#A0522D",
  },
  {
    name: "brown",
    color: "#A52A2A",
  },
];

const textures = [
  {
    name: "Textures",
  },
  {
    name: "Highly Detailed",
  },
  {
    name: "Matte",
  },
  {
    name: "Glossy",
  },
  {
    name: "Octane Render",
  },
  {
    name: "Metalic",
  },
  {
    name: "Stripes",
  },
  {
    name: "Checkered",
  },
  {
    name: "Dots",
  },
  {
    name: "Zig Zags",
  },
  {
    name: "Curves",
  },
  {
    name: "Speckled",
  },
  {
    name: "Swirls",
  },
  {
    name: "Spiked",
  },
  {
    name: "Soft",
  },
  {
    name: "Angular",
  },
  {
    name: "Smooth",
  },
  {
    name: "Rough",
  },
  {
    name: "Golden Ratio",
  },
];

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    title: "",
    description: "",
    style: "",
    artist: "",
    colour: "",
    category: "",
    medium: "",
    texture: "",
    price: "",
  });

  const [active, setActive] = useState([]);
  const [checked, setChecked] = useState(false);
  const [ isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const [powerPoints, setPowerPoints] = useState(null);
  const [ metaData, setMetaData] = useState(null);
  const [ transactionHash, setTransactionHash] = useState();
  const [hashLink, setHashLink] = useState(null);
  const [dateCreated, setDateCreated ] = useState()

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();



  console.log("hashLink", hashLink)

 

  const styleWords = active.filter((word) =>
    styles.some((style) => style.name === word)
  );

  const artistWords = active.filter((word) =>
    artists.some((artist) => artist.name === word)
  );

  const textureWords = active.filter((word) =>
    textures.some((texture) => texture.name === word)
  );

  const colourWords = active.filter((word) =>
    colours.some((colour) => colour.name === word)
  );

  const categoryWords = active.filter((word) =>
    categorys.some((category) => category.name === word)
  );

  const mediumWords = active.filter((word) =>
    mediums.some((medium) => medium.name === word)
  );

  const handleForm = (e) => {
    let title = e.target.id;
    setActive([...active, e.target.value]);
    updateFormParams({ ...formParams,  [title]: e.target.value    });
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (active.includes(e.target.value)) {
      const newActive = active.filter((item) => item !== e.target.value);
      setActive(newActive);
    } else {
      setActive((prevArr) => [...prevArr, e.target.value]);
    }
  };

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    e.preventDefault();

    if (checked) {
      var file = e.target.files[0];
      setFileURL(file);
      updateMessage("Uploading file...");

      try {
        //upload the file to IPFS
        // disableButton();
        updateMessage("Storing image..!");
        const response = await uploadFileToIPFS(file);
        if (response.success === true) {
          // enableButton();
          updateMessage("image uploaded..!");
          console.log("Image uploaded: ", response.pinataURL);
          setFileURL(response.pinataURL);
        }
      } catch (e) {
        updateMessage("Error during file upload", e);
      }

    }

    else {
    // var file = e.target.files[0];
    //check for file extension

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
          formParams.title +
          " " +
          formParams.description +
          " " +
          active,
          // formParams.style +
          // " " +
          // formParams.artist +
          // " " +
          // formParams.colour +
          // " " +
          // formParams.medium +
          // " " +
          // formParams.category,

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
    } = formParams;
    //Make sure that none of the fields are empty
    if (!price ) {
      updateMessage("Please select a price in ETH!");
      setIsMinting(false);
      return -1;
    }
    if ( !fileURL) {
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
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        updateMessage("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      updateMessage("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    setIsMinting(true);
    updateMessage(
      "Minting NFT...Hold tight!");
    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;
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
      console.log("transaction", transaction)
      setTransactionHash(transaction.hash);
      console.log("transaction", transaction)
      setHashLink(`https://sepolia.etherscan.io/tx/${transaction.hash}`);
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
console.log("transactionHash", transactionHash)
  console.log(formParams);
  console.log(active);

  console.log("file", file)
  // console.log("formParams: " + formParams.name)
  // console.log("Working", process.env);
  return (
    <div className="gradient-bg-services min-h-screen">
      <>
        <div className="w-half items-start flex-col justify-between md:p-10 py-6 px-4">

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl text-white text-gradient py-1">
            Create & Mint NFTs
          </h1>
          <div className="flex items-center">
            <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
              Create an A.I. generated image or upload your own.
            </p>
          </div>
          

          {/* Form */}
          <div className="form blue-glassmorphism  px-2">
            <form className="">
              <div className="py-5 mt-2  flex flex-col justify-start items-start   ">

                <div className="select gap-x-2 mb-1">
                  <input
                    className="my-1 w-half rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism gap-x-2"
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
                    className="my-1 w-half gap-x-2 rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism gap-x-2"
                    required
                    type="text"
                    placeholder="NFT Description..."
                    id="description"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                    value={formParams.description}
                  ></input>
                </div>

            

                <div className="check ">
                {/* <div className="tabs"  style={{position: "absolute"}}>
                    {styleWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div> */}
                  <select  
                    id="style"
                    onChange={(id) => handleForm(id)}
                  
                    className="text-white outline-none  w-half  rounded bg-[#273057] shadow-2xl border-none"
                  >
               
                    {styles.map((style, index) => (
                      <option key={index}   value={style.name} >
                        {style.name}
                      </option>
                    ))}
                  </select>




                  <select
                    id="artist"
                    onChange={(id) => handleForm(id)}
                    value={formParams.artist}
                    className="text-white outline-none blue-glassmorphism w-half  rounded bg-[#273057] shadow-2xl border-none"
                  >
                    {artists.map((artist, index) => (
                      <option key={index} value={artist.name}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="check">
                  <div className="tabs">
                    {styleWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className=" tabs">
                    {artistWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

       

                <div className="check">
                  <select
                    id="medium"
                    onChange={(id) => handleForm(id)}
                    value={formParams.medium}
                    className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
                  >
                    {mediums.map((medium, index) => (
                      <option key={index} value={medium.name}>
                        {medium.name}
                      </option>
                    ))}
                  </select>
                  <select
                    id="texture"
                    onChange={(id) => handleForm(id)}
                    value={formParams.texture}
                    className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
                  >
                    {textures.map((texture, index) => (
                      <option key={index} value={texture.name}>
                        {texture.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="check">
                  <div className=" tabs">
                    {mediumWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="tabs">
                    {textureWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>


                <div className="check gap-x-2.5 ">
                  {/* <select
                  id="category"
                  onChange={(id) => handleForm(id)} 
                  value={formParams.categorys}
                  className="text-white outline-none blue-glassmorphism w-half my-1 rounded  bg-[#273057] shadow-2xl border-none"
                >
                  {categorys.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select> */}
                     <select
                    id="colour"
                    onChange={(id) => handleForm(id)}
                    value={formParams.colour}
                    className="text-white outline-none blue-glassmorphism rounded  bg-[#273057] shadow-2xl border-none  w-[50%]"
                  >
                    {colours.map((colour, index) => (
                      <option key={index} value={colour.name}>
                        {colour.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className=" rounded outline-none text-white border-none bg-[#273057] shadow-2xl px-2  w-[50%] "
                    type="number"
                    placeholder="Min 0.01 ETH"
                    step="0.01"
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                  ></input>
             
           
                </div>
              
                
                <div className="check">
          
                  <div className=" tabs">
                    {colourWords.slice(0, 5).map((item, index) => (
                      <button
                        style={{ backgroundColor: item }}
                        className="colourButton fade-in"
                        key={index}
                        onClick={handleChecked}
                        value={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="tabs">
                    {categoryWords.slice(0, 4).map((item, index) => (
                      <button
                        key={index}
                        onClick={handleChecked}
                        value={item}
                        className={`fade-in button ${
                          active.includes(item) ? "activeButton" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

               

               {/* Buttons */}
                <div className="flex w-full justify-between text-white gap-x-3">
                  <button
                    type="button"
                    onClick={OnChangeFile}
                    // className="px-7 m-3 text-white"
                    value={isCreating ? "Creating Art..." : "Create"}
                    className={ 
                      isCreating 
                      ? "waitingButton px-7 mt-5" 
                      : isMinting ?
                      "disabledButton px-7 mt-5"
                      : "px-7 mt-5 "} 
                  >
                    Create
                  </button>

                  <button
                    onClick={listNFT}
                    value={isMinting ? "Minting Art..." : "Mint"}
                    type="button"
                    // className="text-white px-7 m-3 "
                    className={
                      isMinting 
                        ? "waitingButton px-7 mt-5"
                        : isCreating || !fileURL
                        ? "disabledButton px-7 mt-5 "
                        : "activeButtom px-7 mt-5"
                    }
                    // id="list-button"
                  >
                    Mint
                  </button>
                </div>


              </div>
            </form>


{/* Image */}
      <div className="mainimage" >
        {/* // Create */}
        {!checked ? (
          <div className="image">
            {/* Minted */}
            {!isCreating && !isMinting && fileURL  ? (
              <>
                <div>
                  <img src={fileURL} alt="AI thumbnail" />
                  { transactionHash &&
                  <div className="overlay">
                    { (
                      <span className="points">
                        <a target="_blank" href={hashLink}>
                          {powerPoints && powerPoints.toUpperCase()}
                        </a>
                      </span>
                    )}
                  </div>
}
                { transactionHash ?
                  <div className="title">
                  {formParams.name}
                    <em>"{formParams.description}"&nbsp;</em>&nbsp; <Link to="/Send">wallet</Link  >
                 
                  </div>
                  : 
                  <div className="title">
                  &nbsp;{formParams.name}
                    <em>"{formParams.description}"&nbsp;</em>
                 
                  </div>

             } 
                </div>
              </>
              // In Progress
            ) : isCreating || isMinting || (isUploading && !fileURL) ? (
              <div>
                <div className="spinner">
                  <img
                    src={fileURL ? fileURL : placeholder}
                    alt="AI thumbnail"
                    className="overlay loading"
                  />
                  <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700"></div>
                </div>
                <div className="title">&nbsp;{message}</div>
              </div>
            ) : (
              // No Image
              <div >
                <div>
                  <img
                    src={fileURL ? fileURL : placeholder}
                    alt="AI generated art"
                    className=""
                  />
                </div>
                <div className="title pb-1">&nbsp;{message ? message : "Let's Create Something!"} </div>
              </div>
            )}
          </div>
        ) : (
          //Upload
          <div className="flex items-center justify-center w-full h-96 pb-8">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full sm:h-64 md:h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                {!fileURL ? (
                  // No Image Uploaded
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                ) : (
                  //Image Uploaded
                  <>
                  <div className="">
                  <img src={fileURL} alt="AI generated art" className="" />
                  </div>
                  
                  </>
                )}

            { !fileURL  &&
            <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x800px)
                </p>
                </>
             }

              </div>
              <div className="title pt-1">&nbsp;{message ? message : "Let's Create Something!"} </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden "
                // onChange={(e) => uploadLocally(e)}
                onChange={OnChangeFile}
              />
            </label>
          </div>
        )}

        {/* Toggle */}
        <div className="flex items-center">
          <p className={ checked ? "inline text-left text-[#888888] font-light md:w-9/12 w-11/12 text-base my-3" : "inline text-left text-white font-light md:w-9/12 w-11/12 text-base my-3"}>
            Create&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <label className="relative inline-flex items-center cursor-pointer my-3">
            <input
              type="checkbox"
              value=""
              className="sr-only peer "
              onChange={() => (
                setChecked(!checked), 
                setFileURL(null)
              )
              }
            ></input>

            <div className="w-14 h-7 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              <p className={ checked ? "inline text-left text-white font-light md:w-9/12 w-11/12 text-base" :  "inline text-left text-[#888888] font-light md:w-9/12 w-11/12 text-base"    }>
                Upload{" "}
              </p>
            </span>
          </label>
        </div>
        {/* {message} */}
      </div>



          </div>
        </div>
      </>
    </div>
  );
}
