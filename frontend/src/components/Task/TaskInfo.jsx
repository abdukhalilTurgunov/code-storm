import React, { useContext } from "react";
import ProjectContext from "../../context/ProjectContext";

export default function TaskInfo({ taskInfo, setOpen }) {
  const { members, projects } = useContext(ProjectContext);
  const project = projects.find((project) => project.id === taskInfo.project);
  function findMember(id) {
    const member = members.find((member) => member.id === id);
    return member;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }
  
  const projectName = project ? project.name : "Неизвестный проект";
  const created_by = findMember(taskInfo.created_by)
  return (
    <>
      <div className="task-info">
        <div className="task-info_content">
          <div className="task-info_box">
            <button
              className="task-info_back"
              onClick={() => {
                setOpen(false);
              }}
            >
              <img src="src/assets/img/icons/back.svg" alt="" />
              {projectName}
            </button>
            {/* <a href="" className="task-info_link">
                <img src="src/assets/img/icons/share.svg" alt="" />
              </a> */}
          </div>
          <button className="task_tag" style={{ background: `#${taskInfo.tag_bg}`}}>
            {taskInfo.tag}
          </button>
          <p></p>
          <h2 className="task-info_title">{taskInfo.title}</h2>
          <p className="task-info_desc">{taskInfo.description}</p>
          <div className="task-info_members">
            <div className="task-info_members-item">
              <h5 className="task-info_members-label">Created by</h5>
              
              <button className="task-info_member">
                <img src={created_by.photo} alt="" />
                {created_by.full_name}
              </button>
            </div>
            <div className="task-info_members-item">
              <h5 className="task-info_members-label">Assigned to</h5>
              {taskInfo.assigned_to?.map((id) => {
                const member = findMember(id);
                return member ? (
                  <button key={member.id} className="task-info_member">
                    <img src={member.photo} alt="" />
                    {member.full_name}
                  </button>
                ) : null;
              })}
            </div>
            <div className="task-info_members-item">
              <h5 className="task-info_members-label">Timeline</h5>
              <p className="task-info_date">
                {formatDate(taskInfo.created_date)} to {formatDate(taskInfo.deadline)}
              </p>
            </div>
            <div className="task-info_members-item">
              <h5 className="task-info_members-label">Status</h5>
              <p className="category_title">
                <span
                  className={`category_title-circle ${taskInfo.status}`}
                ></span>
                {taskInfo.status}
              </p>
            </div>
          </div>
          {taskInfo.img && (
            <img src={taskInfo.img} alt="" className="task-info_img" />
          )}
        </div>
      </div>
    </>
  );
}
