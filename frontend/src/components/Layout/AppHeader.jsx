import "../../assets/css/header.css";
import React, { useContext } from "react";
import { Layout, ConfigProvider, Tabs } from "antd";
import ProjectContext from "../../context/ProjectContext";

const headerStyle = {
  backgroundColor: "#fff",
  padding: "30px 20px 0",
  height: "auto",
};
const images = [
  "src/assets/img/icons/ai.svg",
  "src/assets/img/icons/blabla.svg",
  "src/assets/img/icons/chbd.svg",
  "src/assets/img/icons/design.svg",
  "src/assets/img/icons/pans.svg",
  "src/assets/img/icons/still_live.svg",
  "src/assets/img/icons/what.svg",
  "src/assets/img/icons/what-doing.svg",
];
export default function AppHeader({ setTab, projectId }) {
  let { projects } = useContext(ProjectContext);
  function changeTab(e) {
    setTab(e);
  }
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    return (
      <Layout.Header style={headerStyle}>
        <img src={images[Math.floor(Math.random() * images.length)]} />
        
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                horizontalMargin: "0",
              },
            },
          }}
        >
          <Tabs
            size="large"
            style={{ margin: "20px 0 0", horizontalMargin: "0" }}
            defaultActiveKey="1"
            onChange={changeTab}
            items={[
              {
                label: "Tasks",
                key: "Tasks",
              },
              {
                label: "Discussion",
                key: "Discussion",
              },
            ]}
          />
        </ConfigProvider>
      </Layout.Header>
    );
  }
  return (
    <Layout.Header style={headerStyle}>
      <h1 className="project_name">
        {project.name}
        <img src="src/assets/img/icons/light.svg" alt="" />
      </h1>
      <p className="project_desc">{project.desc}</p>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              horizontalMargin: "0",
            },
          },
        }}
      >
        <Tabs
          size="large"
          style={{ margin: "20px 0 0", horizontalMargin: "0" }}
          defaultActiveKey="1"
          onChange={changeTab}
          items={[
            {
              label: "Tasks",
              key: "Tasks",
            },
            {
              label: "Discussion",
              key: "Discussion",
            },
          ]}
        />
      </ConfigProvider>
    </Layout.Header>
  );
}
