import { z } from 'zod';

export const createTaskSchema = z.object({
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
    .date()
    .optional(),
  end_date: z
    .date()
    .optional(),
  project_id: z
    .string()
    .min(1, { message: "Task project is required" })
    .min(3, { message: "Task project must be at least 3 characters" }),
  description: z
    .string()
    .min(1, { message: "Task description is required" })
    .min(3, { message: "Task description must be at least 3 characters" }),
});

export type TaskFormData = z.infer<typeof createTaskSchema>;