import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { Box, Container, Toolbar } from "@mui/material";

import { openComponentDrawer, openDrawer } from "@/app/features/menuSlice";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@/components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import DrawerMainIndex from "./Drawer/DrawerMainIndex";
import Header from "./Header/MainHeaderIndex";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { componentDrawerOpen } = useSelector((state) => state.menu);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const [open, setOpen] = useState(drawerOpen);
  const [fullOpen, setFullOpen] = useState(componentDrawerOpen);

  // drawer toggler

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
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading]);
  if (isLoading) {
    return <Loader />;
  }
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
        <Container component="main" maxWidth="xl">
          <Toolbar />
          <Outlet />
        </Container>
      </Box>
    </div>
  );
};

export default MainLayout;
