"use client"

import dynamic from "next/dynamic"

const ApplicationForm = dynamic(() => import("./ApplicationForm"), { ssr: false })

export default function ClientApplicationForm() {
  return <ApplicationForm />
}

