import React from "react";
import AppHeader from "../Layout/AppHeader";
import AppContent from "../Layout/AppContent"
export default function DashboardPage({userData, tab, setTab, projectId}) {
  return (
    <>
      <AppHeader setTab={setTab} projectId={projectId}/>
      <AppContent tab={tab} projectId={projectId} userData={userData}/>
    </>
  );
}
