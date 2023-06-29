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
  // //AIGENERATOR


  // //MARKETPLACE
  const [marketData, updateMarketData] = useState([]);
  const [marketDataFetched, updateMarketFetched] = useState(false);

  const getAllNFTs = async () => {
    const ethers = require("ethers");

    try {
      if (ethereum) {
        //Get providers and signers
        const marketplaceContract = createMarketplaceContract();
        //Pull the deployed contract instance
        const transaction = await marketplaceContract.getAllNFTs();
       console.log("transactionGA", transaction)
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
            };
            return item;
          })
        );

        updateMarketFetched(true);
        updateMarketData(items);
      } else {
        console.log("Ethereum is not present GANFTs");
      }
    } catch (error) {
      console.log(error);
    }
  };




  //PROFILE WALLET
  const [walletData, updateWalletData] = useState([]);
  const [walletDataFetched, updateWalletFetched] = useState(false);
  const [walletAddress, updateWalletAddress] = useState();
  const [totalPrice, updateTotalPrice] = useState("0");
  const [walletBalance, updateWalletBalance] = useState();

  const getNFTData = async (tokenId) => {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    // console.log("contractP", contract)
    try {
      if (ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        const amount = await provider.getBalance(addr);
        const bal = parseInt(amount._hex) / 10 ** 18;
        updateWalletBalance(bal);

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
              description: meta.description,
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
  if (!walletDataFetched) getNFTData(tokenId);




  //TRANSACTIONS
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("0x");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [provider, setProvider] = useState(null);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
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

        console.log("sendTransactions", structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present GATS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return console.log("Install MetaMask");

      setProvider(ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
        getAllNFTs();
      } else {
        console.log("No Account");
      }
    } catch (error) {
      console.log(error);
    }
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

  const connectWallet = async () => {
    try {
      if (!ethereum) return console.log("Install");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      console.log("No ethereum object CW");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
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
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object ST");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object ST");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    // getNFTData(tokenId);
  
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        provider,

        getAllNFTs,
        marketData,
        getNFTData,
        walletData,
        walletAddress,
        totalPrice,
        tokenId,
        walletBalance,

        // thumbs,
        // setThumbs,
        // image,
        // message,
        // isCreating,
        // generateAIImage,
        // setActive,
        // setIsCreating,
        // setMessage,
        // active,
        // setImage,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
