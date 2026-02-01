// src/features/reports/pages/ReportAnalyzerPage.test.jsx
import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import ReportAnalyzerPage from "./ReportAnalyzerPage"
import { uploadReport } from "../services/ReportServices"
import { useAuth } from "react-oidc-context"
import { REPORTS } from "../config/reportConfig"

// ✅ Mock dependencies
vi.mock("../services/ReportServices", () => ({
  uploadReport: vi.fn(),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
}))

beforeEach(() => {
  useAuth.mockReturnValue({ user: { access_token: "fake-token" } })
})

describe("ReportAnalyzerPage", () => {
  const renderWithRouter = (initialPath) =>
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/reports/:reportType" element={<ReportAnalyzerPage />} />
        </Routes>
      </MemoryRouter>
    )

  it("renders 'Report Not Found' when reportType is invalid", () => {
    renderWithRouter("/reports/invalid-type")

    expect(screen.getByText(/Report Not Found/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Go Back to Reports/i })
    ).toBeInTheDocument()
  })

  it("renders report title and description when reportType is valid", () => {
    const validType = REPORTS[0].type
    renderWithRouter(`/reports/${validType}`)

    expect(screen.getByText(REPORTS[0].title)).toBeInTheDocument()
    if (REPORTS[0].description) {
      expect(screen.getByText(REPORTS[0].description)).toBeInTheDocument()
    }
  })

  it("handles successful file upload", async () => {
    const validType = REPORTS[0].type
    const fakeFile = new File(["dummy"], "test.csv", { type: "text/csv" })

    uploadReport.mockResolvedValueOnce({
      download_url: "http://example.com/report.csv",
      data: [{ chart: "fakeChartData" }],
    })

    renderWithRouter(`/reports/${validType}`)

    // Simulate file drop
    const dropzone = screen.getByText(/Drag & drop Excel\/CSV/i).closest("div")
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [fakeFile] },
    })

    // Click upload
    fireEvent.click(screen.getByRole("button", { name: /Upload & Analyze/i }))

    await waitFor(() => {
      expect(uploadReport).toHaveBeenCalled()
      expect(screen.getByText(/Analytics & Insights/i)).toBeInTheDocument()
      expect(screen.getByText(/Download/i)).toBeInTheDocument()
    })
  })

  it("handles upload error", async () => {
    const validType = REPORTS[0].type
    const fakeFile = new File(["dummy"], "test.csv", { type: "text/csv" })

    uploadReport.mockRejectedValueOnce(new Error("Upload failed"))

    renderWithRouter(`/reports/${validType}`)

    const dropzone = screen.getByText(/Drag & drop Excel\/CSV/i).closest("div")
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [fakeFile] },
    })

    fireEvent.click(screen.getByRole("button", { name: /Upload & Analyze/i }))

    await waitFor(() => {
      expect(uploadReport).toHaveBeenCalled()
      expect(screen.getByText(/Upload failed/i)).toBeInTheDocument()
    })
  })
})
