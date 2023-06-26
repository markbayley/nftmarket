import React from 'react'

const CreateButton = ({ isCreating, mintHandler, isMinting, image, url, OnChangeFile, isUploading, fileURL, setChecked, checked }) => {
  return (
    <div
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      // margin: "15px 0px",
    }}
    className=''
  >
  
    <div>

{/* <input 
      onChange={OnChangeFile}
      type={"file"}
      accept="image/*"
      content=""
      // value={isCreating ? "Uploading..." : "Upload"}
      // className={ 
      //   isCreating 
      //   ? "disabledButton" 
      //   : isMinting ?
      //   "disabledButton"
      //   : "uploadButton"}
    ></input> */}
    
    <input
    type="submit"
    value={isCreating ? "Creating Art..." : "Create"}
    className={ 
      isCreating 
      ? "waitingButton" 
      : isMinting ?
      "disabledButton"
      : ""}
  ></input>

</div>



    <input
    onClick={mintHandler}
    type="submit"
    value={isMinting ? "Minting Art..." : "Mint"}
    className={
      isMinting 
        ? "waitingButton"
        : isCreating 
        ? "disabledButton"
        : "activeButtom"
    }
  ></input>
  </div>
  );
};

export default CreateButton;