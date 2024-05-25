import HeadLayout from "./headerLayout.js";
import SliderLayout from "./sliderLayout.js";
import { useProSidebar } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { collapseSidebar } =
    useProSidebar();

  const toggle = () => {
    collapseSidebar();
  };

  return (
    <>
      <SliderLayout toggle={toggle} />
      <div style={{ width: "100%" }}>
        <HeadLayout toggle={toggle}></HeadLayout>
        <div style={{ paddingTop:"45px", paddingLeft:"10px", paddingRight:"10px", paddingBottom:"20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
