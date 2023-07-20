import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { contractABI, contractAddress } from "../utils/constants";
import { generatorABI, generatorAddress } from "../utils/constants";
import { marketplaceABI, marketplaceAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createTransactionContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

const createMarketplaceContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const marketplaceContract = new ethers.Contract(
    marketplaceAddress,
    marketplaceABI,
    signer
  );

  return marketplaceContract;
};

export const TransactionsProvider = ({ children }) => {

  //CONNECTION
  const [currentAccount, setCurrentAccount] = useState("0x");
  const [provider, setProvider] = useState(null);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return console.log("Install MetaMask");

      setProvider(ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No Account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return console.log("Install");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      console.log("No ethereum object CW");
    }
  };


  useEffect(() => {
    checkIfWalletIsConnect();
  }, [currentAccount, provider]);



  //TRANSACTIONS
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleTransactionForm = (e, name) => {
    setTransactionData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionContract = createTransactionContract();
        const currentTransactionCount =
          await transactionContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      console.log("No ethereum object TE");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionContract = createTransactionContract();

        const availableTransactions =
          await transactionContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present GATS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = transactionData;
        const transactionContract = createTransactionContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );

        setIsLoading(true);
        await transactionHash.wait();
        setIsLoading(false);

        const transactionsCount =
          await transactionContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
      } else {
        console.log("No ethereum object ST");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object ST");
    }
  };

  useEffect(() => {
    checkIfTransactionsExists();
  }, [transactionCount]);





  //MARKETPLACE
  const [marketData, updateMarketData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleCollection = (e) => {
    let collection = e.target.value;
    console.log(collection);
    const results = marketData.filter((item) => item.name == collection);
    setFilteredResults(results);
  };

  const getAllNFTs = async () => {
    const ethers = require("ethers");

    try {
      if (ethereum) {
        //Get providers and signers
        const marketplaceContract = createMarketplaceContract();
        //Pull the deployed contract instance
        const transaction = await marketplaceContract.getAllNFTs();
        console.log("transactionGA", transaction);
        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(
          transaction.map(async (i) => {
            var tokenURI = await marketplaceContract.tokenURI(i.tokenId);
            // console.log("getting this tokenUri", tokenURI);
            tokenURI = GetIpfsUrlFromPinata(tokenURI);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.image,
              name: meta.name,
              description: meta.description,
              subtitle: meta.subtitle,
              attributes: meta.attributes,
              metadata: tokenURI,
            };
            return item;
          })
        );

        updateMarketData(items);
      } else {
        console.log("Ethereum is not present GANFTs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getAllNFTs();
  }, [marketData, filteredResults]);

  //CREATE
  const [activeKeywords, setActiveKeywords] = useState(
    [],
    localStorage.getItem("activeKeywords")
  );
  const [fileURL, setFileURL] = useState(null, localStorage.getItem("fileURL"));
  const [formParams, updateFormParams] = useState(
    {
      title: "",
      subtitle: "",
      description: "",
      theme: "",
      style: "",
      artist: "",
      colour: "",
      medium: "",
      texture: "",
      points: "",
      price: "",
    },
    localStorage.getItem("formParams")
  );

  console.log(localStorage);

  //PROFILE WALLET
  const [walletData, updateWalletData] = useState([]);
  const [walletDataFetched, updateWalletFetched] = useState(false);
  const [walletAddress, updateWalletAddress] = useState();
  const [totalPrice, updateTotalPrice] = useState("0");
  const [walletBalance, updateWalletBalance] = useState();


  const handleAccountChange = async (...args) => {
    // you can console to see the args
    const accounts = args[0];
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    const amount = await provider.getBalance(addr);
    const bal = parseInt(amount._hex) / 10 ** 18;
    console.log("bal", bal);
    // if no accounts that means we are not connected
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask");
    } else if (accounts[0] !== currentAccount) {
      getNFTData();
      setCurrentAccount(accounts[0]);
      updateWalletBalance(bal);
    }
  };

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange) 
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  }, []);


  window.onload = function() {
    handleAccountChange()
}

  const handleProfile = (e, name) => {
    updateProfileParams((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const [profileParams, updateProfileParams] = useState(
    {
      user: "",
      country: "",
      bio: "",
      website: "",
      profileUrl: "",
      address: currentAccount,
    },
    localStorage.getItem("profileParams")
  );

  const getNFTData = async (tokenId) => {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    // console.log("contractP", contract)
    try {
      if (ethereum) {
        //Pull the deployed contract instance
        const marketplaceContract = createMarketplaceContract();
        //create an NFT Token //get the transactions
        const transaction = await marketplaceContract.getMyNFTs();
        // console.log("transactionP", transaction)
        /*
         * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
         * and creates an object of information that is to be displayed
         */
        const items = await Promise.all(
          transaction.map(async (i) => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.image,
              name: meta.name,
              subtitle: meta.subtitle,
              description: meta.description,
              metadata: tokenURI,
            };
            sumPrice += Number(price);
            return item;
          })
        );

        updateWalletData(items);
        updateWalletFetched(true);
        // updateWalletAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const params = useParams();
  const tokenId = params.tokenId;
  // if (!walletDataFetched) getNFTData(tokenId);

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();

    getNFTData(tokenId);
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        setCurrentAccount,
        isLoading,
        sendTransaction,
        handleTransactionForm,
        transactionData,
        provider,
        ethereum,

        getAllNFTs,
        marketData,
        filteredResults,
        setFilteredResults,
        handleCollection,

        getNFTData,
        walletData,
        walletAddress,
        totalPrice,
        tokenId,
        walletBalance,
        updateWalletBalance,

        formParams,
        updateFormParams,

        profileParams,
        updateProfileParams,
        handleProfile,

        activeKeywords,
        setActiveKeywords,
        fileURL,
        setFileURL,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
