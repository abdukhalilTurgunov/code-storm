import React from "react";
import { Avatar, Menu, Typography, Tag, Button } from "antd";
import LogoutButton from "../../Logout.jsx";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import "../../../assets/css/profile.css";

const API_URL = "http://127.0.0.1:8000";

export default function ProfileTabs({ userData }) {
  const user = userData?.member[0];

  const menuStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "7px",
    fontSize: "20px",
    border: "none",
    margin: "15px 0",
  };
  const socialLinks = [
    {
      key: "github",
      icon: <GithubOutlined style={{ fontSize: "20px" }} />,
      label: "GitHub",
      onClick: () => window.open(user.github, "_blank"),
    },
    {
      key: "linkedin",
      icon: <LinkedinOutlined style={{ fontSize: "20px" }} />,
      label: "LinkedIn",
      onClick: () => window.open(user.linkedin, "_blank"),
    },
  ];
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingBottom: "50px",
      }}
    >
      <Avatar
        size={150}
        style={{ margin: "25px auto", display: "block" }}
        src={`${API_URL}${user?.photo}`}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {user?.name}
      </Typography.Title>
      <Menu mode="horizontal" items={socialLinks} style={menuStyle} />
      <Tag
        color="success"
        size="large"
        style={{
          fontSize: "16px",
          padding: "7px 10px",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {user.role}
      </Tag>
      <LogoutButton />
    </div>
  );
}
