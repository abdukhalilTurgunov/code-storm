import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";  // URL вашего API

export default function ProfileSettings() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { password, password2 } = values;

    // Проверка, совпадают ли пароли
    if (password !== password2) {
      message.error("Passwords do not match!");
      return;
    }

    const formData = {
      new_password: password,
      confirm_password: password2
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(`${API_URL}/account/change-password`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Password updated successfully!");
      setTimeout(() => {
        window.location.reload()        
      }, 1000);
    } catch (error) {
      console.error(
        "Error changing password:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to update password!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="change-password"
      autoComplete="off"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: "100%",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="New Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your new password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your new password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
