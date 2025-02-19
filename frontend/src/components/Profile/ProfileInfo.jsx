import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ProfileInfo({ userData }) {
  const user = userData.member[0];
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    const { first_name, email, git_url, linkedin_url, photo } = values;
    // console.log("Form values:", values);
    // console.log("Email:", email);
    const formData = new FormData();
    formData.append("full_name", first_name);
    formData.append("email", email);
    formData.append("github_link", git_url);
    formData.append("linkedin_link", linkedin_url);
    if (photo && photo.length > 0) {
      formData.append("photo", photo[0].originFileObj);
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(`${API_URL}/account/edit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Profile updated successfully");
      setTimeout(() => {
        window.location.reload()
      }, 450);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleChange = (info) => {
    setFileList(info.fileList);
  };
  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("access_token");
      await axios.put(`${url}/account/edit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onSuccess("Upload success");
    } catch (error) {
      console.error("Error uploading photo:", error);
      onError(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: "100%",
      }}
      initialValues={{
        remember: true,
        first_name: `${user.name}`,
        email: `${userData.email}`,
        git_url: `${user.github}`,
        linkedin_url: `${user.linkedin}`,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Github"
        name="git_url"
        rules={[
          {
            required: true,
            message: "Please input your Github account url",
          },
          {
            type: "url",
            warningOnly: true,
          },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="LinkedIn"
        name="linkedin_url"
        rules={[
          {
            required: true,
            message: "Please input your LinkedIn account url",
          },
          {
            type: "url",
            warningOnly: true,
          },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="photo"
        label="Photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra=".jpg/.png"
      >
        <Upload
          name="photo"
          listType="picture"
          accept=".jpg,.png"
          beforeUpload={(file) => {
            const isValid =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isValid) {
              message.error("Only JPG and PNG files are allowed!");
            }
            return isValid;
          }}
          onChange={handleChange}
          customRequest={customRequest}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Change photo</Button>
        </Upload>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
