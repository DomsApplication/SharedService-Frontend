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
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import SettingsIcon from "@mui/icons-material/Settings";
import WebAssetIcon from "@mui/icons-material/WebAsset";

import {
  ExpandMore,
  ChevronRight,
  Close as CloseIcon,
  Logout,
} from "@mui/icons-material";

import { TenantContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const SidebarContainer = styled("div")({
  width: 260,
  display: "flex",
  flexDirection: "column",
  height: "100vh", // Set height to full viewport height
  overflowY: "auto",
});

const SidebarTop = styled("div")(({ theme }) => ({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px",
  borderBottom: "2px solid lightgray",
}));

const ScrollableList = styled("div")(({ theme }) => ({
  flexGrow: 1, // Allow the list to grow and fill the available space
  marginBottom: "0", // Ensure no bottom margin
  paddingBottom: 16, // Optional: spacing at the bottom
  overflowY: "auto",
  overflowX: "hidden",
}));

const BottomSection = styled("div")(({ theme }) => ({
  flexShrink: 0,
  position: "absolute",
  bottom: 5,
  width: "100%",
}));

const BottomList = styled("div")(({ theme }) => ({
  width: "100%",
  marginBottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const UserProfile = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  borderTop: "1px solid lightgray", // Top border only
}));

function SidebarLayout({ open, onClose, onMenuSelect }) {
  const { logout } = useAuth0();
  const tenantContext = React.useContext(TenantContext);
  const [userPiture, setUserPiture] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const [adminOpen, setAdminOpen] = useState(false);

  React.useEffect(() => {
    setUserPiture(tenantContext.userInfo.picture);
    setUserName(tenantContext.userInfo.name);
    setUserEmail(tenantContext.userInfo.email);
    setUserInfo(tenantContext.userInfo);
  }, [tenantContext.userInfo]);

  const handleLogout = () => {
    const returnToUri = window.location.origin;
    logout({ logoutParams: { returnTo: returnToUri, federated: true } });
  };

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  return (
    <Drawer open={open} onClose={onClose}>
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

            {/* Version text under logo */}
            <Typography
              variant="caption"
              style={{ marginLeft: 8, marginTop: 30, fontSize: "0.9rem" }}
            >
              v1.0.0
            </Typography>
          </Box>

          {/* Close Button aligned to the top-right */}
          <IconButton
            onClick={onClose}
            size="small"
            style={{ alignSelf: "flex-start" }}
          >
            <CloseIcon />
          </IconButton>
        </SidebarTop>

        {/************* Sidebar Menus: *************/}
        <ScrollableList>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            className="link"
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
                className="link"
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
                className="link"
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
            className="link"
            onClick={onMenuSelect}
          >
            <CalendarViewDayIcon style={{ marginRight: 8 }} />
            <ListItemText primary="Data Management" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/application"
            className="link"
            onClick={onMenuSelect}
          >
            <WebAssetIcon style={{ marginRight: 8 }} />
            <ListItemText primary="Application" />
          </ListItem>
        </ScrollableList>

        {/************* Sidebar Bottom: *************/}
        <BottomSection>
          {/************* Bottom List: *************/}
          <BottomList>
            <ListItem
              button
              component={Link}
              to="/setting"
              className="link"
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
                className="navbar.avatar-container center"
                alt="User Icon"
                src={userPiture}
                style={{ marginRight: 10, height: 36, width: 36 }}
              />{" "}
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" fontSize="0.9rem">
                  <b>{userEmail}</b>
                </Typography>{" "}
                <Typography variant="caption">{userName}</Typography>{" "}
              </Box>
            </Box>

            {/* Log Off button on the right */}
            <Box
              display="flex"
              justifyContent="flex-end"
              width="100%"
              paddingTop="5px"
            >
              <IconButton
                size="small"
                style={{
                  padding: "2px 8px", // Adjust padding to create space between the border and content
                  border: "1px solid red", // Red border
                  borderRadius: "3px", // Rounded corners
                }}
                onClick={handleLogout}
              >
                <Logout fontSize="small" style={{ marginRight: 4 }} />{" "}
                {/* Log out icon smaller */}
                <Typography variant="caption">Log Out</Typography>
              </IconButton>
            </Box>
          </UserProfile>
        </BottomSection>
      </SidebarContainer>
    </Drawer>
  );
}

export default SidebarLayout;
