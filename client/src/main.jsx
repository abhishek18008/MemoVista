import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1042715938401-feggvh12lp6774i11mue8c0afvgf21n2.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </GoogleOAuthProvider>
);
