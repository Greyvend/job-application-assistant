import * as pdfjs from "pdfjs-dist"

// Use a CDN-hosted worker file
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"

export async function extractTextFromPDF(file: File): Promise<string> {
  // Set the worker source
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL

  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let text = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item: any) => item.str).join(" ") + "\n"
    }

    return text
  } catch (error: any) {
    console.error("Error in PDF extraction:", error)
    if (error.name === "MissingPDFException") {
      throw new Error("The PDF file is invalid or corrupted.")
    } else if (error.name === "InvalidPDFException") {
      throw new Error("The PDF file is invalid or corrupted.")
    } else if (error.name === "PasswordException") {
      throw new Error("The PDF file is password protected.")
    } else {
      throw new Error(`Failed to extract text from PDF: ${error.message || "Unknown error"}`)
    }
  }
}

