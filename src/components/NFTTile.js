import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

function NFTTile(data) {
  // console.log("data", data)

  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  const link = `https://sepolia.etherscan.io/address/${data.data.owner}`;
  // console.log("link", link)

  return (
    <div className="">
      <div
        className={
          // data.data.subtitle.includes("Kyoto") ? "p-5 m-3  sm:w-96 md:w-[345px] flex flex-col justify-center items-center rounded-lg seal relative" :
          // data.data.subtitle.includes("Summer") ?  "p-5 m-3  sm:w-96 md:w-[345px] flex flex-col justify-center items-center white-glassmorphism relative":
          "p-5 m-3  sm:w-96 md:w-[345px] flex flex-col justify-center items-center blue-glassmorphism relative"
        }
      >
        <Link to={newTo}>
          <img src={IPFSUrl ? IPFSUrl : data.data.image} alt="" />
        </Link>

        <Link to={link} target="_blank" rel="noopener noreferrer">
          <div className="w-9 h-9 rounded-full border seal flex justify-center items-center absolute top-7 left-7 eth-card group ">
            <span className="absolute  bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
              Verify&nbsp;NFT
            </span>
            <SiEthereum fontSize={21} color="#fff" />
          </div>
        </Link>

        {/* <Link to={link}  target="_blank" rel="noopener noreferrer" >
            <div className="absolute top-7 right-7 ">
            <BsInfoCircle fontSize={20} color="#fff" />
            </div>
            </Link> */}

        <div className="title ">
          <strong> {data.data.name}</strong> &nbsp;<em>{data.data.subtitle}</em>
          &nbsp; &nbsp;
          <div className="group cursor-pointer">
            <span className="absolute  bottom-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
             link to metadata
            </span>
            <a href={data.data.metadata} target="_blank" rel="noopener noreferrer"> <BsInfoCircle fontSize={18} color="#888888" className="mt-1" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTTile;
