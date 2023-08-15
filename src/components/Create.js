import { useContext } from "react";
import CreateImage from "./CreateImage";
import CreateForm from "./CreateForm";
import MintForm from "./MintForm";
import { TETabsContent, TETabsPane } from "tw-elements-react";
import { TransactionContext } from "../context/TransactionContext";
import SubMenu from "./SubMenu";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { OnUploadFile, OnCreateFile, OnMintNFT } from "../context/Functions";

const Create = () => {
  const {
    tab,
    handleTab,
    activeKeywords,
    setActiveKeywords,
    fileURL,
    checksumAddress,
    marketData,
    formParams,
    updateFormParams,
    isChecked,
    setIsChecked,
    message,
    isCreating,
    isMinting,
    isUploading,
    transactionHash,
    hashLink,
    setMint,
  } = useContext(TransactionContext);

  window.localStorage.setItem("activeKeywords", activeKeywords);
  window.localStorage.setItem("fileURL", fileURL);

  const handleForm = (id, value) => {
    setActiveKeywords([...activeKeywords, value]);
    updateFormParams({ ...formParams, [id]: value });
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (activeKeywords.includes(e.target.value)) {
      const newActive = activeKeywords.filter(
        (item) => item !== e.target.value
      );
      setActiveKeywords(newActive);
    } else {
      setActiveKeywords((prevArr) => [...prevArr, e.target.value]);
    }
  };

  return (
    <div className="fade-in lg:px-[5%] px-2">
      <SubMenu
        title="Create NFTs"
        subtitle={
          tab === "tab1"
            ? "Generate an image or upload one"
            : "Mint your NFT to the blockchain"
        }
        tab1="Create"
        tab2="Mint"
        tab3={<MdOutlineKeyboardDoubleArrowRight fontSize={20} />}
        setMint={setMint}
        handleTab={handleTab}
        tab={tab}
        data={marketData}
        checksumAddress={checksumAddress}
        formParams={formParams}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        marketData={marketData}
      />

      <div className="form  md:py-5 md:px-[2%] gap-x-6 px-1 white-glassmorphism rounded-lg mt-2">
        <CreateImage
          isUploading={isUploading}
          isCreating={isCreating}
          isMinting={isMinting}
          formParams={formParams}
          fileURL={fileURL}
          message={message}
          OnUploadFile={OnUploadFile}
          hashLink={hashLink}
          isChecked={isChecked}
        />
        <TETabsContent>
          <TETabsPane show={tab === "tab1"}>
            <CreateForm
              formParams={formParams}
              OnCreateFile={OnCreateFile}
              handleChecked={handleChecked}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              activeKeywords={activeKeywords}
              isChecked={isChecked}
              OnUploadFile={OnUploadFile}
            />
          </TETabsPane>

          <TETabsPane show={tab === "tab2"}>
            <MintForm
              isCreating={isCreating}
              isMinting={isMinting}
              formParams={formParams}
              fileURL={fileURL}
              handleForm={handleForm}
              updateFormParams={updateFormParams}
              OnMintNFT={OnMintNFT}
              transactionHash={transactionHash}
            />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default Create;
