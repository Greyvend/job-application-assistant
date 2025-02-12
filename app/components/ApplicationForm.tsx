"use client"

import { useState } from "react"
import ResumeUpload from "./ResumeUpload"
import JobDescriptionInput from "./JobDescriptionInput"
import CoverLetterGeneration from "./CoverLetterGeneration"
import ProgressIndicator from "./ProgressIndicator"

const steps = ["Review Resume", "Job Description", "Generate Cover Letter"]

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [coverLetter, setCoverLetter] = useState("")

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
      <ProgressIndicator steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <ResumeUpload onResumeExtracted={setResumeText} onNext={nextStep} />}
      {currentStep === 1 && (
        <JobDescriptionInput onJobDescriptionExtracted={setJobDescription} onNext={nextStep} onPrev={prevStep} />
      )}
      {currentStep === 2 && (
        <CoverLetterGeneration
          resumeText={resumeText}
          jobDescription={jobDescription}
          onCoverLetterGenerated={setCoverLetter}
          onPrev={prevStep}
        />
      )}
    </div>
  )
}

