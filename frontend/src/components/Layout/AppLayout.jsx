import { Layout, Flex, Alert, message, Spin } from "antd";
import { Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from "react";
import AppSider from "./AppSider";

import NotFound from "../page/NotFound";
import DashboardPage from "../page/DashboardPage";
import ProfilePage from "../page/ProfilePage";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default function AppLayout() {
  const [tab, setTab] = useState("Tasks");
  const [userData, setUserData] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(`${API_URL}/account/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          message.error("Error fetching user data", error);
        } finally {
          // setTimeout(() => {
            setLoading(false);
          // }, 750);
        }
      } else {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center",position: "fixed", left: '50%', top: '50%'}}>
        <Spin size="large" />
      </div>
    );
  }
  if (!isDesktop) {
    return (
      <Flex
        style={{ height: "100vh", background: "#f0f2f5" }}
        align="center"
        justify="center"
      >
        <Alert
          message="Откройте экран шире 1024px"
          description="Для удобного использования увеличьте ширину экрана."
          type="warning"
          showIcon
          style={{
            maxWidth: 400,
            fontSize: 16,
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px",
          }}
        />
      </Flex>
    );
  }
  return (
    <>
      <Layout>
        <AppSider
          projectId={projectId}
          setProjectId={setProjectId}
          userData={userData}
        />
        <Layout
          style={{
            paddingLeft: "428px",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  tab={tab}
                  setTab={setTab}
                  projectId={projectId}
                  userData={userData}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage userData={userData} />}
            />
          </Routes>
        </Layout>
      </Layout>
    </>
  );
}
