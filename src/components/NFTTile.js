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
        <div className="m-3 flex flex-col items-center rounded-lg md:w-72 ">
            <img src={IPFSUrl} alt=""className="w-72 h-72 rounded object-cover" crossOrigin="anonymous" />
            <div className= "title">
                <p className="">{data.data.name}  
                &nbsp;<em>"{data.data.description}"</em>
                </p>
              
            </div>
        </div>

        </Link>
    )
}

export default NFTTile;
