import { NextResponse } from "next/server"
import axios from "axios"

const JINA_API_URL = "https://r.jina.ai/"
const JINA_API_TOKEN = process.env.JINA_API_TOKEN

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    console.log("Jina API key: ");
    console.log(JINA_API_TOKEN);

    const response = await axios.get(`${JINA_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${JINA_API_TOKEN}`,
      },
    })

    return NextResponse.json({ content: response.data })
  } catch (error) {
    console.error("Error extracting job details:", error)
    return NextResponse.json(
      { error: "Failed to extract job details. Please check the URL and try again." },
      { status: 500 },
    )
  }
}

