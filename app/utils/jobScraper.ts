export async function extractJobDetails(url: string): Promise<string> {
  try {
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to extract job details")
    }

    const data = await response.json()
    return data.content
  } catch (error) {
    console.error("Error extracting job details:", error)
    throw new Error("Failed to extract job details. Please check the URL and try again.")
  }
}

