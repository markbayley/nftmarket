import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

// import logo from "./../images/logo.png";

const NavBarItem = ({ title, classprops, link }) => (
 

  <>
   <Link to={link}>
  <li className={`mx-4 cursor-pointer hover:border-b-2  ${classprops}`}>
   {title}
  </li>
  </Link>
</>
 
);

// {location.pathname === "/sellNFT" ?
// <li className='border-b-2 hover:pb-0 p-2 text-black'>
//   <Link to="/sellNFT">Create</Link>
// </li>
// :
// <li className='hover:border-b-2 hover:pb-0 p-2'>
//   <Link to="/sellNFT">Create</Link>
// </li>
// }

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-60");
    ethereumButton.classList.remove("bg-blue-70");
    ethereumButton.classList.add("hover:bg-blue-60");
    ethereumButton.classList.add("bg-blue-70");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    // if(chainId !== '0x5')
    // {
    //   //alert('Incorrect network! Switch your metamask network to Rinkeby');
    //   await window.ethereum.request({
    //     method: 'wallet_switchEthereumChain',
    //     params: [{ chainId: '0x5' }],
    //  })
    // }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        // console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 gradient-bg-services ">
      <Link
        to="/"
        className="md:flex-[0.5] flex-initial justify-center items-center"
      >
        <img src={fullLogo} alt="logo" className="w-32 cursor-pointer" />
      </Link>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Exchange", "Upload", "Create", "Wallet"].map((item, index) => (
          <NavBarItem key={item + index} title={item} link={"/" + item} />
        ))}

        <li>
          <button
            className="enableEthereumButton bg-[#2546bd] py-2 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#254ccd] border-none"
            onClick={connectWebsite}
          >
            {connected ? "Connected" : "Connect Wallet"}
          </button>
        </li>
      </ul>

      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Exchange", "Upload", "Create", "Wallet"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
            <div className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "0x" ? "":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,5)+'...'+(currAddress.substring(38,42))):""}
        </div>
      </div>
  
    </nav>
  );
};

export default Navbar;
