import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json()

    if (!resumeText || !jobDescription) {
      return new Response(JSON.stringify({ error: "Resume and job description are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OpenAI API key is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const prompt = `
Your task is to look at this resume and the job application, as well as the company information and provide the best possible Cover Letter for the job that maximizes the chances of successful application. Use real numbers from my resume. Keep it short and to the point.

${resumeText}

# Job description
${jobDescription}

# Cover letter`

    const response = await openai.createChatCompletion({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content:
            "You're a Senior Recruiter in the Tech industry. You know how to write a perfect Cover letter. You know how to prepare the job application to be accepted. You know the human psychology and what the companies are usually looking at.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      stream: true,
    })

    // Ensure the response is ok before creating the stream
    if (!response.ok) {
      const errorBody = await response.json()
      console.error("OpenAI API error:", errorBody)
      return new Response(JSON.stringify({ error: errorBody.error?.message || "Failed to generate cover letter" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error generating cover letter:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to generate cover letter. Please try again.",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

