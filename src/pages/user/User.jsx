import "./user.scss"
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';

const toolbarStyle = {
    minHeight: '50px',
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

}));

const User = () => {
    console.log('Called User');
    return (
        <Box className="user">
            <DrawerHeader style={toolbarStyle} />
            User
            <ul>
                <Link to="/home" style={{ textDecoration: "none" }}>
                    <li>Dashboard</li>
                </Link>
            </ul>
        </Box>
    )
}

export default User