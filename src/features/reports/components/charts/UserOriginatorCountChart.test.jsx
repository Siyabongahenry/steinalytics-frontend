// src/components/charts/UserOriginatorCountChart.test.jsx
import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import UserOriginatorCountChart from "./UserOriginatorCountChart"

/**
 * Mock recharts to avoid SVG / ResizeObserver issues in JSDOM
 */
vi.mock("recharts", async () => {
  const Original = await vi.importActual("recharts")

  return {
    ...Original,
    ResponsiveContainer: ({ children }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    BarChart: ({ children, data }) => (
      <div data-testid="bar-chart" data-chart={JSON.stringify(data)}>
        {children}
      </div>
    ),
    Bar: ({ children }) => <div data-testid="bar">{children}</div>,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    LabelList: () => <div data-testid="label-list" />,
  }
})

describe("UserOriginatorCountChart", () => {
  const mockData = [
    { "User Originator": "Alice", incorrect_entry_count: 2 },
    { "User Originator": "Bob", incorrect_entry_count: 5 },
    { "User Originator": "Charlie", incorrect_entry_count: 3 },
  ]

  it("renders the chart title", () => {
    render(
      <UserOriginatorCountChart
        title="VIP Validation Errors"
        data={mockData}
      />
    )

    expect(
      screen.getByText("VIP Validation Errors")
    ).toBeInTheDocument()
  })

  it("renders recharts components", () => {
    render(
      <UserOriginatorCountChart
        title="Test Chart"
        data={mockData}
      />
    )

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
    expect(screen.getByTestId("bar")).toBeInTheDocument()
    expect(screen.getByTestId("x-axis")).toBeInTheDocument()
    expect(screen.getByTestId("y-axis")).toBeInTheDocument()
    expect(screen.getByTestId("label-list")).toBeInTheDocument()
  })

  it("sorts data descending by incorrect_entry_count", () => {
    render(
      <UserOriginatorCountChart
        title="Sorted Chart"
        data={mockData}
      />
    )

    const chart = screen.getByTestId("bar-chart")
    const renderedData = JSON.parse(chart.dataset.chart)

    expect(renderedData.map(d => d["User Originator"])).toEqual([
      "Bob",      // 5
      "Charlie",  // 3
      "Alice",    // 2
    ])
  })
})
