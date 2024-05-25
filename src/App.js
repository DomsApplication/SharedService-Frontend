import React, { createContext, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./main.js";
import { DEFAULT_THEME } from "./themes/DefautTheme.js";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoadMask from "./component/LoadMask.tsx";

export const TenantContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const [ auth0userToken, setAuth0userToken ] = useState(null);
  const [ isMetadataLoaded, setIsMetadataLoaded ] = useState(false);
  const [ userInfo, setUserInfo ] = useState(null);
  

  useEffect(() => {
    const getUserDetails = async () => {
      const domain = process.env.REACT_APP_AUTH0_SPA_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope:
            "read:current_user read:users read:user_idp_tokens update:user update:user_app_metadata update:current_user_metadata update:password",
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const response = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseMetadata = await response.json();
        setUserInfo(responseMetadata);
        setAuth0userToken(accessToken);
        setIsMetadataLoaded(true);
      } catch (e) {
        console.error(e);
      }
    };

    if (isAuthenticated) {
      getUserDetails();
    }
  }, [getAccessTokenSilently, isAuthenticated, user, navigate]);

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      {!isAuthenticated && isLoading && <LoadMask size={100} show={true} />}
      {!isAuthenticated && !isLoading && loginWithRedirect()}
      {isAuthenticated  && isMetadataLoaded && (
        <TenantContext.Provider value={{ auth0userToken, user, userInfo }}>
          <CssBaseline>
            <ThemeProvider theme={DEFAULT_THEME}>
              <Main />
            </ThemeProvider>
          </CssBaseline>
        </TenantContext.Provider>
      )}
    </div>
  );
}

export default App;
