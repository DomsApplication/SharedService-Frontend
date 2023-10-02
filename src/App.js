import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Error from "./pages/errors/Error";
import HomeLayout from "./pages/home/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="error" element={<Error />} />
            <Route path="forgotpassword" element={<Forgotpassword />} />

            <Route path="*" element={<HomeLayout />} >
              <Route index element={<Dashboard />} />
              <Route path="home/*" element={<Dashboard />} />
              <Route path="user" element={<User />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
