import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import inblockLogo from "../images/inblocklogolight.png";

const NavBarItem = ({ title, classprops, link }) => (
  <div>
    <NavLink
      className={({ isActive }) =>
        isActive ? " text-indigo-500" : "text-white "
      }
      to={link}
    >
      <li className={`mx-5 cursor-pointer   ${classprops}`}>{title}</li>
    </NavLink>
  </div>
);

const Navbar = () => {
  const {
    currentAccount,
    connectWallet,
    ethereum,
    checksumAddress,
  } = useContext(TransactionContext);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [isHovering, setHover] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 ">
      <Link
        to="/Home"
        className="md:flex-[0.5] flex-initial justify-center items-center"
      >
        <img src={inblockLogo} alt="logo" className="w-28 cursor-pointer" />
      </Link>

      <div className="flex md:hidden">
        {!ethereum ? (
          <a target="_blank" href="https://metamask.io/">
            <button
              type="button"
              className=" nav-install"
              onClick={connectWallet}
            >
              Install
            </button>
          </a>
        ) : currentAccount === "" ? (
          <button
            type="button"
            className=" nav-connect bg-yellow-600 hover:bg-[#6c63ff]  "
            onClick={connectWallet}
          >
            Connect
          </button>
        ) : (
          <button
            type="button"
            className="  nav-connected hover:bg-[#6c63ff]"
            onClick={connectWallet}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {currentAccount !== "" && isHovering
              ? shortenAddress(checksumAddress)
              : "Connected"}
          </button>
        )}
      </div>

      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Home", "Create", "Explore", "Wallet"].map((item, index) => (
          <NavBarItem key={item + index} title={item} link={"/" + item} />
        ))}

        <li>
          {!ethereum ? (
            <a target="_blank" href="https://metamask.io/">
              <button
                type="button"
                className="px-5 mx-3 nav-install"
                onClick={connectWallet}
              >
                Install MetaMask
              </button>
            </a>
          ) : currentAccount === "" ? (
            <button
              type="button"
              className="px-5 mx-3 nav-connect bg-yellow-600 hover:bg-[#6c63ff] "
              onClick={connectWallet}
            >
              Connect
            </button>
          ) : (
            <button
              type="button"
              className="px-5 mx-3 nav-connected hover:bg-[#6c63ff]"
              onClick={connectWallet}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {currentAccount !== "" && isHovering
                ? shortenAddress(checksumAddress)
                : "Connected"}
            </button>
          )}
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
            className="z-10 fixed -top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>

            <li onClick={() => setToggleMenu(false)}>
              {["Home", "Create", "Explore", "Wallet"].map((item, index) => (
                <NavBarItem
                  classprops="my-2 text-lg"
                  key={item + index}
                  title={item}
                  link={"/" + item}
                />
              ))}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
