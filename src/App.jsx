import AuthLayout from "@/layouts/authLayout/AuthLayout";
import MainLayout from "@/layouts/mainLayout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import DemoPage from "@/pages/DemoPage";
import SamplePage from "@/pages/SamplePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { setAuthToken } from "./app/features/auth-token-slice";
import DataObjects from "./pages/management/Data/DataObjects";
import UserEditCreatePage from "./pages/management/users/UserEditCreatePage";
import Users from "./pages/management/users/Users";
import DataObjectAddColumns from "./pages/management/Data/DataObjectAddColumns";

const App = () => {
  const token = Cookies.get("authToken");
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(setAuthToken(token));
  }, [token]);
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to={"/dash"} replace />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserEditCreatePage />} />
          <Route path="/data-management" element={<DataObjects />} />
          <Route
            path="data-management/:objectId"
            element={<DataObjectAddColumns />}
          />
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
