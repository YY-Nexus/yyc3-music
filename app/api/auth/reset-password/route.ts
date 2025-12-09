import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { validateCsrfToken } from "../../csrf/route"
import { validateEmail } from "@/lib/security/validation"
import { checkRateLimit, getClientIp } from "@/lib/security/auth"

export async function POST(request: Request) {
  try {
    // Verify CSRF token
    const isValidCsrf = await validateCsrfToken(request)
    if (!isValidCsrf) {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 })
    }

    // Rate limiting check
    const clientIp = getClientIp(request)
    if (!checkRateLimit(`reset-password:${clientIp}`, 3, 3600000)) {
      // 3 requests per hour
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    
    // Validate email
    const email = validateEmail(body.email)

    // DO NOT include user email in AI prompts - use generic suggestions
    const aiAnalysis = await generateText({
      model: openai("gpt-4o"),
      prompt: `Provide generic password security best practices and suggestions for creating a strong password. Include tips about length, complexity, and avoiding common patterns.`,
    })

    // In production, send password reset email here
    // Do not reveal if email exists in system (prevents user enumeration)

    return NextResponse.json({
      suggestion: aiAnalysis.text,
      status: "success",
      message: "If the email exists in our system, you will receive a password reset link.",
    })
  } catch (error) {
    // Generic error message to avoid information disclosure
    return NextResponse.json({ error: "Unable to process request" }, { status: 400 })
  }
}
