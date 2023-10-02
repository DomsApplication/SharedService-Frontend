import "./home.scss"
import { Outlet } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Slidebar from "../../components/slidebar/Slidebar";
import { Box, Stack } from '@mui/material'

const HomeLayout = () => (
    <Box>
        <Stack direction="column" spacing={0} justifyContent="space-between">
            <Navbar />
            <Stack direction="row" spacing={0} justifyContent="space-between">
                <Slidebar />
                <Outlet />
            </Stack>
        </Stack>
    </Box>
);

export default HomeLayout