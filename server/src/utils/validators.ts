import { z } from 'zod';

export const emailSchema = z.string().email().max(255);
export const passwordSchema = z.string().min(8).max(200);

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  display_name: z.string().min(1).max(100).optional()
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1)
});

