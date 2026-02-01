// src/components/ReportUploadModal/FileProgressList.test.jsx
import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import FileProgressList from "./FileProgressList"

describe("FileProgressList", () => {
  const files = [
    new File(["content"], "file-1.csv"),
    new File(["content"], "file-2.csv"),
  ]

  it("returns null when files array is empty", () => {
    const { container } = render(
      <FileProgressList files={[]} progress={{}} />
    )

    expect(container.firstChild).toBeNull()
  })

  it("renders file names", () => {
    render(
      <FileProgressList
        files={files}
        progress={{}}
      />
    )

    expect(screen.getByText("file-1.csv")).toBeInTheDocument()
    expect(screen.getByText("file-2.csv")).toBeInTheDocument()
  })

  it("shows upload progress bar and percentage", () => {
    render(
      <FileProgressList
        files={[files[0]]}
        progress={{
          "file-1.csv": {
            upload: 45,
            processing: 0,
            status: "uploading",
          },
        }}
      />
    )

    expect(
      screen.getByText("Upload 45%")
    ).toBeInTheDocument()
  })

  it("shows processing bar after upload completes", () => {
    render(
      <FileProgressList
        files={[files[0]]}
        progress={{
          "file-1.csv": {
            upload: 100,
            processing: 30,
            status: "processing",
          },
        }}
      />
    )

    expect(
      screen.getByText("Processing 30%")
    ).toBeInTheDocument()
  })

  it("shows done icon when status is done", () => {
    render(
      <FileProgressList
        files={[files[0]]}
        progress={{
          "file-1.csv": {
            upload: 100,
            processing: 100,
            status: "done",
          },
        }}
      />
    )

    // SVG from react-icons
    expect(
      document.querySelector("svg")
    ).toBeInTheDocument()
  })

  it("shows error icon and error message during upload", () => {
    render(
      <FileProgressList
        files={[files[0]]}
        progress={{
          "file-1.csv": {
            upload: 60,
            processing: 0,
            status: "error",
            errorMsg: "Upload failed",
          },
        }}
      />
    )

    expect(
      screen.getByText("Upload failed")
    ).toBeInTheDocument()
  })

  it("shows error message during processing phase", () => {
    render(
      <FileProgressList
        files={[files[0]]}
        progress={{
          "file-1.csv": {
            upload: 100,
            processing: 20,
            status: "error",
            errorMsg: "Processing failed",
          },
        }}
      />
    )

    expect(
      screen.getByText("Processing failed")
    ).toBeInTheDocument()
  })
})
