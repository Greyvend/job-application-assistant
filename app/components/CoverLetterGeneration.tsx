"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateCoverLetter } from "../utils/aiGenerator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CoverLetterGeneration({
  resumeText,
  jobDescription,
  onCoverLetterGenerated,
  onPrev,
}: {
  resumeText: string
  jobDescription: string
  onCoverLetterGenerated: (coverLetter: string) => void
  onPrev: () => void
}) {
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<string>("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setCoverLetter("")

    try {
      const generatedCoverLetter = await generateCoverLetter(resumeText, jobDescription)
      if (!generatedCoverLetter.trim()) {
        throw new Error("Generated cover letter is empty")
      }
      setCoverLetter(generatedCoverLetter)
      onCoverLetterGenerated(generatedCoverLetter)
    } catch (err) {
      console.error("Generation error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1F2937]">Generate Cover Letter</h2>
      <Button onClick={handleGenerate} disabled={isGenerating} className="bg-[#0066CC] hover:bg-[#0052a3] text-white">
        {isGenerating ? "Generating..." : "Generate Cover Letter"}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <h3 className="text-lg font-semibold text-[#1F2937] mb-2">
          {isGenerating ? "Generating Cover Letter..." : "Generated Cover Letter:"}
        </h3>
        <Textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full h-64"
          placeholder={isGenerating ? "Generating..." : "Your cover letter will appear here"}
          disabled={isGenerating}
        />
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button
          onClick={() => {
            /* Implement final submission logic */
          }}
          disabled={!coverLetter || isGenerating}
          className="bg-[#2ECC71] hover:bg-[#27ae60]"
        >
          Submit Application
        </Button>
      </div>
      {debug && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h4 className="text-sm font-semibold mb-2">Debug Information:</h4>
          <pre className="text-xs whitespace-pre-wrap">{debug}</pre>
        </div>
      )}
    </div>
  )
}

