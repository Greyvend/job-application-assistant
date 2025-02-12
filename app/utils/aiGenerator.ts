export async function generateCoverLetter(resumeText: string, jobDescription: string): Promise<string> {
  try {
    console.log("Sending request to generate cover letter")
    const response = await fetch("/api/generate-cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeText, jobDescription }),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response body:", errorText)
      let errorMessage = "Failed to generate cover letter"
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error || errorMessage
      } catch (e) {
        console.error("Error parsing error response:", e)
      }
      throw new Error(errorMessage)
    }

    let coverLetter = ""
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error("Failed to read response")
    }

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        coverLetter += chunk
      }
    } finally {
      reader.releaseLock()
    }

    if (!coverLetter.trim()) {
      throw new Error("Generated cover letter is empty")
    }

    console.log("Cover letter generated successfully")
    return coverLetter
  } catch (error) {
    console.error("Error generating cover letter:", error)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

