import crypto from "crypto"

// 加密配置
const ALGORITHM = "aes-256-gcm"
const IV_LENGTH = 16 // 初始化向量长度
const KEY_LENGTH = 32 // 密钥长度 (256 bits)
const AUTH_TAG_LENGTH = 16 // 认证标签长度

// Get encryption key from environment variable
const getEncryptionKey = (): Buffer => {
  const envKey = process.env.ENCRYPTION_KEY

  if (!envKey) {
    throw new Error(
      "ENCRYPTION_KEY environment variable is required. Generate one with: openssl rand -hex 32"
    )
  }

  const keyBuffer = Buffer.from(envKey, "hex")

  if (keyBuffer.length !== KEY_LENGTH) {
    throw new Error(
      `Invalid ENCRYPTION_KEY length. Expected ${KEY_LENGTH} bytes (64 hex characters), got ${keyBuffer.length} bytes`
    )
  }

  return keyBuffer
}

// 加密数据
export function encrypt(text: string): { encryptedData: string; iv: string; authTag: string } {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  // 获取认证标签
  const authTag = cipher.getAuthTag()

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  }
}

// Decrypt data
export function decrypt(encryptedData: string, iv: string, authTag: string): string {
  try {
    const key = getEncryptionKey()
    const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, "hex"))

    // Set authentication tag
    decipher.setAuthTag(Buffer.from(authTag, "hex"))

    let decrypted = decipher.update(encryptedData, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    // Log error securely without exposing details
    console.error("Decryption failed")
    throw new Error("Data verification failed")
  }
}

// 生成哈希
export function hash(text: string, salt?: string): string {
  const useSalt = salt || crypto.randomBytes(16).toString("hex")
  const hmac = crypto.createHmac("sha256", useSalt)
  hmac.update(text)
  return `${hmac.digest("hex")}:${useSalt}`
}

// 验证哈希
export function verifyHash(text: string, hashedText: string): boolean {
  const [hash, salt] = hashedText.split(":")
  const hmac = crypto.createHmac("sha256", salt)
  hmac.update(text)
  return hmac.digest("hex") === hash
}

// 生成安全的随机令牌
export function generateToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex")
}
