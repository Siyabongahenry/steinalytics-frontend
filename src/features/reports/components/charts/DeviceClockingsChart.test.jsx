// src/components/charts/DeviceClockingsChart.test.jsx
import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import DeviceClockingsChart from "./DeviceClockingsChart"

/* ===============================
   Mock recharts
================================ */
vi.mock("recharts", async () => {
  const Original = await vi.importActual("recharts")

  return {
    ...Original,
    ResponsiveContainer: ({ children }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children, data }) => (
      <div
        data-testid="line-chart"
        data-chart={JSON.stringify(data)}
      >
        {children}
      </div>
    ),
    Line: ({ dataKey }) => (
      <div data-testid="line" data-key={dataKey} />
    ),
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    ReferenceLine: () => <div data-testid="reference-line" />,
    Tooltip: () => <div data-testid="tooltip" />,
  }
})

/* ===============================
   Mock react-select
================================ */
vi.mock("react-select", () => ({
  default: ({ options, value, onChange }) => (
    <select
      data-testid="meter-select"
      multiple
      value={value.map(v => v.value)}
      onChange={(e) =>
        onChange(
          Array.from(e.target.selectedOptions).map(o => ({
            value: o.value,
            label: o.value,
          }))
        )
      }
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}))

describe("DeviceClockingsChart", () => {
  const mockData = [
    { Date: "2024-01-01", MeterID: "M1", Unique_Clock_Count: 100 },
    { Date: "2024-01-02", MeterID: "M1", Unique_Clock_Count: 200 },
    { Date: "2024-01-01", MeterID: "M2", Unique_Clock_Count: 50 },
    { Date: "2024-01-02", MeterID: "M2", Unique_Clock_Count: 75 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders title and chart structure", () => {
    render(<DeviceClockingsChart data={mockData} />)

    expect(
      screen.getByText("Device Clockings per Meter")
    ).toBeInTheDocument()

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument()
    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
  })

  it("renders a line for each meter by default", () => {
    render(<DeviceClockingsChart data={mockData} />)

    const lines = screen.getAllByTestId("line")
    const lineKeys = lines.map(l => l.dataset.key)

    expect(lineKeys).toEqual(expect.arrayContaining(["M1", "M2"]))
  })

  it("shows threshold line by default and toggles it", () => {
    render(<DeviceClockingsChart data={mockData} />)

    // Visible by default
    expect(screen.getByTestId("reference-line")).toBeInTheDocument()

    // Toggle off
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)

    expect(
      screen.queryByTestId("reference-line")
    ).not.toBeInTheDocument()
  })

  it("filters meters based on value filter", () => {
    render(<DeviceClockingsChart data={mockData} />)

    // Change filter to > 150
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: 150 },
    })

    const lines = screen.getAllByTestId("line")
    const keys = lines.map(l => l.dataset.key)

    // M1 has 200, M2 max is 75 → only M1
    expect(keys).toEqual(["M1"])
  })

  it("clear button removes all meters", () => {
    render(<DeviceClockingsChart data={mockData} />)

    fireEvent.click(screen.getByText("Clear"))

    expect(
      screen.queryAllByTestId("line")
    ).toHaveLength(0)
  })

  it("select all restores all meters", () => {
    render(<DeviceClockingsChart data={mockData} />)

    fireEvent.click(screen.getByText("Clear"))
    fireEvent.click(screen.getByText("Select All"))

    const lines = screen.getAllByTestId("line")
    const keys = lines.map(l => l.dataset.key)

    expect(keys).toEqual(expect.arrayContaining(["M1", "M2"]))
  })

  it("transforms and sorts chart data by Date", () => {
    render(<DeviceClockingsChart data={mockData} />)

    const chart = screen.getByTestId("line-chart")
    const renderedData = JSON.parse(chart.dataset.chart)

    expect(renderedData.map(d => d.Date)).toEqual([
      "2024-01-01",
      "2024-01-02",
    ])
  })
})
