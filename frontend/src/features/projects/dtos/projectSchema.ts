import { z } from 'zod';

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project name is required" })
    .min(3, { message: "Project name must be at least 3 characters" }),
  description: z
    .string()
    .min(1, { message: "Project description is required" })
    .min(3, { message: "Project description must be at least 3 characters" }),
});

export type ProjectFormData = z.infer<typeof projectSchema>;