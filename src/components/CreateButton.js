import React from 'react'

const CreateButton = ({ isCreating, mintHandler, isMinting, image, url }) => {
  return (
    <div
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      margin: "15px 0px",
    }}
    className=''
  >
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
    <input
    onClick={mintHandler}
    type="submit"
    value={isMinting ? "Minting Art..." : "Mint"}
    className={
      isMinting 
        ? "waitingButton"
        : !image || url || isCreating
        ? "disabledButton"
        : ""
    }
  ></input>
  </div>
  );
};

export default CreateButton;