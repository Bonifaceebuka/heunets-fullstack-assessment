import { z } from 'zod';

export const signupSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .min(3, { message: "Full name must be at least 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
  .min(1, { message: "Confirm Password is required" })
  ,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type SignupFormData = z.infer<typeof signupSchema>;

