import "./App.css";
// import Navbar from './components/Navbar.js';
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import SellNFT from "./components/SellNFT";
import NFTPage from "./components/NFTpage";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import { Transactions } from "./components";
import AIGenerator from "./components/AIGenerator";
import Send from "./components/Send";


// import { Footer, Navbar, Services, Transactions, Welcome } from "./components"

function App() {
  return (
    <body className="">
     
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="">
          
             
                <Welcome /><Services />
               
              
              </div>
            }
          />
        
         
      
          {/* <Route path="/Upload" element={<SellNFT />} /> */}

          <Route path="/Create" element={<SellNFT />} />

          <Route path="/Trade" element={<><Marketplace /> <Transactions /></>} />
          <Route path="/nftPage/:tokenId" element={<NFTPage />} />

          <Route path="/Wallet" element={<><Welcome /><Profile /></>} />
          <Route path="/Help" element={ <div className=""><Services /></div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </body>
  );
}

export default App;
