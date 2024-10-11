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
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import BusinessIcon from "@mui/icons-material/Business";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const toolbarStyle = {
  minHeight: "50px",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: "1px solid lightgray", // Add border with dark gray color
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
          backgroundColor: "#ffffff",
          color: "#000",
          overflow: "visible",
          width: { xs: "90%", sm: "60%", md: "40%", lg: "20%" }, // Responsive width adjustments
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
            backgroundColor: "#ffffff",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#ff9900" }}>A</Avatar>
        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
          Application Group
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#4499e4" }}>C</Avatar>
        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
          Configuration
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#14ac00" }}>D</Avatar>
        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
          Data Repository
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#87aca0" }}>E</Avatar>
        <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
          Employee
        </Typography>
      </MenuItem>
    </Menu>
  );

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar style={toolbarStyle}>
          <Tooltip title="Menu" arrow>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggle}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Select Tenants" arrow>
            <Button
              variant="outlined"
              onClick={handleClick}
              size="medium"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 0, minWidth: { xs: "auto", sm: "150px" } }} // Adjust button width based on screen size
              aria-controls={isAppServiceOpen ? appServiceId : undefined}
              aria-haspopup="true"
              aria-expanded={isAppServiceOpen ? "true" : undefined}
              startIcon={<BusinessIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
                <Typography
                  variant="h6"
                  component="div"
                  noWrap
                  sx={{ flexGrow: 1, fontSize: { xs: "1rem", sm: "1rem" } }}
                >
                  I am Villan
                </Typography>
              </Box>
            </Button>
          </Tooltip>

          {/** Application Name */}
          <Typography variant="h9" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>

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
      {renderAppService}
    </Box>
  );
}

export default HeadLayout;
