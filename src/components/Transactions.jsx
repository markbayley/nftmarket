import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BiEnvelope, BiLinkExternal } from "react-icons/bi";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  url,
}) => {
  return (
    <div className=" m-2 flex flex-1 min-w-full flex-col p-3 rounded-md hover:shadow-2xl white-glassmorphism">
      <div className="flex flex-row items-center w-full mt-1">
        <div className="flex justify-between flex-wrap w-full p-2  text-white">
          <div className="text-white text-base">
            <p className="text-[#868686] font-bold">{timestamp}</p>
          </div>
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
            className="group relative"
          >
            <p className=" text-base">From: {shortenAddress(addressFrom)}</p>
            <span className="flex absolute bottom-7 -right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Etherscan <BiLinkExternal fontSize={16} />
                    </span>
          </a>
          <MdKeyboardDoubleArrowRight
            fontSize={20}
            color="white"
            className="mt-1"
          />
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
            className="group relative"
          >
            <p className="text-base">To: {shortenAddress(addressTo)}</p>
            <span className="flex absolute bottom-7 -right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100">
                      Etherscan <BiLinkExternal fontSize={16} />
                    </span>
          </a>

          <p className="text-white text-base">{amount} ETH</p>

          <div className="group relative cursor-pointer ">
            <span className="absolute  bottom-7 -right-0 scale-0 transition-all rounded bg-gray-900 p-2 text-xs  group-hover:scale-100 ">
              {message && (
                <p className="text-white flex">
                  Message: <em className=""> &nbsp;{message}</em>{" "}
                </p>
              )}
            </span>
            <BiEnvelope fontSize={20} color="#4c46b6" className="" />
          </div>
        </div>

        {url && (
          <img
            src={url}
            alt="nature"
            className="w-full h-64  rounded-md shadow-lg object-cover"
          />
        )}
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount, checksumAddress } =
    useContext(TransactionContext);

  const filteredTransactions = transactions.filter(
    (item) =>
      item.addressTo == checksumAddress || item.addressFrom == checksumAddress
  );

  return (
    <div className="flex w-full justify-start items-center  ">
          {currentAccount && 
      <div className="flex flex-col pt-6 ">
    
          <h6 className="text-white text-1xl  text-left my-2">
            Recent Transfers
          </h6>
      

        <div className="flex flex-wrap justify-center items-center ">
          {[...filteredTransactions].reverse().map((transaction, i) => (
            <TransactionsCard
              key={i}
              {...transaction}
              checksumAddress={{ checksumAddress }}
            />
          ))}
        </div>
      </div>
}
    </div>
  );
};

export default Transactions;
