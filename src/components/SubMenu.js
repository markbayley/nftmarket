import React from "react";
import { Link } from "react-router-dom";
import { TETabs, TETabsItem } from "tw-elements-react";
import { FaEye, FaPaintBrush, FaStamp } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

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
  setIsChecked,
  isChecked,
  marketData,
}) => {
  const viewLink =
    marketData && marketData[marketData?.length - 1].tokenId?.toString();

  return (
    <div className="flex flex-row place-items-center justify-between flex-wrap w-full pt-3 pl-2">
      <div className="w-full lg:w-1/4">
        {/* HEADING */}
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

      {/* GENERATE OR UPLOAD BUTTONS*/}
      {tab1 === "Create" && (
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
            />{" "}
            &nbsp;Generate&nbsp;
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
            />
            &nbsp;Upload&nbsp;
          </button>
        </div>
      )}

      {/* TABS */}
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
