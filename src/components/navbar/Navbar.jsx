import "./navbar.scss"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Person } from '@mui/icons-material';

const toolbarStyle = {
    minHeight: '35px',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

const Navbar = () => {
    console.log('Called Navbar');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [appServiceEL, setAppServiceEL] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isAppServiceOpen = Boolean(appServiceEL);

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

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleClick = (event) => {
        setAppServiceEL(event.currentTarget);
    };

    const handleClose = () => {
        setAppServiceEL(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}
            keepMounted
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuItem >
                <Box alignItems="center">
                    <Avatar
                        className="navbar.avatar-container"
                        alt="Remy Sharp"
                        src="https://fastly.picsum.photos/id/76/200/300.jpg?hmac=SWpe2KMM2qFiQ8C8WHIZilaJb7KVkgOVVJPTbasGyUU"
                    />
                    <Typography
                        variant="h10"
                        component="div"
                        sx={{ fontFamily: 'Nunito', fontwidth: "bold" }}
                    >
                        John Landy
                    </Typography>
                    <Typography
                        variant="h20"
                        component="div"
                        sx={{ fontFamily: 'Nunito', fontwidth: "bold" }}
                    >
                        Architect
                    </Typography>

                </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
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
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
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
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const appServiceId = 'app-service-groups';
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
                    backgroundColor: "#556cd6",
                    color: "#fff",
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 15,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        backgroundColor: "#556cd6",
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#ff9900" }}>A</Avatar> Application Group
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#4499e4" }}>C</Avatar> Configuration
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#14ac00" }}>D</Avatar> Data Repository
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#87aca0" }}>E</Avatar> Employee
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar style={toolbarStyle}>

                    <Tooltip title="Application Groups" arrow>
                        <IconButton
                            onClick={handleClick}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 1 }}
                            aria-controls={isAppServiceOpen ? appServiceId : undefined}
                            aria-haspopup="true"
                            aria-expanded={isAppServiceOpen ? 'true' : undefined}
                        >
                            <AppsIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, fontFamily: 'Nunito', display: { xs: 'none', sm: 'block' } }}
                    >
                        Lama Dev
                    </Typography>


                    <Box sx={{ flexGrow: 1 }} />

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    {/** This is 'user profile' will display only desktop mode */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <Tooltip title="Notification" arrow>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Alert" arrow>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit">
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="User Profile" arrow>
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={isMenuOpen ? menuId : undefined}
                                aria-haspopup="true"
                                aria-expanded={isMenuOpen ? 'true' : undefined}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/** This is 'more option' will display only mobile / tab mode */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title="More option" arrow>
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
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderAppService}
        </Box>
    );
}

export default Navbar