import MainLayout from "./layout/mainLayout.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Welcome from "./pages/Welcome.js"
import ChangePassword from "./layout/changePassword.js";
import Dashboard from "./pages/dashboard.js";
import Users from "./pages/user/Users.js";
import UserForm from "./pages/user/UserForm.js";
import Roles from "./pages/role/Roles.js";
import Setting from "./pages/settings";
import Application from "./pages/application";
import Datamanagement from "./pages/datamanagement";

function Main() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="welcome" element={<Welcome />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to={"/dashboard"} replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserForm isEditMode={false} />} />
            <Route path="users/edit/:email" element={<UserForm isEditMode={true} />} />
            <Route path="role" element={<Roles />} />
            <Route path="datamanagement" element={<Datamanagement />} />
            <Route path="application" element={<Application />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default Main;
