import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// material-ui
import { Box, Container, Toolbar } from "@mui/material";

import { openComponentDrawer, openDrawer } from "@/app/features/menuSlice";
import { useDispatch, useSelector } from "react-redux";

import DrawerMainIndex from "./Drawer/DrawerMainIndex";
import Header from "./Header/MainHeaderIndex";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { componentDrawerOpen } = useSelector((state) => state.menu);
  const token = useSelector((state) => state.auth.authToken);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const [fullOpen, setFullOpen] = useState(componentDrawerOpen);

  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));

    setFullOpen(!fullOpen);
    dispatch(openComponentDrawer({ componentDrawerOpen: !fullOpen }));
  };

  const handleDrawerOnly = () => {
    setOpen(false);
    dispatch(openDrawer({ drawerOpen: false }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);
  return (
    <div>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Header open={fullOpen} handleDrawerToggle={handleDrawerToggle} />
        <DrawerMainIndex
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          fullOpen={fullOpen}
          handleDrawerOnly={handleDrawerOnly}
        />
        {/* <Box
        sx={{
          p: 0,
          mx: {lg: fullOpen ? "68px" : "40px", xs: "0px"},
          width:"100%",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
          component="main"
        
         
        > */}
        <Container component="main" maxWidth="xl">
          <Toolbar />
          <Outlet />
        </Container>
        {/* </Box> */}
      </Box>
    </div>
  );
};

export default MainLayout;
