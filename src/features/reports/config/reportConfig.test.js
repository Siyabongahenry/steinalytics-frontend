// src/features/reports/config/reportConfig.test.js
import { describe, it, expect } from "vitest"
import { REPORTS } from "./reportConfig"

describe("REPORTS config", () => {
  it("should export a non-empty array", () => {
    expect(Array.isArray(REPORTS)).toBe(true)
    expect(REPORTS.length).toBeGreaterThan(0)
  })

  it("each report should have required properties", () => {
    REPORTS.forEach((report) => {
      expect(report).toHaveProperty("type")
      expect(report).toHaveProperty("title")
      expect(report).toHaveProperty("description")
      expect(report).toHaveProperty("icon")

      expect(typeof report.type).toBe("string")
      expect(typeof report.title).toBe("string")
      expect(typeof report.description).toBe("string")
    })
  })

  it("should not contain duplicate report types", () => {
    const types = REPORTS.map((r) => r.type)
    const uniqueTypes = new Set(types)

    expect(uniqueTypes.size).toBe(types.length)
  })

  it("each report icon should be a valid React component", () => {
    REPORTS.forEach((report) => {
      expect(typeof report.icon).toBe("function")
    })
  })

  it("should contain expected report types", () => {
    const expectedTypes = [
      "vip-validation",
      "overbooking",
      "multiple-clockings",
      "exemption",
      "device-clockings",
      "employees-attendance",
      "employees-on-site",
    ]

    const actualTypes = REPORTS.map((r) => r.type)

    expectedTypes.forEach((type) => {
      expect(actualTypes).toContain(type)
    })
  })
})
