import ClientApplicationForm from "./components/ClientApplicationForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-[#1F2937] mb-8">Job Application Assistant</h1>
      <ClientApplicationForm />
    </main>
  )
}

