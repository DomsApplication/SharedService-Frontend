import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";

import ScrollTop from "./hooks/scroll-to-top";
import CustomThemeProvider from "./theme/custom-theme-provider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <CustomThemeProvider>
          <ScrollTop>
            <App />
            <Toaster
              position="bottom-center"
              gutter={5}
              toastOptions={{
                style: {
                  fontSize: "1rem",
                  fontVariant: "ruby",
                  fontWeight: "bold",
                  padding: "1.3rem",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  minWidth: "40%",
                },
                duration: 5400,
              }}
            />
          </ScrollTop>
        </CustomThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
