import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar, Services, Transactions, Welcome, Profile, Marketplace, Create, NFTPage, Wallet } from "./components"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="">
                <Welcome />
                <Services />
              </div>
            }
          />

          <Route path="/Create" element={<Create />} />

          <Route
            path="/Trade"
            element={
              <>
                <Marketplace /> 
              </>
            }
          />
          <Route path="/nftPage/:tokenId" element={<NFTPage />} />

          <Route
            path="/Wallet"
            element={
              <>
                <Wallet />
                <Profile />
              </>
            }
          />
          <Route
            path="/Help"
            element={
              <div className="">
                <Services />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
