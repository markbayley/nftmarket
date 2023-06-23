import axie from "../tile.jpeg";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile (data) {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

    return (
        <Link to={newTo}>
        <div className="m-6 flex flex-col items-start rounded-lg md:w-72 shadow-2xl">
            <img src={IPFSUrl} alt="" className="w-72 h-72 rounded-lg object-cover" crossOrigin="anonymous" />
            <div className= "flex text-white  p-2   pt-5 -mt-4">
                <p className=" capitalize">{data.data.name}  
                &nbsp; &nbsp;"{data.data.description}"
                </p>
              
            </div>
        </div>

        </Link>
    )
}

export default NFTTile;
