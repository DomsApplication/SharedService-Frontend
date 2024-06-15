import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { Toolbar } from "@mui/material";

import { openComponentDrawer, openDrawer } from "@/app/features/menuSlice";
import { useDispatch, useSelector } from "react-redux";

import DrawerMainIndex from "./Drawer/DrawerMainIndex";
import Header from "./Header/MainHeaderIndex";
import { useAuth0 } from "@auth0/auth0-react";

const MainLayout = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const { componentDrawerOpen } = useSelector((state) => state.menu);

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
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Header open={fullOpen} handleDrawerToggle={handleDrawerToggle} />
      <div className="flex w-full">
        <DrawerMainIndex
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          fullOpen={fullOpen}
          handleDrawerOnly={handleDrawerOnly}
        />
        <div className="w-full container">
          <Toolbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
