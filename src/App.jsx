import AuthLayout from "@/layouts/authLayout/AuthLayout";
import MainLayout from "@/layouts/mainLayout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import DemoPage from "@/pages/DemoPage";
import SamplePage from "@/pages/SamplePage";
import LoginPage from "@/pages/auth/LoginPage";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import RegisterPage from "@/pages/auth/RegisterPage";
// import TableById from "@/pages/TableById";
// import FormById from "@/pages/FormById";
// import GetAllForms from "@/pages/GetAllForms";
// import CreateFrom from "@/pages/CreateFrom";
// import GetAllUsers from "@/pages/management/GetAllUsers";
// import RolesPage from "./pages/management/RolesPage";
// import PrevialgesPage from "./pages/management/PrevialgesPage";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./app/features/auth-token-slice";
const App = () => {
  const token = Cookies.get("authToken");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(setAuthToken({ authToken: token }));
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to={"/dash"} replace />} />
          <Route path="dash" element={<Dashboard />} />
          {/* <Route path="/form/all" element={<GetAllForms />} />
          <Route path="/form/:id" element={<FormById />} />
          <Route path="table/:id" element={<TableById />} />
          <Route path="/create-form" element={<CreateFrom />} />
          <Route path="/users" element={<GetAllUsers />} />
          <Route path="/role" element={<RolesPage />} />
          <Route path="/previalges" element={<PrevialgesPage />} /> */}
          <Route path="sample-page" element={<SamplePage />} />
          <Route path="*" element={<DemoPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
