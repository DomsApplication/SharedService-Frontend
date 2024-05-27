import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AuthWrapper from "./auth-components/AuthWrapper";

const AuthLayout = () => {
  const token = useSelector((state) => state.auth.authToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
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
