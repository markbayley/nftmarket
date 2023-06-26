import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import placeholder from "./../placer.png";

const Thumbnails = ({
  thumbs,
  isCreating,
  mintingIndex,
  account,
  isMinting,
  message,
  isLoading,
  setThumbs,
  currentAccount
}) => {
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState([]);


  useEffect(() => {

  }, [account]);

  return (
    <>
      {/* <div className="heading">Minted Artblocks</div> */}

      <div className="thumbnails">
        {thumbs.length === 0 ? (
          <div className="text__placeholder">No Artblocks minted yet...</div>
        ) : (
          thumbs
            .map((item, index) => (
              item.account === currentAccount &&
              <div
                className="thumbnail"
                onClick={() => {
                  setModalData(item);
                  setLgShow(true);
                }}
                key={index}
              >
                {
                ((!isCreating && !isMinting) ||
                  isCreating ||
                  (isMinting && index !== mintingIndex) ) ? (
                  <div>
                    <img
                      src={item.url ? item.url : placeholder}
                      alt="AI thumbnail"
                    />
                    <div className="overlay">
                      <span className="points">
                        {" "}
                        <a
                          target="_blank"
                          href={`https://sepolia.etherscan.io/tx/${item.hash}`}
                        >
                          {item.hash.slice(64, 66).toUpperCase()}
                        </a>
                      </span>{" "}
                    </div>
                    <div className="title">
                      &nbsp;{item.title}
                      <em>"{item.description}"</em>
                    </div>
                  </div>
                ) : 
                  // isLoading &&  
                    <div>
                      <img
                        src={item.url ? item.url : placeholder}
                        alt="AI thumbnail"
                        className="loading"
                      />
                      <div class="overlay loading">
                        <span className="points">
                          {" "}
                          <a
                            target="_blank"
                            href={`https://sepolia.etherscan.io/tx/${item.hash}`}
                          >
                            {item.hash.slice(64, 66).toUpperCase()}
                          </a>
                        </span>{" "}
                      </div>
                      &nbsp;{item.title}
                      <em>"{item.description}"</em>
                    </div>
                  
                 }
              </div>
            ))
            .reverse()
        )}
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className="title">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {modalData.title}&nbsp;<em>"{modalData.description}"</em>
              </div>
              <div>
                &nbsp;&nbsp;{" "}
                <a target="_blank" href={modalData.metaData}>
                  Data
                </a>{" "}
                &nbsp;&nbsp;
                <a target="_blank" href={modalData.url}>
                  URL
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  target="_blank"
                  href={`https://sepolia.etherscan.io/tx/${modalData.hash}`}
                >
                  {modalData.hash &&
                    modalData.hash.slice(0, 4) +
                      "..." +
                      modalData.hash.slice(62, 66)}
                </a>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData.url} alt="AI thumbnail" width="100%" />
          <div className="overlay">
          {modalData.hash &&
                      <span className="points-modal">
                        {" "}
                        <a
                          target="_blank"
                          href={`https://sepolia.etherscan.io/tx/${modalData.hash}`}
                        >
                          {modalData.hash.slice(64, 66).toUpperCase()}
                        </a>
                      </span>
}
                    </div>
     
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Thumbnails;
