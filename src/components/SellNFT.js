import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";

export default function SellNFT () {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();

   

    async function disableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = true
        listButton.style.backgroundColor = "grey";
        listButton.style.opacity = 0.3;
    }

    async function enableButton() {
        const listButton = document.getElementById("list-button")
        listButton.disabled = false
        listButton.style.backgroundColor = "#A500FF";
        listButton.style.opacity = 1;
    }

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            disableButton();
            updateMessage("Uploading image.. please dont click anything!")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                enableButton();
                updateMessage("")
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
        {
            updateMessage("Please fill in all fields!")
            return -1;
        }

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            if(metadataURL === -1)
                return;
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            disableButton();
            updateMessage("Uploading NFT(takes 5 mins).. please dont click anything!")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            enableButton();
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }
    console.log("formParams: " + formParams.name)
    // console.log("Working", process.env);
    return (
        <div className="gradient-bg-transactions">


         <div className="w-half items-start flex-col justify-between md:p-10 py-6 px-4">
           <h1 className="text-3xl sm:text-3xl text-white text-gradient py-1">
            Upload your NFTs 
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. 
          </p>
         
      <div className="form ">

        <div className="w-full flex flex-col justify-center items-center " id="nftForm">

            <form className=" sm:w-96 w-full flex justify-center blue-glassmorphism ">
            {/* <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the marketplace</h3> */}
                <div className=" p-3">
                    {/* <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label> */}
                    <input  className="m-3 p-3 w-80 rounded-sm outline-none bg-transparent text-white border-none white-glassmorphism" id="name" type="text" placeholder="NFT title" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className=" px-3">
                    {/* <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">NFT Description</label> */}
                    <textarea  className="m-3 p-3 sm:w-80 rounded-sm outline-none bg-transparent text-white border-none white-glassmorphism" cols="30" rows="5" id="description" type="text" placeholder="NFT Description" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="px-3">
                    <label className="block text-white ml-4 " htmlFor="price">Price (in ETH)</label>
                    <input  className="m-3 p-3  w-72 rounded-sm outline-none bg-transparent text-white border-none white-glassmorphism" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div  className="px-3 py-3">
                    <label className="block text-white  mb-2 p-3" htmlFor="image">Upload Image (&lt;500 KB)</label>
                    <input type={"file"} onChange={OnChangeFile} className="px-3"></input>
                    <div className="text-red-500 text-center">{message}</div>
                    <button onClick={listNFT} type='button' className="text-white w-72  mt-4 border-[1px]  border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer" id="list-button">
                    List NFT
                </button>
                </div>
            
             
             
            </form>
        </div>
        </div>
        </div>
        </div>
    )

}