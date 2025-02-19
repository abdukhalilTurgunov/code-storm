import React from "react";
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { ProjectContextProvider } from "./context/ProjectContext";
import AppLayout from "./components/Layout/AppLayout";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// const layoutStyle = {
//   borderRadius: 8,
//   overflow: "hidden",
//   width: "calc(50% - 8px)",
//   maxWidth: "calc(50% - 8px)",
// };
const isAuthenticated = () => !!localStorage.getItem("access");
function App() {
  return (
    <ConfigProvider>
      <ProjectContextProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<AppLayout />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </ProjectContextProvider>
    </ConfigProvider>
  );
}

export default App;
