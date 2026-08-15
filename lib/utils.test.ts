import { describe, expect, it } from "vitest"
import { isSafeRedirectPath } from "@/lib/utils"

describe("isSafeRedirectPath", () => {
  it("allows internal paths", () => {
    expect(isSafeRedirectPath("/dashboard")).toBe(true)
    expect(isSafeRedirectPath("/reservas/123")).toBe(true)
  })

  it("blocks protocol-relative and external URLs (open redirect)", () => {
    expect(isSafeRedirectPath("//evil.com")).toBe(false)
    expect(isSafeRedirectPath("https://evil.com")).toBe(false)
    expect(isSafeRedirectPath("javascript:alert(1)")).toBe(false)
  })

  it("blocks empty, missing, and /login targets", () => {
    expect(isSafeRedirectPath(null)).toBe(false)
    expect(isSafeRedirectPath(undefined)).toBe(false)
    expect(isSafeRedirectPath("")).toBe(false)
    expect(isSafeRedirectPath("/login")).toBe(false)
  })
})
