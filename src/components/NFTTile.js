import { BrowserRouter as Router, Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";

const NFTTile = (data) => {
  const { favorites, setFavorites, marketData } =
    useContext(TransactionContext);
  const link = `https://sepolia.etherscan.io/address/${data?.data?.owner}`;

  window.localStorage.setItem("favorites", favorites);

  const toggleFavorite = (e) => {
    const tokenId = data.data.tokenId;
    const isFavorite = favorites.includes(tokenId);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== tokenId)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, tokenId]);
    }
  };

  const [loaded, setLoaded] = useState(false);

  return (
    <div className=" backdrop-blur-[5px] p-[5%]  w-full md:w-auto  white-glassmorphism shadow-lg hover:shadow-indigo-500/30 duration-200 z-10">
      {/* ETHERSCAN */}
      <Link
        to={link}
        target="_blank"
        rel="noopener noreferrer"
        className="z-50"
      >
        {data.data.seal === "Yes" && (
          <div className="w-[2em] h-[2em] rounded-full border  flex justify-center items-center absolute top-[6.5%] left-[6.7%] eth-card group seal  duration-300">
            <SiEthereum fontSize="1em" color="#fff" />
            <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-900 p-2 text-xs group hover:scale-100 shadow-lg shadow-indigo-500/50 duration-200 z-50">
              Token&nbsp;#{data.data.tokenId} {data.data.price}&nbsp;ETH
            </span>
          </div>
        )}
      </Link>

      {/* FAVORITE */}
      <div
        onClick={(e) => toggleFavorite(e)}
        className="absolute top-[6%] right-[6%] bg-transparent h-9 m-0 text-[#fffefe] hover:text-[#ff3366] duration-300 hover:scale-[1.1] cursor-pointer "
      >
        {favorites.includes(data.data.tokenId) ? (
          <div className="relative">
            <MdFavorite
              fontSize="2.2em"
              color="#ff3366"
              className="drop-shadow"
            />
          </div>
        ) : (
          <MdOutlineFavoriteBorder
            fontSize="2.2em"
            color="#ff3366"
            className="drop-shadow"
          />
        )}
      </div>

      {/* IMAGE */}
      <Link
        to={{ pathname: `/Explore/Detail/` + data.data.tokenId }}
        className="z-0"
      >
        {/* { marketData ? (
          <img src={data?.data?.image} alt="thumbnail" />
        ) : (
          <Loader />
        )} */}

        {loaded ? null : (
          <div className="w-full aspect-square rounded seal ">
            <label className="flex  items-center justify-center w-full h-full">
              <div className="flex flex-col items-center justify-center ">
                <Loader />
                <p className="text-sm text-white ">LOADING NFT DATA...</p>
              </div>
            </label>
          </div>
        )}

        <img
          style={loaded ? {} : { display: "none" }}
          src={data?.data?.image}
          onLoad={() => setLoaded(true)}
          alt="thumbnail"
          className="rounded cursor-pointer w-full"
        />
      </Link>

      {/* TITLE */}
      <div className="flex justify-center text-[#868686] pt-3">
        <strong>{data.data.collection}&nbsp; </strong>&nbsp;
        <em>'{data.data.name}'</em>
      </div>
      {/* <div className=" flex w-full text-[#868686] justify-around text-xs pt-1">
        <span className="border border-indigo-500 px-2 rounded">{data.data.price}ETH</span>
        <span className="border border-teal-700 px-2 rounded">{data.data.listing}</span>
        <span className="border border-amber-600 px-2 rounded">#{data.data.tokenId}</span>
        </div> */}
    </div>
  );
};

export default NFTTile;
