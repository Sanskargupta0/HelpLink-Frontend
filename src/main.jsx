import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer} from 'react-toastify';
import { UserProvider } from "./utils/dataStore.jsx";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
    <ToastContainer 
    autoClose={3000}
    />
  </React.StrictMode>
);
