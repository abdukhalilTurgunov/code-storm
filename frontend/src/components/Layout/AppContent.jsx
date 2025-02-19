import { Layout } from "antd"
import Tasks from "../Task/Tasks"
import Discussion from "../Discussion"
import React from "react";
const contentStyle = {
    backgroundColor: "#ebecf1",
    padding: '25px 20px 0 20px'
}

export default function AppContent({userData, tab, projectId}) {
    return(
        <Layout.Content style={contentStyle}>
            {tab=== 'Tasks' ? <Tasks projectId={projectId} userData={userData}/> : <Discussion />}
        </Layout.Content>
    )
}