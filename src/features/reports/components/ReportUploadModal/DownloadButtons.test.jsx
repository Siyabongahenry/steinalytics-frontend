// src/components/ReportUploadModal/DownloadButtons.test.jsx
import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import DownloadButtons from "./DownloadButtons"

describe("DownloadButtons", () => {
  it("returns null when downloadUrls is empty or undefined", () => {
    const { container: emptyContainer } = render(
      <DownloadButtons downloadUrls={[]} />
    )
    expect(emptyContainer.firstChild).toBeNull()

    const { container: undefinedContainer } = render(
      <DownloadButtons />
    )
    expect(undefinedContainer.firstChild).toBeNull()
  })

  it("renders downloads header", () => {
    render(
      <DownloadButtons
        downloadUrls={[
          { name: "report.csv", url: "https://example.com/report.csv" },
        ]}
      />
    )

    expect(screen.getByText("Downloads")).toBeInTheDocument()
  })

  it("renders a link for each download item", () => {
    const downloadUrls = [
      { name: "report-1.csv", url: "https://example.com/1.csv" },
      { name: "report-2.csv", url: "https://example.com/2.csv" },
    ]

    render(<DownloadButtons downloadUrls={downloadUrls} />)

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)

    expect(links[0]).toHaveAttribute("href", downloadUrls[0].url)
    expect(links[1]).toHaveAttribute("href", downloadUrls[1].url)
  })

  it("renders download file names", () => {
    render(
      <DownloadButtons
        downloadUrls={[
          { name: "summary.xlsx", url: "https://example.com/summary.xlsx" },
        ]}
      />
    )

    expect(screen.getByText("summary.xlsx")).toBeInTheDocument()
  })

  it("each link opens in a new tab with safe rel attributes", () => {
    render(
      <DownloadButtons
        downloadUrls={[
          { name: "secure.pdf", url: "https://example.com/secure.pdf" },
        ]}
      />
    )

    const link = screen.getByRole("link")

    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener")
    )
  })
})
