import Navbar from "./Navbar";
import axie from "../tile.jpeg";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useContext, useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { shortenAddress } from "../utils/shortenAddress";
import { TransactionContext } from "../context/TransactionContext";

export default function NFTPage(props) {

  const { marketData } = useContext(TransactionContext);


  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };

    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
  }

  async function buyNFT(tokenId) {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Purchasing NFT... Please Wait");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      updateMessage("Success! Check your wallet");
      // updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  return (
    <div style={{ minHeight: "100vh" }} className=" mx-5 my-10 md:mx-20 ">
   <h1 className="text-4xl sm:text-5xl text-white text-gradient ">
            Detailed View
          </h1>
          {/* <div className="flex items-center">
            <p className="text-left mt-3 text-white font-light md:w-9/12 w-11/12 text-base pl-5">
              Ready to buy this NFT?
            </p>
          </div> */}


      <div className="flex  pt-5 w-full justify-evenly flex-col md:flex-row ">
        
        <div className="rounded md:w-1/2 ">
          <img src={data.image} alt="" className="rounded-lg"/>
        </div>





        <div className="text-xl   md:w-1/2 md:ml-5  space-y-5 text-white  rounded-lg  ">

          <div className="blue-glassmorphism  p-5 ">


          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 capitalize">
            {data.name}
          </h1>
          <p className="text-left my-3 text-xl text-white font-light capitalize">
           <em>"{data.description}"</em> 
          </p>
          {/* <p className="text-left my-3 text-md text-white font-light ">
          {data.collection}
          </p>
          <p className="text-left my-3 text-md text-white font-light ">
          {data.category}
          </p>
          <p className="text-left my-3 text-md text-white font-light ">
          {data.style}
          </p>
          <p className="text-left my-3 text-md text-white font-light ">
          {data.tokenId}
          </p> */}

          <p className="text-left my-3 text-md text-white font-light ">
          ID #{data.tokenId}
          </p>

          <div>
             <span className="">{data.price + " ETH"}</span>
          </div>

          {/* <p className="text-left my-3 text-md text-white font-light ">
          {data.hashLink}
          </p> */}

          <div>
            {currAddress != data.owner && currAddress != data.seller ? (
              <button
                className="enableEthereumButton bg-transparent outline-none hover:bg-[#4c46b6] text-white font-bold py-2 px-10 mt-10 rounded text-sm"
                onClick={() => buyNFT(tokenId)}
              >
                BUY
              </button>
            ) : (
              <div className="text-yellow-400 pt-3">You own this NFT</div>
            )}

            <div className="text-orange text-center mt-3">{message}</div>
          </div>



          </div>

          <div className="text-xl p-7  space-y-5 text-white  rounded-lg blue-glassmorphism  ">


          <div className="flex justify-between items-end  ">
          <div  className="text-sm">
            NFT Contract:{" "}
            <span>
              {data.owner && shortenAddress(data.owner)}
            </span>
          </div>
          <div className="text-sm">
            Seller:{" "}
            <span >
              {data.seller && shortenAddress(data.seller)}
            </span>
          </div>
          </div>





          </div>

          
        </div>

     
      


  
      


      </div>
  
    </div>
  );
}
