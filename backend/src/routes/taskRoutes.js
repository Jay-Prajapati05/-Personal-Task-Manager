import express from "express";

import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controller/taskController.js";
import { validate } from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema.js";
const router = express.Router();

router.post("/", validate(createTaskSchema), createTaskController);

router.patch("/:id", validate(updateTaskSchema), updateTaskController);
router.post("/", createTaskController);
router.get("/", getTasksController);
router.get("/:id", getTaskByIdController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
