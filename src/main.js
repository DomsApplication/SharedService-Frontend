import MainLayout from "./layout/mainLayout.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";
import User from "./pages/user.js";
import Role from "./pages/role";
import Setting from "./pages/settings";
import Application from "./pages/application";
import Datamanagement from "./pages/datamanagement";

function Main() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
        <Route index element={<Navigate to={"/dashboard"} replace />} />
        <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="role" element={<Role />} />
          <Route path="datamanagement" element={<Datamanagement />} />
          <Route path="application" element={<Application />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default Main;
