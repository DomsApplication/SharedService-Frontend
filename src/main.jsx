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

import { Auth0Provider } from "@auth0/auth0-react";
import ScrollTop from "./hooks/scroll-to-top";
import CustomThemeProvider from "./theme/custom-theme-provider.jsx";
import AcceptCookies from "./components/auth-forms/enable-cookie-for-auth.jsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export const RootComponent = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CustomThemeProvider>
            <ScrollTop>
              <App />
              <Toaster
                position="bottom-center"
                gutter={5}
                toastOptions={{ duration: 4000 }}
              />
            </ScrollTop>
            <AcceptCookies />
          </CustomThemeProvider>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
