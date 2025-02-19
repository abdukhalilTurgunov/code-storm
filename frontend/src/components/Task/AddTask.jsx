import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Upload,
  DatePicker,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../assets/css/tasks.css";

const API_URL = "http://127.0.0.1:8000/api";

export default function AddTask({ status, projectId }) {
  const [tags, setTags] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [assignTasks, setAssignTasks] = useState();
  const [tagBg, setTagBg] = useState(null);
  // const [fileList, setFileList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    const { title, description, tag } = values;
    const deadline = values.deadline
      ? values.deadline.format("YYYY-MM-DD")
      : null;
    const created_by = currentUser?.id;

    formData.append("project", projectId);
    formData.append("created_by", created_by);
    selectedUsers.forEach((user) => {
      formData.append("assigned_to", user);
    });
    formData.append("deadline", deadline);
    formData.append("status", selectedStatus);
    formData.append("title", title);
    formData.append("description", description || "");
    // if (fileList.length > 0) {
    //   formData.append("img", fileList[0].originFileObj);
    // }
    formData.append("tag", tag);
    formData.append("tag_bg", tagBg);

    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.post(`${API_URL}/task/create/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Task created successfully!");
      setTimeout(() => {
        window.location.reload()
      }, 400);
    } catch (error) {
      message.error("Error creating task");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;

      try {
        const [tagsResponse, usersResponse, userResponse] = await Promise.all([
          axios.get(`${API_URL}/task/task-tags`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${API_URL}/members`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${API_URL}/account`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setTags(tagsResponse.data);
        setUsers(usersResponse.data);
        setCurrentUser(userResponse.data);
        setAssignTasks(userResponse.data.member?.[0]?.assignTask);
      } catch (error) {
        message.error("Error fetching data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (!assignTasks) {
        form.setFieldsValue({
          assigned_to: [
            { value: currentUser.id, label: currentUser.member[0]?.name },
          ],
        });
        setSelectedUsers([currentUser?.id]);
      }
      form.setFieldsValue({
        created_by: currentUser?.member[0]?.name,
      });
      if (status) {
        form.setFieldsValue({
          status: [statusOptions.find((e) => e.value === status)],
        });
        setSelectedStatus(status);
      }
    }
  }, [currentUser, assignTasks, form, status]);

  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const customRequest = async ({ file, onSuccess, onError }) => {
  //   const formData = new FormData();
  //   formData.append("img", file);

  //   try {
  //     const token = localStorage.getItem("access_token");
  //     await axios.post(`${API_URL}/task/create/`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     onSuccess("Upload success");
  //   } catch (error) {
  //     console.error("Error uploading photo:", error);
  //     onError(error);
  //   }
  // };

  const tagOptions = tags
    ? tags.map((tag) => ({
        value: tag.tag_name,
        label: tag.tag_name.charAt(0).toUpperCase() + tag.tag_name.slice(1),
      }))
    : [];

  const statusOptions = [
    {
      value: "to-do",
      label: (
        <p className="category_title">
          <span className="category_title-circle to-do"></span>To do
        </p>
      ),
    },
    {
      value: "in-progress",
      label: (
        <p className="category_title">
          <span className="category_title-circle in-progress"></span>In progress
        </p>
      ),
    },
    {
      value: "completed",
      label: (
        <p className="category_title">
          <span className="category_title-circle completed"></span>
          Completed
        </p>
      ),
    },
  ];

  // const normFile = (e) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList?.filter((file) =>
  //     ["image/jpeg", "image/png"].includes(file.type)
  //   );
  // };

  const userOptions = users
    ? users.map((user) => ({
        value: user.id, // id отправляем в базу
        label: user.full_name, // Отображаем имя
      }))
    : [];

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: "100%",
      }}
      initialValues={{
        remember: true,
        status: status,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Task Name"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input task name",
          },
        ]}
      >
        <Input placeholder="Enter task name" />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tag"
        rules={[
          {
            required: true,
            message: "Please choose tag",
          },
        ]}
      >
        <Select
          style={{ width: 200 }}
          allowClear
          options={tagOptions}
          placeholder="select tag"
          onChange={(value) => {
            const selectedTag = tags.find((tag) => tag.tag_name === value);
            if (selectedTag) setTagBg(selectedTag.tag_bg || "#fff");
          }}
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter task description" rows={4} />
      </Form.Item>
      {/* <Form.Item
        name="img"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra=".jpg/.png"
      >
        <Upload
          listType="picture"
          maxCount={1}
          accept="image/jpeg, image/png"
          beforeUpload={(file) => {
            const isValid = ["image/jpeg", "image/png"].includes(file.type);
            if (!isValid) {
              message.error("Only JPG and PNG files are allowed!");
            }
            return isValid;
          }}
          onChange={handleChange}
          customRequest={customRequest}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Upload image</Button>
        </Upload>
      </Form.Item> */}
      <Divider />
      <Form.Item label="Created by" name="created_by" style={{ gap: "10px" }}>
        <Input style={{ width: 150 }} disabled />
      </Form.Item>
      <Form.Item
        label="Assigned to"
        name="assigned_to"
        rules={[
          {
            required: true,
            message: "Please choose member",
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: 235 }}
          options={userOptions}
          disabled={!assignTasks}
          onChange={setSelectedUsers}
        />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[
          {
            required: true,
            message: "Please select deadline",
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        status="status"
        rules={[
          {
            required: true,
            message: "Please select status",
          },
        ]}
      >
        <Select
          style={{ width: 130 }}
          allowClear
          options={statusOptions}
          onChange={setSelectedStatus}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
