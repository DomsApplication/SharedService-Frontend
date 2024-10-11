import React, { createContext, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./main.js";
import { DEFAULT_THEME } from "./themes/DefautTheme.js";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoadMask from "./component/LoadMask.tsx";
import Welcome from "./pages/Welcome";

export const TenantContext = createContext(null);

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [userMetadata, setUserMetadata] = useState(null);
  const [appMetadata, setAppMetadata] = useState(null);
  const [userPicture, setUserPicture] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log("accessToken:::" + accessToken);
        const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
        const NAME_SPACE = process.env.REACT_APP_NAMESPACE;

        setUserMetadata(decodedToken[`${NAME_SPACE}user_metadata`]);
        setAppMetadata(decodedToken[`${NAME_SPACE}app_metadata`]);
        setUserPicture(decodedToken[`${NAME_SPACE}app_metadata`]);
        console.log("user_meta:::" + JSON.stringify(userMetadata));
        console.log("app_meta:::" + JSON.stringify(appMetadata));
        console.log("user_picture:::" + JSON.stringify(userPicture));
        
        setIsMetadataLoaded(true);
      } catch (e) {
        console.error(e);
      }
    };

    if (isAuthenticated) {
      getUserDetails();
    }
  }, [getAccessTokenSilently, isAuthenticated, appMetadata, userMetadata, userPicture]);

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      {!isAuthenticated && isLoading && <LoadMask size={100} show={true} />}
      {!isAuthenticated && !isLoading && <Welcome />}
      {isAuthenticated && isMetadataLoaded && (
        <TenantContext.Provider value={{ userMetadata, appMetadata, userPicture }}>
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
