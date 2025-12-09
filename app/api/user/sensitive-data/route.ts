import { NextResponse } from "next/server"
import { encrypt, decrypt } from "@/lib/security/encryption"
import { isAuthenticated, getUserId } from "@/lib/security/auth"
import { validateCsrfToken } from "../../csrf/route"
import { userIdSchema } from "@/lib/security/validation"

// Store sensitive data
export async function POST(request: Request) {
  try {
    // Check authentication
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify CSRF token
    const isValidCsrf = await validateCsrfToken(request)
    if (!isValidCsrf) {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 })
    }

    const authenticatedUserId = await getUserId(request)
    const body = await request.json()
    
    // Validate userId format
    const userId = userIdSchema.parse(body.userId)

    // Authorization check: users can only store their own data
    if (!authenticatedUserId || authenticatedUserId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    if (!body.sensitiveData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Encrypt sensitive data
    const { encryptedData, iv, authTag } = encrypt(JSON.stringify(body.sensitiveData))

    // In production, store encrypted data in database with userId
    // await db.storeSensitiveData(userId, encryptedData, iv, authTag)

    return NextResponse.json({
      message: "Data stored successfully",
    })
  } catch (error) {
    // Generic error to prevent information disclosure
    return NextResponse.json({ error: "Unable to process request" }, { status: 400 })
  }
}

// Retrieve sensitive data
export async function GET(request: Request) {
  try {
    // Check authentication
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const authenticatedUserId = await getUserId(request)
    const { searchParams } = new URL(request.url)
    const requestedUserId = searchParams.get("userId")

    if (!requestedUserId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 })
    }

    // Validate userId format
    const userId = userIdSchema.parse(requestedUserId)

    // Authorization check: users can only access their own data
    if (!authenticatedUserId || authenticatedUserId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // In production, fetch encrypted data from database
    // const data = await db.getSensitiveData(userId)
    const mockEncryptedData = {
      encryptedData: "5b7e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
      iv: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      authTag: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    }

    try {
      // Decrypt data
      const decryptedData = decrypt(mockEncryptedData.encryptedData, mockEncryptedData.iv, mockEncryptedData.authTag)

      return NextResponse.json({
        sensitiveData: JSON.parse(decryptedData),
      })
    } catch (error) {
      // Data integrity check failed
      return NextResponse.json({ error: "Data verification failed" }, { status: 403 })
    }
  } catch (error) {
    // Generic error to prevent information disclosure
    return NextResponse.json({ error: "Unable to process request" }, { status: 400 })
  }
}
