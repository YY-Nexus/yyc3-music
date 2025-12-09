import { z } from "zod"

// Email validation schema
export const emailSchema = z.string().email().max(255)

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")

// User ID validation
export const userIdSchema = z.string().uuid("Invalid user ID format")

// Music generation parameters validation
export const musicParamsSchema = z.object({
  prompt: z.string().min(1).max(1000),
  style: z.string().min(1).max(50),
  tempo: z.number().min(40).max(300),
  duration: z.number().min(10).max(600),
  mood: z.string().min(1).max(50),
})

// Category validation for trending API
export const categorySchema = z.enum(["all", "pop", "rock", "jazz", "classical", "electronic"])

// Sanitize user input for AI prompts to prevent prompt injection
export function sanitizeForPrompt(input: string): string {
  // Remove potentially dangerous characters and sequences
  return input
    .replace(/[<>{}]/g, "") // Remove angle brackets and braces
    .replace(/\n{3,}/g, "\n\n") // Limit consecutive newlines
    .replace(/system|assistant|user:/gi, "") // Remove role keywords
    .slice(0, 500) // Limit length
    .trim()
}

// Validate and sanitize email
export function validateEmail(email: unknown): string {
  const result = emailSchema.safeParse(email)
  if (!result.success) {
    throw new Error("Invalid email format")
  }
  return result.data
}

// Validate password
export function validatePassword(password: unknown): string {
  const result = passwordSchema.safeParse(password)
  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }
  return result.data
}

// Generic validation function
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(result.error.issues[0].message)
  }
  return result.data
}
