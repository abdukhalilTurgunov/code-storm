// import { members, projects, tasks } from "./data";

// const fetchData = (data, time = 750) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (data) {
//                 resolve(data);
//             } else {
//                 reject(new Error("Ошибка загрузки данных"));
//             }
//         }, time);
//     });
// };

// export const fetchMembers = (time) => fetchData(members, time);
// export const fetchProjects = (time) => fetchData(projects, time);
// export const fetchTasks = (time) => fetchData(tasks, time);

const API_BASE = "http://127.0.0.1:8000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchMembers = async () => {
    const response = await fetch(`${API_BASE}/members/`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Ошибка загрузки участников");
    return response.json();
};

export const fetchProjects = async () => {
    const response = await fetch(`${API_BASE}/projects/`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Ошибка загрузки проектов");
    return response.json();
};

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE}/tasks/`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Ошибка загрузки задач");
    return response.json();
};