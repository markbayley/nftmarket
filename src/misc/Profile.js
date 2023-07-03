import Navbar from "../components/Navbar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../abis/Marketplace.json";
import axios from "axios";
import { useContext, useEffect } from "react";
import NFTTile from "../components/NFTTile";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
import Thumbnails from "./Thumbnails";
import { TransactionContext } from "../context/TransactionContext";

export default function Profile() {
  const {
    currentAccount,
    getNFTData,
    walletData,
    walletAddress,
    totalPrice,
    tokenId,
    thumbs,
    setThumbs,
    walletBalance,

    
  } = useContext(TransactionContext);

  

  useEffect(() => {
    getNFTData(tokenId);
  }, [walletData]);



  return (
<>


  
      
        
     
   
          
         
      
   </> 

  );
}
