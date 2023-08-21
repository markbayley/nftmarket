import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Footer,
  Navbar,
  Services,
  Welcome,
  Marketplace,
  Create,
  NFTPage,
  Wallet,
  Collections,
  FeaturePage
} from "./components";


function App() {
  return (
    <div className="app min-h-screen ">
      <div className="min-h-screen ">
        <Navbar />
        <Routes>
          <Route
            path="/nftmarket"
            element={
              <div className="">
                <Welcome />
                <Services />
                <Collections />
                <FeaturePage />
              </div>
            }
          />
            <Route
            path="/Home"
            element={
              <div className="">
                 <Welcome />
                <Services />
                <Collections />
                <FeaturePage />
              </div>
            }
          />

          <Route path="/Create" element={<Create />} />

          <Route
            path="/Explore"
            element={
              <>
                <Marketplace />
              </>
            }
          />
          <Route path="/Explore/:collectionName" element={<Marketplace />} />

          <Route
            path="/Explore/Profile/:creatorAddress"
            element={<FeaturePage />}
          />

          <Route path="/Explore/Detail/:tokenId" element={<NFTPage />} />

          <Route
            path="/Wallet"
            element={
              <>
                <Wallet />
              </>
            }
          />
        
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
