import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import Util from "../utils/Util";
import UtilUseQuery from "../utils/hooks/useQuery";

const toolbarStyle = {
  minHeight: "50px",
};

function Welcome() {
  const { loginWithRedirect } = useAuth0();
  const integration = UtilUseQuery.useQueryParam({ queryKey: "int" });
  const hideWelcome = !Util.isEmpty(integration) && integration;

  const doLogin = () => {
    loginWithRedirect();
  };

  useEffect(() => {
    if (hideWelcome) {
      //doLogin();
    }
  }, []); // eslint-disable-line

  return !hideWelcome ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar style={toolbarStyle}>
          {/** 3 line icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>

          {/** Application Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DOMS
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={() => doLogin()}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Box
      sx={{
        border: "1px solid #206ff9",
        padding: "10px 15px",
        backgroundColor: "#e9f1fb",
        borderRadius: "5px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      Verifying authentication and redirecting...
    </Box>
  );
}

export default Welcome;
