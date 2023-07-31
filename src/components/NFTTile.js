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
  const [hearted, setHearted] = useState(false);

  const Favorite = (token) => {

    const handleFavorite = (e) => {
      setHearted(!hearted);
      setFavorites((prevArray => [...prevArray, token.data.data.tokenId])) 
    };
    // console.log("favorites", favorites);
    return (
      <div
        token={token}
        onClick={(e) => handleFavorite(e)}
        className="absolute top-[6%] right-[6%] bg-transparent h-9 m-0 text-white hover:text-[#ff3366] duration-300 z-50"
      >
        {!hearted ? (
          <MdOutlineFavoriteBorder fontSize="2em" />
        ) : (
          <MdFavorite fontSize="2em" color="#ff3366" />
        )}
      </div>
    );
  };

  return (
    <div className="  backdrop-blur-[5px] p-[5%] cursor-pointer sm:w-96  w-full md:w-auto  white-glassmorphism shadow-lg hover:shadow-indigo-500/30 duration-200">
      {/* ETHERSCAN */}
      <Link to={link} target="_blank" rel="noopener noreferrer">
        <div className="w-[2em] h-[2em] rounded-full border  flex justify-center items-center absolute top-[6%] left-[6%] eth-card group seal hover:scale-[1.1] duration-300">
          <SiEthereum fontSize="1em" color="#fff" />
          <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-900 p-2 text-xs group-hover:scale-100 shadow-lg shadow-indigo-500/50 duration-300">
            Token&nbsp;#{data.data.tokenId} {data.data.price}&nbsp;ETH
          </span>
        </div>
      </Link>

      {/* FAVORITE */}
      <Favorite data={data} token={data.data.tokenId} />

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
