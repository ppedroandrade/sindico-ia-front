import { describe, expect, it } from "vitest"
import { formatCurrency, formatDate } from "@/lib/format"

describe("formatCurrency", () => {
  it("formats a number as BRL currency", () => {
    expect(formatCurrency(1234.5)).toBe(
      (1234.5).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    )
  })

  it("treats null/undefined as zero instead of throwing", () => {
    const zero = (0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    expect(formatCurrency(null)).toBe(zero)
    expect(formatCurrency(undefined)).toBe(zero)
  })
})

describe("formatDate", () => {
  it("formats a valid date/string as pt-BR", () => {
    expect(formatDate("2024-03-10T00:00:00.000Z")).toBe(
      new Date("2024-03-10T00:00:00.000Z").toLocaleDateString("pt-BR"),
    )
  })

  it("falls back to '-' instead of leaking 'Invalid Date' to the UI", () => {
    expect(formatDate(null)).toBe("-")
    expect(formatDate(undefined)).toBe("-")
    expect(formatDate("not-a-date")).toBe("-")
  })
})
