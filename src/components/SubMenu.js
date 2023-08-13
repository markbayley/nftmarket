import React from "react";
import { Link } from "react-router-dom";
import { TETabs, TETabsItem } from "tw-elements-react";
import { FaEye, FaPaintBrush, FaStamp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";
import {
  MdCurrencyExchange,
  MdOutlineCurrencyExchange,
  MdOutlineFileUpload,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

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
  setTab,
  data,
  backLink,
  tokenId,
  checksumAddress,
  collection,
  formParams,
  creatorAddress,
  id,
  setIsChecked,
  isChecked,
  marketData,
  progress,
}) => {
  const viewLink =
    marketData && marketData[marketData?.length - 1].tokenId?.toString();
  console.log("viewLink", viewLink);
  // console.log("backSMtidca", backLink, tokenId, creatorAddress);

  // let navigate = useNavigate();
  return (
    <div className="flex flex-row place-items-center justify-between flex-wrap w-full pt-3 pl-2">
      <div className="w-full lg:w-1/4">
        <div className="flex items-center whitespace-nowrap">
          <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient">
            {title}
          </h1>
          {/* &nbsp; &nbsp;
        
            <Link to={"/Trade"}>
              <button
                // id="colour"
                // value={data.name}
                className=" text-sm text-[#E4A11B] border px-3 h-8 rounded-full white-glassmorphism capitalize "
              >
                #
                {(checksumAddress && shortenAddress(checksumAddress)) ||
                  data?.collection || formParams?.collection || creatorAddress || id || ""}
              </button>
            </Link> */}
        </div>
        <h2 className="text-left text-gradient text-lg">{subtitle}</h2>
      </div>

    {tab1 == "Create" ?
    <>
      <div className="flex items-center py-2 text-[#868686] ">
    
   
        <button
          className={
            !isChecked
              ? "flex items-center bg-teal-500 text-white  border px-3 h-10 rounded-full white-glassmorphism  hover:bg-teal-500 "
              : "flex items-center text-neutral-400 border px-3 h-10 rounded-full white-glassmorphism  hover:bg-transparent hover:text-teal-500"
          }
          onClick={() => setIsChecked(() => false)}
        >
              <FaPaintBrush
          fontSize={16}
          // className={!isChecked ? "text-white" : ""}
        /> &nbsp;Generate&nbsp;
        </button>
      &nbsp; &nbsp;
     
     
        <button
          className={
            isChecked
              ? "flex items-center justify-between bg-teal-500 text-white  border px-4 h-10 rounded-full white-glassmorphism  hover:bg-teal-500 "
              : "flex items-center justify-between text-neutral-400 border px-4 h-10 rounded-full white-glassmorphism  hover:bg-transparent hover:text-teal-500"
          }
          onClick={() => setIsChecked(() => true)}
        >
             <MdOutlineFileUpload
          fontSize={24}
          // className={isChecked ? "text-white" : ""}
        /> 
     
     &nbsp;Upload&nbsp;
        </button>
      </div>

      {/* PROGRESS */}
      {/* <ol className="flex items-center justify-center md:justify-end w-[85%] md:w-1/5 pt-2 lg:pt-0">

        Create
        <li
          className={
            progress === "Minted" || "Viewed" || "Traded"
              ? "relative flex w-full items-center  after:w-full  after:border-indigo-500 after:border"
              : "relative flex w-full items-center  after:w-full   after:border-slate-700 after:border"
          }
        >
          <span
            className={
              progress !== ""
                ? "absolute flex items-center justify-center w-8 h-8 bg-indigo-700 rounded-full shrink-0 border-indigo-500 border-2"
                : "absolute flex items-center justify-center w-8 h-8 bg-slate-800 rounded-full shrink-0 border-indigo-500 border-2"
            }
          >
       {  isChecked ?         
          <MdOutlineFileUpload
          color="#ffffff" 
          fontSize={24}
          className="fade-in"
       /> 
         :
          <FaPaintBrush color="#ffffff"    className="fade-in"/>
        
       }
          </span>
        </li>

        Mint
        <li
          className={
            progress ===  "Viewed" || "Traded"
              ? "relative flex w-full items-center  after:w-full  after:border-indigo-500 after:border"
              : "relative flex w-full items-center  after:w-full  after:border-slate-700 after:border"
          }
        >
          <span
            className={
            progress === "Minted"
                ? "absolute bg-indigo-700 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-indigo-500 border-2"
                : "absolute border-2 border-slate-700 bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0"
            }
          >
            <FaStamp color="#ffffff" />
          </span>
        </li>

        View
        <li
          className={
         
            progress ===  "Traded"
              ? "relative flex w-full items-center  after:w-full  after:border-indigo-500 after:border"
              : "relative flex w-full items-center  after:w-full  after:border-slate-700 after:border"
          }
        >
          <span
            className={
              progress === "Viewed"
              ? "absolute bg-indigo-700 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-indigo-500 border-2 " :
              progress ===  "Traded"
                ? "absolute bg-indigo-700 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-indigo-500 border-2"
                : " bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-slate-700 border-2"
            }
          >
            <FaEye color="#ffffff" />
          </span>
        </li>

        Trade
        <li className="">
          <span
            className={
              progress === "Traded"
                ? "absolute bg-indigo-700 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-indigo-500 border-2"
                : " bg-slate-800 flex items-center justify-center w-8 h-8  rounded-full  shrink-0 border-slate-700 border-2"
            }
          >
            <MdOutlineCurrencyExchange color="#ffffff" />
          </span>
        </li>
      </ol> */}
      </>
            :
            ""
      }
      

      <div className=" flex lg:w-auto w-full justify-center lg:justify-end">
        <TETabs className=" flex items-center ">
          {tab1 === "View" && (
            <Link to={{ pathname: `/Explore` }}>
              <TETabsItem
                className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
                onClick={() => (
                  handleTab("tab0"), setMint && setMint(() => false)
                )}
                active={tab === "tab0"}
                color="warning"
              >
                {tab0}
              </TETabsItem>
            </Link>
          )}

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
          <Link to={{ pathname: `/Explore` }}>
       {/* <Link to={{ pathname: `/Explore/Detail/${viewLink}` }}> */}
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
            ""
          ) : (
            // <Link to={{ pathname: `/Wallet ` }}>
            //   <TETabsItem
            //     className="hover:bg-transparent hover:text-[#E4A11B] text-[16px]"
            //     onClick={() => handleTab("tab3")}
            //     active={tab === "tab3"}
            //     color="warning"
            //   >
            //     {tab3}
            //   </TETabsItem>
            // </Link>
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
