import { z } from 'zod';

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Task title is required" })
    .min(3, { message: "Task title must be at least 3 characters" }),
  status: z
    .enum(['todo', 'in_progress', 'completed']),
  priority: z
    .enum(['low', 'medium', 'high']),
  assigned_to: z
    .string()
    .optional(),
  start_date: z
    .string()
    .optional(),
  end_date: z
    .string()
    .optional(),
  _id: z
    .string(),
  description: z
    .string()
    .min(1, { message: "Task description is required" })
    .min(50, { message: "Task description must be at least 50 characters" }),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;