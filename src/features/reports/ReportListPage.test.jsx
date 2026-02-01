// src/features/reports/ReportListPage.test.jsx
import React from "react"
import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ReportListPage from "./ReportListPage"
import { REPORTS } from "./config/reportConfig"

describe("ReportListPage", () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ReportListPage />
      </MemoryRouter>
    )

  beforeEach(() => {
    // Ensure we start fresh each test
    renderComponent()
  })

  it("renders heading and description", () => {
    expect(screen.getByText("Reports")).toBeInTheDocument()
    expect(
      screen.getByText(/Upload Excel or CSV files/i)
    ).toBeInTheDocument()
  })

  it("renders all reports initially", () => {
    REPORTS.forEach((report) => {
      expect(screen.getByText(report.title)).toBeInTheDocument()
    })
  })

  it("filters reports based on search query", () => {
    const input = screen.getByLabelText("Search reports")
    fireEvent.change(input, { target: { value: "employees" } })

    // Only reports with "employees" in title should remain
    const filtered = REPORTS.filter((r) =>
      r.title.toLowerCase().includes("employees")
    )

    filtered.forEach((report) => {
      expect(screen.getByText(report.title)).toBeInTheDocument()
    })

    const nonMatching = REPORTS.filter(
      (r) => !r.title.toLowerCase().includes("employees")
    )
    nonMatching.forEach((report) => {
      expect(screen.queryByText(report.title)).not.toBeInTheDocument()
    })
  })

  it("shows empty state when no reports match", () => {
    const input = screen.getByLabelText("Search reports")
    fireEvent.change(input, { target: { value: "nonexistent" } })

    expect(
      screen.getByText(/No reports found matching "nonexistent"/i)
    ).toBeInTheDocument()
  })

  it("clears search when clear button is clicked", () => {
    const input = screen.getByLabelText("Search reports")
    fireEvent.change(input, { target: { value: "employees" } })

    const clearButton = screen.getByRole("button", { name: /Clear search/i })
    fireEvent.click(clearButton)

    // All reports should be visible again
    REPORTS.forEach((report) => {
      expect(screen.getByText(report.title)).toBeInTheDocument()
    })
  })
})
