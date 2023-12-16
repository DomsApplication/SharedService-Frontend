import "./dashboard.scss"
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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


const Dashboard = () => {
    console.log('Called Dashboard');
    return (
        <Box className="dashboard">
            <DrawerHeader style={toolbarStyle} />
            Dashboard
            <ul>
                <Link to="/user" style={{ textDecoration: "none" }}>
                    <li>User updated for cloudfront deployment</li>
                </Link>
            </ul>
        </Box>
    )
}

export default Dashboard