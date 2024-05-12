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
import DataObjectAddColumns from "./pages/management/Data/DataObjectAddColumns";
import DataObjects from "./pages/management/Data/DataObjects";
import UserEditCreatePage from "./pages/management/users/UserEditCreatePage";
import Users from "./pages/management/users/Users";

const App = () => {
  // const token = Cookies.get("authToken");
  const dispatch = useDispatch();

  const token = useMemo(() => {
    return Cookies.get("authToken");
  }, []);

  useMemo(() => {
    if (token) {
      dispatch(setAuthToken(token));
    }
  }, [token, dispatch]);
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
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<DemoPage />} />
      </Routes>
    </>
  );
};

export default App;
