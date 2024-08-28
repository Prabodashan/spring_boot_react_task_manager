// Inbuilt components and modules
import { Outlet, Route, Routes } from "react-router-dom";

// Third-party components and modules
import { Toaster } from "sonner";

// Custom components and modules
import Navbar from "./components/containers/navbar/Navbar.jsx";

import TaskPage from "./pages/taskPage/TaskPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/RegisterPage.jsx";
import RequireAuth from "./components/containers/requireAuth/RequireAuth";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";

//Layout
const GlobalLayout = () => {
  return (
    <main className="layout">
      <Navbar />
      <Outlet />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route element={<RequireAuth />}>
            <Route path="/" element={<GlobalLayout />}>
              <Route index element={<TaskPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
