import HeadLayout from "./headerLayout.js";
import SliderLayout from "./sliderLayout.js";
import { useProSidebar } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Copyright from "../pages/Copyright.js";

const MainLayout = () => {
  const { collapseSidebar } = useProSidebar();

  const toggle = () => {
    collapseSidebar();
  };

  return (
    <>
      <SliderLayout toggle={toggle} />

      <div style={{ width: "100%" }}>
        <HeadLayout toggle={toggle}></HeadLayout>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
            pt: "70px",
            pl: "20px",
            pr: "20px",
            pb: "20px"
          }}
        >
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </div>
    </>
  );
};

export default MainLayout;
