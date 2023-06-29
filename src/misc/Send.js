import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

const Send = () => {
  return (
    <>
<body className="gradient-bg-transactions">
    {/* <header class=" p-5">

        
        <h1 className="text-3xl sm:text-3xl text-white text-gradient py-1">
         Upload your NFTs 
       </h1>
          <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
         Explore the crypto world. 
       </p>
   
    </header> */}

    <div className="  w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 flex items-start ">

    <aside class=" md:w-1/3 lg:w-1/4 px-5 py-40 " >
            <h1 class="text-2xl md:text-4xl">Sidebar</h1>
        
           <h1 className="text-3xl sm:text-3xl text-white text-gradient py-1">
            Upload your NFTs 
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. 
          </p>
          <div className=" p-5 mt-3 sm:w-96 h-48 w-half lg:h-56 lg:mt-0 flex justify-end items-start flex-col rounded-xl eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {/* {shortenAddress(address)} */}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main class=" md:w-2/3 lg:w-3/4 px-5 py-40">
            <h1 class="text-2xl md:text-4xl">Main Content</h1>
        </main>
        {/* <aside class=" md:w-1/3 lg:w-2/4 px-5 py-40">
            <h1 class="text-2xl md:text-4xl">Sidebar</h1>
        
           <h1 className="text-3xl sm:text-3xl text-white text-gradient py-1">
            Upload your NFTs 
          </h1>
             <p className="text-left my-3 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. 
          </p>
        </aside> */}
    </div>

    <footer class="bg-slate-800 mt-auto p-5">
        <h1 class="text-2xl md:text-4xl text-white">Footer</h1>
    </footer>
</body>


    </>
  );
};

export default Send;
