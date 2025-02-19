import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const API_URL = "http://127.0.0.1:8000/api/";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      message.error("You are not logged in!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Исправил `Token` → `Bearer`
        },
        body: JSON.stringify({
          refresh: localStorage.getItem("refresh_token"),
        }), // Передаем refresh-токен
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Logout failed");
      }

      // Очищаем токены
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // message.success("You have successfully logged out!")
      // Переход на страницу логина с передачей сообщения
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Button
      type="primary"
      danger
      size="large"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        padding: "0 16px",
        marginTop: "auto",
      }}
    >
      Logout
    </Button>
  );
}
