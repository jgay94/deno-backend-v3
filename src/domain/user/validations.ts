import { z } from "@zod/mod.ts";

/**
 * UserStatusSchema is a Zod schema for validating the UserStatus object.
 */
const UserStatusSchema = z.object({
  isActive: z.boolean(),
  isVerified: z.boolean(),
  isLocked: z.boolean(),
});

/**
 * CreateUserSchema is a Zod schema for validating the input for creating a new user.
 */
export const CreateUserSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  status: UserStatusSchema,
});

/**
 * UpdateUserSchema is a Zod schema for validating the input for updating an existing user.
 */
export const UpdateUserSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
  username: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  status: UserStatusSchema.optional(),
});

/**
 * UpsertUserSchema is a Zod schema for validating the input for upserting a user.
 */
export const UpsertUserSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  status: UserStatusSchema,
});
