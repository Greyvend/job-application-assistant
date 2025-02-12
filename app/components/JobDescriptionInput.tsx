"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { extractJobDetails } from "../utils/jobScraper"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function JobDescriptionInput({
  onJobDescriptionExtracted,
  onNext,
  onPrev,
}: {
  onJobDescriptionExtracted: (description: string) => void
  onNext: () => void
  onPrev: () => void
}) {
  const [url, setUrl] = useState("")
  const [jobDetails, setJobDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const details = await extractJobDetails(url)
      setJobDetails(details)
      onJobDescriptionExtracted(details)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1F2937]">Enter Job Description URL</h2>
      <form onSubmit={handleUrlSubmit} className="space-y-4">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/job-posting"
          required
          className="w-full"
        />
        <Button type="submit" className="bg-[#0066CC] hover:bg-[#0052a3]" disabled={isLoading}>
          {isLoading ? "Extracting..." : "Extract Job Details"}
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {jobDetails && (
        <div>
          <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Extracted Job Details:</h3>
          <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">{jobDetails}</pre>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} disabled={!jobDetails} className="bg-[#0066CC] hover:bg-[#0052a3]">
          Next
        </Button>
      </div>
    </div>
  )
}

