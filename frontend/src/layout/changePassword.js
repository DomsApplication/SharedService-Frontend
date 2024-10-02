import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { TenantContext } from "../App.js";
import Welcome from "../pages/Welcome.js";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const { user } = useContext(TenantContext);
  const [auth0userToken, setAuth0userToken] = useState(null);
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  useEffect(() => {
    const getToken = async () => {
      const token_url = `https://${domain}/oauth/token`;
      const response = await axios.post(token_url, {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      });
      setAuth0userToken(response.data.access_token);
    };
    getToken();
  }, [domain]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("New Password and Confirm Password does not match.");
      return;
    }

    const url = `https://${domain}/api/v2/users/${user.sub}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth0userToken}`,
    };

    const changePasswordRequest = fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        password: password,
      }),
    });

    const changeUserMetadataRequest = fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        user_metadata: {
          changePassword: "false",
        },
      }),
    });

    Promise.all([changePasswordRequest, changeUserMetadataRequest])
      .then((responses) => {
        if (responses.every((response) => response.status === 200)) {
          setIsPasswordChanged(true);
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return isPasswordChanged ? (
    <Welcome />
  ) : (
    <Box
      sx={{ flexGrow: 10 }}
      style={{
        display: "flex",
        backgroundColor: "#1976d2",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3}>
          <Box
            sx={{
              margin: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              padding: 1,
            }}
          >
            {/* Display the logo */}
            <Box sx={{ marginBottom: 2 }}>
              <img
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </Box>

            <Box md={2} sx={{ marginBottom: 2 }}>
              <Typography
                className="left-6 top-6 text-black"
                variant="h6"
                data-testid="report-template-dialog-heading"
              >
                Change Password
              </Typography>
            </Box>
            <Box md={2} sx={{ marginBottom: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      autoFocus
                      color="primary"
                      fullWidth
                      label="New Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="small"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      color="primary"
                      fullWidth
                      label="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      size="small"
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      Change
                    </Button>
                  </Grid>
                </Grid>
                {error && <Alert severity="error">{error}</Alert>}
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ChangePassword;
