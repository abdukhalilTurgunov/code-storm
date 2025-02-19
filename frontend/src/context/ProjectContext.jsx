import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchMembers, fetchProjects, fetchTasks } from "../api";

const ProjectContext = createContext({
  members: [],
  projects: [],
  tasks: [],
  loading: false,
});

export function ProjectContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const preload = async () => {
      try {
        setLoading(true);

        // Загружаем все данные параллельно
        const [membersData, projectsData, tasksData] = await Promise.all([
          fetchMembers(),
          fetchProjects(),
          fetchTasks(),
        ]);

        setMembers(membersData);
        setProjects(projectsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    preload();
  }, []);

  return (
    <ProjectContext.Provider value={{ loading, members, projects, tasks }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects должен использоваться внутри ProjectContextProvider");
  }
  return context;
}
