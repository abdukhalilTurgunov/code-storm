import { Layout, Flex } from "antd";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Nav from "../Nav";
import PageTabs from "../page/PageTabs/pageTabs";
import ProjectsTabs from "../page/PageTabs/ProjectsTabs";
import ProfileTabs from "../page/PageTabs/ProfileTabs";

import "../../assets/css/aside.css";

const siderStyle = {
  height: "100vh",
  backgroundColor: "#fff",
  borderRight: "1px solid #EBECF2",
  position: "fixed",
};

export default function AppSider({userData, projectId, setProjectId}) {
  return (
    <Layout.Sider width={"428px"} style={siderStyle}>
      <Flex style={{ height: "100%", width: "100%" }}>
        <Nav userData={userData}/>
        <Routes>
          <Route
            path="/dashboard"
            element={<PageTabs title="All Projects"><ProjectsTabs projectId={projectId} setProjectId={setProjectId}/></PageTabs>}
          />
          <Route path="/profile" element={<PageTabs title="Profile"><ProfileTabs userData={userData}/></PageTabs>} />
        </Routes>
      </Flex>
    </Layout.Sider>
  );
}
