import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AppProvider from "./component/AppProvider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")).render(
    
    <Provider store={store}>
    <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
      
    </BrowserRouter>
    </Provider>
  
);
