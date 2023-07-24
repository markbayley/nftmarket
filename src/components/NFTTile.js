import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import ethPlacer from "../images/eth.webp";

function NFTTile(data) {
  // console.log("data", data)

  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  const link = `https://sepolia.etherscan.io/address/${data.data.owner}`;
  // console.log("link", link)

  return (
    <div className=" hover:scale-[1.03] duration-300 backdrop-blur-[5px] p-5 cursor-pointer sm:w-96 lg:w-[350px] w-full white-glassmorphism">

      <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center absolute top-7 left-7 eth-card  seal ">
        <SiEthereum fontSize={21} color="#fff" />
      </div>
      </a>

      <Link to={newTo}>
      <img src={data.data.image ? data.data.image : IPFSUrl} alt="thumbnail" />
      </Link>
      <div className="title">
        <strong>{data.data.collection} </strong> &nbsp;
        <em>'{data.data.name}'</em>
      </div>
    </div>

    // <div className="cursor-pointer">
    //   <div
    //     className={
    //       "p-4 my-2 scale-[1] hover:scale-[1.03] duration-300  sm:w-96 lg:w-[350px] flex flex-col justify-center items-center white-glassmorphism relative"
    //     }
    //   >
    //     <Link to={newTo}>
    //       <img src={ data.data.image ? data.data.image : IPFSUrl    } alt="thumbnail" />
    //     </Link>

    //     <a href={link} target="_blank" rel="noopener noreferrer">
    //       <div className="w-10 h-10 rounded-full border  seal flex justify-center items-center absolute top-5 left-5 eth-card group ">
    //         <span className="absolute bottom-10 scale-0 transition-all rounded bg-[#6c63ff] p-2 text-xs group-hover:scale-100">
    //           Etherscan&nbsp;Seal
    //         </span>
    //        <div className="" > <SiEthereum fontSize={21} /></div>
    //       </div>
    //     </a>

    //     {/* <Link to={link}  target="_blank" rel="noopener noreferrer" >
    //         <div className="absolute top-7 right-7 ">
    //         <BsInfoCircle fontSize={20} color="#fff" />
    //         </div>
    //         </Link> */}

    //     <div className="title w-full  ">
    //       <strong> {data.data.collection}</strong> &nbsp;<em>'{data.data.name}'</em>
    //       &nbsp; &nbsp;
    //     </div>
    //   </div>
    // </div>
  );
}

export default NFTTile;
