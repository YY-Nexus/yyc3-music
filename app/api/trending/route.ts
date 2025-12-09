import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { categorySchema } from "@/lib/security/validation"
import { isAuthenticated } from "@/lib/security/auth"
import { validateCsrfToken } from "../csrf/route"

// Whitelist of allowed API endpoints
const ALLOWED_API_BASE = process.env.TRENDING_API_URL || "https://api.example.com"

// Use Next.js 13 caching mechanism
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryParam = searchParams.get("category") || "all"

    // Validate category to prevent injection
    const category = categorySchema.parse(categoryParam)

    // Construct safe URL with validated parameters
    const apiUrl = new URL("/trending", ALLOWED_API_BASE)
    apiUrl.searchParams.set("category", category)

    // Fetch with timeout and error handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      const response = await fetch(apiUrl.toString(), {
        signal: controller.signal,
        next: {
          tags: ["trending", `trending-${category}`],
          revalidate: 3600, // 1 hour cache
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error("External API error")
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (fetchError) {
      clearTimeout(timeoutId)
      // Return cached or fallback data instead of exposing error
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 })
    }
  } catch (error) {
    // Generic error to prevent information disclosure
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

// Manual cache revalidation endpoint
export async function POST(request: Request) {
  try {
    // Check authentication for admin operations
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify CSRF token
    const isValidCsrf = await validateCsrfToken(request)
    if (!isValidCsrf) {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 })
    }

    const body = await request.json()

    if (body.category) {
      // Validate category
      const category = categorySchema.parse(body.category)
      
      // Revalidate specific tag
      revalidateTag(`trending-${category}`)
      return NextResponse.json({ revalidated: true, category })
    }

    // Revalidate entire path
    revalidatePath("/api/trending")
    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ error: "Unable to revalidate cache" }, { status: 400 })
  }
}
