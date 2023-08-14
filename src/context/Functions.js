import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";

 //UPLOADING
 export const OnUploadFile = async (e) => {
    const {
        updateMessage,
        setIsUploading,
        setFileURL,
        isChecked
      } = useContext(TransactionContext);

    e.preventDefault();

    if (isChecked) {
      updateMessage("Uploading image...");
      const file = e.target.files[0];

      try {
        setIsUploading(true);
        updateMessage("Loading image..!");
        const response = await uploadFileToIPFS(file);
        if (response.success === true) {
          updateMessage("Image uploaded successfully!");
          setFileURL(response.pinataURL);
          setIsUploading(false);
        }
      } catch (e) {
        updateMessage("Error during file upload", e);
        setIsUploading(false);
      }
    } else {
      console.log("Error during file upload");
    }
  }