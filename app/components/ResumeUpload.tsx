"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { resumeContent } from "../data/resume"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ResumeUpload({
  onResumeExtracted,
  onNext,
}: {
  onResumeExtracted: (text: string) => void
  onNext: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Set the resume content when component mounts
    onResumeExtracted(resumeContent)
  }, [onResumeExtracted])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#1F2937]">Resume Preview</h2>
      <Card className="p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {isOpen ? "Click to collapse" : "Click to expand full resume"}
            </p>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4">
              <pre className="bg-[#1F2937] text-gray-400 p-4 rounded-md whitespace-pre-wrap font-sans text-sm">
                {resumeContent}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
        {!isOpen && (
          <div className="mt-2">
            <pre className="bg-[#1F2937] text-gray-400 p-4 rounded-md whitespace-pre-wrap font-sans text-sm line-clamp-3">
              {resumeContent}
            </pre>
          </div>
        )}
      </Card>
      <Button onClick={onNext} className="bg-[#0066CC] hover:bg-[#0052a3] text-white">
        Next
      </Button>
    </div>
  )
}

