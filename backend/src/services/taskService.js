import Task from "../models/task.models.js";

export const createTask = async (taskData) => {
  return Task.create(taskData);
};

export const getTasks = async () => {
  return Task.find().sort({ createdAt: -1 });
};

export const getTaskById = async (taskId) => {
  return Task.findById(taskId);
};

export const updateTask = async (taskId, taskData) => {
  return Task.findByIdAndUpdate(taskId, taskData, {
    new: true,
    runValidators: true,
  });
};

export const deleteTask = async (taskId) => {
  return Task.findByIdAndDelete(taskId);
};
