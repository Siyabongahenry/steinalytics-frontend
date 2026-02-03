// src/services/ReportServices.test.js
import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import { uploadReport } from "./ReportServices"

// Mock axios
vi.mock("axios")

describe("uploadReport service", () => {
  const fakeFile = new File(["dummy content"], "test.csv", { type: "text/csv" })
  const accessToken = "fake-token"

  beforeEach(() => {
    vi.clearAllMocks()
    import.meta.env.VITE_API_URL = "http://localhost:8000"
  })

  it("should upload a report successfully", async () => {
    const mockResponse = { data: { success: true } }
    axios.post.mockResolvedValueOnce(mockResponse)

    const result = await uploadReport(
      "vip-validation",
      fakeFile,
      undefined,
      accessToken
    )

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/vip-validation",
      expect.any(FormData),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        }),
      })
    )
    expect(result).toEqual({ success: true })
  })

  it("should throw error for unknown report type", async () => {
    await expect(
      uploadReport("unknown-type", fakeFile, undefined, accessToken)
    ).rejects.toThrow("Unknown report type: unknown-type")
  })

  it("should handle FastAPI error response", async () => {
    const error = {
      response: {
        status: 400,
        data: { detail: "Invalid file format" },
      },
    }
    axios.post.mockRejectedValueOnce(error)

    await expect(
      uploadReport("vip-validation", fakeFile, undefined, accessToken)
    ).rejects.toThrow("Invalid file format")
  })

  it("should handle network error", async () => {
    const error = {}
    axios.post.mockRejectedValueOnce(error)

    await expect(
      uploadReport("vip-validation", fakeFile, undefined, accessToken)
    ).rejects.toThrow("Network error. Please try again.")
  })
})
