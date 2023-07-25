import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import NFTTile from "./NFTTile";
import { TETabs, TETabsItem } from "tw-elements-react";

const CollectionPage = () => {
  const {
    filteredResults,
    tab,
    handleTab,
    collection,
    id,
  } = useContext(TransactionContext);

  return (
    <div className="fade-in md:mx-[3%]">
      <div className="flex flex-wrap">
        <div className="flex w-full items-center lg:w-1/2 pl-4 pt-2 md:pt-0 ">
          <h1 className="text-3xl text-gradient capitalize">
            {id}
          </h1>
          &nbsp;&nbsp;
          <button
            id="colour"
            value={collection}
            className="flex items-center text-sm text-white border px-3 h-8 rounded-full white-glassmorphism"
          >
            #{collection}
          </button>
        </div>

        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <TETabs>
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleTab("tab1")}
              active={tab === "tab1"}
            >
              For Sale
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleTab("tab2")}
              active={tab === "tab2"}
            >
              Just Sold
            </TETabsItem>
            <TETabsItem
              className="hover:bg-transparent"
              onClick={() => handleTab("tab3")}
              active={tab === "tab3"}
            >
              Newest
            </TETabsItem>
          </TETabs>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 ">
          {filteredResults.slice().reverse().map((data) => (
            <NFTTile data={data} key={data.id} />
          ))}
        </div>
      
    </div>
  );
};

export default CollectionPage;

