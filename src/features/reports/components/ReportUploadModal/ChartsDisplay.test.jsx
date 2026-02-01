// src/components/ReportUploadModal/ChartsDisplay.test.jsx
import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import ChartsDisplay from "./ChartsDisplay"

/* ===============================
   Mock chart components
================================ */
vi.mock("../charts/DeviceClockingsChart", () => ({
  default: () => <div data-testid="device-clockings-chart" />,
}))

vi.mock("../charts/UserOriginatorCountChart", () => ({
  default: ({ title }) => (
    <div data-testid="user-originator-chart">
      {title}
    </div>
  ),
}))

describe("ChartsDisplay", () => {
  it("returns null when chartData is empty", () => {
    const { container } = render(
      <ChartsDisplay chartData={[]} reportType="vip-validation" />
    )

    expect(container.firstChild).toBeNull()
  })

  it("renders DeviceClockingsChart for device-clockings report", () => {
    render(
      <ChartsDisplay
        reportType="device-clockings"
        chartData={[{ some: "data" }]}
      />
    )

    expect(
      screen.getByTestId("device-clockings-chart")
    ).toBeInTheDocument()
  })

  it("renders UserOriginatorCountChart for vip-validation report", () => {
    render(
      <ChartsDisplay
        reportType="vip-validation"
        chartData={[{ name: "John", incorrect_entry_count: 3 }]}
      />
    )

    expect(
      screen.getByTestId("user-originator-chart")
    ).toBeInTheDocument()

    expect(
      screen.getByText("Entries with Incorrect VIP per Originator")
    ).toBeInTheDocument()
  })

  it("renders multiple UserOriginatorCountCharts for overbooking report", () => {
    const chartData = [
      {
        type: "Department A",
        records: [{ name: "A", incorrect_entry_count: 2 }],
      },
      {
        type: "Department B",
        records: [{ name: "B", incorrect_entry_count: 5 }],
      },
    ]

    render(
      <ChartsDisplay
        reportType="overbooking"
        chartData={chartData}
      />
    )

    const charts = screen.getAllByTestId("user-originator-chart")
    expect(charts).toHaveLength(2)

    expect(screen.getByText("Department A")).toBeInTheDocument()
    expect(screen.getByText("Department B")).toBeInTheDocument()
  })

  it("renders nothing for unsupported report type", () => {
    render(
      <ChartsDisplay
        reportType="unknown-type"
        chartData={[{ foo: "bar" }]}
      />
    )

    expect(
      screen.queryByTestId("device-clockings-chart")
    ).not.toBeInTheDocument()

    expect(
      screen.queryByTestId("user-originator-chart")
    ).not.toBeInTheDocument()
  })
})
