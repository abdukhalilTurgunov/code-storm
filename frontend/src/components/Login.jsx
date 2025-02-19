import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, AutoComplete } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000/api/"

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailOptions, setEmailOptions] = useState([]);
  const domains = ["gmail.com", "student.itpu.uz", "mail.ru"];
  const handleSearch = (value) => {
    if (!value || value.includes("@")) {
      setEmailOptions([]);
      return;
    }
    const suggestions = domains.map((domain) => ({
      value: `${value}@${domain}`,
      label: `${value}@${domain}`,
    }));
    setEmailOptions(suggestions);
  };

  // Авторизация
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login error");

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      message.success("You have successfully logged in!");

      navigate("/dashboard");
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360, margin: "0 auto", paddingTop: "100px" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <AutoComplete options={emailOptions} onSearch={handleSearch}>
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          visibilityToggle
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
