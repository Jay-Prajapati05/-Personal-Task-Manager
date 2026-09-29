import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  description: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(["pending", "completed"])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .optional()
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(["pending", "completed"])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .optional()
});