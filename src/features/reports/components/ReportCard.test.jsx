// src/features/reports/components/ReportCard.test.jsx
import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { FaUsers } from "react-icons/fa"
import ReportCard from "./ReportCard"

describe("ReportCard", () => {
  const props = {
    type: "employees-on-site",
    title: "Summary of Employees per Site",
    description: "Count total employees per site",
    icon: <FaUsers data-testid="report-icon" />,
  }

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ReportCard {...props} />
      </MemoryRouter>
    )

  it("renders title and description", () => {
    renderComponent()

    expect(
      screen.getByText("Summary of Employees per Site")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Count total employees per site")
    ).toBeInTheDocument()
  })

  it("renders the icon", () => {
    renderComponent()

    expect(screen.getByTestId("report-icon")).toBeInTheDocument()
  })

  it("links to the correct report route", () => {
    renderComponent()

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute(
      "href",
      "/reports/employees-on-site"
    )
  })
})
