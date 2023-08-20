import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { GetIpfsUrlFromPinata } from "../utils/utils";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
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

const createMarketplaceContractReadOnly = () => {
  const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/m5b8iM8q6lK7PTdF4obKWhdO6QtK3hjC");
  const marketplaceContractReadOnly = new ethers.Contract(
    marketplaceAddress,
    marketplaceABI,
    provider
  );

  return marketplaceContractReadOnly;
};

export const TransactionsProvider = ({ children }) => {

  //-------CONNECTION
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [accountBalance, setAccountBalance] = useState();

   const [ checksumAddress, setChecksumAddress] = useState("");

   //---CHECK IF WALLET IS CONNECTED
   const checkIfWalletConnected = async () => {
    console.log("1.Checking if wallet is connected");
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        
        setCurrentAccount(accounts[0]);

        let checksum = ethers.utils.getAddress(accounts[0]);
        setChecksumAddress(checksum);

        getAllTransactions();
        getAllNFTs();
     
      } else {
        setError("No Account Found");
        setOpenError(true);
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      const balFormat = bal.slice(0, 5);
      setAccountBalance(balFormat);
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      console.log(error);
      setOpenError(true);
    }
  };


  useEffect(() => {
    ethereum?.on("accountsChanged", checkIfWalletConnected) 
    return () => {
     ethereum?.removeListener("accountsChanged", checkIfWalletConnected);
    };
  }, [currentAccount]);

  window.onload = function() {
    checkIfWalletConnected();
  }

  const connectWallet = async () => {
    console.log("Connect Wallet")
    try {
      if (!ethereum) return console.log("Install");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      checkIfWalletConnected();
      setCurrentAccount(accounts[0]);
      // window.reload();
    } catch (error) {
      console.log(error);

      console.log("No ethereum object CW");
    }
  };


  const [tab, setTab] = useState("tab1");
  const handleTab = (value) => {
    if (value === tab) {
      return;
    }
    setTab(value);
  };

  let location = useLocation();

  useEffect(() => {
    setTab('tab1');
  }, [location]);



  //CREATE
  const [formParams, updateFormParams] = useState(
    {
    // name: "",
    // description: "",
    // collection: "",
    // theme: "",
    // style: "",
    // artist: "",
    // colour: "",
    // colour2: "",
    // colour3: "",
    // medium: "",
    // texture: "",
    seal: "Yes",
    listing: "Listed For Sale",
    // price: "",
    royalty: "No Royalties",
    trait1: "Trait",
    // value1: "",
    trait2: "Trait",
    // value2: "",
    trait3: "Trait",
    // value3: "",
    trait4: "Trait",
    // value4: "",
    trait5: "Trait",
    // value5: "",
    trait6: "Trait",
    // value6: ""
    },
  //  localStorage.getItem("formParams")
  );

  // const [formParams, updateFormParams] = useState(() => {
  //   const storedFormParams = localStorage.getItem("formParams");
  //   return storedFormParams ? JSON.parse(storedFormParams) : {
  //     name: "",
  //     description: "",
  //     collection: "",
  //     theme: "",
  //     style: "",
  //     artist: "",
  //     colour: "",
  //     colour2: "",
  //     colour3: "",
  //     medium: "",
  //     texture: "",
  //     seal: "Yes",
  //     listing: "Listed For Sale",
  //     price: "",
  //     royalty: "No Royalties",
  //     trait1: "Trait",
  //     value1: "",
  //     trait2: "Trait",
  //     value2: "",
  //     trait3: "Trait",
  //     value3: "",
  //     trait4: "Trait",
  //     value4: "",
  //     trait5: "Trait",
  //     value5: "",
  //     trait6: "Trait",
  //     value6: ""
  //   };
  // });
  

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
      address: "",
    },
    localStorage.getItem("profileParams")
  );



  const [activeKeywords, setActiveKeywords] = useState([]
    // , localStorage.getItem("activeKeywords")
    );
  const [fileURL, setFileURL] = useState(null, localStorage.getItem("fileURL"));


 const [ topCollections, setTopCollections] = useState([], localStorage.getItem("topCollections"));

  // //MARKETPLACE
  const [marketData, updateMarketData] = useState([]);
  const [walletNFTs, updateWalletNFTs] = useState([]);
  const [totalPrice, updateTotalPrice] = useState("0");


  const getAllNFTs = async () => {
    const ethers = require("ethers");
    console.log("2.Getting all NFTs")
    try {
   
        const marketplaceContract = createMarketplaceContractReadOnly(provider); 
          //  !ethereum ? createMarketplaceContractReadOnly(provider) :
          //  createMarketplaceContract();
     
       
        //Pull the deployed contract instance
        const transaction = await marketplaceContract.getAllNFTs();
      //  console.log("transaction" , transaction)
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
              collection: meta.collection,

              attributes: meta.attributes,
              mintParams: meta.mintParams,
              createParams: meta.createParams,

              metadata: tokenURI,

              hashtags: meta.hashtags,
              style: meta.style,
              medium: meta.medium,
              artist: meta.artist,
              colour: meta.colour,
              colour: [ meta.colour0, meta.colour1, meta.colour2 ],
              colour0: meta.colour0,
              colour1: meta.colour1,
              colour2: meta.colour2,
              theme: meta.theme,
              texture: meta.texture,
              tags: meta.tags,

              listing: meta.listing,
              creator: meta.creator,
              seal: meta.seal,
              date: meta.date,
            };
            return item;
          })
        );
       
        updateMarketData(items);

    } catch (error) {
      console.log(error);
    }
  };



  //TRANSACTIONS
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

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

        // console.log("sendTransactions", structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present GATS");
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

  const [filteredResults, setFilteredResults] = useState(marketData);
  const [collection, setCollection] = useState("");
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

