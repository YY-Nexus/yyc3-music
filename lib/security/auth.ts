import { cookies } from "next/headers"

// Check if user is authenticated
export async function isAuthenticated(request: Request): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (!sessionToken) {
    return false
  }

  // In a real application, verify the session token against a database
  // For now, we just check if it exists
  return sessionToken.length > 0
}

// Get user ID from session
export async function getUserId(request: Request): Promise<string | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value

  return userId || null
}

// Rate limiting store 
// WARNING: In-memory store is not suitable for production serverless environments
// For production, use Redis, Upstash, or similar distributed cache
// Example: import { Redis } from '@upstash/redis'
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
export function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Clean up expired rate limit records on-demand to avoid background tasks in serverless
export function cleanupRateLimitStore(): void {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Get client IP address
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return "unknown"
}
