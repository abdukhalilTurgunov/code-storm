import React, { useContext } from "react";
import { Flex, Dropdown, message } from "antd";
import ProjectContext from "../../context/ProjectContext";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";
export default function Task({ handleTaskAction, changeStatus, tasks }) {
  const { members } = useContext(ProjectContext);
  function findMember(id) {
    const member = members.find((member) => member.id === id);
    return member;
  }
  const updateTaskStatus = async (taskId, newStatus) => {
    const accessToken = localStorage.getItem("access_token");
    try {
      await axios.patch(
        `${API_URL}task/${taskId}/edit`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      message.success("Status have been changed successfully");
      setTimeout(() => {
        window.location.reload()
      }, 500);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <>
      {tasks.map((task) => (
        <li
          className="tasks-category_menu-item"
          onClick={() => {
            handleTaskAction("task", task);
          }}
          key={task.id}
        >
          <Flex justify="space-between">
            <button
              className="task_tag"
              style={{ background: `#${task.tag_bg}` }}
            >
              {task.tag}
            </button>
            <Dropdown
              menu={{
                items: changeStatus.map((item) => ({
                  ...item,
                  onClick: (e) => {
                    e.domEvent.stopPropagation();
                    updateTaskStatus(task.id, item.key);
                  },
                })),
              }}
              trigger={["click"]}
            >
              <button
                className="task_dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </Dropdown>
          </Flex>
          <h4 className="task_title">{task.title}</h4>
          {task.img && <img src={task.img} alt="" className="task_img" />}

          <div className="task_footer">
            {/* <button className="task_comment">
              <img src="src/assets/img/icons/comment.svg" alt="" />
              12
            </button> */}
            <div className="task_assign">
              <h5 className="task_assign-text">Assigned to</h5>
              <div className="task_assign-box">
                {task.assigned_to?.map((memberObj) => {
                  const member = findMember(memberObj);
                  return member ? (
                    <img src={member.photo} alt="" key={member.id} />
                  ) : null;
                })}
                {/* {task.project.members} */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
