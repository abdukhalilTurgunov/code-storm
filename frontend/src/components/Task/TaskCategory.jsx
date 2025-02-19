import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin, Empty } from "antd";
import Task from "./Task";

export default function TaskCategory({
  category,
  handleTaskAction,
  changeStatus,
  tasks,
  projectId,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="category">
      <div className="category_box">
        <h3 className="category_title">
          <span className={`category_title-circle ${category}`}></span>
          {category}
          <span className="task_quantity">{tasks.length}</span>
        </h3>
        {projectId && (
          <button
            className="category_btn"
            onClick={() => handleTaskAction("modal", category)}
          >
            <img src="src/assets/img/icons/plus.svg" alt="" />
          </button>
        )}
      </div>
      <ul className="tasks-category_menu">
        {loading ? (
          <Flex justify="center" align="center" style={{ marginTop: 100 }}>
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
            />
          </Flex>
        ) : tasks.length > 0 ? (
          <Task
            handleTaskAction={(a, b) => handleTaskAction(a, b)}
            changeStatus={changeStatus}
            tasks={tasks}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: 100 }}
          />
        )}
      </ul>
    </div>
  );
}
