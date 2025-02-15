import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

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

    const { textStream } = streamText({
      model: openai('o3-mini'),
      messages: [
        {
          role: "system",
          content: "You're a Senior Recruiter in the Tech industry. You know how to write a perfect Cover letter. You know how to prepare the job application to be accepted. You know the human psychology and what the companies are usually looking at.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    return new Response(textStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    })
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

