import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { SiEthereum } from "react-icons/si";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const NFTTile = (data) => {
  const { favorites, setFavorites } = useContext(TransactionContext);

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);
  const link = `https://sepolia.etherscan.io/address/${data.data.owner}`;

  window.localStorage.setItem("favorites", favorites);




    // const handleFavorite = (e) => {
    //   setFavorites((prevArray => [...prevArray, data.data.tokenId])) 
    // };
    // // console.log("favorites", favorites);

    const toggleFavorite = (e) => {
      const tokenId = data.data.tokenId;
      
      // Check if the token is already in favorites
      const isFavorite = favorites.includes(tokenId);
      
      if (isFavorite) {
        // Remove the token from favorites
        setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== tokenId));
      } else {
        // Add the token to favorites
        setFavorites((prevFavorites) => [...prevFavorites, tokenId]);
      }
    };

    console.log("favorites", favorites)
 
  return (
    <div className="  backdrop-blur-[5px] p-[5%] cursor-pointer sm:w-96  w-full md:w-auto  white-glassmorphism shadow-lg hover:shadow-indigo-500/30 duration-200">
      {/* ETHERSCAN */}
      <Link to={link} target="_blank" rel="noopener noreferrer">
        <div className="w-[1.7em] h-[1.7em] rounded-full border-2  flex justify-center items-center absolute top-[6.5%] left-[6.7%] eth-card group seal hover:scale-[1.1] duration-300">
          <SiEthereum fontSize="1em" color="#fff" />
          <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-900 p-2 text-xs group-hover:scale-100 shadow-lg shadow-indigo-500/50 duration-200">
            Token&nbsp;#{data.data.tokenId} {data.data.price}&nbsp;ETH
          </span>
        </div>
      </Link>

      {/* FAVORITE */}

      <div
        // token={data.data.tokenId}
        onClick={(e) => toggleFavorite(e)}
        className="absolute top-[6%] right-[6%] bg-transparent h-9 m-0 text-[#fffefe] hover:text-[#ff3366] duration-300 hover:scale-[1.1]"
      >
        { favorites.includes(data.data.tokenId) ?
         <div className="relative">
         {/* <span class="inline-flex items-center justify-center w-4 h-4 text-[10px] text-[#ff3366] font-bold bg-white rounded-full absolute right-0 z-10">
         2
       </span> */}
          <MdFavorite fontSize="2em" color="#ff3366" className="drop-shadow"/>
          </div>
         : 
          <MdOutlineFavoriteBorder fontSize="2em" color="#ff3366" className="drop-shadow"/>
     
        }
      </div>


      {/* IMAGE */}
      <Link to={{ pathname: `/Trade/Detail/` + data.data.tokenId }} className="z-0">
        <img
          src={IPFSUrl}
          alt="thumbnail"
        />
      </Link>

      {/* TITLE */}
      <div className="title">
        <strong>{data.data.collection} </strong> &nbsp;
        <em>'{data.data.name}'</em>
      </div>
    </div>
  );
};

export default NFTTile;
