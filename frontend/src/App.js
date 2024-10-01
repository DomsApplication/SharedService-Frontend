import React, { createContext, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./main.js";
import { DEFAULT_THEME } from "./themes/DefautTheme.js";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoadMask from "./component/LoadMask.tsx";
import Welcome from "./pages/Welcome";

export const TenantContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const [ auth0userToken, setAuth0userToken ] = useState(null);
  const [ isMetadataLoaded, setIsMetadataLoaded ] = useState(false);
  const [ userInfo, setUserInfo ] = useState(null);
  const [ userMetadata, setUserMetadata ] = useState(null);
  const [ appMetadata, setAppMetadata ] = useState(null);
  const [ connection, setConnection ] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {

      const idToken = await getIdTokenClaims();
      console.log('idToken:::' + JSON.stringify(idToken));
      const sub = idToken.sub;  // Get the 'sub' claim from the token
      console.log('idToken/sub:::' + sub);
      const _accessToken = await getAccessTokenSilently();
      console.log('_accessToken:::' + _accessToken);

      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope:
            "read:current_user read:users read:user_idp_tokens update:user update:user_app_metadata update:current_user_metadata update:password",
        });
        console.log('accessToken:::' + accessToken);
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const response = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData = await response.json();
        if(responseData.identities && responseData.identities.length > 0) {
          const connection = responseData.identities[0].connection;
          setConnection(connection);
        }  
        const {user_metadata, app_metadata } = responseData;
        setUserMetadata(user_metadata);
        setAppMetadata(app_metadata);
        setUserInfo(responseData);
        setAuth0userToken(accessToken);
        if(user_metadata.changePassword === 'true') {
          navigate('/changePassword');
        }
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
      {!isAuthenticated && !isLoading && <Welcome />}
      {isAuthenticated  && isMetadataLoaded && (
        <TenantContext.Provider value={{ auth0userToken, user, userInfo, userMetadata, appMetadata, connection }}>
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
