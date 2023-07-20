import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar, Services, Welcome, Marketplace, Create, NFTPage, Wallet, Collections } from "./components"
import CollectionPage from "./components/CollectionPage";

function App() {
  return (
    <div className="app min-h-screen">
      <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/nftmarket"
            element={
              <div className="">
                <Welcome />
                <Collections />
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

          <Route path="/collectionPage" element={<CollectionPage />} />


          <Route path="/nftPage/:tokenId" element={<NFTPage />} />

          <Route
            path="/Wallet"
            element={
              <>
                <Wallet />
             
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
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
