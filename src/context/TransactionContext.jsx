import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { GetIpfsUrlFromPinata } from "../utils";
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

export const TransactionsProvider = ({ children }) => {

  //AIGENERATOR
  const [thumbs, setThumbs] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [active, setActive] = useState([]);

  const generateAIImage = async () => {
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    // const generatorContract = new ethers.Contract(
    //   generatorAddress,
    //   generatorABI,
    //   signer
    // );
    // console.log("gc", generatorContract);
    // return generatorContract;
    // let transaction = await generatorContract.generateAIImage();
    const huggingKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    // Create Image Function

      setIsCreating(true);
      setMessage("Generating AI Image...");
      // getURL(nft);
      const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

      // Send the request
      const response = await axios({
        url: URL,
        method: "POST",
        headers: {
          Authorization: `Bearer ${huggingKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          inputs:
            active,
        
          options: { wait_for_model: true },
        }),
        responseType: "arraybuffer",
      });

      const type = response.headers["content-type"];
      const data = response.data;

      const base64data = Buffer.from(data).toString("base64");
      const img = `data:${type};base64,` + base64data;

      setImage(img);
      setMessage("Image Created...");

      setIsCreating(false);
      return data;
  
  };




  // console.log("currentAccountTC: " + currentAccount);
  const [nftAIData, setNftAIData] = useState({
    title: "",
    description: "",
    style: "",
    artist: "",
    medium: "",
    pattern: "",
    colour: "",
    subject: "",
  });
  // const [nftLocal, setNftLocal] = useState(localStorage.getItem("nftLocal"));

  const [nfts, setNfts] = useState([]);

  const handleNftData = (e, name) => {
    setNftAIData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  // console.log("nftDataTC: " + nftData);





  //MARKETPLACE
  const [marketData, updateMarketData] = useState(null);
  const [marketDataFetched, updateMarketFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
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
  }

  if (!marketDataFetched) getAllNFTs();

  //PROFILE WALLET
  const [walletData, updateWalletData] = useState([]);
  const [walletDataFetched, updateWalletFetched] = useState(false);
  const [walletAddress, updateWalletAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const [walletBalance, updateWalletBalance] = useState();

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    const amount = await provider.getBalance(addr);
    const bal = parseInt(amount._hex) / 10 ** 18;

    console.log("balanceP", bal);
    updateWalletBalance(bal);
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI,
      signer
    );
    // console.log("contractP", contract)

    //create an NFT Token //get the transactions
    let transaction = await contract.getMyNFTs();
    // console.log("transactionP", transaction)
    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
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
    updateWalletAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

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
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

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
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
        // getAllNfts();
      } else {
        console.log("No accounts found");
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

      throw new Error("No ethereum object TE");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object CW");
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

        getAllNFTs,
        marketData,
        getNFTData,
        walletData,
        walletAddress,
        totalPrice,
        tokenId,
        walletBalance,

        handleNftData,
        nftAIData,
        nfts,
        thumbs,
        setThumbs,
        image,
        message,
        isCreating,
        generateAIImage,
        setActive,
        setIsCreating,
        setMessage,
        active,
        setImage,

      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
