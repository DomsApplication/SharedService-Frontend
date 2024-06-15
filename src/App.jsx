import { setAuthToken } from "@/app/features/auth-token-slice";
import AuthLayout from "@/layouts/authLayout/AuthLayout";
import MainLayout from "@/layouts/mainLayout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import DemoPage from "@/pages/DemoPage";
import SamplePage from "@/pages/SamplePage";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DataObjectAddColumns from "./pages/management/Data/DataObjectAddColumns";
import DataObjects from "./pages/management/Data/DataObjects";
import UserEditCreatePage from "./pages/management/users/UserEditCreatePage";
import Users from "./pages/management/users/Users";

import Loader from "@/components/Loader";
import HomePage from "./pages/HomePage";
import LandingLayout from "./layouts/landingPageLayout/LandingLayout";
import LoginButton from "./pages/oauth/login";
import DataRepo from "./pages/management/Data/DataRepo";
import DataRepoEditAndCreate from "./pages/management/Data/DataRepoCreateAndEdit";
const App = () => {
  const { isLoading } = useAuth0();

  const dispatch = useDispatch();

  const token = useMemo(() => {
    return Cookies.get("authToken");
  }, []);

  useMemo(() => {
    if (token) {
      dispatch(setAuthToken(token));
    }
  }, [token, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/signin" element={<LoginButton />} />
        <Route element={<MainLayout />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserEditCreatePage />} />
          <Route path="/data-management" element={<DataObjects />} />
          <Route
            path="/data-management/:objectId"
            element={<DataObjectAddColumns />}
          />
          <Route
            path="/data-management/:objectId/repo"
            element={<DataRepo />}
          />
          <Route
            path="/data-management/:objectId/repo/:id"
            element={<DataRepoEditAndCreate />}
          />
          <Route path="sample-page" element={<SamplePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<DemoPage />} />
      </Routes>
    </>
  );
};

export default App;
