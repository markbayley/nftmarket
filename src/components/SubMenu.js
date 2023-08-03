import React from "react";
import { Link } from "react-router-dom";
import {
  TETabs,
  TETabsItem,
} from "tw-elements-react";

const SubMenu = ({
  title,
  subtitle,
  tab1,
  tab2,
  tab3,
  setMint,
  handleTab,
  tab,
  data
}) => {
  return (
    <div className="flex flex-row place-items-center justify-between flex-wrap w-full py-3">
      <div className="lg:w-1/2">
        <div className="flex items-center">
        <h1 className="text-3xl sm:text-5xl text-white leading-tight text-gradient">
          {title}
        </h1>
        &nbsp; &nbsp;
        { data &&
      
          <Link to={"/Trade"}>
            <button
              // id="colour"
              // value={data.name}
              className=" text-sm text-[#E4A11B] border px-3 h-8 rounded-full white-glassmorphism  "
            >
              #{data.name}
            </button>
          </Link>
}</div>
        <h2 className="text-left text-gradient text-lg">{subtitle}</h2>
      </div>

      <div className="flex lg:w-1/2 w-full justify-center lg:justify-end ">
        <TETabs className=" ">
          <TETabsItem
            className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
            onClick={() => (handleTab("tab1"), setMint && setMint(() => false))}
            active={tab === "tab1"}
            color="warning"
          >
            {tab1}
          </TETabsItem>

          <TETabsItem
            className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
            onClick={() => (handleTab("tab2"), setMint && setMint(() => true))}
            active={tab === "tab2"}
            color="warning"
          >
            {tab2}
          </TETabsItem>
          {tab3 && (
            <TETabsItem
              className="hover:bg-transparent hover:text-[#E4A11B] text-[16px] mt-0"
              onClick={() => handleTab("tab3")}
              active={tab === "tab3"}
              color="warning"
            >{tab3}</TETabsItem>
          )}
        </TETabs>
      </div>
    </div>
  );
};

export default SubMenu;
