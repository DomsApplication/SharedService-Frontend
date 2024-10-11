import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Avatar,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import SettingsIcon from "@mui/icons-material/Settings";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { ExpandMore, ChevronRight, Close as CloseIcon, Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

// Responsive styles for Sidebar container
const SidebarContainer = styled(Box)(({ theme }) => ({
  height: "100vh", // Full height
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("lg")]: {
    width: 300,
  },
  [theme.breakpoints.down("lg")]: {
    width: 260,
  },
  [theme.breakpoints.down("md")]: {
    width: 220,
  },
  [theme.breakpoints.down("sm")]: {
    width: 200,
  },
  overflowY: "auto",
}));

const SidebarTop = styled("div")({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px",
  borderBottom: "2px solid lightgray",
});

const ScrollableList = styled("div")({
  flexGrow: 1,
  paddingBottom: 16,
  overflowY: "auto",
  overflowX: "hidden",
});

const BottomSection = styled("div")({
  flexShrink: 0,
  position: "relative",
  width: "100%",
  bottom: 0,
});

const BottomList = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 0,
});

const UserProfile = styled("div")({
  width: "100%",
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderTop: "1px solid lightgray",
});

function SidebarLayout({ open, onClose, onMenuSelect }) {
  
  const { user, logout } = useAuth0();
  const [adminOpen, setAdminOpen] = useState(false);

  const handleLogout = () => {
    const returnToUri = window.location.origin;
    logout({ logoutParams: { returnTo: returnToUri, federated: true } });
  };

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Grid container direction="column">
        <Grid item>
          <SidebarContainer>
            {/************* Sidebar Top: *************/}
            <SidebarTop>
              <Box display="flex" alignItems="center">
                {/* Company Logo */}
                <img
                  src="/logo-names-250x89.png"
                  alt="Company Logo"
                  style={{ height: 50, marginRight: 8 }}
                />
                <Typography
                  variant="caption"
                  style={{ marginLeft: 8, marginTop: 30, fontSize: "0.9rem" }}
                >
                  v1.0.0
                </Typography>
              </Box>

              {/* Close Button aligned to the top-right */}
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </SidebarTop>

            {/************* Sidebar Menus: *************/}
            <ScrollableList>
              <ListItem
                button
                component={Link}
                to="/dashboard"
                onClick={onMenuSelect}
              >
                <HomeOutlinedIcon style={{ marginRight: 8 }} />
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem button onClick={handleAdminClick}>
                <ManageAccountsIcon style={{ marginRight: 8 }} />
                <ListItemText primary="User Management" />
                <IconButton edge="end" size="small">
                  {adminOpen ? <ExpandMore /> : <ChevronRight />}
                </IconButton>
              </ListItem>

              <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={Link}
                    to="/users"
                    onClick={onMenuSelect}
                    style={{ paddingLeft: 32 }}
                  >
                    <PeopleIcon style={{ marginRight: 8 }} />
                    <ListItemText primary="Add Users" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/role"
                    onClick={onMenuSelect}
                    style={{ paddingLeft: 32 }}
                  >
                    <ChecklistIcon style={{ marginRight: 8 }} />
                    <ListItemText primary="Roles" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem
                button
                component={Link}
                to="/datamanagement"
                onClick={onMenuSelect}
              >
                <CalendarViewDayIcon style={{ marginRight: 8 }} />
                <ListItemText primary="Data Management" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/application"
                onClick={onMenuSelect}
              >
                <WebAssetIcon style={{ marginRight: 8 }} />
                <ListItemText primary="Application" />
              </ListItem>
            </ScrollableList>

            {/************* Sidebar Bottom: *************/}
            <BottomSection>
              <BottomList>
                <ListItem
                  button
                  component={Link}
                  to="/setting"
                  onClick={onMenuSelect}
                >
                  <SettingsIcon style={{ marginRight: 8 }} />
                  <ListItemText primary="Settings" />
                </ListItem>

                <ListItem button onClick={onMenuSelect}>
                  <HelpOutlineOutlinedIcon style={{ marginRight: 8 }} />
                  <ListItemText primary="FAQ" />
                </ListItem>
              </BottomList>

              {/************* User profile: *************/}
              <UserProfile>
                <Box display="flex" alignItems="center" width="100%">
                  <Avatar
                    alt="User Icon"
                    src={user.picture}
                    style={{ marginRight: 10, height: 36, width: 36 }}
                  />
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2" fontSize="0.9rem">
                      <b>{user.email}</b>
                    </Typography>
                    <Typography variant="caption">{user.name}</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="flex-end" width="100%" paddingTop="5px">
                  <IconButton
                    size="small"
                    style={{
                      padding: "2px 8px",
                      border: "1px solid red",
                      borderRadius: "3px",
                    }}
                    onClick={handleLogout}
                  >
                    <Logout fontSize="small" style={{ marginRight: 4 }} />
                    <Typography variant="caption">Log Out</Typography>
                  </IconButton>
                </Box>
              </UserProfile>
            </BottomSection>
          </SidebarContainer>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default SidebarLayout;
