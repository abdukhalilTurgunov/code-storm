import React, { useContext, useState, useEffect } from "react";
import { Segmented, Flex, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProjectContext from "../../../context/ProjectContext";
import "../../../assets/css/projects.css";

const API_BASE = "http://127.0.0.1:8000"

export default function ProjectsTab({ projectId, setProjectId }) {
  const { projects } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "active"
  );
  const [loading, setLoading] = useState(true);
  const [projectCounts, setProjectCounts] = useState({
    active: 0,
    "on-hold": 0,
    closed: 0,
  });

  useEffect(() => {
    if (projects.length > 0) {
      const counts = {
        active: projects.filter((p) => p.status === "active").length,
        "on-hold": projects.filter((p) => p.status === "on-hold").length,
        closed: projects.filter((p) => p.status === "closed").length,
      };
      setProjectCounts(counts);
    }
  }, [projects]);

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      const project = projects.find((p) => p.id === Number(storedProjectId));
      if (project) {
        setProjectId(project.id);
        setActiveTab(project.status); // Это обновит активную вкладку
      } else if (projects.length > 0) {
        setProjectId(projects[0].id);
        setActiveTab(projects[0].status);
        localStorage.setItem("projectId", projects[0].id);
      }
    } else if (projects.length > 0) {
      // Если нет сохраненного ID, то установим первый проект по умолчанию
      setProjectId(projects[0].id);
      setActiveTab(projects[0].status);
    }
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (id) => {
    setProjectId(id);
    localStorage.setItem("projectId", id);
    const project = projects.find((p) => p.id === id);
    if (project) {
      setActiveTab(project.status);
    }
  };

  const options = loading
    ? [
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              Actives <span>(0)</span>
            </p>
          ),
          value: "active",
        },
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              On Hold<span>(0)</span>
            </p>
          ),
          value: "on-hold",
        },
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              Closed<span>(0)</span>
            </p>
          ),
          value: "closed",
        },
      ]
    : [
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              Actives <span>({projectCounts.active})</span>
            </p>
          ),
          value: "active",
        },
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              On Hold<span>({projectCounts["on-hold"]})</span>
            </p>
          ),
          value: "on-hold",
        },
        {
          label: (
            <p
              style={{
                padding: 3,
              }}
            >
              Closed<span>({projectCounts.closed})</span>
            </p>
          ),
          value: "closed",
        },
      ];

  const filteredProject = projects.filter(
    (project) => project.status === activeTab
  );
  return (
    <>
      <div className="search-project" style={{ display: "none" }}>
        <img src="src/assets/img/icons/search.svg" alt="" />
        <input type="text" placeholder="Search Project" />
      </div>
      <Segmented
        style={{
          background: "rgb(235, 236, 241)",
          padding: "5px",
          marginTop: "25px",
        }}
        size="large"
        block
        options={options}
        value={activeTab}
        onChange={setActiveTab}
      />

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <Spin
            size="large"
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 48,
                }}
                spin
              />
            }
          ></Spin>
        </Flex>
      ) : projects.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 100 }}
        />
      ) : (
        <ul className="projects_menu">
          {filteredProject.map((project) => (
            <li
              className={
                project.id === projectId
                  ? "projects_menu-item active"
                  : "projects_menu-item"
              }
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="projects_menu-box">
                <div
                  className="projects_menu-icon"
                  style={{
                    background: project.id==projectId ? '#fff' : `#${project?.icon_bg}`,
                  }}
                >
                  <img src={`${API_BASE}/media/${project.icon}`} alt="" />
                </div>
                <div className="projects_menu-content">
                  <h3 className="projects_menu-title">{project.name}</h3>
                  <p className="projects_menu-type">
                    {/* <span></span> */}
                    {project.type}
                  </p>
                </div>
              </div>
              <img
                src="src/assets/img/icons/arrow.svg"
                alt=""
                className="projects_menu-arrow"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
