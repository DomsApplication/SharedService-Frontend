import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/authLayout/AuthLayout";
import MainLayout from "@/layouts/mainLayout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import DemoPage from "@/pages/DemoPage";
import SamplePage from "@/pages/SamplePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthToken } from "./app/features/auth-token-slice";
import GetAllUsers from "./pages/management/GetAllUsers";

const App = () => {
  const token = Cookies.get("authToken");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthToken( token ));
  }, [token])
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to={"/dash"} replace />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="/users" element={<GetAllUsers />} />
         
          <Route path="sample-page" element={<SamplePage />} />
          <Route path="*" element={<DemoPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
