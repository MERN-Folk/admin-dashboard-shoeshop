import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStaff } from "./redux/features/authSlice";
// Admin
import AdminHome from "./pages/Admin/AdminHome";
import ManageStaff from "./pages/Admin/ManageStaff";
import AddEditCpro from "./pages/Admin/AddEditCpro"
import AddEditGroup from "./pages/Admin/AddEditGroup"
import Login from "./pages/Login";
import Register from "./pages/Register";
// Skw
import SkwHome from "./pages/Skw/SkwHome";
import Skw301Home from "./pages/Skw/Skw301Home";
import AddEditPreson from "./pages/Skw/AddEditPreson";
// Routes
import AdminRoute from "./routes/AdminRoute";
import SkwRoute from "./routes/SkwRoute";
// import StaffRoute from "./routes/StaffRoute";

import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const staffs = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setStaff(staffs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin_home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/manage_staff"
          element={
            <AdminRoute>
              <ManageStaff />
            </AdminRoute>
          }
        />
        <Route
          path="/addCpro"
          element={
            <AdminRoute>
              <AddEditCpro />
            </AdminRoute>
          }
        />
        <Route
          path="/editCpro/:id"
          element={
            <AdminRoute>
              <AddEditCpro />
            </AdminRoute>
          }
        />
        <Route
          path="/addGroup"
          element={
            <AdminRoute>
              <AddEditGroup />
            </AdminRoute>
          }
        />
        <Route
          path="/editGroup/:id"
          element={
            <AdminRoute>
              <AddEditGroup />
            </AdminRoute>
          }
        />

        <Route
          path="/skw_home"
          element={
            <SkwRoute>
              <SkwHome />
            </SkwRoute>
          }
        />
        <Route
          path="/search"
          element={
            <SkwRoute>
              <SkwHome />
            </SkwRoute>
          }
        />
        <Route
          path="/addPerson"
          element={
            <SkwRoute>
              <AddEditPreson />
            </SkwRoute>
          }
        />
        <Route
          path="/editPerson/:id"
          element={
            <SkwRoute>
              <AddEditPreson />
            </SkwRoute>
          }
        />
        <Route
          path="/skw301_home"
          element={
            <SkwRoute>
              <Skw301Home />
            </SkwRoute>
          }
        />
        <Route path="*" element={<NotFound/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
