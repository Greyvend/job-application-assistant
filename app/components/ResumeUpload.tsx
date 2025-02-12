"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { resumeContent } from "../data/resume"

export default function ResumeUpload({
  onResumeExtracted,
  onNext,
}: {
  onResumeExtracted: (text: string) => void
  onNext: () => void
}) {
  useEffect(() => {
    // Set the resume content when component mounts
    onResumeExtracted(resumeContent)
  }, [onResumeExtracted])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1F2937]">Resume Preview</h2>
      <Card className="p-4">
        <div className="prose max-w-none">
          <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">{resumeContent}</pre>
        </div>
      </Card>
      <Button onClick={onNext} className="bg-[#0066CC] hover:bg-[#0052a3]">
        Next
      </Button>
    </div>
  )
}

