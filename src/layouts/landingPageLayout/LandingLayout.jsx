import Footer from "@/components/landing-comp/footer";
import Navbar from "@/components/landing-comp/navbar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
