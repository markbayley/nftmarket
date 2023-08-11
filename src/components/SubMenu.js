import React from "react";
import { Link } from "react-router-dom";
import { TETabs, TETabsItem } from "tw-elements-react";
import { FaEye, FaPaintBrush, FaStamp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const SubMenu = ({
  title,
  subtitle,
  tab0,
  tab1,
  tab2,
  tab3,
  setMint,
  handleTab,
  tab,
  data,
  backLink,
  tokenId,
  checksumAddress,
  collection,
  formParams,
  creatorAddress,
  id
}) => {
  // console.log("dataSM", data[data?.length - 1])
  console.log("backSMtidca", backLink, tokenId, creatorAddress);

  let navigate = useNavigate();
  return (
    <div className="flex flex-row place-items-center justify-between flex-wrap w-full pt-3 pl-2">
      <div className="lg:w-1/3">
        <div className="flex items-center whitespace-nowrap">
          <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient">
            {title}
          </h1>
          &nbsp; &nbsp;
        
            <Link to={"/Trade"}>
              <button
                // id="colour"
                // value={data.name}
                className=" text-sm text-[#E4A11B] border px-3 h-8 rounded-full white-glassmorphism capitalize "
              >
                #
                {(checksumAddress && shortenAddress(checksumAddress)) ||
                  data?.collection || formParams?.collection || creatorAddress || id || "Collection"}
              </button>
            </Link>
    
        </div>
        <h2 className="text-left text-gradient text-lg">{subtitle}</h2>
      </div>

      {tab1 === "Create" && (
        <ol className="flex items-center justify-center md:justify-end w-1/2 md:w-1/4 pt-2 xl:mr-[10%]">
          <li
            className={
              tab === "tab1"
                ? "relative flex w-full items-center  after:w-full   after:border-[#6c63ff] after:border"
                : "relative flex w-full items-center  after:w-full   after:border-amber-500 after:border"
            }
          >
            <span
              className={
                tab === "tab1"
                  ? "absolute flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full shrink-0 animate-ping"
                  : "absolute flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full shrink-0 "
              }
            >
              <FaPaintBrush color="#ffffff" />
            </span>
            <span
              className={
                tab === "tab1"
                  ? "absolute flex items-center justify-center w-8 h-8 bg-slate-800 rounded-full shrink-0 border-amber-500 border-2"
                  : "absolute flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full shrink-0 border-amber-500 border-2"
              }
            >
              <FaPaintBrush color="#ffffff" />
            </span>
          </li>

          <li
            className={
              tab === "tab2"
                ? "relative flex w-full items-center  after:w-full  after:border-[#6c63ff] after:border"
                : tab === "tab3"
                ? "relative flex w-full items-center  after:w-full  after:border-amber-500 after:border"
                : "relative flex w-full items-center  after:w-full  after:border-[#6c63ff] after:border"
            }
          >
            <span
              className={
                tab === "tab1"
                  ? "absolute border-2 border-[#6c63ff] bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0"
                  : tab === "tab2"
                  ? "absolute bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 animate-ping border-amber-500 border-2"
                  : "absolute bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-amber-500 border-2"
              }
            >
              <FaStamp color="#ffffff" />
            </span>
            <span
              className={
                tab === "tab1"
                  ? "absolute border-2 border-[#6c63ff] bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0"
                  : tab === "tab2"
                  ? "absolute bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-amber-500 border-2"
                  : "absolute bg-amber-500 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-amber-500 border-2"
              }
            >
              <FaStamp color="#ffffff" />
            </span>
          </li>

          <li className="">
            <span
              className={
                tab === "tab1" || tab === "tab2"
                  ? "flex items-center justify-center w-8 h-8 border-2 border-[#6c63ff] bg-slate-800 rounded-full shrink-0"
                  : "flex items-center justify-center w-8 h-8 bg-slate-800 rounded-full animate-pulse shrink-0 border-amber-500 border-2"
              }
            >
              <FaEye color="#ffffff" />
            </span>
          </li>
        </ol>
      )}

      <div className=" flex lg:w-auto w-full justify-center lg:justify-end ">
        <TETabs className=" flex items-center ">
        { tab1 === "View" &&  
        <Link to={{ pathname: `/Trade` }}>
        <TETabsItem
            className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
            onClick={() => (handleTab("tab0"), setMint && setMint(() => false))}
            active={tab === "tab0"}
            color="warning"
          >
            {tab0}
          </TETabsItem>
          </Link>
}

          <TETabsItem
            className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
            onClick={() => (handleTab("tab1"), setMint && setMint(() => false))}
            active={tab === "tab1"}
            color="warning"
          >
            {tab1}
          </TETabsItem>

          {tab2 === "Back" ? (
            // <Link  to={{ pathname: `/Trade/Detail/${backLink}` }} >
            <Link to={-1}>
              <TETabsItem
                className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
                // onClick={() => handleTab("tab3")}
                // onClick={() => navigate(-1)}
                active={tab === "tab2"}
                color="warning"
              >
                {tab2}
              </TETabsItem>
            </Link>
          ) : (
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
              onClick={() => (
                handleTab("tab2"), setMint && setMint(() => true)
              )}
              active={tab === "tab2"}
              color="warning"
            >
              {tab2}
            </TETabsItem>
          )}

          {tab2 === "Mint" ? (
            // <Link  to={{ pathname: `/Trade/Detail/${data && data[data.length - 1]?.tokenId}` }} >
            <Link to={{ pathname: `/Trade` }}>
              <TETabsItem
                className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] "
                onClick={() => handleTab("tab3")}
                active={tab === "tab3"}
                color="warning"
              >
                {tab3}
              </TETabsItem>
            </Link>
          ) : tab2 === "Trade" ? (
            <Link to={{ pathname: `/Wallet ` }}>
              <TETabsItem
                className="hover:bg-transparent hover:text-[#E4A11B] text-[16px]"
                onClick={() => handleTab("tab3")}
                active={tab === "tab3"}
                color="warning"
              >
                {tab3}
              </TETabsItem>
            </Link>
          ) : (
            tab3 && (
              <TETabsItem
                className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
                onClick={() => handleTab("tab3")}
                active={tab === "tab3"}
                color="warning"
              >
                {tab3}
              </TETabsItem>
            )
          )}
        </TETabs>
      </div>
    </div>
  );
};

export default SubMenu;