const [searchResults, setSearchResults] = useState(marketData);
const [searchInput, setSearchInput] = useState("");
const [globalResults, setGlobalResults] = useState(marketData);

const searchItems = (searchValue) => {
  setSearchResults(searchValue);

  // Filter searchResults based on search input
  const searchedData = marketData.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });
  setSearchResults(searchedData);
};

function handleCollection(e) {
  let col = e.target.value;
  setCollection(col);
  let id = e.target.id;
  let token = e.target.token;
  setId(id);
  setToken(token);
  if (col !== undefined) {
    const results = marketData.filter(item => {
      return item[id] === col;  
    });
    setFilteredResults(results);
    console.log("results", results);

    // Find subset of items in both searchResults and filteredResults
    const commonResults = searchResults.filter(item => results.includes(item));
    console.log("commonResults", commonResults);
//  `   setGlobalResults(commonResults);`
  } else {
    setFilteredResults([]);
  }   
}


const [favorites, setFavorites] = useState([], localStorage.getItem("favorites"));


  useEffect(() => {
    checkIfTransactionsExists();
    getAllNFTs();
    getAllTransactions();
  }, [transactionCount, currentAccount]);


  const [ progress, setProgress ] = useState('')

  const [message, updateMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [file, setFile] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [dateCreated, setDateCreated] = useState();
  const [metaData, setMetaData] = useState(null);
  const [transactionHash, setTransactionHash] = useState();
  const [hashLink, setHashLink] = useState(null);
  const [mint, setMint] = useState(false);

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
        handleChange,
        formData,
        provider,
        ethereum,
        checksumAddress,

        getAllNFTs,
        marketData,
   
        filteredResults,

        walletNFTs,
        // getNFTData,

       formParams,
       updateFormParams,

       profileParams,
       updateProfileParams,
       handleProfile,
      
    
       totalPrice,
       //tokenId,
       token,
       accountBalance,

       activeKeywords,
       setActiveKeywords,
       fileURL,
       setFileURL,

       tab,
       handleTab,
       setTab,
     
      createMarketplaceContractReadOnly,
      setFilteredResults,
      setCollection,
      setId,
      collection,
      id, 
      handleCollection,
      favorites,
      setFavorites,
      //handleFavorite,
      //hearted,
      //setHearted
      progress,
      setProgress,

      setTopCollections, topCollections,

      message, updateMessage,
      isUploading, setIsUploading,
      isChecked, setIsChecked,
      isCreating, setIsCreating,
      file, setFile,
      isMinting, setIsMinting,
      setDateCreated,
      setMetaData,
      setTransactionHash,
      setHashLink,
      setMint,

      searchResults, setSearchResults,
      searchItems,

      globalResults, setGlobalResults,
      searchInput, setSearchInput
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
