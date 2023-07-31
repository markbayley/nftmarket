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
    <div className="app min-h-screen">
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/nftmarket"
            element={
              <div className="">
                <Welcome />
                <Collections />
                <FeaturePage />
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
          <Route path="/Trade/:collectionName" element={<Marketplace />} />

          <Route
            path="/Trade/FeaturePage/:creatorAddress"
            element={<FeaturePage />}
          />

          <Route path="/Trade/Detail/:tokenId" element={<NFTPage />} />

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

      <Footer />
    </div>
  );
}

export default App;
