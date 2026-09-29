import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);

  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.patch(`/tasks/${taskId}`, taskData);

  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
};