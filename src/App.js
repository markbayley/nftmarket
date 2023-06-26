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
    <div className="">
     
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="gradient-bg-welcome">
          
             
                  <Welcome /> <Services />
                  <Transactions />{" "}
              
              </div>
            }
          />
          <Route path="/Send" element={ <div className="gradient-bg-welcome"><Welcome /></div>} />
          <Route path="/nftPage/:tokenId" element={<NFTPage />} />
          <Route path="/Wallet" element={<Profile />} />
          {/* <Route path="/Upload" element={<SellNFT />} /> */}

          <Route path="/Create" element={<AIGenerator />} />

          <Route path="/Trade" element={<Marketplace />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
