import React from "react";
import ReactDOM from "react-dom/client";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./index.css";
import App from "./App";


import { TransactionsProvider } from "./context/TransactionContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
