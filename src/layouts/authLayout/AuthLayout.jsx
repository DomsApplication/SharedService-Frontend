import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AuthWrapper from "./auth-components/AuthWrapper";

const AuthLayout = () => {
  const token = useSelector((state) => state.auth.authToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      if (window.history.state && window.history.state.idx >=1) {
        navigate(-1);
      } else {
        navigate("/", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
      }
    }
  }, [token]);
  3;

  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
};

export default AuthLayout;
