import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Person } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useAuth0 } from "@auth0/auth0-react";
import { TenantContext } from "../App";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

const toolbarStyle = {
  minHeight: "50px",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

function HeadLayout({ toggle }) {
  const { logout } = useAuth0();
  const tenantContext = React.useContext(TenantContext);
  const [userPiture, setUserPiture] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [openUserInfoWindow, setOpenUserInfoWindow] = React.useState(false);
  const handleUserInfoWindowOpen = () => {
    setOpenUserInfoWindow(true);
  };
  const handleUserInfoWindowClose = () => {
    setOpenUserInfoWindow(false);
  };

  const [appServiceEL, setAppServiceEL] = React.useState(null);
  const isAppServiceOpen = Boolean(appServiceEL);
  const handleClick = (event) => {
    setAppServiceEL(event.currentTarget);
  };
  const handleClose = () => {
    setAppServiceEL(null);
  };

  const appServiceId = "app-service-groups";
  const renderAppService = (
    <Menu
      anchorEl={appServiceEL}
      id={appServiceId}
      open={isAppServiceOpen}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundColor: "#1976d2",
          color: "#fff",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 15,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            backgroundColor: "#1976d2",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#ff9900" }}>A</Avatar>{" "}
        Application Group
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#4499e4" }}>C</Avatar>{" "}
        Configuration
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#14ac00" }}>D</Avatar>{" "}
        Data Repository
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#87aca0" }}>E</Avatar>{" "}
        Employee
      </MenuItem>
    </Menu>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    const returnToUri = window.location.origin;
    logout({ logoutParams: { returnTo: returnToUri, federated: true } });
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      keepMounted
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Paper sx={{ width: 220 }}>
        <MenuList dense>
          <MenuItem>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <Typography variant="h6">{userEmail}</Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleUserInfoWindowOpen}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuList>
      </Paper>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            className="navbar.avatar-container center"
            sx={{ width: 36, height: 36, margin: "auto" }}
            alt="Remy Sharp"
            src={userPiture}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderUserProfileWindow = (
    <Dialog
      open={openUserInfoWindow}
      onClose={handleUserInfoWindowClose}
      fullWidth={false}
      maxWidth={'xs'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Paper elevation={0}>
          <Avatar
            sx={{ width: 72, height: 72, bgcolor: grey[100] }}
            variant="rounded"
            alt="Remy Sharp"
            src={userPiture}
          />
        </Paper>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Paper elevation={0}>
          <Grid container spacing={0} style={{ flexGrow: 4, paddingTop: "5px" }}>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>Name: </Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userName}</b></Typography></Grid>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>Email: </Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userEmail}</b></Typography></Grid>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>Nick Name: </Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userInfo != null ? userInfo.nickname : ''}</b></Typography></Grid>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>Last login:</Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userInfo != null ? userInfo.last_login : ''}</b></Typography></Grid>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>Login count:</Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userInfo != null ? userInfo.logins_count : ''}</b></Typography></Grid>
            <Grid item xs={3} style={{paddingTop: "3px", textAlign: "left"}}>User Created:</Grid>
            <Grid item xs={9} style={{paddingTop: "3px", textAlign: "left"}}><Typography><b>{userInfo != null ? userInfo.created_at : ''}</b></Typography></Grid>

          </Grid>
          </Paper>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUserInfoWindowClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  React.useEffect(() => {
    setUserPiture(tenantContext.userInfo.picture);
    setUserName(tenantContext.userInfo.name);
    setUserEmail(tenantContext.userInfo.email);
    setUserInfo(tenantContext.userInfo);
  }, [tenantContext.userInfo]);

  return (
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
            onClick={toggle}
          >
            <MenuIcon />
          </IconButton>

          {/** Application Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DOMS
          </Typography>

          <Tooltip title="Tenants" arrow>
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 }}
              aria-controls={isAppServiceOpen ? appServiceId : undefined}
              aria-haspopup="true"
              aria-expanded={isAppServiceOpen ? "true" : undefined}
            >
              <AppsIcon />
            </IconButton>
          </Tooltip>

          {/** Search button */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleProfileMenuOpen}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={isMenuOpen ? menuId : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              color="inherit"
            >
              <Avatar
                className="navbar.avatar-container center"
                sx={{ width: 36, height: 36, margin: "auto" }}
                alt="Remy Sharp"
                src={userPiture}
              />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderAppService}
      {renderUserProfileWindow}
    </Box>
  );
}

export default HeadLayout;
