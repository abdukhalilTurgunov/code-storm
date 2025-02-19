import React, { useState, useEffect } from "react";
import { Drawer, Modal, message } from "antd";
import axios from "axios";
// import ProjectContext from "../../context/ProjectContext.jsx";
import AddTask from "./AddTask.jsx";
import TaskInfo from "./TaskInfo.jsx";
import TaskCategory from "./TaskCategory.jsx";
import "../../assets/css/tasks.css";

const API_URL = "http://127.0.0.1:8000/api/";
export default function Tasks({ userData, projectId }) {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [modal, setModal] = useState(false);
  const [taskInfo, setTaskInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = userData?.id
  // let { tasks } = useContext(ProjectContext);
  const fetchTasks = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await axios.get(`${API_URL}tasks/`, {
        params: { projectId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        setTasks(response.data);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const modalOk = () => {
    setModal(false);
  };

  const modalCancel = () => {
    setModal(false);
  };

  const handleTaskAction = (a, b) => {
    if (a === "task") {
      setOpen(true);
      setTaskInfo(b);
    } else if (a === "modal") {
      setModal(true);
      setStatus(b);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 450);
  };
  const items = [
    {
      label: (
        <p className="category_title">
          <span className="category_title-circle to-do"></span>To do
        </p>
      ),
      key: "to-do",
    },
    {
      label: (
        <p className="category_title">
          <span className="category_title-circle in-progress"></span>In progress
        </p>
      ),
      key: "in-progress",
    },

    {
      label: (
        <p className="category_title">
          <span className="category_title-circle completed"></span>completed
        </p>
      ),
      key: "completed",
    },
  ];
  return (
    <section className="tasks">
      <Modal
        width={712}
        title={
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Add Task</span>
        }
        open={modal}
        onOk={modalOk}
        onCancel={modalCancel}
        loading={loading}
        footer={null}
      >
        <AddTask status={status} projectId={projectId} />
      </Modal>
      <Drawer
        width={460}
        onClose={() => setOpen(false)}
        open={open}
        loading={loading}
        closable={false}
        title={null}
        destroyOnClose
      >
        <TaskInfo
          handleTaskAction={handleTaskAction}
          taskInfo={taskInfo}
          setOpen={setOpen}
        ></TaskInfo>
      </Drawer>
      <TaskCategory
        category={"to-do"}
        handleTaskAction={(a, b) => handleTaskAction(a, b)}
        changeStatus={items.filter((item) => item.key !== "to-do")}
        tasks={tasks.filter((task) => task.status === "to-do" && task.assigned_to.includes(userId))}
        setTaskInfo={setTaskInfo}
        projectId={projectId}
      />
      <TaskCategory
        category={"in-progress"}
        handleTaskAction={(e, b) => handleTaskAction(e, b)}
        changeStatus={items.filter((item) => item.key !== "in-progress")}
        tasks={tasks.filter((task) => task.status === "in-progress")}
        setTaskInfo={setTaskInfo}
        projectId={projectId}
        
      />
      <TaskCategory
        category={"completed"}
        handleTaskAction={(e, b) => handleTaskAction(e, b)}
        changeStatus={items.filter((item) => item.key !== "completed")}
        tasks={tasks.filter((task) => task.status === "completed")}
        setTaskInfo={setTaskInfo}
        projectId={projectId}
        
      />
    </section>
  );
}

// return(
