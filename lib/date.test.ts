import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { combineLocalDateAndTimeToISO, toLocalDateInputValue, toLocalTimeInputValue } from "@/lib/date"

describe("local date/time <-> ISO conversion (timezone regression guard)", () => {
  const originalTZ = process.env.TZ

  beforeAll(() => {
    process.env.TZ = "America/Sao_Paulo" // UTC-3, no DST
  })

  afterAll(() => {
    process.env.TZ = originalTZ
  })

  it("round-trips a local date+time through ISO without shifting the wall-clock value", () => {
    const iso = combineLocalDateAndTimeToISO("2024-03-10", "14:30")
    expect(toLocalDateInputValue(iso)).toBe("2024-03-10")
    expect(toLocalTimeInputValue(iso)).toBe("14:30")
  })

  it("converts local midnight to the correctly offset UTC instant, not a naive copy", () => {
    // Regression guard for the bug fixed in 68e43ce: naively building
    // `${date}T${time}:00.000Z` stamps the local wall-clock value as if it
    // were already UTC, silently shifting every reservation by the local
    // offset. São Paulo local midnight must become 03:00 UTC, not 00:00 UTC.
    expect(combineLocalDateAndTimeToISO("2024-01-01", "00:00")).toBe("2024-01-01T03:00:00.000Z")
  })
})
